<div class="tc-folding-card">
    <div class="card">
        <!-- header -->
        <label class="card-header pull-away align-center">
            <div class="d-flex">
                <i class="mr-2 arrow-icon">
                    <?= svg_icon('fas-fa-chevron-right'); ?>
                </i>
                <span class="name">Background</span>
            </div>
            <div class="toggle-switch-btn">
                <div class="switch">
                    <input type="checkbox" class="cn-obj-props-changer prop-toggle-checkbox card-toggler" value="true" data-prop="textBgColorCheck" data-target-prop='textBackgroundColor'>
                    <span class="slider round"></span>
                </div>
            </div>
        </label>
        <!-- content -->
        <div class="tc-collapse">
            <div class="card-body cn-color-circle-container">
                <div class="trasform-data">
                    <div class="row">
                        <div class="col-12">
                            <span class="f-text">Color</span>
                            <div class="clr-filed-corner mt-2 large-circle">
                                <input type="text" class="w-100 h-100 tc-color-picker cn-obj-props-changer" data-prop="textBackgroundColor">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>