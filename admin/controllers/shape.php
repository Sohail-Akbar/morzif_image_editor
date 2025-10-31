<?php
define('DIR', '../');
require_once('../includes/db.php');

// add shapes
if (isset($_POST['addShapes'])) {
    $title = _POST('title');
    $category_id = _POST('category_id');
    // move uploaded file
    $file = $_fn->upload_file("image", [
        'path' => _DIR_ . 'images/shapes'
    ]);
    if ($file['status'] !== 'success')
        returnError("Error uploading file");

    $filename = $file['filename'];
    $dbData = [
        "title" => $title,
        "category_id" => $category_id,
        'image' => $filename
    ];

    $insert = $db->insert('shapes', $dbData);
    if ($insert) {
        echo success("Data Saved Successfully!", ["redirect_" => ""]);
    }
}


// update shapes
if (isset($_POST['updateShapes'])) {
    $title = _POST('title');
    $category_id = _POST('category_id');
    $id = _POST('id');

    $dbData = [
        "title" => $title,
        "category_id" => $category_id,
    ];
    // Image Upload
    $file = $_fn->upload_file("image", [
        'path' => _DIR_ . 'images/shapes'
    ]);
    if ($file['status'] === 'success')
        $dbData['image'] = $file['filename'];

    $update = $db->update('shapes', $dbData, [
        "id" => $id,
    ]);
    if ($update) {
        echo success("Data Saved Successfully!", ["redirect" => ""]);
    }
}
