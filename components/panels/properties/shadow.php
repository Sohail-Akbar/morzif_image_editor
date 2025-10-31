<div class="tc-folding-card">
    <div class="card">
        <label class="card-header pull-away align-center">
            <div class="d-flex">
                <i class="mr-2 arrow-icon">
                    <?= svg_icon('fas-fa-chevron-right'); ?>
                </i>
                <span class="name">Shadow</span>
            </div>
            <div class="toggle-switch-btn">
                <div class="switch">
                    <input type="checkbox" class="cn-obj-props-changer prop-toggle-checkbox card-toggler" value="true" data-prop="shadowCheck" data-target-prop='shadow'>
                    <span class="slider round"></span>
                </div>
            </div>
        </label>
        <div class="tc-collapse">
            <div class="card-body cn-obj-props-shadow cn-color-circle-container">
                <div class="shadow-part-parent">
                    <!-- Default Shadow -->
                    <div class="default-shadow-con">
                        <div class="shadow-con cn-obj-props-changer" data-shadow="true" data-prop="shadow" data-prop="shadow" data-shadow-color="" data-shadow-size="" data-offset-x="0" data-offset-y="0">
                            <span class="shadow-none d-shadow"></span>
                            <span class="shadow-name">None</span>
                        </div>
                        <div class="shadow-con cn-obj-props-changer" data-shadow="true" data-prop="shadow" data-prop="shadow" data-shadow-color="#0a0909" data-shadow-size="75" data-offset-x="0" data-offset-y="0">
                            <span class="shadow-soft d-shadow"></span>
                            <span class="shadow-name">Soft</span>
                        </div>
                        <div class="shadow-con cn-obj-props-changer" data-shadow="true" data-prop="shadow" data-prop="shadow" data-shadow-color="#0a0909" data-shadow-size="60" data-offset-x="64" data-offset-y="31">
                            <span class="shadow-regular d-shadow"></span>
                            <span class="shadow-name">Regular</span>
                        </div>
                        <div class="shadow-con cn-obj-props-changer" data-shadow="true" data-prop="shadow" data-prop="shadow" data-shadow-color="#0a0909" data-shadow-size="30" data-offset-x="48" data-offset-y="35">
                            <span class="shadow-retro d-shadow"></span>
                            <span class="shadow-name">Retro</span>
                        </div>
                    </div>
                    <!-- Color (fill) -->
                    <div class="shadow-color-part mt-2">
                        <span class="f-text">Color</span>
                        <div class="clr-filed-corner mt-2 large-circle">
                            <input type="text" class="tc-color-picker cn-obj-props-changer" data-prop="shadow" name="color">
                        </div>
                    </div>
                    <!-- Size -->
                    <div class="shadow-blur-part mt-2">
                        <div class="shadow-blur d-flex mt-2">
                            <span class="f-text">Size</span>
                            <input type="number" class="small-inp editor-ipt cn-obj-props-changer shadow-size-input" data-prop="shadow" data-fill-val=".shadow-size-input" name="blur" max="100" value="0">
                        </div>
                        <div class="shadow-blur-slider mt-1">
                            <input type="range" class="ipt-slider cn-range-slider cn-obj-props-changer shadow-size-input" data-prop="shadow" data-fill-val=".shadow-size-input" name="blur" max="100" value="0">
                        </div>
                    </div>
                    <!-- Offset x -->
                    <div class="shadow-blur-part mt-2">
                        <div class="shadow-blur d-flex mt-2">
                            <span class="f-text">OffsetX</span>
                            <input type="number" class="small-inp editor-ipt cn-obj-props-changer shadow-offsetX-input" data-fill-val=".shadow-offsetX-input" data-prop="shadow" name="offsetX" max="100" value="0">
                        </div>
                        <div class="shadow-blur-slider mt-1">
                            <input type="range" class="ipt-slider cn-range-slider cn-obj-props-changer shadow-offsetX-input" data-prop="shadow" data-fill-val=".shadow-offsetX-input" name="offsetX" max="100" value="0">
                        </div>
                    </div>
                    <!-- Offset y -->
                    <div class="shadow-blur-part mt-2">
                        <div class="shadow-blur d-flex mt-2">
                            <span class="f-text">OffsetY</span>
                            <input type="number" class="small-inp editor-ipt cn-obj-props-changer shadow-offsetY-input" data-prop="shadow" data-fill-val=".shadow-offsetY-input" name="offsetY" max="100" value="0">
                        </div>
                        <div class="shadow-blur-slider mt-1">
                            <input type="range" class="ipt-slider cn-range-slider cn-obj-props-changer shadow-offsetY-input" data-prop="shadow" data-fill-val=".shadow-offsetY-input" name="offsetY" max="100" value="0">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>