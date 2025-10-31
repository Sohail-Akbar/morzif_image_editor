<?php
require_once('includes/db.php');
$type = _GET('type', ['default' => null]);
$cat_condition = [];
$page_heading = 'Categories';
if ($type) {
    $cat_condition['type'] = $type;
    $type_title = fromSnakeCase($type);
    $type_title = ucwords($type_title);
    $page_heading = $type_title . ' Categories';
}
$page_name = $page_heading;
$is_template_cat = $type == 'public_templates';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php require_once('./includes/head.php'); ?>
</head>

<body>
    <?php require_once('./includes/header.php'); ?>
    <div class="all-content">
        <div class="card">
            <div class="card-header pull-away">
                <span><?= $page_heading ?></span>
                <a href="#" data-target="#addCategories" data-toggle="modal">Add Categories</a>
            </div>
            <div class="card-body">

                <?php
                $categories = $db->select("categories", '*', $cat_condition, ['order_by' => 'id DESC']);
                if ($categories) {
                    $count = 1;
                ?>
                    <div class="table-responsive">
                        <table class="table dataTable">
                            <thead class="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Type</th>
                                    <?php if ($is_template_cat) { ?>
                                        <th>Width</th>
                                        <th>Height</th>
                                        <th>Icon</th>
                                    <?php } ?>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($categories as $categorie) { ?>
                                    <tr>
                                        <td>
                                            <?= $count; ?>
                                        </td>
                                        <td data-name="title" data-value="<?= $categorie['title']; ?>">
                                            <?= $categorie['title']; ?>
                                        </td>
                                        <td data-name="sub_type" data-value="<?= $categorie['sub_type']; ?>">
                                            <?= $categorie['sub_type']; ?>
                                        </td>
                                        <?php if ($is_template_cat) { ?>
                                            <?php
                                            $meta_data = $db->json_decode($categorie['meta_data']) ?? [];
                                            foreach ($meta_data as $key => $meta_data_val) {
                                                if ($key === 'icon') {
                                            ?>
                                                    <td data-name="<?= $key ?>" data-value="<?= $meta_data_val; ?>">
                                                        <img src="../images/shapes/<?= $meta_data_val ?>" class="img-fluid" width="30px">
                                                    </td>
                                                <?php } else { ?>
                                                    <td data-name="meta_data[<?= $key ?>]" data-value="<?= $meta_data_val; ?>">
                                                        <?= $meta_data_val; ?>
                                                    </td>
                                        <?php    }
                                            }
                                        }
                                        ?>
                                        <td class="td-actions" data-name="id" data-value="<?= $categorie['id']; ?>">
                                            <?php if ($type === "public_templates") { ?>
                                                <a href="../?type=category&category_id=<?= $categorie['uid'] ?>" target="_blank" title="View Templates">
                                                    <i class="fas fa-eye"></i>
                                                </a>
                                            <?php } ?>
                                            <a href="#" class="text-success editTableInfo" title="Edit" data-toggle="modal" data-target="#updateCategories">
                                                <i class="fas fa-pencil-alt"></i>
                                            </a>
                                            <a href="#" class="delete-td-data text-danger" title="Delete" data-target="<?= $categorie['id']; ?>" data-action="categorie">
                                                <i class="fas fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                <?php $count++;
                                } ?>
                            </tbody>
                        </table>
                    </div>
                <?php } else { ?>
                    <p>No Data found!</p>
                <?php } ?>

            </div>
        </div>
        <!-- update category -->
        <div class="modal fade" id="updateCategories" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" nc-style="bg-t">
                    <div class="col-md-12">
                        <div class="card p-0">
                            <div class="card-header pull-away">
                                <span>Update Categories</span>
                                <i class="fas fa-times cp" data-dismiss="modal"></i>
                            </div>
                            <div class="card-body">
                                <!-- Categories form for update data -->
                                <form action="categories" method="POST" class="js-form ">
                                    <div class="row">
                                        <input type="hidden" name="id" value="<?= $categorie['id']; ?>">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Title</span>
                                                <input type="text" class="form-control" name="title" required data-length='[0-250]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Type</span>
                                                <input type="text" class="form-control" name="sub_type" required data-length='[0-250]'>
                                            </div>
                                        </div>
                                        <?php if ($is_template_cat) { ?>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <span class="label">Resolution Width</span>
                                                    <input type="number" class="form-control" name="meta_data[width]" required data-length='[0-250]'>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <span class="label">Resolution Height</span>
                                                    <input type="number" class="form-control" name="meta_data[height]" required data-length='[0-250]'>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <span class="label">Icon</span>
                                                    <input type="file" class="form-control" name="icon" required>
                                                </div>
                                            </div>
                                        <?php } ?>
                                        <div class="col-12">
                                            <input type="hidden" name="type" value="<?= $type ?>">
                                            <input type="hidden" name="updateCategories" value="true">
                                            <button type="submit" class="btn">
                                                <i class="fas fa-save"></i> Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- add category -->
        <div class="modal fade" id="addCategories" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" nc-style="bg-t">
                    <div class="col-md-12">
                        <div class="card p-0">
                            <div class="card-header pull-away">
                                <span>Add Categories</span>
                                <i class="fas fa-times cp" data-dismiss="modal"></i>
                            </div>
                            <div class="card-body">

                                <!-- Categories form for add data -->
                                <form action="categories" method="POST" class="js-form ">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Title</span>
                                                <input type="text" class="form-control" name="title" required data-length='[0-250]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Type</span>
                                                <input type="text" class="form-control" name="sub_type" required data-length='[0-250]'>
                                            </div>
                                        </div>
                                        <?php if ($is_template_cat) { ?>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <span class="label">Resolution Width</span>
                                                    <input type="number" class="form-control" name="meta_data[width]" required data-length='[0-250]'>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <span class="label">Resolution Height</span>
                                                    <input type="number" class="form-control" name="meta_data[height]" required data-length='[0-250]'>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <span class="label">Icon</span>
                                                    <input type="file" class="form-control" name="icon" required>
                                                </div>
                                            </div>
                                        <?php } ?>
                                        <div class="col-12">
                                            <input type="hidden" name="type" value="<?= $type ?>">
                                            <input type="hidden" name="addCategories" value="true">
                                            <button type="submit" class="btn">
                                                <i class="fas fa-save"></i> Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php require_once('./includes/js.php'); ?>
</body>

</html>