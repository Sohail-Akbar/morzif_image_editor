<?php
define('DIR', '../');
require_once(DIR . 'includes/db.php');


// fetch templates
if (isset($_POST['fetchAllTemplate'])) {
    $id = $_POST['id'];

    $template = $db->select("templates", '*', [
        'category_id' => $id,
    ]);
    echo success($template);
}
