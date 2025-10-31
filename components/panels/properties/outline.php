<div class="tc-folding-card">
    <div class="card">
        <label class="card-header pull-away align-center">
            <div class="d-flex">
                <i class="mr-2 arrow-icon">
                    <?= svg_icon('fas-fa-chevron-right'); ?>
                </i>
                <span class="name">Outline</span>
            </div>
            <div class="toggle-switch-btn">
                <div class="switch">
                    <input type="checkbox" class="cn-obj-props-changer prop-toggle-checkbox card-toggler" value="true" data-prop="outlineCheck" data-target-prop='stroke,strokeWidth'>
                    <span class="slider round"></span>
                </div>
            </div>
        </label>
        <div class="tc-collapse">
            <div class="card-body cn-color-circle-container">
                <div class="trasform-data">
                    <div class="row">
                        <!-- Fill Color -->
                        <div class="col-12">
                            <span class="f-text">Color</span>
                            <div class="clr-filed-corner mt-2 large-circle">
                                <input type="text" class="tc-color-picker cn-obj-props-changer" data-prop="stroke">
                            </div>
                        </div>
                        <!-- Outline Size -->
                        <div class="outline-clr-con col-12 mt-2">
                            <div class="outline-clr-head pull-away">
                                <span class="f-text content-center">Size</span>
                                <input type="number" class="small-inp editor-ipt cn-obj-props-changer outline-size-inputs" data-fill-val=".outline-size-inputs" data-prop="strokeWidth" id="" min="0" max="100" value="0">
                            </div>
                            <input type="range" min="0" max="100" class="ipt-slider cn-range-slider cn-obj-props-changer  outline-size-inputs" data-fill-val=".outline-size-inputs" data-prop="strokeWidth">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>