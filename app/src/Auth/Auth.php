<?php
namespace Auth;

use \Delight\Auth\Auth as DA;
use RedBeanPHP\R;
use Flight;

class Auth {

    protected $locked = FALSE;
    protected $auth = null;
    protected $prefix = 'pa_';

    public function __construct($db)
    {
        $this->setup();

        // set + return delight auth
        $dbauth = new DA($db, null, $this->prefix, FALSE, 15);
        $this->setAuth($dbauth);
        return $this->getAuth();
    }

    public function isLoggedIn() {
        return true;
    }

    protected function setup()
    {
        /**
         * auth component
         */
        Flight::route('GET /register', function () {
            Flight::render($this->getViewFolder().'register', [], 'body_content');
            Flight::render('layout');
        });


        /**
         * auth component
         */
        Flight::route('POST /register', function () {
            $auth = Flight::get('auth');
            try {
                if (REQUIRE_EMAIL_VERIFICATION) {
                    $callback = function ($selector, $token) {

                        /** send verification email */
                        $email = $_POST['email'];

                        $mgHelper = Flight::get('mgh');
                        $mgHelper->setupEmail();
                        $mgHelper->setEmail($email);
                        $mgHelper->setSubject('Please verify your email...');

                        // get body
                        /* @todo include short welcome message */
                        ob_start();
                        $verification_link = SITE_DOMAIN_HTTP . '/verify_email?selector=' . \urlencode($selector) . '&token=' . \urlencode($token);
//                Flight::render('verification-email', array('verification_link' => $verification_link));
                        Flight::render('email/email-verify-email', array('verification_link' => $verification_link));
                        $body = ob_get_clean();

                        $mgHelper->setBody($body);

                        $response = $mgHelper->sendEmail();

                    };
                } else {
                    $callback = null;
                }
                if (!REQUIRE_UNIQUE_USERNAME) {
                    $user_id = $auth->register($_POST['email'], $_POST['password'], $_POST['username'], $callback);
                    /** assign some role(s)*/
                    try {
                        $auth->admin()->addRoleForUserById($user_id, \Delight\Auth\Role::CONSUMER);
//                $auth->admin()->removeRoleForUserById($user_id, \Delight\Auth\Role::ADMIN);
                    } catch (\Delight\Auth\UnknownIdException $e) {
                        /** @todo - send admin emial if this fails */
                        // mail()
                    }
                } else {
                    $user_id = $auth->registerWithUniqueUsername($_POST['email'], $_POST['password'], $_POST['username'], $callback);
                }
            } catch (\Delight\Auth\InvalidEmailException $e) {
                $_SESSION['_flashdata'][] = 'invalid email address';
            } catch (\Delight\Auth\InvalidPasswordException $e) {
                $_SESSION['_flashdata'][] = 'invalid password';
            } catch (\Delight\Auth\UserAlreadyExistsException $e) {
                $_SESSION['_flashdata'][] = 'email address already exists';
            } catch (\Delight\Auth\DuplicateUsernameException $e) {
                $_SESSION['_flashdata'][] = 'username already exists';
            } catch (\Delight\Auth\TooManyRequestsException $e) {
                $_SESSION['_flashdata'][] = 'too many requests';
            }

            if (is_int($user_id)) {
                Flight::redirect('/verify-check-email');
            } else {
                Flight::redirect('/register');
            }
        });


        /**
         * auth component
         */
        Flight::route('/verify-check-email', function () {
            Flight::render('default-page-center', [
                'title' => "Your turn...",
                "content" => 'Please check your email, and click the link to verify your email.'
            ], 'body_content');
            Flight::render('layout');
        });

        /**
         * auth component
         */
        Flight::route('/verification-success', function () {
            Flight::render('verification-success', [], 'body_content');
            Flight::render('layout');
        });


        /**
         * auth component
         */
        Flight::route('/verify_email', function () {
            $auth = Flight::get('auth');
            if ($_GET['selector'] || $_GET['token']) {
                try {
                    $auth->confirmEmail($_GET['selector'], $_GET['token']);
//            $auth->admin()->addRoleForUserById($auth->getUserId(), \Delight\Auth\Role::ADMIN);
                    Flight::redirect('/verification-success');
                } catch (\Delight\Auth\InvalidSelectorTokenPairException $e) {
                    $_SESSION['_flashdata'][] = 'Invalid token';
                } catch (\Delight\Auth\TokenExpiredException $e) {
                    $_SESSION['_flashdata'][] = 'Token expired';
                } catch (\Delight\Auth\UserAlreadyExistsException $e) {
                    $_SESSION['_flashdata'][] = 'Email address already exists';
                } catch (\Delight\Auth\TooManyRequestsException $e) {
                    $_SESSION['_flashdata'][] = 'Too many requests';
                }
            }
            // verify - waiting.
            Flight::render('verification-waiting', [], 'body_content');
            Flight::render('layout');
        });

        /**
         * auth component
         */
        Flight::route('GET /verification-resend', function () {
            Flight::render('verification-resend', [], 'body_content');
            Flight::render('layout');
        });


        /**
         * auth component
         */
        Flight::route('POST /verification-resend', function () {
            $auth = Flight::get('auth');
            try {
                $auth->resendConfirmationForEmail($_POST['email'], function ($selector, $token) {
                    $email = $_POST['email'];

                    $mgHelper = Flight::get('mgh');
                    $mgHelper->setupEmail();
                    $mgHelper->setEmail($email);
                    $mgHelper->setSubject('[Re-send] Please verify your email...');

                    // get body
                    /* @todo include short welcome message */
                    ob_start();
                    $verification_link = SITE_DOMAIN_HTTP . '/verify_email?selector=' . \urlencode($selector) . '&token=' . \urlencode($token);
//            Flight::render('verification-email', array('verification_link' => $verification_link));
                    Flight::render('email/email-verify-email', array('verification_link' => $verification_link));
                    $body = ob_get_clean();

                    $mgHelper->setBody($body);

                    $response = $mgHelper->sendEmail();

                    if ($response) {
                        $_SESSION['_flashdata'][] = "Verification email re-sent.";
                    } else {
                        $_SESSION['_flashdata'][] = "Verification was not re-sent.";
                    }
                });
            } catch (\Delight\Auth\ConfirmationRequestNotFound $e) {
                $_SESSION['_flashdata'][] = 'No earlier request found that could be re-sent';
            } catch (\Delight\Auth\TooManyRequestsException $e) {
                $_SESSION['_flashdata'][] = 'There have been too many requests -- try again later';
            }

            Flight::redirect('/verification-resend');
        });



        /**
         * auth component
         */
        Flight::route('GET /change-email', function () {
            Flight::isLoggedIn();
            Flight::render('change-email', [], 'body_content');
            Flight::render('layout');
        });

        /**
         * auth component
         */
        Flight::route('POST /change-email', function () {
            Flight::isLoggedIn();

            $auth = Flight::get('auth');
            try {
                /** @todo - add password confirmation before changing email */
//        $password = $auth->reconfirmPassword($_POST['password']);
                $auth->changeEmail($_POST['email'], function ($selector, $token) {

                    /** send verification email */
                    $email = $_POST['email'];

                    $mgHelper = Flight::get('mgh');
                    $mgHelper->setupEmail();
                    $mgHelper->setEmail($email);
                    $mgHelper->setSubject('Please verify your email...');

                    // get body
                    /* @todo include short welcome message */
                    ob_start();
                    $verification_link = SITE_DOMAIN_HTTP . '/verify_email?selector=' . \urlencode($selector) . '&token=' . \urlencode($token);
//            Flight::render('verification-email', array('verification_link' => $verification_link));
                    Flight::render('email/email-verify-email', array('verification_link' => $verification_link));
                    $body = ob_get_clean();

                    $mgHelper->setBody($body);

                    $response = $mgHelper->sendEmail();

                    if (!$response) {
                        $_SESSION['_flashdata'][] = "We were not able to send verification email.";
                    } else {
                        Flight::redirect('/verify-check-email');
                        exit();
                    }

                });
            } catch (\Delight\Auth\InvalidEmailException $e) {
                $_SESSION['_flashdata'][] = 'Invalid email address';
            } catch (\Delight\Auth\UserAlreadyExistsException $e) {
                $_SESSION['_flashdata'][] = 'Email address already exists';
            } catch (\Delight\Auth\EmailNotVerifiedException $e) {
                $_SESSION['_flashdata'][] = 'Account not verified';
            } catch (\Delight\Auth\NotLoggedInException $e) {
                $_SESSION['_flashdata'][] = 'Not logged in';
            } catch (\Delight\Auth\TooManyRequestsException $e) {
                $_SESSION['_flashdata'][] = 'Too many requests';
            }

            Flight::redirect('/change-email');
            exit();
        });


        /**
         * auth component
         */
        Flight::route('GET /change-password', function () {
            Flight::isLoggedIn();
            Flight::render('change-password', [], 'body_content');
            Flight::render('layout');
        });

        /**
         * auth component
         */
        Flight::route('POST /change-password', function () {
            Flight::isLoggedIn();

            $auth = Flight::get('auth');
            try {
                $errors = \AuthPasswordHelper::validate($_POST['new_password']);
                if (!empty($errors)) {
                    $_SESSION['_flashdata'] = $errors;
                } else {
                    $auth->changePassword($_POST['old_password'], $_POST['new_password']);
                    $_SESSION['_flashdata'][] = 'You have successfully updated your password.<br/>We have sent you an email for your records.';

                    // send them an email out of pure courtesy
                    $email = $auth->getEmail();

                    $mgHelper = Flight::get('mgh');
                    $mgHelper->setupEmail();
                    $mgHelper->setEmail($email);
                    $mgHelper->setSubject('Your password was reset');

                    // get body
                    ob_start();
//            Flight::render('change-password-success');
                    Flight::render('email/email-reset-password-success');
                    $body = ob_get_clean();

                    $mgHelper->setBody($body);

                    $response = $mgHelper->sendEmail();
                }
            } catch (\Delight\Auth\NotLoggedInException $e) {
                $_SESSION['_flashdata'][] = 'Not logged in';
            } catch (\Delight\Auth\InvalidPasswordException $e) {
                $_SESSION['_flashdata'][] = 'Invalid password(s)';
            } catch (\Delight\Auth\TooManyRequestsException $e) {
                $_SESSION['_flashdata'][] = 'Too many requests';
            }
            Flight::render('change-password', [], 'body_content');
            Flight::render('layout');


        });


        /**
         * auth component
         */
        Flight::route('GET /forgot-password', function () {
            Flight::render('forgot-password', [], 'body_content');
            Flight::render('layout');
        });

        /**
         * auth component
         */
        Flight::route('POST /forgot-password', function () {
            $auth = Flight::get('auth');
            try {

                /** @todo - check for hidden field parameter */
                /** if no param, then bounce them back */

                $auth->forgotPassword($_POST['email'], function ($selector, $token) {
                    $email = $_POST['email'];

                    $mgHelper = Flight::get('mgh');
                    $mgHelper->setupEmail();
                    $mgHelper->setEmail($email);
                    $mgHelper->setSubject('Please check your email...');

                    // get body
                    ob_start();
                    $verification_link = SITE_DOMAIN_HTTP . '/reset-password?selector=' . \urlencode($selector) . '&token=' . \urlencode($token);
//            Flight::render('reset-password-email', array('verification_link' => $verification_link));
                    Flight::render('email/email-reset-password', array('verification_link' => $verification_link));
                    $body = ob_get_clean();

                    $mgHelper->setBody($body);

                    $response = $mgHelper->sendEmail();
                });

                $content = 'Check your email, and click the link to reset your password.';
                $content .= "<p class='mb-4 text-danger'>
                            If you don't receive our email within 1 minute, please check your <i>promotions</i> or <i>spam/junk</i> folder
                            and mark it as <i>not spam/junk</i> for future notifications.
                        </p>";

//        Flight::render('forgot-password-success', [], 'body_content');
                Flight::render('default-page-center', [
                    'title' => "Success!",
                    "content" => $content
                ], 'body_content');
                Flight::render('layout');
                exit();
            } catch (\Delight\Auth\InvalidEmailException $e) {
                $_SESSION['_flashdata'][] = 'Invalid email address';
            } catch (\Delight\Auth\EmailNotVerifiedException $e) {
                $_SESSION['_flashdata'][] = 'Email not verified';
            } catch (\Delight\Auth\ResetDisabledException $e) {
                $_SESSION['_flashdata'][] = 'Password reset is disabled';
            } catch (\Delight\Auth\TooManyRequestsException $e) {
                $_SESSION['_flashdata'][] = 'Too many requests';
            }

            Flight::redirect('/forgot-password');
            exit();
        });

        /**
         * auth component
         */
        Flight::route('GET /reset-password-form', function () {
            $auth = Flight::get('auth');

            if (empty($_SESSION['_reset_password'])) {
                Flight::redirect('/oops');
            }

            if (empty($_SESSION['_reset_password']['selector']) || empty($_SESSION['_reset_password']['token'])) {
                Flight::redirect('/oops');
            }

            Flight::render('reset-password', [], 'body_content');
            Flight::render('layout');
        });

        /**
         * auth component
         */
        Flight::route('POST /reset-password-form', function () {
            $auth = Flight::get('auth');

            if (empty($_SESSION['_reset_password']['selector']) || empty($_SESSION['_reset_password']['token'])) {
                Flight::redirect('/oops');
            }

            try {
                $errors = \AuthPasswordHelper::validate($_POST['password']);
                if (!empty($errors)) {
                    $_SESSION['_flashdata'] = $errors;
                } else {
                    $user = $auth->resetPasswordAndSignIn($_POST['selector'], $_POST['token'], $_POST['password']);
                    unset($_SESSION['_reset_password']);
                    Flight::redirect('/reset-password-success');
                }
            } catch (\Delight\Auth\InvalidSelectorTokenPairException $e) {
                $_SESSION['_flashdata'][] = "Invalid token";
            } catch (\Delight\Auth\TokenExpiredException $e) {
                $_SESSION['_flashdata'][] = "Token expired";
            } catch (\Delight\Auth\ResetDisabledException $e) {
                $_SESSION['_flashdata'][] = "Password reset is disabled";
            } catch (\Delight\Auth\InvalidPasswordException $e) {
                $_SESSION['_flashdata'][] = "Invalid password";
            } catch (\Delight\Auth\TooManyRequestsException $e) {
                $_SESSION['_flashdata'][] = "Too many requests";
            }

            Flight::render('reset-password', [], 'body_content');
            Flight::render('layout');
        });

        Flight::route('GET /reset-password-success', function () {
            $auth = Flight::get('auth');
            Flight::render('reset-password-success', [], 'body_content');
            Flight::render('layout');
        });


        /**
         * auth component
         */
        Flight::route('GET /reset-password', function () {
            $auth = Flight::get('auth');
            if (empty($_GET['token']) || empty($_GET['selector'])) {
                $_SESSION['_flashdata'][] = "Your password reset link was not valid. Please re-try.";
                Flight::redirect('/forgot-password');
            }
            try {
                if ($auth->canResetPassword($_GET['selector'], $_GET['token'])) {
                    // set session variable
                    // store selector
                    // store token
                    $_SESSION['_reset_password'] = [
                        'selector' => $_GET['selector'],
                        'token' => $_GET['token']
                    ];
                    Flight::redirect('/reset-password-form');
                } else {
                    $_SESSION['_flashdata'][] = "Let's try this again.";
                    Flight::redirect('/forgot-password');
                }
            } catch (\Delight\Auth\InvalidSelectorTokenPairException $e) {
                die('Invalid token');
            } catch (\Delight\Auth\TokenExpiredException $e) {
                die('Token expired');
            } catch (\Delight\Auth\ResetDisabledException $e) {
                die('Password reset is disabled');
            } catch (\Delight\Auth\TooManyRequestsException $e) {
                die('Too many requests');
            }

        });

        /**
         * auth component
         */
        Flight::route('POST /reset-password', function () {
            Flight::render('reset-password', [], 'body_content');
            Flight::render('layout');
        });

        /**
         * auth component
         */
        Flight::route('GET /login', function () {
            Flight::render('login', [], 'body_content');
            Flight::render('layout');
        });

        /**
         * auth component
         */
        Flight::route('POST /login', function () {
            $auth = Flight::get('auth');
            try {
                $auth->login($_POST['email'], $_POST['password']);

                if ($_SESSION['_flashredirect']) {
                    $redirect_uri = $_SESSION['_flashredirect'];
                    unset($_SESSION['_flashredirect']);
                    Flight::redirect($redirect_uri);
                    exit();
                }

                // else, send them to the main page (eg. dashboard, etc.)
                Flight::redirect('/');
                exit();
            } catch (\Delight\Auth\InvalidEmailException $e) {
                $_SESSION['_flashdata'][] = 'Wrong email address.';
            } catch (\Delight\Auth\InvalidPasswordException $e) {
                $_SESSION['_flashdata'][] = 'Wrong password.';
            } catch (\Delight\Auth\EmailNotVerifiedException $e) {
                $_SESSION['_flashdata'][] = 'Email not verified.';
            } catch (\Delight\Auth\TooManyRequestsException $e) {
                $_SESSION['_flashdata'][] = 'Too many requests.';
            }

            Flight::redirect('/login');
        });

        /**
         * auth component
         */
        Flight::route('/logout', function () {

            $auth = Flight::get('auth');

            try {
                $auth->logOutEverywhere();
            } catch (\Delight\Auth\NotLoggedInException $e) {
                $_SESSION['_flashdata'][] = 'Not logged in';
            }

            Flight::redirect("/login");
        });

    }



    /**
     * @return bool
     */
    public function getLocked()
    {
        return $this->locked;
    }

    /**
     * @param bool $locked
     * @return Auth
     */
    public function setLocked($locked)
    {
        $this->locked = $locked;
        return $this;
    }

    /**
     * @return null
     */
    public function getAuth()
    {
        return $this->auth;
    }

    /**
     * @param null $auth
     * @return Auth
     */
    public function setAuth($auth)
    {
        $this->auth = $auth;
        return $this;
    }

    protected function getViewFolder()
    {
        return dirname(__FILE__).'/views/';
    }


}