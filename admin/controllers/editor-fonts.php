<?php
define('DIR', '../');
require_once('../includes/db.php');


// add Editor fonts
if (isset($_POST['addEditorFonts'])) {
    $url = _POST('url');
    $style = _POST('style');
    $name = _POST('name');

    $dbData = [
        "url" => $url,
        "style" => $style,
        "name" => $name,
    ];

    $insert = $db->insert('editor_fonts', $dbData);
    if ($insert) {
        echo success("Data Saved Successfully!", ["redirect" => ""]);
    }
}


// update Editor fonts
if (isset($_POST['updateEditorFonts'])) {
    $id = _POST('id', ["default" => ""]);
    $url = _POST('url');
    $style = _POST('style');
    $name = _POST('name');


    $dbData = [
        "url" => $url,
        "style" => $style,
        "name" => $name,
    ];

    $update = $db->update('editor_fonts', $dbData, [
        "id" => $id,
    ]);
    if ($update) {
        echo success("Data Saved Successfully!", ["redirect" => ""]);
    }
}
