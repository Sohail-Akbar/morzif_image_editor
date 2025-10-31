<!-- Editor Properties As (shape, setting, flip, etc.) -->
<div class="properties-prop-head obj-prop-panel-container prop-head h-100 w-100 editing-panel-css">
    <div class="cn-prop-panel-heading">
        <span class="heading">Properties</span>
        <i class="close-icon">
            <?= svg_icon('fas-fa-times'); ?>
        </i>
    </div>
    <!-- Content -->
    <div class="properties-content-part prop-content-part pt-0">
        <div class="properties-part-con col-12">
            <!-- Properties -->
            <div class="text-all-prop properties-con mt-2">
                <div class="card">
                    <div class="add-text-head pb-2">
                        <div class="row">
                            <!-- Editor Shapes Replace -->
                            <div class="col-12 specific-prop" data-type="image">
                                <?php require_once('./components/panels/properties/shape-replace.php'); ?>
                            </div>
                            <!-- Text Properties -->
                            <div class="col-12 specific-prop" data-type="text">
                                <?php require('./components/panels/properties/text-properties.php') ?>
                            </div>
                            <!-- Editor Object Flip (x,y) -->
                            <?php
                            require('./components/panels/properties/editor-flip.php');
                            // <!-- Object Alignment -->
                            require('./components/panels/properties/alignment.php');
                            ?>
                            <!-- Object fill color -->
                            <div class="col-12 mt-3 specific-prop" data-type="text,shape">
                                <?php require('./components/panels/properties/color-fill.php'); ?>
                            </div>
                            <!-- Background Color (fill) -->
                            <div class="col-12 mt-3 specific-prop" data-type="text">
                                <?php require('./components/panels/properties/background-color.php'); ?>
                            </div>
                            <!-- Outline -->
                            <div class="col-12 mt-3">
                                <?php require('./components/panels/properties/outline.php'); ?>
                            </div>
                            <!-- Shadow -->
                            <div class="col-12 mt-3">
                                <?php require('./components/panels/properties/shadow.php'); ?>
                            </div>
                            <!-- Transform -->
                            <div class="col-12 mt-3">
                                <?php require('./components/panels/properties/transform.php'); ?>
                            </div>
                            <?php
                            // <!-- Opacity -->
                            require('./components/panels/properties/opacity.php');
                            ?>
                            <div class="specific-prop col-md-12" data-type="image">
                                <?php
                                // <!-- Object Blur -->
                                require('./components/panels/properties/blur.php');
                                //  Image Radius 
                                require_once('./components/panels/properties/radius.php');
                                ?>
                            </div>
                            <!-- Layers order buttons -->
                            <div class="col-12 mt-2">
                                <?php require("./components/panels/properties/layers.php") ?>
                            </div>
                            <!-- Text Properties End -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>