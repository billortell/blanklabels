<?php

use \RedBeanPHP\R as R;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
use GuzzleHttp\Psr7\Request;
use Underscore\Types\Arrays;
use \JsonMachine\Items;

//-- csv parser
use League\Csv\Reader;
use League\Csv\Statement;

//-- custom psr4
use Extra\Extra;
use Site\Site;


//--------------

ini_set('display_errors', 1);
ini_set('max_execution_time', 3600);
ini_set('file_uploads', 1);
ini_set('post_max_size', '100M');
ini_set('memory_limit', '256M');


//------ cors bypass ----

//error_reporting(E_ERROR | E_PARSE | E_ALL);
error_reporting(E_ERROR | E_PARSE);

setlocale(LC_MONETARY, 'en_US');
date_default_timezone_set('America/Detroit');

session_start();
require_once('../vendor/autoload.php');

Flight::set('flight.handle_errors', 1);
Flight::set('flight.views.path', getcwd().'/views');

//---------------------------------------------

$host = !empty($_SERVER['HTTP_X_ORIGINAL_HOST']) ? $_SERVER['HTTP_X_ORIGINAL_HOST'] : $_SERVER['HTTP_HOST'];
define('SITE_DOMAIN', $host);
define('SITE_DOMAIN_HTTP', strtolower($_SERVER['REQUEST_SCHEME']) . "://" . SITE_DOMAIN);
define('SITE_TITLE', "Blank Printer Labels");
define('SITE_DESCRIPTION', "Get your commercial blank printer labels at best possible prices.");

$live = SITE_DOMAIN == "blankprinterlabels.com";
// $live = false;
define('SITE_LIVE', $live);

//---------------------------------------------

Flight::view()->set('title', SITE_TITLE . ' :: ' . SITE_DOMAIN);
Flight::view()->set('site_description', SITE_DESCRIPTION);
Flight::view()->set('sitename', SITE_TITLE);
Flight::view()->set('copyright', "&copy Copyright - " . Flight::view()->get('sitename') . ", 2022");
Flight::view()->set('base_url', SITE_DOMAIN_HTTP);
Flight::view()->set('meta_title', 'Site title');
Flight::view()->set('meta_image', SITE_DOMAIN_HTTP . "/assets/images/pokeball-480.png");
Flight::view()->set('meta_image_width', 480);
Flight::view()->set('meta_image_height', 480);

//---------------------------------------------

Flight::route('/', function (){
    $content = "Main page!";
    Flight::render('body', [
        'body_content' => $content,
    ], 'body_content');
    Flight::render('layout');
});

Flight::map('pre', function ($var, $title = '') {
    if (!empty($title)) {
        echo "<h3>$title</h3>";
    }
    echo "<pre>";
    print_r($var);
    echo "</pre>";
});

//--------- extend use -------------------

//--------- db/auth stuff ----------------


//----------- generic site pages ---------

//----------- generic ajax request  ---------

Flight::route('/ajax/request', function () {
    $request = Flight::request();
    if (!$request->ajax) {
        Flight::notFound();
        exit();
    }
});

Flight::route('/rest/v1/action(/@override)', function ($override) {
    $auth = Flight::get('auth');
    $request = Flight::request();

    /**
     * make sure they're using ajax|xhr request
     */
    if (empty($override) && !$request->ajax) {
        Flight::halt(503, "Unauthorized");
        exit();
    }

    /**
     * make sure they're logged in
     */
    if (!$auth->isLoggedIn()) {
        /* @todo create json error */
        Flight::halt(500, "You're not logged in.");
        exit();
    }

    try {
        $message = "All good!";
        $resultArr = ["status" => "success", "message" => $message];
    } catch (Exception $e) {
        $resultArr = ["status" => "error", "message" => $e->getMessage()];
    }

    header('Content-Type: application/json');
    echo json_encode(array("response" => $resultArr), JSON_NUMERIC_CHECK);
    exit();
});

//----------- errors ---------

Flight::map('notFound', function () {
    Flight::render('not-found', [], 'body_content');
    Flight::render('default-page', [
        'title' => "Uh, what?",
        'content' => "Not sure how you got here, but... meh - you did.  But now what?"
    ], 'body_content');
    Flight::render('layout');
    exit();
});

