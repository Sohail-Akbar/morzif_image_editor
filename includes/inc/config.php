<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
mysqli_report(MYSQLI_REPORT_STRICT);

require_once "env.php";

define("SITE_NAME", "Image Editor");
define("SITE_EMAIL", "info@naxotop.com");
define("CONTACT_EMAIL", "info@naxotop.com");


define('EMAILS', [
    'forgotEmail' => [
        'filename' => 'forgotEmail.html',
        'subject' => 'We received request to reset the password of your account'
    ],
    'verifyEmail' => [
        'filename' => 'verifyEmail.html',
        'subject' => 'Please Verify Your email'
    ],
    'contactEmail' => [
        'filename' => 'contactEmail.html',
        'subject' => 'You Recieved a New Message'
    ]
]);

define('MAILJET_API_KEY', '8267603df732b3d3b1bab7eaa41e17d8');
define('MAILJET_SECRET_KEY', 'ff1ddfa26987f3316926a4aece98277f');
define('MAILJET_EMAIL', SITE_EMAIL);

$CSS_FILES_ = [];
$JS_FILES_ = [];
define('ASSETS_V', "?v=" . (ENV === 'prod' ? '1.9' : time()));
// work space color
$WORKSPACE_THEME = isset($_COOKIE['workSpaceColor']) ? $_COOKIE['workSpaceColor'] : "";
