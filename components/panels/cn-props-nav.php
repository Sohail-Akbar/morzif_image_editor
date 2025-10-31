<div class="cn-obj-props-nav obj-prop-panel-container" id="objPropsNav">
    <div class="d-flex">
        <div class="cn-nav-menu properties-con clr-filed-corner">
            <div class="cn-nav-list cn-obj-props-list" data-type="default">
                <!-- Left items -->
                <!-- Font Family -->
                <div class="specific-prop" data-type="text">
                    <?php require('./components/panels/properties/font-family.php'); ?>
                </div>
                <!-- Font size -->
                <div class="specific-prop" data-type="text">
                    <div class="content-center mx-2">
                        <i class="cp cn-obj-props-changer align-center" data-prop="fontSize" data-font-size="minus" aria-hidden="true">
                            <?= svg_icon('fas-fa-minus'); ?>
                        </i>
                        <!-- Font Size -->
                        <?php require('./components/panels/properties/font-size.php'); ?>
                        <i class="cp cn-obj-props-changer align-center" data-prop="fontSize" data-font-size="plus" aria-hidden="true">
                            <?= svg_icon('fas-fa-plus'); ?>
                        </i>
                    </div>
                </div>
                <!-- Bold -->
                <div class="cn-nav-item specific-prop px-1 py-0" title="Bold" data-type="text">
                    <label class="mb-0">
                        <input type="checkbox" class="cn-obj-props-changer" name="fontWeight" value="bold" data-prop="fontWeight" data-uncheck="normal">
                        <div class="nav-icon">
                            <i>
                                <?= svg_icon('fas-fa-bold'); ?>
                            </i>
                        </div>
                    </label>
                </div>
                <!-- Italic -->
                <div class="cn-nav-item specific-prop px-1 py-0" title="Italic" data-type="text">
                    <label class="mb-0">
                        <input type="checkbox" class="cn-obj-props-changer" value="italic" data-prop="fontStyle" data-uncheck="normal">
                        <div class="nav-icon">
                            <i class="align-center">
                                <?= svg_icon('fas-fa-italic'); ?>
                            </i>
                        </div>
                    </label>
                </div>
                <div class="cn-nav-item px-1 specific-prop py-0 cn-obj-props-changer" data-prop="textAlign" title="Alignment" data-type="text">
                    <div class="nav-icon text-align text-align-icon">
                        <i class="left-icon align-center">
                            <?= svg_icon('fas-fa-align-left'); ?>
                        </i>
                        <i class="center-icon d-none align-center">
                            <?= svg_icon('fas-fa-align-center'); ?>
                        </i>
                        <i class="right-icon d-none align-center">
                            <?= svg_icon('fas-fa-align-right'); ?>
                        </i>
                    </div>
                </div>
                <!-- adjust Filter -->
                <div class="cn-nav-item specific-prop" title="Adjust Filter" onclick="$(`.adjust-filter-button[data-target='adjust']`).click()" data-type="image">
                    <i class="d-flex"><?= svg_icon('fas-fa-sliders-h'); ?></i>
                </div>
                <!-- Crop -->
                <div class="cn-nav-item specific-prop cn-start-crop-btn" data-crop-type="shape" title="Crop" data-type="shape,image">
                    <i>
                        <?= svg_icon('fas-fa-crop-alt') ?>
                    </i>
                </div>
                <!-- Color fill -->
                <div class="cn-nav-item specific-prop" title="Color Fill" data-type="text">
                    <input type="text" value="#ffffff" class="tc-color-picker cn-obj-props-changer" data-prop="fill">
                </div>
                <!-- Color fill Shapes -->
                <div class="cn-nav-item specific-prop" title="Color Fill" data-type="shape">
                    <div class="shape-fill-container collapse-clrs"></div>
                </div>

                <!-- Right side items -->
                <div class="cn-nav-item duplicate-item item b-left" data-target="duplicate" title="Duplicate Item">
                    <i class="align-center">
                        <?= svg_icon('fas-fa-copy'); ?>
                    </i>
                </div>
                <!-- Trash -->
                <div class="cn-nav-item delete-item" data-target='true' title="Delete">
                    <i class="align-center">
                        <?= svg_icon('fas-fa-trash-alt'); ?>
                    </i>
                </div>
                <!-- More properties -->
                <div class="cn-nav-item properties-panel-show d-flex" title="Show Properties">
                    <i class="align-center">
                        <?= svg_icon('fas-fa-ellipsis-h'); ?>
                    </i>

                </div>
                <div class="cn-nav-item" title="Show Properties">
                    <i class="content-center cn-nav-item cp nav-close-btn p-0">
                        <?= svg_icon('fas-fa-minus'); ?>
                    </i>
                </div>
            </div>
            <!-- Crop Options -->
            <div class="cn-nav-list cn-obj-props-list" data-type="selectionRect">
                <!-- Cancel -->
                <div class="cn-nav-item px-1 py-0 cn-apply-crop-btn" title="Cancel">
                    <label class="mb-0 pt-1">
                        <div class="nav-icon align-center">
                            <?= svg_icon('fas-fa-check'); ?></i>
                        </div>
                    </label>
                </div>
                <!-- Done -->
                <div class="cn-nav-item px-1 py-0 cn-crop-close-btn" title="Done">
                    <label class="mb-0 pt-1">
                        <div class="nav-icon">
                            <?= svg_icon('fas-fa-times') ?>
                        </div>
                    </label>
                </div>
                <!-- Square Selection rect -->
                <div class="cn-nav-item px-1 py-0 cn-start-crop-btn" data-crop-type="rect" title="Selection Circle">
                    <div class="nav-icon align-center">
                        <i class="content-center"> <?= svg_icon('fas-fa-square'); ?></i>
                    </div>
                </div>
                <!-- Circle Selection Rect -->
                <div class="cn-nav-item px-1 py-0 cn-start-crop-btn" data-crop-type="circle" title="Selection Circle">
                    <div class="nav-icon align-center">
                        <i class="content-center"> <?= svg_icon('fas-fa-circle'); ?></i>
                    </div>
                </div>
                <div class="cn-nav-item px-1 py-0" data-crop-type="free" title="Selection Free">
                    <div class="nav-icon align-center" data-toggle="popup" data-target="#freeCropWindow">
                        <i class="content-center"> Free</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>