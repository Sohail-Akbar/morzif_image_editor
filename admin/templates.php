<?php
require_once('includes/db.php');
$page_name = 'Categories';

$JS_FILES_ = ['templates.js'];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php require_once('./includes/head.php'); ?>
    <style>
        .preview-img {
            max-width: 180px;
            background: #e9ecef;
            background-image: url("<?= _DIR_ ?>images/square-bg.png");
        }
    </style>
</head>

<body>
    <?php require_once('./includes/header.php'); ?>
    <div class="all-content">
        <div class="card">
            <div class="card-header pull-away">
                <span>Template</span>
                <a href="#" data-target="#addCategoriesData" data-toggle="modal">Add Template</a>
            </div>
            <div class="card-body">

                <?php
                $templates = $db->select("templates", '*', [], ['order_by' => 'id DESC']);
                if ($templates) {
                    $count = 1;
                ?>
                    <div class="table-responsive">
                        <table class="table dataTable">
                            <thead class="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Discription</th>
                                    <th>Credits</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($templates as $template) {
                                    $category_id = $template['category_id'];
                                ?>
                                    <tr>
                                        <td>
                                            <?= $count; ?>
                                        </td>
                                        <td>
                                            <img src="<?= _DIR_ . "images/editor-image/" . $template['image'] ?>" alt="image" class="img-fluid preview-img">
                                        </td>
                                        <td data-name="title" data-value="<?= $template['title']; ?>">
                                            <?= $template['title']; ?>
                                        </td>
                                        <td data-name="category_id" data-value="<?= $category_id ?>">
                                            <?php
                                            $category_title = $db->select_one("categories", 'title', ['id' => $category_id], [
                                                'default' => ''
                                            ]);
                                            echo $category_title;
                                            ?>
                                        </td>
                                        <td data-name="discription" data-value="<?= $template['discription']; ?>">
                                            <?= $template['discription']; ?>
                                        </td>
                                        <td data-name="credits" data-value="<?= $template['credits']; ?>" class="credit-td">
                                            <?= $template['credits']; ?>
                                        </td>
                                        <td data-name="id" data-value="<?= $template['id']; ?>">
                                            <a href="#" class="text-success editTableInfo" title="Edit" data-toggle="modal" data-target="#updateCategoriesData">
                                                <i class="fas fa-pencil-alt"></i>
                                            </a>
                                            <a href="#" class="delete-td-data text-danger" title="Delete" data-target="<?= $template['id']; ?>" data-action="template">
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
        <!-- update Template -->
        <div class="modal fade" id="updateCategoriesData" data-callback="mdlUpdateTemplate" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" nc-style="bg-t">
                    <div class="col-md-12">
                        <div class="card p-0">
                            <div class="card-header pull-away">
                                <span>Update Template</span>
                                <i class="fas fa-times cp" data-dismiss="modal"></i>
                            </div>
                            <div class="card-body">

                                <!-- Template form for update data -->
                                <form action="categories" method="POST" class="js-form ">
                                    <div class="row">
                                        <input type="hidden" name="id">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Title</span>
                                                <input type="text" class="form-control" name="title" required data-length='[0-250]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <?php
                                                $category_type = "'public_templates', 'text_templates'";
                                                require global_file('categories-input') ?>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <span class="label">Discription</span>
                                                <textarea name="discription" class="form-control"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-12  mt-3 mb-2">
                                            <input type="checkbox" class="tc-checkbox toggle-template-credit" data-label="Add Credit">
                                        </div>
                                        <!-- Credit Position -->
                                        <div class="template-credit-container col-md-12 py-4">
                                            <div class="all-credits"></div>
                                            <div class="pull-right">
                                                <button type="button" class="btn add-new-credit-btn" data-toggle="addHTML" data-pick="#creditsInputsGroup" data-drop=".all-credits">
                                                    <i class="fas fa-plus"></i>
                                                    Add Credit
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <input type="hidden" name="updateCategoriesData" value="true">
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
        <!-- add Template -->
        <div class="modal fade" id="addCategoriesData" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" nc-style="bg-t">
                    <div class="col-md-12">
                        <div class="card p-0">
                            <div class="card-header pull-away">
                                <span>Add Template</span>
                                <i class="fas fa-times cp" data-dismiss="modal"></i>
                            </div>
                            <div class="card-body">

                                <!-- Template form for add data -->
                                <form action="categories" method="POST" class="js-form ">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Title</span>
                                                <input type="text" class="form-control" name="title" required data-length='[0-250]'>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <span class="label">Discription</span>
                                                <textarea name="discription" class="form-control"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <?php
                                                $category_type = "'public_templates', 'text_templates'";
                                                require global_file('categories-input') ?>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <input type="hidden" name="addCategoriesData" value="true">
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
        <!-- Credits Input Group -->
        <div class="credit-html-data d-none mb-3" id="creditsInputsGroup">
            <div class="fieldset mx-2">
                <spna class="legend">Credit</spna>
                <div class="row mx-0">
                    <div class="col-md-12 pull-right">
                        <i class="fa fa-times mx-2 credit-close-btn" title="Close Credit"></i>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <span class="f-text">Credit Position</span>
                            <select name="credits[position][]" class="form-control inp">
                                <option value="" selected>--- Credit ----</option>
                                <option value="inside_download_button">Inside Download Button</option>
                                <option value="below_canvas">Below Canvas</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <div class="pull-away">
                                <span class="f-text">Credit Text</span>
                                <span class="credit-text-defualt-paste f-text cp">a:class[text](url)</span>
                            </div>
                            <textarea name="credits[text][]" class="inp form-control credit-textarea"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php require_once('./includes/js.php'); ?>
</body>

</html>