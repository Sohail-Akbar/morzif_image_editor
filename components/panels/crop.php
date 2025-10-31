<!-- Editor Crop Content -->
<div class="rotate-prop-head prop-head">
    <!-- Header -->
    <div class="crop-heading prop-heading">
        <span class="heading">Crop</span>
        <span class="close-icon">
            <?= svg_icon('fas-fa-times'); ?>
        </span>
    </div>
    <!-- Content -->
    <div class="crop-content-part prop-content-part">
        <div class="size-part mt-3 col-12">
            <div class="set-width-parent size-parent">
                <p class="width-text mt-1">Width</p>
                <input type="number" class="image-width-inp w-25 editor-ipt small-inp">
            </div>
            <div class="set-height-parent size-parent mt-2">
                <p class="width-text mt-1">height</p>
                <input type="number" class="image-height-inp w-25 editor-ipt small-inp">
            </div>
        </div>
        <!-- Editor Flip -->
        <div class="mt-3">
            <?php require('./components/panels/properties/editor-flip.php'); ?>
        </div>
        <!-- Border (line) -->
        <div class="main-divider"></div>
        <!-- Editor Transform -->
        <div id="accordion" class="mt-3 px-2">
            <?php require('./components/panels/properties/transform.php'); ?>
        </div>
    </div>
    <!-- control btn on crop -->
    <div class="crop-btn-head">
        <button class="cancel-crop cancel-btn">CANCEL</button>
        <button class="apply-crop apply-btn">APPLY</button>
    </div>
</div>