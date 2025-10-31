<!-- Editor Adjust Filter -->
<div class="adjust-prop-head prop-head">
    <!-- Heading -->
    <?php cnPropPanelHeading(['name' => 'Adjust']) ?>
    <!-- Content -->
    <div class="adjust-content-part prop-content-part col-12">
        <div class="basic-filter-part mt-2 d-flex">
            <div class="auto-filter" data-filter="auto">
                <span class="editor-icon">
                    <?= svg_icon('fas-fa-magic'); ?>
                </span>
                <span class="f-text">Auto</span>
            </div>
            <div class="bw-filter" data-filter="bw">
                <span class="editor-icon">
                    <?= svg_icon('fas-fa-adjust'); ?>
                </span>
                <span class="f-text">B&W</span>
            </div>
            <div class="prop-filter" data-filter="prop">
                <span class="editor-icon">
                    <?= svg_icon('fas-fa-sun'); ?>
                </span>
                <span class="f-text">Prop</span>
            </div>
        </div>
        <!-- Border (line) -->
        <div class="main-divider"></div>
        <!-- Adjust Color -->
        <div class="adjust-color-part mt-3 col-12">
            <div class="tc-folding-card">
                <div class="card">
                    <label class="card-header pull-away align-center">
                        <div class="d-flex">
                            <i class="mr-2 arrow-icon">
                                <?= svg_icon('fas-fa-chevron-right'); ?>
                            </i>
                            <span class="name">Color</span>
                        </div>
                        <div class="toggle-switch-btn">
                            <div class="switch">
                                <input type="checkbox" class="card-toggler">
                                <span class="slider round"></span>
                            </div>
                        </div>
                    </label>
                    <div class="tc-collapse">
                        <div class="card-body">
                            <div class="color-vibrance-part mt-2">
                                <div class="vibrance-slider mt-2">
                                    <span class="f-text">Vibrance</span>
                                    <input type="range" class="ipt-slider cn-range-slider" data-filter="vibrance" value="0" min="-1" max="1" step="0.003921">
                                </div>
                            </div>
                            <div class="color-saturation-part mt-2">
                                <div class="saturation-slider mt-2">
                                    <span class="f-text">Saturation</span>
                                    <input type="range" class="ipt-slider cn-range-slider" data-filter="saturation" step="0.003921" min="-1" max="1" value="0">
                                </div>
                            </div>
                            <div class="color-hue-part mt-2">
                                <div class="hue-slider mt-2">
                                    <span class="f-text">Hue</span>
                                    <input type="range" class="ipt-slider cn-range-slider" data-filter="hue" min="-2" max="2" step="0.002" value="0">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Adjust filter  -->
        <div class="adjust-light-part mt-3 col-12">
            <!-- Light -->
            <div class="tc-folding-card">
                <div class="card">
                    <label class="card-header pull-away align-center">
                        <div class="d-flex">
                            <i class="mr-2 arrow-icon">
                                <?= svg_icon('fas-fa-chevron-right'); ?>
                            </i>
                            <span class="name">Light</span>
                        </div>
                        <div class="toggle-switch-btn">
                            <div class="switch">
                                <input type="checkbox" class="card-toggler">
                                <span class="slider round"></span>
                            </div>
                        </div>
                    </label>
                    <div class="tc-collapse">
                        <div class="card-body">
                            <div class="light-brightness-part mt-2">
                                <div class="brightness-slider mt-2">
                                    <span class="f-text">Brightness</span>
                                    <input type="range" class="ipt-slider cn-range-slider" data-filter="brightness" min="-1" max="1" step="0.003921" value="0.1">
                                </div>
                            </div>
                            <!-- Contrast -->
                            <div class="light-contrast-part mt-2">
                                <div class="contrast-slider mt-2">
                                    <span class="f-text">Contrast</span>
                                    <input type="range" class="ipt-slider cn-range-slider" data-filter="contrast" value="0" min="-1" max="1" step="0.003921">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Details -->
            <div class="tc-folding-card mt-3">
                <div class="card">
                    <label class="card-header pull-away align-center">
                        <div class="d-flex">
                            <i class="mr-2 arrow-icon">
                                <?= svg_icon('fas-fa-chevron-right'); ?>
                            </i>
                            <span class="name">Details</span>
                        </div>
                        <div class="toggle-switch-btn">
                            <div class="switch">
                                <input type="checkbox" class="card-toggler">
                                <span class="slider round"></span>
                            </div>
                        </div>
                    </label>
                    <div class="tc-collapse">
                        <div class="card-body">
                            <div class="details-sharpen-part mt-2">
                                <div class="sharpen-slider mt-2">
                                    <span class="f-text">Sharpen</span>
                                    <input type="range" class="ipt-slider cn-range-slider" data-filter="sharpen" min="0" max="0.1" step="0.1" value="0">
                                </div>
                            </div>
                            <!-- Blur -->
                            <div class="details-blur-part mt-2">
                                <div class="blur-slider mt-2">
                                    <span class="f-text">Blur</span>
                                    <input type="range" class="ipt-slider cn-range-slider" data-filter="blur" min="0" max="1" step="0.01" value="0.1">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Scene -->
            <div class="adjust-scene-part mt-3">
                <div class="tc-folding-card">
                    <div class="card">
                        <label class="card-header pull-away align-center">
                            <div class="d-flex">
                                <i class="mr-2 arrow-icon">
                                    <?= svg_icon('fas-fa-chevron-right'); ?>
                                </i>
                                <span class="name">Scene</span>
                            </div>
                            <div class="toggle-switch-btn">
                                <div class="switch">
                                    <input type="checkbox" class="card-toggler">
                                    <span class="slider round"></span>
                                </div>
                            </div>
                        </label>
                        <div class="tc-collapse">
                            <div class="card-body">
                                <div class="scene-pixelate-part mt-2">
                                    <div class="pixelate-slider mt-2">
                                        <span class="f-text">Pixelate</span>
                                        <input type="range" class="ipt-slider cn-range-slider" data-filter="pixelate" min="2" max="20" value="4">
                                    </div>
                                </div>
                                <!-- Noise -->
                                <div class="scene-noise-part mt-2">
                                    <div class="noise-slider mt-2">
                                        <span class="f-text">Noise</span>
                                        <input type="range" class="ipt-slider cn-range-slider" data-filter="noise" value="100" min="0" max="1000">
                                    </div>
                                </div>
                                <!-- Emboss -->
                                <div class="scene-emboss-part mt-2">
                                    <div class="emboss-slider mt-2">
                                        <span class="f-text">Emboss</span>
                                        <input type="range" class="ipt-slider cn-range-slider" data-filter="emboss" value="100" min="0" max="1000">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Fill -->
            <div class="adjust-fill-part mt-3">
                <div class="tc-folding-card">
                    <div class="card">
                        <label class="card-header pull-away align-center">
                            <div class="d-flex">
                                <i class="mr-2 arrow-icon">
                                    <?= svg_icon('fas-fa-chevron-right'); ?>
                                </i>
                                <span class="name">Fill</span>
                            </div>
                            <div class="toggle-switch-btn">
                                <div class="switch">
                                    <input type="checkbox" class="card-toggler">
                                    <span class="slider round"></span>
                                </div>
                            </div>
                        </label>
                        <div class="tc-collapse">
                            <div class="card-body">
                                <div class="fill-blendmode-part mt-2">
                                    <span class="f-text">Blend Mode</span>
                                    <select id="blend-mode" class="custom-selectbox form-control" name="blend-mode">
                                        <option selected>---- Selected ----</option>
                                        <option value="none">None</option>
                                        <option value="add">Add</option>
                                        <option value="diff">Diff</option>
                                        <option value="subtract">Subtract</option>
                                        <option value="multiply">Multiply</option>
                                        <option value="screen">Screen</option>
                                        <option value="lighten">Lighten</option>
                                        <option value="darken">Darken</option>
                                        <option value="overlay">Overlay</option>
                                        <option value="exclusion">Exclusion</option>
                                        <option value="tint">Tint</option>
                                    </select>
                                </div>
                                <!-- Color picker -->
                                <div class="fill-color-part mt-2">
                                    <div class="fill-color">
                                        <span class="f-text">Color</span>
                                        <input type="text" class="tc-color-picker fill-color-pick">
                                    </div>
                                </div>
                                <!-- Color Amount -->
                                <div class="fill-amount-part mt-2">
                                    <div class="amount-slider mt-2">
                                        <span class="f-text">Amount</span>
                                        <input type="range" class="ipt-slider cn-range-slider" data-filter="fill" min="0" max="1" value="1" step="0.01">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Filter Reset Btn -->
    <div class="adjust-reset-part mt-2 d-none">
        <button class="adjust-reset-btn">
            <i class="align-center">
                <?= svg_icon('fas-fa-sync-alt'); ?>
            </i>
            Reset
        </button>
    </div>
</div>