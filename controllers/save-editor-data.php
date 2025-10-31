<?php
define('DIR', '../');
require_once(DIR . 'includes/db.php');

// add Categories
if (isset($_POST['saveEditorData'])) {
    $title = _POST('title');
    $discription = _POST('discription', ['default' => '']);
    $category_id = _POST('category_id');
    $template_id = _POST('template_id');
    $editorData = _POST('editorData');
    // echo $editorData;
    // exit;
    $file = $_fn->upload_file("image", [
        'path' => _DIR_ . 'images/editor-image',
    ]);
    if ($file['status'] != 'success')
        returnError($file['data']);

    $dbData = [
        "title" => $title,
        "discription" => $discription,
        'category_id' => $category_id,
        'editor_data' => $editorData,
        'image' => $file['filename']
    ];
    $saved = false;
    if ($template_id === "new") {
        $saved = $db->insert('templates', $dbData);
    } else {
        $saved = $db->update("templates", $dbData, [
            'id' => $template_id
        ]);
    }
    if ($saved)
        returnSuccess("Data Saved Successfully!");
}
// Upload Images
if (isset($_POST['uploadEditorImages'])) {
    if (!IS_ADMIN) returnError("permission denied");
    // Upload single file
    $path = "images/editor-image";
    if (isset($_FILES['file'])) {
        $file = $_fn->upload_file('file', [
            'path' => _DIR_ . $path
        ]);
        if ($file['status'] !== 'success') {
            returnError($file['data']);
        }
        $filepath = url($path, $file['filename']);
        returnSuccess($filepath);
    }
    // Upload multiple files
    $files = $_fn->upload_file('files', [
        'multiple' => true,
        'path' => _DIR_ . $path
    ]);
    foreach ($files as $key => $file) {
        $filename = arr_val($file, 'filename', '');
        $files[$key]['filepath'] = url($path . $filename);
    }
    returnSuccess($files);
}
// editor image save
if (isset($_POST['editorImageSave'])) {
    $image = $_FILES['file']['name'];
    $image_ext = is_image_file($image);
    if (!$image_ext) {
        returnError('Invalid file type');
    }
    $new_name = md5(time()) . '.' . $image_ext;
    $location = _DIR_ . 'images/editor-image/' . $new_name;
    if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
        $data = [
            'image' => $new_name,
        ];
        echo success($data);
    } else {
        echo error();
    }
}


// get categories data
if (isset($_POST['getCategoryData'])) {
    $category_id = _POST('category_id');
    $templates_condition = [];
    if ($category_id !== "*") {
        $category = $db->select_one("categories", 'id', [
            'uid' => $category_id
        ]);
        if (!$category) returnError("category not found!");
        $category_id = $category['id'];
        $templates_condition['category_id'] = $category_id;
    } else {
        $text_templates_cat_id = $db->select_one("categories", 'id', ['sub_type' => 'text_templates'], ['default' => null]);
        if ($text_templates_cat_id) {
            $templates_condition['category_id'] = [
                'value' => $text_templates_cat_id,
                'operator' => '!='
            ];
        }
    }

    $templates = $db->select("templates", 'id,category_id,discription,image,title', $templates_condition);
    $returnData = [];
    foreach ($templates as $value) {
        $category_id = $value['category_id'];
        $discription = $value['discription'];
        $image = $value['image'];
        $title = $value['title'];
        $category_data_id = $value['id'];
        $data = [
            'category_id' => $category_id,
            'discription' => $discription,
            'image' => $image,
            'title' => $title,
            'category_data_id' => $category_data_id
        ];
        $returnData[] = $data;
    }
    returnSuccess($returnData);
}

// get categories data and loard
if (isset($_POST['getEditorDataAndLoard'])) {
    $category_id = $_POST['category_id'];
    $category_data_id = $_POST['category_data_id'];

    $template = $db->select_one("templates", '*', [
        'category_id' => $category_id,
        'id' => $category_data_id
    ]);
    if ($template) {
        $editor_data = $db->json_decode($template['editor_data']);
        echo success($editor_data);
    } else {
        echo error();
    }
}
