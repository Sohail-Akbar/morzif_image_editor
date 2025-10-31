<?php
define('DIR', '../');
require_once('../includes/db.php');
require_once _DIR_ . "includes/Classes/TCDelete.php";

$_delete->set([
	'user' => 'users',
	'categorie' => 'categories',
	'template' => 'templates',
	'shapes' => 'shapes',
	'editor_fonts' => 'editor_fonts',
]);

$_delete->init();
