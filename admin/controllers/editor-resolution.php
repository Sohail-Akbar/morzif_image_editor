<?php
define('DIR', '../');
require_once('../includes/db.php');


// add Editor Resolutions
if (isset($_POST['addEditorResolutions'])) {
    $title = _POST('title');
    $height = _POST('height');
    $width = _POST('width');
    $icon = _POST('icon');
    $category_id = _POST('category_id');


    $dbData = [
        "title" => $title,
        "height" => $height,
        "width" => $width,
        "icon" => $icon,
        "category_id" => $category_id,
    ];

    $insert = $db->insert('editor_resolutions', $dbData);
    if ($insert) {
        echo success("Data Saved Successfully!", ["redirect" => ""]);
    }
}


// update Editor Resolutions
if (isset($_POST['updateEditorResolutions'])) {
    $id = _POST('id', ["default" => ""]);
    $title = _POST('title');
    $height = _POST('height');
    $width = _POST('width');
    $icon = _POST('icon');
    $category_id = _POST('category_id');


    $dbData = [
        "title" => $title,
        "height" => $height,
        "width" => $width,
        "icon" => $icon,
        "category_id" => $category_id,
    ];

    $update = $db->update('editor_resolutions', $dbData, [
        "id" => $id,
    ]);
    if ($update) {
        echo success("Data Saved Successfully!", ["redirect" => ""]);
    }
}
