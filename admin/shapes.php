<?php
require_once('includes/db.php');
$page_name = 'Shapes';
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
                <span>Shapes</span>
                <a href="#" data-target="#addShapes" data-toggle="modal">Add Shapes</a>
            </div>
            <div class="card-body">

                <?php
                $shapes = $db->select("shapes", '*', [], ['order_by' => 'id DESC']);
                if ($shapes) {
                    $count = 1;
                ?>
                    <div class="table-responsive">
                        <table class="table dataTable">
                            <thead class="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($shapes as $shape) { ?>
                                    <tr>
                                        <td>
                                            <?= $count; ?>
                                        </td>
                                        <td data-name="title" data-value="<?= $shape['title']; ?>">
                                            <?= $shape['title']; ?>
                                        </td>
                                        <td data-name="image" data-value="<?= $shape['image']; ?>">
                                            <img src="../images/shapes/<?= $shape['image']; ?>" width="30">
                                        </td>
                                        <td data-name="category_id" data-value="<?= $shape['category_id'] ?>">
                                            <?php $category_name = $db->select_one("categories", 'title', ['id' => $shape['category_id']], [
                                                'default' => ''
                                            ]);
                                            echo $category_name; ?>
                                        </td>
                                        <td data-name="id" data-value="<?= $shape['id']; ?>">
                                            <a href="#" class="text-success editTableInfo" title="Edit" data-toggle="modal" data-target="#updateShapes">
                                                <i class="fas fa-pencil-alt"></i>
                                            </a>
                                            <a href="#" class="delete-td-data text-danger" title="Delete" data-target="<?= $shape['id']; ?>" data-action="shapes">
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
        <!-- update shape -->
        <div class="modal fade" id="updateShapes" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" nc-style="bg-t">
                    <div class="col-md-12 p-0">
                        <div class="card p-0">
                            <div class="card-header pull-away">
                                <span>Update Shapes</span>
                                <i class="fas fa-times cp" data-dismiss="modal"></i>
                            </div>
                            <div class="card-body">

                                <!-- shapes form for update data -->
                                <form action="shape" method="POST" class="js-form ">
                                    <div class="row">
                                        <input type="hidden" name="id" value="<?= $shape['id']; ?>">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Title</span>
                                                <input type="text" class="form-control" name="title" required data-length='[0-250]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Image</span>
                                                <br>
                                                <input type="file" class="image" name="image" accept="image/*">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <?php
                                                $category_type = "'shapes'";
                                                $empty_option = true;
                                                require global_file('categories-input') ?>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <input type="hidden" name="updateShapes" value="true">
                                            <button type="submit" class="submit-btn btn">
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
        <!-- add shape -->
        <div class="modal fade" id="addShapes" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" nc-style="bg-t">
                    <div class="col-md-12 p-0">
                        <div class="card p-0">
                            <div class="card-header pull-away">
                                <span>Add Shapes</span>
                                <i class="fas fa-times cp" data-dismiss="modal"></i>
                            </div>
                            <div class="card-body">

                                <!-- Shapes form for add data -->
                                <form action="shape" method="POST" class="js-form ">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Title</span>
                                                <input type="text" class="form-control" name="title" required data-length='[0-250]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Image</span>
                                                <br>
                                                <input type="file" class="image" name="image" accept="image/*">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <?php
                                                $category_type = "'shapes'";
                                                $empty_option = true;
                                                require global_file('categories-input') ?>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <input type="hidden" name="addShapes" value="true">
                                            <button type="submit" class="submit-btn btn">
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