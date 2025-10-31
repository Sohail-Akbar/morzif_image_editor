<div class="tc-folding-card">
    <div class="card">
        <label class="card-header pull-away align-center">
            <div class="d-flex">
                <i class="mr-2 arrow-icon">
                    <?= svg_icon('fas-fa-chevron-right'); ?>
                </i>
                <span class="name">Transform</span>
            </div>
            <div class="toggle-switch-btn" style="opacity: 0">
                <div class="switch">
                    <input type="checkbox" class="card-toggler">
                    <span class="slider round"></span>
                </div>
            </div>
        </label>
        <div class="tc-collapse">
            <div class="card-body">
                <div class="trasform-data">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="transform-checkbox mb-2 align-center">
                                <input type="checkbox" class="toggle-transform" name="aspectRatioChange" checked>
                                <span style="font-size: 12px;" class="ml-1">Aspect Ratio</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <div class="content-center">
                                    <span class="f-text mr-2">W</span>
                                    <input type="number" class="w-100 content-center editor-ipt cn-obj-props-changer" data-prop="scaledWidth" data-modify-event="scaling">
                                </div>
                                <div class="content-center mt-2">
                                    <span class="f-text mr-2">H</span>
                                    <input type="number" class="w-100 content-center editor-ipt cn-obj-props-changer" data-prop="scaledHeight" data-modify-event="scaling">
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="">
                                <div class="form-group">
                                    <div class="content-center">
                                        <span class="f-text mr-2">X</span>
                                        <input type="number" class="w-100 content-center editor-ipt cn-obj-props-changer" data-prop="left" data-modify-event="moving">
                                    </div>
                                    <div class="content-center mt-2">
                                        <span class="f-text mr-2">Y</span>
                                        <input type="number" class="w-100  content-center editor-ipt cn-obj-props-changer" data-prop="top" data-modify-event="moving">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Roate -->
                        <div class="rotate-con col-12">
                            <div class="rotate-head pull-away">
                                <span class="f-text content-center">Rotate</span>
                                <input type="number" class="editor-ipt cn-obj-props-changer object-rotate-val-input" min="0" max="360" value="0" data-prop="angle" data-fill-val=".object-rotate-val-input" data-modify-event="rotating">
                            </div>
                            <input type="range" min="0" max="360" value="0" class="ipt-slider cn-obj-props-changer cn-range-slider object-rotate-val-input" data-prop="angle" data-fill-val=".object-rotate-val-input" data-modify-event="rotating">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>