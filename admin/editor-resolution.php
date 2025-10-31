<?php
require_once('includes/db.php');
$page_name = 'Categories';
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
                <span>Editor Resolutions</span>
                <div>
                    <a href="#" data-target="#addEditorResolutions" data-toggle="modal">Add Editor Resolutions</a>
                </div>
            </div>
            <div class="card-body">

                <?php
                $editor_resolutions = $db->select("editor_resolutions", '*', [], ['order_by' => 'id DESC']);
                if ($editor_resolutions) {
                    $count = 1;
                ?>
                    <div class="table-responsive">
                        <table class="table">
                            <thead class="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Categories</th>
                                    <th>Width</th>
                                    <th>Height</th>
                                    <th>Icon</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($editor_resolutions as $editor_resolution) { ?>
                                    <tr>
                                        <td>
                                            <?= $count; ?>
                                        </td>
                                        <td data-name="title" data-value="<?= $editor_resolution['title']; ?>">
                                            <?= $editor_resolution['title']; ?>
                                        </td>
                                        <td data-name="category_id" data-value="<?= $editor_resolution['category_id']; ?>">
                                            <?php
                                            $categories = $db->select_one("categories", '*', [
                                                'id' => $editor_resolution['category_id'],
                                            ]);
                                            if ($categories) {
                                                echo $categories['title'];
                                            }
                                            ?>
                                        </td>
                                        <td data-name="width" data-value="<?= $editor_resolution['width']; ?>">
                                            <?= $editor_resolution['width']; ?>
                                        </td>
                                        <td data-name="height" data-value="<?= $editor_resolution['height']; ?>">
                                            <?= $editor_resolution['height']; ?>
                                        </td>
                                        <td data-name="icon" data-value="<?= $editor_resolution['icon']; ?>">
                                            <?= htmlspecialchars_decode($editor_resolution['icon']); ?>
                                        </td>

                                        <td data-name="id" data-value="<?= $editor_resolution['id']; ?>">
                                            <a href="#" class="text-success editTableInfo" title="Edit" data-toggle="modal" data-target="#updateEditorResolutions">
                                                <i class="fas fa-pencil-alt"></i>
                                            </a>
                                            <a href="#" class="delete-td-data text-danger" title="Delete" data-target="<?= $editor_resolution['id']; ?>" data-action="editor_resolution">
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
        <!-- editor resolution update -->
        <div class="modal fade" id="updateEditorResolutions" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" nc-style="bg-t">
                    <div class="col-md-12">
                        <div class="card p-0">
                            <div class="card-header pull-away">
                                <span>Update Editor Resolutions</span>
                                <i class="fas fa-times cp" data-dismiss="modal"></i>
                            </div>
                            <div class="card-body">

                                <!-- Editor Resolutions form for update data -->
                                <form action="editor-resolution" method="POST" class="js-form ">
                                    <div class="row">
                                        <input type="hidden" name="id" value="<?= $editor_resolution['id']; ?>">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Title</span>
                                                <input type="text" class="form-control" name="title" required data-length='[0-250]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <?php
                                                $category_type = '"resolutions"';
                                                require global_file('categories-input') ?>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">width</span>
                                                <input type="int" class="form-control" name="width" required data-length='[0-0]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Height</span>
                                                <input type="int" class="form-control" name="height" required data-length='[0-0]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Icon</span>
                                                <input type="text" class="form-control" name="icon" required data-length='[0-250]'>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <input type="hidden" name="updateEditorResolutions" value="true">
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
        <!-- editor resolution add -->
        <div class="modal fade" id="addEditorResolutions" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" nc-style="bg-t">
                    <div class="col-md-12">
                        <div class="card p-0">
                            <div class="card-header pull-away">
                                <span>Add Editor Resolutions</span>
                                <i class="fas fa-times cp" data-dismiss="modal"></i>
                            </div>
                            <div class="card-body">

                                <!-- Editor Resolutions form for add data -->
                                <form action="editor-resolution" method="POST" class="js-form ">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Title</span>
                                                <input type="text" class="form-control" name="title" required data-length='[0-250]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <?php
                                                $category_type = '"resolutions"';
                                                require global_file('categories-input') ?>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Width</span>
                                                <input type="int" class="form-control" name="width" required data-length='[0-0]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Height</span>
                                                <input type="int" class="form-control" name="height" required data-length='[0-0]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Icon</span>
                                                <input type="text" class="form-control" name="icon" required data-length='[0-250]'>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <input type="hidden" name="addEditorResolutions" value="true">
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