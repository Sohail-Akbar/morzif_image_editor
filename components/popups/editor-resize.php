<!-- Editor Resize modal (popup) -->
<div class="modal fade editor-modal" id="editorResize" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <!-- Content -->
        <div class="modal-content pb-3">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Resize</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <!-- Body -->
            <div class="modal-body p-0">
                <div class="cn-resize-container">
                    <div class="row m-0 mt-3">
                        <!-- Resize -->
                        <div class="col-md-5">
                            <div class="row">
                                <div class="col-md-6 form-group text-left">
                                    <span class="f-text">Width (px)</span>
                                    <input type="number" class="form-control editor-width-input editor-inp">
                                </div>
                                <div class="col-md-6 form-group text-left">
                                    <span class="f-text">Height (px)</span>
                                    <input type="number" class="form-control editor-height-input editor-inp">
                                </div>
                                <hr class="line">
                                <div class="swal2-actions" style="display: flex;">
                                    <button type="button" class="swal2-confirm swal2-styled apply-resize">Create</button>
                                    <button type=" button" class="swal2-cancel swal2-styled cancel-resize" onclick="$('#editorResize').find('.close').click()">Cancel</button>
                                </div>
                            </div>
                            <!-- Resize Resolution -->
                            <hr class="line">
                            <div class="resize-resolution-container">
                                <!-- resolution search -->
                                <div class="input-group search-container row m-0 ml-auto mt-2 pull-right col-md-7">
                                    <input type="text" class="form-control search-input tc-search" data-target=".single-media-template" placeholder="Search ...">
                                    <div class="input-group-append">
                                        <i class="align-center">
                                            <?= svg_icon('fas-fa-search'); ?>
                                        </i>
                                    </div>
                                </div>
                                <div class="media-templates-con row m-0">
                                    <?php $categories = $db->select("categories", '*', ['type' => 'public_templates']);
                                    foreach ($categories as $category) {
                                        $meta_data = $db->json_decode($category['meta_data']) ?? [];
                                        $size = $meta_data['width'] . ' x ' . $meta_data['height'] . ' px';
                                    ?>
                                        <div class="col-md-4 p-1">
                                            <div class="single-media-template" data-id="<?= $category['uid']; ?>" data-width="<?= $meta_data['width']; ?>" data-height="<?= $meta_data['height']; ?>">
                                                <span class="resolution-size"><?= $size ?></span>
                                                <span class="title">
                                                    <img src="./images/shapes/<?= $meta_data['icon']; ?>" width="18px" class="mr-2">
                                                    <?= $category['title'] ?>
                                                </span>
                                            </div>
                                        </div>
                                    <?php }
                                    ?>
                                </div>
                            </div>
                        </div>
                        <!-- Template -->
                        <div class="col-md-7">
                            <div class="cn-all-tamplates-con spec-templates-container" data-id="*"></div>
                            <!-- shape Loading -->
                            <div class="spinner-loading d-none" id="spinner-loader">
                                <div class="spinner"></div>
                                <span class="loading-txt">Loading ...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>