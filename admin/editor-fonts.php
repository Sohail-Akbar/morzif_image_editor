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
                <span>Editor Fonts</span>
                <div>
                    <a href="#" data-target="#addEditorFonts" data-toggle="modal">Add Editor Fonts</a>
                </div>
            </div>
            <div class="card-body">

                <?php
                $editor_fonts = $db->select("editor_fonts", '*', [], ['order_by' => 'id DESC']);
                if ($editor_fonts) {
                    $count = 1;
                ?>
                    <div class="table-responsive">
                        <table class="table dataTable">
                            <thead class="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Url</th>
                                    <th>Font Name</th>
                                    <th>Style</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($editor_fonts as $fonts_val) { ?>
                                    <tr>
                                        <td>
                                            <?= $count; ?>
                                        </td>
                                        <td data-name="url" data-value="<?= $fonts_val['url']; ?>">
                                            <?= $fonts_val['url']; ?>
                                        </td>
                                        <td data-name="name" data-value="<?= $fonts_val['name']; ?>">
                                            <?= $fonts_val['name']; ?>
                                        </td>
                                        <td data-name="style" data-value="<?= $fonts_val['style']; ?>">
                                            <?= $fonts_val['style']; ?>
                                        </td>
                                        <td data-name="id" data-value="<?= $fonts_val['id']; ?>">
                                            <a href="#" class="text-success editTableInfo" title="Edit" data-toggle="modal" data-target="#updateEditorFonts">
                                                <i class="fas fa-pencil-alt"></i>
                                            </a>
                                            <a href="#" class="delete-td-data text-danger" title="Delete" data-target="<?= $fonts_val['id']; ?>" data-action="editor_fonts">
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
        <!-- editor fonts update -->
        <div class="modal fade" id="updateEditorFonts" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" nc-style="bg-t">
                    <div class="col-md-12">
                        <div class="card p-0">
                            <div class="card-header pull-away">
                                <span>Update Editor Fonts</span>
                                <i class="fas fa-times cp" data-dismiss="modal"></i>
                            </div>
                            <div class="card-body">
                                <!-- Editor fonts form for update data -->
                                <form action="editor-fonts" method="POST" class="js-form ">
                                    <div class="row">
                                        <input type="hidden" name="id" value="<?= $editor_resolution['id']; ?>">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Url</span>
                                                <input type="text" class="form-control" name="url" required data-length='[0-250]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Font Name</span>
                                                <input type="int" class="form-control" name="name" required data-length='[0-0]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Font Style</span>
                                                <input type="int" class="form-control" name="style" required data-length='[0-0]'>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <input type="hidden" name="updateEditorFonts" value="true">
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
        <!-- editor Fonts add -->
        <div class="modal fade" id="addEditorFonts" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" nc-style="bg-t">
                    <div class="col-md-12">
                        <div class="card p-0">
                            <div class="card-header pull-away">
                                <span>Add Editor Fonts</span>
                                <i class="fas fa-times cp" data-dismiss="modal"></i>
                            </div>
                            <div class="card-body">
                                <!-- Editor Resolutions form for add data -->
                                <form action="editor-fonts" method="POST" class="js-form ">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Url</span>
                                                <input type="text" class="form-control font-url" name="url" required data-length='[0-250]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Font Name</span>
                                                <input type="int" class="form-control font-name" name="name" required data-length='[0-0]'>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="label">Font Style</span>
                                                <input type="int" class="form-control font-style" name="style" required data-length='[0-0]'>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <input type="hidden" name="addEditorFonts" value="true">
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
    <script>
        function fillStyleValues($url) {
            let url = $url.val();
            url = url.replace("@import url('https://fonts.googleapis.com/css2?family=", "");
            url = url.replace("&display=swap');", "");
            let name = url.split(":")[0];
            // Replace + with space regex
            name = name.replace(/\+/g, ' ');
            let style = `'${name}', sans-serif`,
                $style = $(".font-style"),
                $name = $(".font-name");
            if ($style.val() == "")
                $(".font-style").val(style);
            if ($name.val() == "")
                $(".font-name").val(name);

            $url.val(url);
        }
        $(".font-url").on("change", function() {
            fillStyleValues($(this));
        });
    </script>
</body>

</html>