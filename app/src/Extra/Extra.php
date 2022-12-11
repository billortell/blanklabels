<?php
namespace Extra;

use \GuzzleHttp\Client;
use \RedBeanPHP\R as R;
use \DOMDocument;
use Flight;

class Extra {

    public function __construct()
    {
        $this->scaffold();
        $this->setup();
    }

    protected function scaffold()
    {
        if (R::count('manufacturer') <= 0) {
            R::fancyDebug(FALSE);
            $record = R::dispense('manufacturer');
            $record->m_id = 1;
            $record->m_name = 'texttexttexttext';
            $record->m_image = 'texttexttexttext';
            $record->m_updated = "2021-03-26 11:41:18PM";
            $record->m_updatedday = "2021-03-26";
            R::store($record);
            R::trash($record);
        }

        if ( R::count('printer') <= 0 ) {
            $record = R::dispense('printer');
            $record->p_id = 1;
            $record->p_name = 'texttexttexttext';
            $record->p_image = 'texttexttexttext';
            $record->p_manufacturer_id = 1;
            $record->p_core_size = 1.234;
            $record->p_outside_diameter = 1.234;
            $record->p_outside_diameter_2 = 1.234;
            $record->p_min_roll_width = 1.234;
            $record->p_max_roll_width = 1.234;
            $record->p_min_label_length = 1.234;
            $record->p_max_label_length = 1.234;
            $record->p_matrix_preference = 1;
            $record->p_type = 'texttexttexttext';
            $record->p_updated = $this->getDateTime();
            $record->p_updatedday = $this->getDate();
            $record_id = R::store($record);
            R::trash($record);
        }

        if ( R::count('size') <= 0 ) {
            $record = R::dispense('size');
            $record->s_id = 1;
            $record->s_shape = 'Oval';
            $record->s_printer_id = 1;
            $record->s_label_width = 1.2345;
            $record->s_label_length = 1.2345;
            $record->s_perforations = 1;
            $record->s_gap_tb = 1.2345;
            $record->s_gap_lr = 1.2345;
            $record->s_corner_radius = 1.2345;
            $record->s_labels_per_row = 1;
            $record->s_labels_per_roll_min = 1;
            $record->s_labels_per_roll_max = 1;
            $record->s_min_up = 1;
            $record->s_max_up = 1;
            $record->s_timing_required = 1;
            $record->s_tooling_charge = 'text';
            $record->s_tooling_waive_quantity = 1;
            $record->s_updated = $this->getDateTime();
            $record->s_updatedday = $this->getDate();
            $record_id = R::store($record);
            R::trash($record);
        }

    }

    private function getDateTime()
    {
        $timestamp = new \DateTime();
        return $timestamp->format('Y-m-d h:i:sA');
    }

    private function getDate()
    {
        $timestamp = new \DateTime();
        return $timestamp->format('Y-m-d');
    }

