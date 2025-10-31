<?php
define('DIR', '../');
require_once(DIR . 'includes/db.php');


// get Shapes
if (isset($_POST['getShapeData'])) {
    $category_id = _POST('category_id');
    $limit = _POST('limit');
    $loaded = _POST('loaded');
    $query = _POST('query', ['default' => '']);
    // Limit
    $limit = $loaded . ", " . $limit;
    // Condition
    $condition = [
        'category_id' => $category_id
    ];
    // Search Query
    if (strlen($query)) {
        $query = strtolower($query);
        $query = "AND LOWER(title) LIKE '%$query%'";
    }
    $shapes = $db->query("SELECT * FROM shapes WHERE
                                    category_id = '$category_id'
                                    $query
                                    ORDER BY id DESC
                                    LIMIT $limit
                                    ", ['select_query' => true]);
    $categoriesArray = [];
    foreach ($shapes as $shape) {
        $categories = $db->select_one("categories", '*', ['id' => $shape['category_id']]);
        array_push($categoriesArray, $categories);
    }
    echo json_encode([
        'shapes' => $shapes,
        'categories' => $categoriesArray,
        'status' => 'success',
    ]);
}
