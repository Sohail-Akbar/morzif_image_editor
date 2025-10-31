<?php
session_start();
if (!defined('DIR')) define('DIR', './');
if (!defined('_DIR_')) define('_DIR_', DIR);
require_once("inc/database.php");
require_once "Classes/TCFunctions.php";
require_once "Classes/TCEmails.php";
require_once "Classes/TCExtension.php";
require_once _DIR_ . "vendor/autoload.php";
$timestamp = date('Y-m-d h:i:s');

$VERIFY_LOGIN = isset($VERIFY_LOGIN) ? $VERIFY_LOGIN : false;

define('LOGGED_IN_USER', login_user([
	'session_key' => 'user_id',
	'user_table' => 'users'
]));
define('LOGGED_IN_USER_ID', LOGGED_IN_USER ? LOGGED_IN_USER['id'] : null);

if (!is_null(LOGGED_IN_USER) && $VERIFY_LOGIN)
	redirectTo('user/dashboard');

define('IS_ADMIN', is_admin());
