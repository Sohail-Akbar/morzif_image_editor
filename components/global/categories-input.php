<?php
$condition = [];
$category_type = isset($category_type) ? $category_type : null;
$empty_option = isset($empty_option) ? $empty_option : false;
if ($category_type) {
    $condition['type'] = [
        'value' => "( $category_type )",
        'operator' => 'IN',
    ];
}
$categories_ = $db->select("categories", '*', $condition);
?>
<span class="label">Category</span>
<select name="category_id" class="form-control" required>
    <option <?= $empty_option ? "" : "disabled" ?> selected>-- Select --</option>
    <?php foreach ($categories_ as $category_) { ?>
        <option value="<?= $category_['id'] ?>"><?= $category_['title'] ?></option>
    <?php } ?>
</select>