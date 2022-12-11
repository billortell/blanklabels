<?php
namespace Site;

use \GuzzleHttp\Client;
use \RedBeanPHP\R as R;
use \DOMDocument;
use Flight;

class Site {

    public function __construct()
    {
        $this->setup();
    }


    protected function setup()
    {
        Flight::route('/faq', function () {
            Flight::render($this->getViewFolder().'faq', [], 'body_content');
            Flight::render('layout');
        });

        Flight::route('/about-us', function () {
            Flight::render($this->getViewFolder().'about-us', [], 'body_content');
            Flight::render('layout');
        });

        Flight::route('/contact-us', function () {
            Flight::render($this->getViewFolder().'contact-us', [], 'body_content');
            Flight::render('layout');
        });

        Flight::route('/privacy', function () {
            Flight::render($this->getViewFolder().'privacy', [], 'body_content');
            Flight::render('layout');
        });

        Flight::route('/terms', function () {
            Flight::render($this->getViewFolder().'terms', [], 'body_content');
            Flight::render('layout');
        });

        Flight::route('/data-retention', function () {
            Flight::render($this->getViewFolder().'data-retention', [], 'body_content');
            Flight::render('layout');
        });

    }

    protected function getViewFolder()
    {
        return dirname(__FILE__).'/views/';
    }
}


