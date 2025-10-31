<?php
define('DIR', '../');
require_once('../includes/db.php');

// add Categories
if (isset($_POST['addCategories'])) {
    $title = _POST('title');
    $type = _POST('type');
    $sub_type = _POST('sub_type');
    $meta_data = _POST('meta_data', ['default' => '']);

    if (isset($_FILES['icon'])) {
        $file = $_fn->upload_file('icon', [
            'path' => _DIR_ . 'images/shapes'
        ]);
        if ($file['status'] !== 'success')
            returnError("Error uploading file");

        $filename = $file['filename'];
        $meta_data['icon'] = $filename;
    }

    $dbData = [
        "title" => $title,
        "type" => $type,
        "sub_type" => $sub_type,
        "meta_data" => json_encode($meta_data),
    ];

    $insert = $db->insert('categories', $dbData);
    if ($insert) {
        echo success("Data Saved Successfully!", ["redirect" => ""]);
    }
}


// update Categories
if (isset($_POST['updateCategories'])) {
    $id = _POST('id');
    $title = _POST('title');
    $type = _POST('type');
    $sub_type = _POST('sub_type');
    $meta_data = _POST('meta_data', ['default' => '']);

    if (isset($_FILES['icon'])) {

        $file = $_fn->upload_file('icon', [
            'path' => _DIR_ . 'images/shapes'
        ]);
        if ($file['status'] !== 'success')
            returnError("Error uploading file");

        $filename = $file['filename'];
        $meta_data['icon'] = $filename;
    }

    $dbData = [
        "title" => $title,
        "type" => $type,
        "sub_type" => $sub_type,
        "meta_data" => json_encode($meta_data),
    ];

    $update = $db->update('categories', $dbData, [
        "id" => $id,
    ]);
    if ($update) {
        echo success("Data Saved Successfully!", ["redirect" => ""]);
    }
}


// add Categories Data
if (isset($_POST['addCategoriesData'])) {
    $title = _POST('title');
    $discription = _POST('discription', ['default' => '']);
    $category_id = _POST('category_id');


    $dbData = [
        "title" => $title,
        "discription" => $discription,
        "category_id" => $category_id,
    ];

    $insert = $db->insert('templates', $dbData);
    if ($insert) {
        echo success("Data Saved Successfully!", ["redirect" => ""]);
    }
}


// update Categories Data
if (isset($_POST['updateCategoriesData'])) {
    $id = _POST('id');
    $title = _POST('title');
    $discription = _POST('discription', ['default' => '']);
    $category_id = _POST('category_id');

    $credits_data = [];
    if (array_key_exists('credits', $_POST)) {
        $credits = _POST('credits', ['default' => []]);
        foreach ($credits['position'] as $i => $position) {
            $text = $credits['text'][$i];
            $credits_data[] = [
                'position' => $position,
                'text' => $text
            ];
        }
    }

    $dbData = [
        "title" => $title,
        "category_id" => $category_id,
        "discription" => $discription,
        "credits" => json_encode($credits_data),
    ];

    $update = $db->update('templates', $dbData, [
        "id" => $id,
    ]);
    if ($update) {
        echo success("Data Saved Successfully!", ["redirect" => ""]);
    }
}
