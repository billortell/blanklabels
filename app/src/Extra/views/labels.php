<?php
//        $site_name = "Printer Source Plus";
        $site_url_uri = $_SERVER["REQUEST_URI"];
        $site_domain = $_SERVER["HTTP_HOST"];
        $site_domain = !empty($_SERVER["HTTP_X_ORIGINAL_HOST"]) ? $_SERVER["HTTP_X_ORIGINAL_HOST"] : $_SERVER["HTTP_HOST"];
        $og_image = "https://api.hickmanlabel.com/images/product_roll_label/rectangle-rounded-sm.svg";
?>
<!--    <link rel='stylesheet' id='hlc_distributor-css' href='https://--><?php //echo SITE_DOMAIN;?><!--/assets/styles/labels.css?ver=5.12.3' media='all'/>-->
    <style>
        .badge_earn {
            position: relative;
            margin: 1.5em 3em;
            width: 4em;
            height: 6.2em;
            border-radius: 10px;
            display: inline-block;
            top: 0;
            transition: all 0.2s ease;
        }
        .badge_earn:before, .badge_earn:after {
            position: absolute;
            width: inherit;
            height: inherit;
            border-radius: inherit;
            background: inherit;
            content: "";
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
        .badge_earn:before {
            transform: rotate(60deg);
        }
        .badge_earn:after {
            transform: rotate(-60deg);
        }
        .badge_earn:hover {
            top: -4px;
        }
        .badge_earn .circle {
            width: 60px;
            height: 60px;
            position: absolute;
            background: #fff;
            z-index: 10;
            border-radius: 50%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
        .badge_earn .circle i.fa {
            font-size: 2em;
            margin-top: 8px;
        }
        .badge_earn .font {
            display: inline-block;
            margin-top: 1em;
        }
        .badge_earn .ribbon_earn {
            position: absolute;
            border-radius: 4px;
            padding: 3px 5px 2px;
            width: 100px;
            z-index: 11;
            color: #fff;
            bottom: 12px;
            left: 55%; /* 50% */
            margin-left: -55px;
            height: 25px;
            font-size: 14px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.27);
            text-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
            text-transform: uppercase;
            background: linear-gradient(to bottom right, #555 0%, #333 100%);
            cursor: default;
        }

        .yellow {
            background: linear-gradient(to bottom right, #ffeb3b 0%, #fbc02d 100%);
            color: #ffb300;
        }

        .orange {
            background: linear-gradient(to bottom right, #ffc107 0%, #f57c00 100%);
            color: #f68401;
        }

        .pink {
            background: linear-gradient(to bottom right, #F48FB1 0%, #d81b60 100%);
            color: #dc306f;
        }

        .red {
            background: linear-gradient(to bottom right, #f4511e 0%, #b71c1c 100%);
            color: #c62828;
        }

        .purple {
            background: linear-gradient(to bottom right, #ab47bc 0%, #4527a0 100%);
            color: #7127a8;
        }

        .teal {
            background: linear-gradient(to bottom right, #4DB6AC 0%, #00796B 100%);
            color: #34a297;
        }

        .blue {
            background: linear-gradient(to bottom right, #4FC3F7 0%, #2196F3 100%);
            color: #259af3;
        }

        .blue-dark {
            background: linear-gradient(to bottom right, #1976D2 0%, #283593 100%);
            color: #1c68c5;
        }

        .green {
            background: linear-gradient(to bottom right, #cddc39 0%, #8bc34a 100%);
            color: #7cb342;
        }

        .green-dark {
            background: linear-gradient(to bottom right, #4CAF50 0%, #1B5E20 100%);
            color: #00944a;
        }

        .silver {
            background: linear-gradient(to bottom right, #E0E0E0 0%, #BDBDBD 100%);
            color: #9e9e9e;
        }

        .gold {
            background: linear-gradient(to bottom right, #e6ce6a 0%, #b7892b 100%);
            color: #b7892b;
        }

    </style>

    <div class="col-xs-12">
        <article>
            <!-- Post header-->
            <header class="mb-4">
                <h1 class="fw-bold mb-1">Blank Printer Labels</h1>
            </header>
            <div class="justify-content-center text-start">

                <!-- hickman form -->
            <div id="page" class="hfeed site">
                <div id="content" class="site-content" tabindex="-1">
                    <div class="col-full">
                        <div id="primary" class="content-area">
                            <main id="main" class="site-main" role="main">
                                <header class="woocommerce-products-header">
                                    <div class="term-description">

                                        <!-- previousl location for verbiage -->

                                        <section id="hlc-roll-label-step-form" class="step-form label-step-form clearfix" data-apiurl="https://api.hickmanlabel.com" data-handleHistory="false" data-account="138605" data-lang="en">
                                            <aside class="steps">
                                                <div class="title-bar"><h3>Roll Label Order</h3></div>
                                                <div class="sidebar-content">
                                                    <div class="menu-window">
                                                        <ol>
                                                            <li class="step-nav-printer" data-title="Choose Printer Settings" data-copyicon="true">
                                                                <span class="step-name"><i class="uil uil-print"></i> Printer Settings</span>
                                                                <div class="step-summary"></div>
                                                                <button type="button" class="reset-step" title="Reset">
                                                                    <i class="icon-cancel-circle2"></i></button>
                                                            </li>
                                                            <li class="step-nav-shape" data-title="Label Shape &amp; Size" data-copyicon="true">
                                                                <span class="step-name"><i class="uil uil-text-size"></i> Shape &amp; Size</span>
                                                                <div class="step-summary"></div>
                                                                <button type="button" class="reset-step" title="Reset">
                                                                    <i class="icon-cancel-circle2"></i></button>
                                                            </li>
                                                            <li class="step-nav-material" data-title="Label Material" data-copyicon="true">
                                                                <span class="step-name"><i class="uil uil-picture"></i> Label Material</span>
                                                                <div class="step-summary"></div>
                                                                <button type="button" class="reset-step" title="Reset">
                                                                    <i class="icon-cancel-circle2"></i></button>
                                                            </li>
                                                            <li class="step-nav-quantity" data-title="Success! Now let's get you some numbers..." data-copyicon="true">
                                                                <span class="step-name"><i class="uil uil-calculator-alt"></i> Finalize</span>
                                                                <div class="step-summary"></div>
                                                            </li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </aside>
                                            <div class="body-pane block-container">
                                                <div class="get-a-quote visually-hidden mb-4">
                                                    <button class="quote btn btn-primary">Request price/consultation</button>
                                                </div>
                                                <div class="title-bar"><h3 class="step-form-header"></h3></div>
                                                <div class="block-content">
            <!--                                        <form method="post" action="https://texaslabelprinters.com/wp-json/hlc/v1/add-roll-label" class="mb-form" data-notify="false" data-reset="0" data-nonce="0de36d133b">-->
                                                    <form method="post" action="/" class="mb-form" data-notify="false" data-reset="0" data-nonce="0de36d133b">
                                                        <div class="step-window">
                                                            <div class="step-content">
                                                                <div class="step printer" data-alias="printer">
                                                                    <div class="sub-step printer-setup">
                                                                        <h3>Select Your Printer and Setup</h3>
                                                                        <div class="printer-search active">
                                                                            <div class="printer-form clearfix">
                                                                                <div class="mb-form mb-form-columns mb-colset">
                                                                                    <div class="row">
                                                                                        <div class="col-md-6">
                                                                                            <label class="label w-100">
                                                                                                <span class="form-label">Manufacturer</span>
                                                                                                <input class="select2ajax" type="hidden"
                                                                                                       name="printer_manufacturer"
                                                                                                       data-action="https://api.hickmanlabel.com/printer_manufacturer/select2_option"
                                                                                                       data-displayfield="name"
                                                                                                       data-valuefield="id"
                                                                                                       data-schema="select2_option"
                                                                                                       data-allowclear="1" data-customman="1133">
                                                                                            </label>
                                                                                        </div>
                                                                                        <div class="col-md-6">
                                                                                            <label class="label w-100">
                                                                                                <span class="form-label">Model</span>
                                                                                                <input class="select2ajax" type="hidden"
                                                                                                       name="order_item_data[printer][id]"
                                                                                                       data-action="https://api.hickmanlabel.com/printer"
                                                                                                       data-displayfield="model"
                                                                                                       data-valuefield="id"
                                                                                                       data-schema="select2_option?with_man=1"
                                                                                                       data-allowclear="1"> </label>

                                                                                        </div>
                                                                                        <div class="col-md-6">
                                                                                            <label class="label w-100">
                                                                                                <span class="form-label">Process</span>
                                                                                                <select class="select2 "
                                                                                                        name="type"
                                                                                                >
                                                                                                    <option
                                                                                                            value=""
                                                                                                    ></option>
                                                                                                    <option
                                                                                                            value="Inkjet"
                                                                                                    > Inkjet
                                                                                                    </option>
                                                                                                    <option
                                                                                                            value="Laser"
                                                                                                    > Laser
                                                                                                    </option>
                                                                                                </select> </label>
                                                                                        </div>
                                                                                        <div class="col-md-6">
                                                                                            <label class="label w-100">
                                                                                                <span class="form-label">Roll Diameter</span>
                                                                                                <select class="select2 "
                                                                                                        name="diameter"
                                                                                                >
                                                                                                    <option
                                                                                                            value=""
                                                                                                    ></option>
                                                                                                    <option
                                                                                                            value="2x4"
                                                                                                    > 2&quot; core, 4&quot; outside
                                                                                                    </option>
                                                                                                    <option
                                                                                                            value="2x5"
                                                                                                    > 2&quot; core, 5&quot; outside
                                                                                                    </option>
                                                                                                    <option
                                                                                                            value="3x6"
                                                                                                    > 3&quot; core, 6&quot; outside
                                                                                                    </option>
                                                                                                    <option
                                                                                                            value="3x8"
                                                                                                    > 3&quot; core, 8&quot; outside
                                                                                                    </option>
                                                                                                </select> </label>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                                <div class="label">
<!--                                                                                    <button type="button" class="btn show-custom-printer">My Printer Isn&#039;t Listed</button>-->
                                                                                    <a href='javascript:void(0);' class=" show-custom-printer">My Printer Isn&#039;t Listed</a>
                                                                                </div>
                                                                            </div>
                                                                            <div class="manufacturer-grid-container card-deck">
<!--                                                                                <div class="manufacturer-grid printer-step-grid mb-update mb-colset clearfix" data-filter="order=name" data-action="https://api.hickmanlabel.com/printer_manufacturer/grid"></div>-->
                                                                                <div class="manufacturer-grid printer-step-grid mb-update mb-colset clearfix" data-filter="order=name" data-action="https://<?php echo $site_domain;?>/labels/api/manufacturers"></div>
                                                                                <p class="manufacturer-disclaimer">Our products are compatible with the referenced products and technology of the following brands listed above this notice. All product and company names listed above are trademarks&trade; or registered&reg; trademarks of their respective holders and owners. Any use of these marks on this website does not imply any affiliation with or endorsement by them, unless otherwise noted.</p>
                                                                            </div>
<!--                                                                            <div class="printer-grid printer-step-grid mb-update mb-colset clearfix row" data-filter="order=name" data-action="https://api.hickmanlabel.com/printer/grid"></div>-->
                                                                            <div class="printer-grid printer-step-grid mb-update mb-colset clearfix card-deck" data-filter="order=name" data-action="https://<?php echo $site_domain;?>/labels/api/printers">Loading....</div>
                                                                        </div>
                                                                        <div class="custom-printer">
                                                                            <input type="hidden" class="custom-printer-type" name="order_item_data[printer][type]" value="">
                                                                            <input type="hidden" class="use-custom-printer" name="order_item_data[printer][use_custom]" value="0">
                                                                            <div class="printer-form clearfix">
                                                                                <p>Please provide more information about your printer:</p>
                                                                                <div class="mb-form mb-form-columns mb-colset">
                                                                                    <label class="label col col-4 required">
                                                                                        <span class="form-label">Manufacturer</span>
                                                                                        <input
                                                                                                class="custom-printer-manufacturer required"
                                                                                                type="text"
                                                                                                name="order_item_data[printer][custom_manufacturer_name]"
                                                                                        > </label>
                                                                                    <label class="label col col-4 required">
                                                                                        <span class="form-label">Model</span> <input
                                                                                                class="custom-printer-model required"
                                                                                                type="text"
                                                                                                name="order_item_data[printer][model]"
                                                                                        > </label>
                                                                                    <label class="label col col-4 required">
                                                                                        <span class="form-label">Process</span>
                                                                                        <select class="select2  custom-printer-type required"
                                                                                                name="order_item_data[printer][type]"
                                                                                        >
                                                                                            <option
                                                                                                    value=""
                                                                                            ></option>
                                                                                            <option
                                                                                                    value="Inkjet"
                                                                                            > Inkjet
                                                                                            </option>
                                                                                            <option
                                                                                                    value="Laser"
                                                                                            > Laser
                                                                                            </option>
                                                                                        </select> </label>
                                                                                    <label class="label col col-4 required">
                                                                                        <span class="form-label">Roll Diameter</span>
                                                                                        <select class="select2  custom-printer-diameter required"
                                                                                                name="order_item_data[printer][diameter]"
                                                                                        >
                                                                                            <option
                                                                                                    value=""
                                                                                            ></option>
                                                                                            <option
                                                                                                    value="2x4"
                                                                                            > 2&quot; core, 4&quot; outside
                                                                                            </option>
                                                                                            <option
                                                                                                    value="3x6"
                                                                                            > 3&quot; core, 6&quot; outside
                                                                                            </option>
                                                                                            <option
                                                                                                    value="3x8"
                                                                                            > 3&quot; core, 8&quot; outside
                                                                                            </option>
                                                                                        </select> </label></div>
                                                                                <div class="label custom-printer-actions">
                                                                                    <button type="button" class="btn show-printer-list text-start">Back to Printer Search</button>
                                                                                    <button type="button" class="btn next-step text-end">Back to Printer Search</button>
                                                                                    <p>
                                                                                        <em>Not sure about your printer dimensions? Contact our support team and we&#039;ll be happy to help.</em>
                                                                                    </p></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="step shape" data-alias="shape">
                                                                    <div class="sub-step shape"><h3>Step 1: Select Your Label Shape</h3>
                                                                        <div class="label-shapes mb-colset clearfix">
                                                                            <button type="button" data-value="Rounded Corners" class="col col-6">
                                                                                <span class="shape-img"><img src="https://api.hickmanlabel.com/images/product_roll_label/rectangle-rounded-sm.svg" width="108" height="108" alt="Rounded Corners"></span>
                                                                                <span class="shape-title">Squares &amp; Rectangles with ROUNDED Corners</span>
                                                                            </button>
                                                                            <button type="button" data-value="Oval" class="col col-6">
                                                                                <span class="shape-img"><img src="https://api.hickmanlabel.com/images/product_roll_label/oval-sm.svg" width="108" height="108" alt="Oval"></span>
                                                                                <span class="shape-title">Ovals</span></button>
                                                                            <button type="button" data-value="Circle" class="col col-6">
                                                                                <span class="shape-img"><img src="https://api.hickmanlabel.com/images/product_roll_label/circle-sm.svg" width="108" height="108" alt="Circle"></span>
                                                                                <span class="shape-title">Circles</span></button>
                                                                            <button type="button" data-value="Continuous" class="col col-6">
                                                                                <span class="shape-img"><img src="https://api.hickmanlabel.com/images/product_roll_label/continuous-sm.svg" width="108" height="108" alt="Continuous"></span>
                                                                                <span class="shape-title">Continuous</span></button>
                                                                            <button type="button" data-value="Rectangle" class="col col-6">
                                                                                <span class="shape-img"><img src="https://api.hickmanlabel.com/images/product_roll_label/rectangle-sm.svg" width="108" height="108" alt="Squares and Rectangles"></span>
                                                                                <span class="shape-title">Squares &amp; Rectangles with SQUARE Corners</span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div class="sub-step size"><h3>Step 2: Select Your Label Size</h3>
                                                                        <div class="size-choose-fixed-height clearfix">
                                                                            <div class="size-choose">
                                                                                <div class="mb-form clearfix"><h4>Filter Sizes</h4>
                                                                                    <label class="label clearfix width">
                                                                                        <span class="form-label">Width</span>
                                                                                        <input type="text" name="label_width" placeholder="Label Width">
                                                                                        <button type="button" class="reset-input" tabindex="500">
                                                                                            <i class="icon-cancel-circle2"></i>
                                                                                        </button>
                                                                                    </label> <label class="label clearfix length">
                                                                                        <span class="form-label">Length</span>
                                                                                        <input type="text" name="label_length" placeholder="Label Length">
                                                                                        <button type="button" class="reset-input" tabindex="501">
                                                                                            <i class="icon-cancel-circle2"></i>
                                                                                        </button>
                                                                                    </label></div>
                                                                            </div>
                                                                            <div class="size-selector-area">
                                                                                <div class="hover-info">
                                                                                    <div class="size-grid-tooltip">Click or hover over a size on the right for more details.</div>
                                                                                </div>
<!--                                                                                <div class="size-grid mb-update mb-colset clearfix" data-action="https://api.hickmanlabel.com/roll_label_size/size_grid"></div>-->
                                                                                <div class="size-grid mb-update mb-colset clearfix" data-action="https://<?php echo $site_domain;?>/labels/api/size_grid"></div>
                                                                            </div>
                                                                            <div class="size-diagram">
<!--                                                                                <button type="button" class="btn close-diagram"> Back</button>-->
<!--                                                                                <button type="button" class="btn next-diagram"> Next</button>-->
                                                                                <div class="roll-diagram"></div>
                                                                                <div class="label-stats"></div>
                                                                                <fieldset class="label-customizations form-fields">
                                                                                    <label class="label labels-per-row form-col-4">
                                                                                        <span class="form-label">Labels per Row</span>
                                                                                        <input type="number" min="1" max="10" step="1" name="labels_per_row">
                                                                                    </label>
                                                                                    <label class="label perforations form-col-4">
                                                                                        <span class="form-label">Perforations</span>
                                                                                        <select name="perforations">
                                                                                            <option value="">No perforations</option>
                                                                                            <option value="1">Perforated</option>
                                                                                        </select> </label>
                                                                                    <label class="label timing-marks form-col-4">
                                                                                        <span class="form-label">Timing Marks</span>
                                                                                        <select name="timing_marks">
                                                                                            <option value="">No timing marks</option>
                                                                                            <option value="1">Include black timing marks</option>
                                                                                        </select>
                                                                                        <span class="form-help">Note: the minimum quantity for rolls with timing marks is 3. If you aren&#039;t sure if you need timing marks, please contact us!</span>
                                                                                    </label> <label class="label matrix form-col-4">
                                                                                        <span class="form-label">Matrix</span>
                                                                                        <span class="form-help">Waste material around labels</span>
                                                                                        <select name="matrix">
                                                                                            <option value="">Off</option>
                                                                                            <option value="1">On</option>
                                                                                        </select> </label></fieldset>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="step material" data-alias="material">
                                                                    <div class="sub-step material">
                                                                        <div class="material-list mb-update clearfix mb-colset colset-2" data-action="https://api.hickmanlabel.com/schema/label_material/product_information_summary" data-filter="accounts_account_id=138605" data-accept="html"></div>
                                                                    </div>
                                                                </div>
                                                                <div class="step quantity" data-alias="quantity">
            <!--                                                        <div class="sub-step quantity-information mb-update" data-action="https://api.hickmanlabel.com/schema/roll_label_quote/quantity_information"></div>-->
                                                                    <div class="sub-step quantity-information mb-update visually-hidden" data-action="https://<?php echo $site_domain;?>/labels/api/quantity-adjust"></div>
                                                                    <div class="sub-step product-information mb-update" data-action="https://api.hickmanlabel.com/schema/roll_label_quote/product_information"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="status-bar clearfix">
                                                            <div class="previous text-start" style="display: none;">
                                                                <div class="status text-muted">Back</div>
                                                                <button type="button" class="btn prev-step">Previous Step</button>
                                                            </div>
                                                            <div class="next text-end">
                                                                <div class="status text-muted">Continue</div>
                                                                <button type="button" class="btn next-step">Next Step</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </section>

                                    </div>
                                </header>
                            </main>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </article>
    </div>

    <script>
        let show_quantity = false;
    </script>
<?php

$_SESSION['_flashcss']=[];
$_SESSION['_flashcss'][] = "/assets/styles/labels.css?ver=5.12.3";
$_SESSION['_flashcss'][] = "/assets/styles/labels-custom.css";


$_SESSION['_flashscripts']=[];
$_SESSION['_flashscripts'][] = "/assets/js/labels.js";
$_SESSION['_flashscripts'][] = "/assets/js/labels-custom.js";
?>

<script>
    // $(window).off("throttledresize");
</script>
