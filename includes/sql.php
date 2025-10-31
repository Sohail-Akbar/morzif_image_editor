<?php
define('_DIR_', '../');
require_once "db.php";
// Folders
@mkdir('../images/users');
@mkdir('../images/editor-image');
@mkdir('../images/shapes');
@mkdir('../extensions/temp/');
// Check if action is already done
function _is($type)
{
    global $db;
    $data = $db->select_one("meta_data", "id", [
        "meta_key" => "tmp_scripts",
        "meta_value" => $type
    ]);
    if ($data) return false;
    $db->insert('meta_data', [
        'meta_key' => 'tmp_scripts',
        'meta_value' => $type
    ]);
    return true;
}

// Meta Data Table
$db->query("CREATE TABLE IF NOT EXISTS `meta_data` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `meta_key` varchar(250) NOT NULL,
    `meta_value` varchar(250) NOT NULL,
    `meta_json` text NOT NULL,
    `time` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB;");
// DB Tables
if (_is("install_db_tables")) {
    $db->query("CREATE TABLE IF NOT EXISTS `users` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `fname` varchar(250) NOT NULL,
        `lname` varchar(250) NOT NULL,
        `name` varchar(250) NOT NULL,
        `email` varchar(250) NOT NULL,
        `image` varchar(250) NOT NULL,
        `password` varchar(250) NOT NULL,
        `is_admin` tinyint(1) NOT NULL DEFAULT 0,
        `verify_status` int(1) NOT NULL DEFAULT 0,
        `verify_token` varchar(250) NOT NULL,
        `password_forgot_token` varchar(250) NOT NULL,
        `token_expiry_date` timestamp NULL DEFAULT NULL,
        `date_added` timestamp NOT NULL DEFAULT current_timestamp(),
        `uid` varchar(250) NOT NULL,
        PRIMARY KEY (`id`)
      ) ENGINE=InnoDB;");
}
// categories
$db->query('CREATE TABLE `categories` (`id` INT NOT NULL AUTO_INCREMENT , `title` VARCHAR(250) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;');
$db->query('ALTER TABLE `categories` ADD `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `title`;');
$db->query('CREATE TABLE `categories_data` (`id` INT NOT NULL AUTO_INCREMENT , `title` VARCHAR(250) NOT NULL , `discription` TEXT NOT NULL , `editor_data` TEXT NOT NULL , `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;');
$db->query('ALTER TABLE `categories_data` ADD `category_id` INT NOT NULL AFTER `editor_data`;');
$db->query('ALTER TABLE `categories_data` ADD `image` VARCHAR(250) NOT NULL AFTER `category_id`;');

$db->query("CREATE TABLE `shapes` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(250) NOT NULL,
    `image` varchar(250) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
   ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4");

$db->query("ALTER TABLE `categories` ADD `type` VARCHAR(250) NOT NULL AFTER `title`;");

$db->query("ALTER TABLE `categories` ADD `sub_type` VARCHAR(250) NOT NULL AFTER `type`;");

$db->query("CREATE TABLE `editor_resolutions` (`id` INT NOT NULL AUTO_INCREMENT , `title` VARCHAR(250) NOT NULL , `width` INT NOT NULL , `height` INT NOT NULL , `icon` VARCHAR(250) NOT NULL , `category_id` INT NOT NULL , `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;");
$db->query("ALTER TABLE `categories` ADD `uid` VARCHAR(100) NULL DEFAULT NULL");
$db->query("CREATE TABLE `editor_fonts` (`id` INT NOT NULL AUTO_INCREMENT , `url` VARCHAR(250) NOT NULL , `style` VARCHAR(250) NOT NULL , `name` VARCHAR(250) NOT NULL , `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;");
// Rename categories_data to templates
if (_is("rename_categories_data_to_templates")) {
    $db->query("ALTER TABLE `categories_data` RENAME TO `templates`");
}
// categories meta data column
if (_is("categories_meta_data_column")) {
    $db->query("ALTER TABLE `categories` ADD `meta_data` TEXT NOT NULL AFTER `sub_type`");
}
// shapes category_id
if (_is('shapes_category_id')) {
    $db->query("ALTER TABLE `templates` ADD `credits` TEXT NOT NULL AFTER `image`;");
    $db->query("ALTER TABLE `shapes` ADD `category_id` INT NOT NULL AFTER `image`");
}
if (_is("templates_editor_data_type_long_text")) {
    $db->query("ALTER TABLE `templates` CHANGE `editor_data` `editor_data` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;");
}
