<!-- Editor File Upload -->
<div class="background-prop-head prop-head">
    <!-- Heading -->
    <?php cnPropPanelHeading(['name' => 'Image']) ?>
    <!-- Content -->
    <div class="background-content-part prop-content-part">
        <div class="background-part">
            <div class="col-12 mt-3">
                <div class="cn-image-upload-btn">
                    <button class="btn">
                        <i class="mr-3 align-center">
                            <?= svg_icon('fas-fa-upload'); ?>
                        </i>
                        Image Upload
                    </button>
                    <input type="file" class="multiple-file-upload" accept="image/*" multiple />
                </div>
            </div>
        </div>
        <!-- image shapes templates -->
        <div class="shapes-template-con row col-12 m-0 mt-2 cn-obj-non-active-content">
        </div>
    </div>
</div>