    protected function setup()
    {
        Flight::map('helpie', function(){ echo "i'm a good helpie!"; });

        Flight::route('/labels', function () {
            Flight::render($this->getViewFolder().'labels', [], 'body_content');
            Flight::render('layout');
        });

        /**
         * override manufacturer images/names
         */
        Flight::route('GET /labels/api/manufacturers', function () {
            $parts = (object)parse_url("https//bogus.com" . $_SERVER['REQUEST_URI']);
            $url = "https://api.hickmanlabel.com/printer_manufacturer/grid";
            $url .= "?" . $parts->query;

            $client = new Client(['headers' => ['Accept' => 'application/json']]);
            $response = $client->request('GET', $url);
            $contents = $response->getBody();
            $status_code = $response->getStatusCode();

            $json =  $contents->getContents();
            $jd = json_decode($json);
            $manufacturers = $jd->payload;

            $arr = [];
            foreach ( $manufacturers as $manu ) {
                $html = new DOMDocument();
                @$html->loadHTML($manu);
                $xml = simplexml_import_dom($html);

                // get div
                $data_id = (string)$xml->xpath('//div/@data-id')[0];

                // get image
                $src = (string)$xml->xpath('//img/@src')[0];
                $height = (string)$xml->xpath('//img/@height')[0];
                $width = (string)$xml->xpath('//img/@width')[0];
                $alt = (string)$xml->xpath('//img/@alt')[0];

                // record for later querying...
                $record = R::findOne('manufacturer','m_id = :data_id',[':data_id'=>$data_id]);
                if ( empty($record) ) {
                    $record = R::dispense('manufacturer');
                    $record->m_id = $data_id;
                    $record->m_name = $alt;
                    $record->m_image = $src;
                    $record->m_updated = $this->getDateTime();
                    $record->m_updatedday = $this->getDate();
                    $record_id = R::store($record);
                }

                $arr[] = '<div class="col text-center col-lg-4 col-md-6 manufacturer " data-id="'.$data_id.'">
                    <div class="card h-100 ">
                        <div class="card-body">
                            <span class="pgrid-image"><img src="'.$src.'" class="img-fluid" alt="'.$alt.'"/></span>
                        </div>
                        <div class="card-footer h-100" style="height:60px !important;">
                            <span class="pgrid-title">'.$alt.'</span>
                        </div>
                    </div>
                </div>';

            }

            $json = [];
            $json['message'] = count($arr)." Printer Manufacturers found.";
            $json['payload'] = $arr;
            $json['meta'] = ['total' => count($arr)];

            header('Access-Control-Allow-Origin: ' . "*");
            echo json_encode($json);
        });

        /**
         * override manufacturer images/names
         */
        Flight::route('GET /labels/api/printers', function () {
            $parts = (object)parse_url("https//bogus.com" . $_SERVER['REQUEST_URI']);
            $url = "https://api.hickmanlabel.com/printer/grid";
            $url .= "?" . $parts->query;

            $client = new Client(['headers' => ['Accept' => 'application/json']]);
            $response = $client->request('GET', $url);
            $contents = $response->getBody();
            $status_code = $response->getStatusCode();

            $json =  $contents->getContents();
            $jd = json_decode($json);
            $manufacturers = $jd->payload;


            /**

            <div class="col col-5 printer"
            data-id="1323137"
            data-manufacturer_id="1323151"
            data-core_size="3"
            data-outside_diameter="8"
            data-outside_diameter_2="6"
            data-min_roll_width="2"
            data-max_roll_width="8.5"
            data-min_label_length="1"
            data-max_label_length="17.375"
            data-matrix_preference="1"
            data-type="Inkjet"
            >
            <span class="pgrid-image"><img src="https://api.hickmanlabel.com/file/1323137-printer/h300/w300/Astrojet+L1_L1DN-Website.jpg" alt="L1" title="L1" width="300" height="300"></span>
            <span class="pgrid-subtitle">Astro Machine Corporation</span>
            <span class="pgrid-title">L1</span>
            </div>

             */

            $arr = [];
            foreach ( $manufacturers as $manu ) {
                $html = new DOMDocument();
                @$html->loadHTML($manu);
                $xml = simplexml_import_dom($html);

                // get div
                $data_id = (string)$xml->xpath('//div/@data-id')[0];
                $data_manufacturer_id = (string)$xml->xpath('//div/@data-manufacturer_id')[0];
                $data_core_size = (string)$xml->xpath('//div/@data-core_size')[0];
                $data_outside_diameter = (string)$xml->xpath('//div/@data-outside_diameter')[0];
                $data_outside_diameter_2 = (string)$xml->xpath('//div/@data-outside_diameter_2')[0];
                $data_min_roll_width = (string)$xml->xpath('//div/@data-min_roll_width')[0];
                $data_max_roll_width = (string)$xml->xpath('//div/@data-max_roll_width')[0];
                $data_min_label_length = (string)$xml->xpath('//div/@data-min_label_length')[0];
                $data_max_label_length = (string)$xml->xpath('//div/@data-max_label_length')[0];
                $data_matrix_preference = (string)$xml->xpath('//div/@data-matrix_preference')[0];
                $data_type = (string)$xml->xpath('//div/@data-type')[0];

                // get image
                $img_src = (string)$xml->xpath('//img/@src')[0];
                $height = (string)$xml->xpath('//img/@height')[0];
                $width = (string)$xml->xpath('//img/@width')[0];
                $img_alt = (string)$xml->xpath('//img/@alt')[0];
                $img_title = (string)$xml->xpath('//img/@title')[0];

                // get subtitle
                $subtitle = (string)$xml->xpath('//span[contains(@class,"pgrid-subtitle")]/text()')[0];

                // get title
                $title = (string)$xml->xpath('//span[contains(@class,"pgrid-title")]/text()')[0];

                // record for later querying...
                $record = R::findOne('printer','p_id = :data_id',[':data_id'=>$data_id]);
                if ( empty($record) ) {
                    $record = R::dispense('printer');
                    $record->p_id = $data_id;
                    $record->p_name = $img_title;
                    $record->p_image = $img_src;
                    $record->p_manufacturer_id = $data_manufacturer_id;
                    $record->p_core_size = $data_core_size;
                    $record->p_outside_diameter = $data_outside_diameter;
                    $record->p_outside_diameter_2 = $data_outside_diameter_2;
                    $record->p_min_roll_width = $data_min_roll_width;
                    $record->p_max_roll_width = $data_max_roll_width;
                    $record->p_min_label_length = $data_min_label_length;
                    $record->p_max_label_length = $data_max_label_length;
                    $record->p_matrix_preference = $data_matrix_preference;
                    $record->p_type = $data_type;
                    $record->p_updated = $this->getDateTime();
                    $record->p_updatedday = $this->getDate();
                    $record_id = R::store($record);
                }

                $arr[] = '<div class="col text-center col-lg-4 col-md-6 printer"
                     data-id="'.$data_id.'"
                     data-manufacturer_id="'.$data_manufacturer_id.'"
                     data-core_size="'.$data_core_size.'"
                     data-outside_diameter="'.$data_outside_diameter.'"
                     data-outside_diameter_2="'.$data_outside_diameter_2.'"
                     data-min_roll_width="'.$data_min_roll_width.'"
                     data-max_roll_width="'.$data_max_roll_width.'"
                     data-min_label_length="'.$data_min_label_length.'"
                     data-max_label_length="'.$data_max_label_length.'"
                     data-matrix_preference="'.$data_matrix_preference.'"
                     data-type="'.$data_type.'">
                    <div class="h-100 card">
                        <div class="card-body">
                            <span class="pgrid-image"><img class="img-fluid" src="'.$img_src.'" alt="'.$img_alt.'" title="'.$img_title.'"></span>
                        </div>
                        <div class="card-footer" style="height:60px !important;">
                            <p>
                                <span class="pgrid-subtitle">'.$subtitle.'</span>
                                <span class="pgrid-title">'.$title.'</span>
                            </p>
                        </div>
                    </div>
                </div>
            ';

                /**
                <div class="h-100 card ">
                <img class="card-img-top" src="..." alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
                </div>

                 */

            }

            $json = [];
            $json['message'] = count($arr)." Printers found.";
            $json['payload'] = $arr;
            $json['meta'] = ['total' => count($arr)];

            header('Access-Control-Allow-Origin: ' . "*");
            echo json_encode($json);
        });


        Flight::route('GET /labels/api/size_grid/all', function(){

            $printers = R::find('printer');
            $shapes = ['Continuous','Oval','Rectangle','Circle','Rounded Corners'];

            $cache_days = 1;
            foreach ( $printers as $printer ) {
                foreach ( $shapes as $shape ) {

                    // find stale/old information
                    $recordsOld = R::findOne('size',
                        's_printer_id = :s_printer_id and s_shape = :data_shape and s_updated < NOW() - interval :cache_days DAY LIMIT 0,1',
                        [':s_printer_id'=>$printer->p_id, ':data_shape'=>$shape, ':cache_days'=>$cache_days]);

                    // do we have ANY records for this printer + shape?
                    $recordsByShape = R::findOne('size',
                        's_printer_id = :s_printer_id and s_shape = :data_shape',
                        [':s_printer_id'=>$printer->p_id, ':data_shape'=>$shape]);

                    if ( empty($recordsOld) && !empty($recordsByShape) ) {
                        // no need, all current (1 day) and we have data
                        // take the day off ;)
                        continue;
                    }

                    $queryArr = [];
                    $queryArr['printer_id'] = $printer->p_id;
                    $queryArr['type'] = "Inkjet";
                    $queryArr['core_size'] = $printer->p_core_size;
                    $queryArr['outside_diameter'] = $printer->p_outside_diameter;
                    $queryArr['size_data'] = [];
                    $queryArr['size_data']['shape'] = $shape;
                    $queryArr['shape'] = $shape;
                    $queryArr['accounts_account_id'] = "138605";

//                $url = "https://0144-2601-40f-4200-eca0-2c1e-83b3-3f8a-eb8c.ngrok.io/labels/api/size_grid";
//                $url .= "?printer_id=69205&type=Inkjet&core_size=3&outside_diameter=8&size_data%5Bshape%5D=Oval&shape=Oval&accounts_account_id=138605";
                    $query = http_build_query($queryArr);
                    $url = "https://api.hickmanlabel.com/roll_label_size/size_grid";
                    $url .= "?" . $query;

                    $response = Flight::processSizeGridResponse($url);

                    sleep(10);

                }
            }

            exit('help');
        });


        Flight::route('GET /labels/api/size_grid', function () {
            $parts = (object)parse_url("https//bogus.com" . $_SERVER['REQUEST_URI']);
            $url = "https://api.hickmanlabel.com/roll_label_size/size_grid";
            $url .= "?" . $parts->query;

            /** process outside of this route so we can query all */
            $response = Flight::processSizeGridResponse($url);

            header('Access-Control-Allow-Origin: ' . "*");
            echo $response; // originally received - unmodified
        });

        /**
         * get available sizes for each role
         */
        Flight::map('processSizeGridResponse',function($url){

            $parts = (object)parse_url($url);

            $client = new Client(['headers' => ['Accept' => 'application/json']]);
            $response = $client->request('GET', $url);
            $contents = $response->getBody();
            $status_code = $response->getStatusCode();

            $json =  $contents->getContents();

            return $json;

            //-----

            $jd = json_decode($json);
            $payload = $jd->payload;

            // parse the payload (html)
            $html = new DOMDocument();
            @$html->loadHTML($payload);
            $xml = simplexml_import_dom($html);

            // get all printer label sizes for this request
            $xpath = '//div[contains(@class,"labels-up-")]';
            $sizes = $xml->xpath($xpath);

            // check to see if we *REALLY* need to aggregate (or not!)
            $cache_days = 1;
            $data_shape = (string)$sizes[0]->xpath('@data-shape')[0];
            $record = R::findOne('size',
                's_shape = :data_shape and s_updated < NOW() + interval :cache_days DAY LIMIT 0,1',
                [':data_shape'=>$data_shape, ':cache_days'=>$cache_days]);

            // check for any at all! :)
            $recordShape = R::findOne('size',
                's_shape = :data_shape',
                [':data_shape'=>$data_shape]);


            /** uses input $url for these values */
            parse_str($parts->query, $params);
            $printer_id = (int)$params['printer_id'];

            // if we have records -> means we have old data...
            // let's update them
            if ( !empty($record) || empty(!empty($record)) ) {
                foreach ( $sizes as $size ) {

                    // get div
                    $data_size_id = (int)$size->xpath('@data-size_id')[0];
                    $data_shape = (string)$size->xpath('@data-shape')[0];
                    $data_label_width = (float)$size->xpath('@data-label_width')[0];
                    $data_label_length = (float)$size->xpath('@data-label_length')[0];
                    $data_perforations = (int)$size->xpath('@data-perforations')[0];
                    $data_gap_tb = (float)$size->xpath('@data-gap_tb')[0];
                    $data_gap_lr = (float)$size->xpath('@data-gap_lr')[0];
                    $data_corner_radius = (float)$size->xpath('@data-corner_radius')[0];
                    $data_labels_per_row = (int)$size->xpath('@data-labels_per_row')[0];
                    $data_min_up = (int)$size->xpath('@data-min_up')[0];
                    $data_max_up = (int)$size->xpath('@data-max_up')[0];
                    $data_timing_required = (int)$size->xpath('@data-timing_required')[0];
                    $data_tooling_charge = (string)$size->xpath('@data-tooling_charge')[0];
                    $data_tooling_waive_quantity = (string)$size->xpath('@data-tooling_waive_quantity')[0];

                    // get range
                    switch ( $data_shape ) {
                        case "Continuous":
                            $range = (string)$size->xpath('span[contains(@class,"tool-tip")]/strong/text()')[0];
                            $rangeArr = explode(" wide,",$range); // 2nd element has values
                            $rangeArr = explode("to",str_replace(["'","long"],"",$rangeArr[1]));
                            $labels_per_roll_min = trim($rangeArr[0]);
                            $labels_per_roll_max = trim($rangeArr[1]);
                            break;
                        default:
                            $range = (string)$size->xpath('//span[contains(@class,"tool-tip")]/strong')[2];

                            // assume no dash - both same!
                            $range = str_replace(",","",trim($range));
                            $labels_per_roll_min = $range;
                            $labels_per_roll_max = $range;

                            // check if range exists
                            if ( stripos($range," - ") !== false ) {
                                $range = str_replace(",","",$range);
                                $rangeArr = explode(" - ",$range);
                                $labels_per_roll_min = trim($rangeArr[0]);
                                $labels_per_roll_max = trim($rangeArr[1]);
                            }
                            break;
                    }

                    // record for later querying...
                    $record = R::findOne('size',
                        's_printer_id = :s_printer_id and s_shape = :data_shape and s_label_width = :data_label_width and s_label_length = :data_label_length and s_labels_per_row = :data_labels_per_row',
                        [':s_printer_id'=>$printer_id, ':data_shape'=>$data_shape, ':data_label_width'=>$data_label_width, ':data_label_length'=>$data_label_length, ':data_labels_per_row'=>$data_labels_per_row]);

                    if ( empty($record) ) {
                        $record = R::dispense('size');
                    }

                    $record->s_id = $data_size_id;
                    $record->s_shape = $data_shape;
                    $record->s_label_width = $data_label_width;
                    $record->s_label_length = $data_label_length;
                    $record->s_perforations = $data_perforations;
                    $record->s_gap_tb = $data_gap_tb;
                    $record->s_gap_lr = $data_gap_lr;
                    $record->s_corner_radius = $data_corner_radius;
                    $record->s_labels_per_row = $data_labels_per_row;
                    $record->s_labels_per_roll_min = $labels_per_roll_min;
                    $record->s_labels_per_roll_max = $labels_per_roll_max;
                    $record->s_min_up = $data_min_up;
                    $record->s_max_up = $data_max_up;
                    $record->s_timing_required = $data_timing_required;
                    $record->s_tooling_charge = $data_tooling_charge;
                    $record->s_tooling_waive_quantity = $data_tooling_waive_quantity;
                    $record->s_printer_id = $printer_id;
                    $record->s_updated = $this->getDateTime();
                    $record->s_updatedday = $this->getDate();
                }
            }

            return $json;
        });

        /**
         * override quantity-based costs...
         */
        Flight::route('GET /labels/api/quantity-adjust', function () {
            $parts = (object)parse_url("https//bogus.com".$_SERVER['REQUEST_URI']);
            $url = "https://api.hickmanlabel.com/schema/roll_label_quote/quantity_information";
            $url .= "?".$parts->query;

            // use as sample
            // $url .= "?printer_id=2926174&type=Inkjet&core_size=2&outside_diameter=4&size_data%5Bshape%5D=Rounded%20Corners&size_data%5Blabel_width%5D=0.375&size_data%5Blabel_length%5D=1.25&size_data%5Bgap_tb%5D=0.25&size_data%5Bgap_lr%5D=0.125&size_data%5Bperforations%5D=&size_data%5Bcorner_radius%5D=0.125&shape=Rounded%20Corners&accounts_account_id=138605&size_id=2988330&labels_per_row=2&label_material_id=7906&timing_marks=&matrix=false&quantity=1";

            $client = new Client(['headers' => ['Accept' => 'application/json']]);
            $response = $client->request('GET', $url);
            $contents = $response->getBody();
            $status_code = $response->getStatusCode();

            $json =  $contents->getContents();
            $jd = json_decode($json);
            $payload = $jd->payload;

            $html = new DOMDocument();
            @$html->loadHTML($payload);
            $xml = simplexml_import_dom($html);

            // find div.price-blocks
            $xpath = '//div[contains(@class,"quantity")]';
            $xpath = '//input[contains(@name,"quantity")]/@value';
            $qty_input_value = $xml->xpath($xpath);
            $qty_input_value = (float)$qty_input_value[0];

            // find div.price-blocks
            $xpath = '//div[contains(@class,"price-block") and not(contains(@class,"price-key"))]';
            $rows = $xml->xpath($xpath);


            $replArr = [];

            // take off that field header row :)
            array_shift($rows);

            foreach ( $rows as $row ) {
                $row_qty = (string)$row->xpath('@data-quantity')[0];

                $str = $row->xpath('span[contains(@class,"quantity")]');
                $qty = (string)$str[0];

                $range = explode("-",$qty);
                $min = $range[0];
                $max = $range[1];

                $str = $row->xpath('span[contains(@class,"price")]');
                $price = (string)$str[0];
                $price = (float)str_replace("$","",$price);

                $premier_parter = false;
                if ( $premier_parter ) {
                    $markup = 1.25;
                } else {
                    $markup = 1.5;
                }

                $new_price = $price*$markup;

                $replArr[] = '
                    <div class="price-block col col-7 " data-quantity="'.$row_qty.'" data-price="'.$new_price.'">
                        <span class="quantity">'.$qty.'</span>
                        <span class="price">$'.$new_price.'</span>
                    </div>
                ';


                if ( $qty_input_value >= $min && $qty_input_value<=$max ) {
                    $total_price = $qty_input_value * $new_price;
                }

            }

            // lame... but quick! ;)
            $new_html = "";
            $new_html .= '<div class="price-blocks mb-colset clearfix">';
            foreach ( $replArr as $new_row ) {
                $new_html .= $new_row;
            }
            $new_html .= '</div>';

            $final_html = '

                <div class="matrix-timing clearfix"></div>
                <div class="quantity-pricing">
                
                    <div class="totals clearfix">
                        <div class="quantity">
                            <label class="label number">
                                <span class="form-label">Enter Your Quantity</span>
                                <input class="" type="text" name="quantity" value="'.$qty_input_value.'" data-default-value="1" autocomplete="off" data-min="1">
                            </label>
                        </div>
                
                        <div class="price-blocks mb-colset clearfix">
                            <div class="price-block price-key col col-7">
                                <span class="quantity">Quantity</span>
                                <span class="price">Price</span>
                            </div>
                
                            '.$new_html.'  
                                                                          
                        </div>
                
                        <div class="clearfix">
                            
                            <div class="total-price">
                                <strong>Total Price</strong>
                                <strong class="total">$'.$total_price.'</strong>
                            </div>
                
                            <div class="next">
                                <button type="button" class="btn next-step">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                
                </div>    
            ';

            $json = [];
            $json['payload'] = $final_html;

            header('Access-Control-Allow-Origin: ' . "*");
            echo json_encode($json);
        });

    }

    protected function getViewFolder()
    {
        return dirname(__FILE__).'/views/';
    }
}