Flight::map('error', function ($ex) {
    // Handle error
    echo "<p>" . $ex->getMessage() . "</p>";
    echo "<pre>";
    echo $ex->getTraceAsString();
    echo "</pre>";
});

//----------- php info ---------

Flight::route('/info', function () {
    $auth = Flight::get('auth');
    $userid = $auth->getUserId();
    if ( $userid != 21 ) {
        Flight::notFound();
    }
    phpinfo();
    echo "<hr/>";
    echo exec('whoami');


});


//----------- delight-auth ------

$loggedin_override = true;

Flight::map('isLoggedIn-Old', function () {
    $auth = Flight::get('auth');
    if (!$auth->isLoggedIn() ) {
        $_SESSION['_flashdata'] = [];
        $_SESSION['_flashdata'][] = "You must be logged in to use this feature.";
        $_SESSION['_flashredirect'] = $_SERVER['REQUEST_URI'];

        Flight::redirect("/login");
        exit();
    }
});

Flight::map('isLoggedIn', function () use ($loggedin_override) {
    $auth = Flight::get('auth');
    if (!$auth->isLoggedIn()) {
        $_SESSION['_flashdata'] = [];
        $_SESSION['_flashdata'][] = "You must be logged in to use this feature.";
        $_SESSION['_flashredirect'] = $_SERVER['REQUEST_URI'];

        Flight::redirect("/login");
        exit();
    }
});

Flight::map('isLoggedInSimple', function () {
    $auth = Flight::get('auth');
    return $auth->isLoggedIn();
});



// ---------- custom (auth) ------

$dbName = "pokevalu_labels";
$dbUsername = 'pokevalu_labels';
$dbPassword = 'WEOsmo123!@#';

$http_host_with_port = $_SERVER['HTTP_HOST'];
$http_host = current(explode(":", $http_host_with_port));
$port = $http_host == "localhost.labels" ? ":9999" : "";
$port = stripos($http_host,"localhost") !== false ? ":9999" : "";

//  ngrok http localhost.labels:80 -host-header="localhost.labels:80"
//  ssh -L 127.0.0.1:9999:127.0.0.1:3306 pokevalu@pokevaluation.com -p 7822
R::setup('mysql:host=localhost' . $port . ';dbname=' . $dbName, $dbUsername, $dbPassword);
R::usePartialBeans(TRUE);

$isConnected = R::testConnection();
if (!$isConnected) {
    throw new Exception("Database is not connected properly.");
}


//----------- custom ------------

$extra = new Extra();

$extra = new Site();

//class Auth {
//    public function __construct() {
//
//    }
//    public function isLoggedIn() {
//        return true;
//    }
//}

/**
 * need domain registered
 * need smtp email for that domain (verified/validated)
 * need this in order to get it integrated with registration stuff
 */
$db = R::getDatabaseAdapter()->getDatabase()->getPDO();
//$auth = new \Delight\Auth\Auth($db, null, 'pa_', FALSE, 15);
$auth = new \Auth\Auth($db);
Flight::set('auth', $auth->getAuth());
Flight::view()->set('auth', $auth->getAuth());

//$auth = new \Delight\Auth\Auth($db, null, 'pa_', FALSE, 15);
//Flight::set('auth', $auth);
//Flight::view()->set('auth', $auth);

//----------- custom ------------

/***
 *
 * pre-seed database tables
 *
 */
//if (R::count('buylist') <= 0) {
//    R::fancyDebug(FALSE);
//    $setupRecord = R::dispense('buylist');
//    $setupRecord->bl_source = 'text';
//    $setupRecord->bl_cardname = 'texttexttexttext';
//    $setupRecord->bl_cardnofull = 'text';
//    $setupRecord->bl_cardno = 'text';
//    $setupRecord->bl_setname = 'text';
//    $setupRecord->bl_setno = 1;
//    $setupRecord->bl_type = 'text';
//    $setupRecord->bl_printing_name = 'text';
//    $setupRecord->bl_limit = 1;
//    $setupRecord->bl_price = 1001.12;
//    $setupRecord->bl_credit = 1001.12;
//    $setupRecord->bl_updated = "2021-03-26 11:41:18PM";
//    $setupRecord->bl_day = "2021-03-26";
//    $setupRecord->bl_islatest = 1;
//    R::store($setupRecord);
//    R::trash($setupRecord);
//}


Flight::start();
