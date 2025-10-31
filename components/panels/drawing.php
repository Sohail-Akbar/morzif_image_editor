<!-- Editor Drawing -->
<div class="draw-prop-head prop-head">
    <!-- Heading -->
    <?php cnPropPanelHeading(['name' => 'Draw']) ?>
    <!-- Content -->
    <div class="draw-content-part prop-content-part">
        <!-- Drawing Tabs -->
        <div class="nav nav-tabs drawing-modes col-12 mt-3" id="headingOne">
            <!-- Drawing -->
            <a href="#tab-brush" class="tabs-active active draw-brush label aspect-tab tab-one" data-toggle="tab">
                <span class="editor-icon" title="Brush Tool">
                    <?= svg_icon('fas-fa-paint-brush'); ?>
                </span>
            </a>
            <!-- Eraser -->
            <a href="#tab-eraser" class="label eraser-mode aspect-tab tab-two" data-toggle="tab">
                <span class="editor-icon" title="Eraser Tool">
                    <?= svg_icon('fas-fa-eraser'); ?>
                </span>
            </a>
            <!-- Pen Drawing -->
            <a href="#tab-pen" class="label aspect-tab tab-two draw-pen-tool" data-toggle="tab">
                <span class="editor-icon" title="Pen Tool">
                    <?= svg_icon('fas-fa-pen-fancy'); ?>
                </span>
            </a>
        </div>
        <!-- Border (line) -->
        <div class="main-divider"></div>
        <!-- Drawing Tabs Data -->
        <div class="tab-content col-12 drawing-content">
            <!-- Draw content -->
            <div class="tab-pane fade show active" id="tab-brush">
                <div class="background-image mt-2">
                    <span class="draw-circle-head">
                        <span class="draw-circle"></span>
                    </span>
                </div>
                <!-- Border (line) -->
                <div class="main-divider"></div>
                <!-- Brush size -->
                <div class="brush-size mt-3">
                    <div class="brush-size-text flex-inp mb-3">
                        <span class="f-text mt-1">Size</span>
                        <input type="number" class="editor-ipt small-inp draw-brush-size-inp" min="1" max="100" value="20">
                    </div>
                    <div class="brush-size-slider">
                        <input type="range" class="ipt-slider cn-range-slider draw-brush-size" min="1" max="100" value="20">
                    </div>
                </div>
                <!-- Draw Opacity -->
                <div class="brush-softness mt-3">
                    <div class="brush-softness-text flex-inp mb-3">
                        <span class="f-text mt-1">Transparency</span>
                        <input type="number" class="editor-ipt small-inp draw-opacity-inp brush-softness-sliderbrush-softness-slider" min="0" max="1" step="0.1" value="1">
                    </div>
                    <div class="brush-softness-slider mt-3">
                        <input type="range" class="ipt-slider cn-range-slider draw-opacity" min="0" max="1" step="0.1" value="1">
                    </div>
                </div>
                <!-- Draw Color -->
                <div class="mt-3">
                    <div id="color-picker-wrapper draw-color-head">
                        <span class="f-text">Color</span>
                        <input type="text" class="tc-color-picker drawing-color-pick">
                    </div>
                </div>
            </div>
            <!-- Eraser Tab -->
            <div class="tab-pane" id="tab-eraser">
                <!-- Eraser invert -->
                <div class="brush-transparent-text flex-inp mt-2">
                    <span class="f-text mt-1">Invert Eraser</span>
                    <label class="switch eraser-invert-con">
                        <input type="checkbox" class="eraser-invert">
                        <span class="slider round"></span>
                    </label>
                </div>
                <!-- Eraser Size (show content) -->
                <div class="background-image mt-2">
                    <span class="draw-circle-head">
                        <span class="draw-circle bg-light"></span>
                    </span>
                </div>
                <!-- Border (line) -->
                <div class="main-divider"></div>
                <!-- Brush Size -->
                <div class="eraser-size eraser-size-con mt-3">
                    <div class="eraser-size-text flex-inp mb-3">
                        <span class="f-text mt-1">Size</span>
                        <input type="number" class="editor-ipt small-inp eraser-size-input" min="0" max="100" value="20">
                    </div>
                    <div class="eraser-size-slider">
                        <input type="range" class="ipt-slider cn-range-slider eraser-size_slider" min="0" max="100" value="20">
                    </div>
                </div>
            </div>
            <!-- Pan Tab -->
            <div class="tab-pane mt-3" id="tab-pen">
                <!-- Select Tag (pen properties) -->
                <div class="pen-type-selectm mt-2">
                    <select id="pen-mode" class="custom-selectbox form-control">
                        <option>Pencil</option>
                        <option>Circle</option>
                        <option>Spray</option>
                        <option>Pattern</option>
                        <option>hline</option>
                        <option>vline</option>
                        <option>square</option>
                        <option>diamond</option>
                        <option>texture</option>
                    </select>
                </div>
                <!-- Brush Size -->
                <div class="eraser-size mt-4">
                    <div class="eraser-size-text flex-inp mb-3">
                        <span class="f-text mt-1">Size</span>
                        <input type="number" class="editor-ipt draw-pen-size-inp small-inp" min="1" max="100" value="5">
                    </div>
                    <div class="eraser-size-slider">
                        <input type="range" id="drawing-line-width" class="ipt-slider cn-range-slider" min="1" max="100" value="5">
                    </div>
                </div>
                <!-- Draw Shadow Width -->
                <div class="draw-pen-mode-shadow-width mt-3">
                    <div class="flex-inp mb-3">
                        <span class="f-text mt-1">Drawing Shadow Width</span>
                        <input type="number" class="editor-ipt small-inp drawing-shadow-width-inp" value="0" min="0" max="50">
                    </div>
                    <div class="shadow-width-slider">
                        <input type="range" value="0" min="0" max="50" class="ipt-slider cn-range-slider" id="drawing-shadow-width">
                    </div>
                </div>
                <!-- Draw Shadow Offset -->
                <div class="pen-mode-shadow-offset mt-3">
                    <div class="flex-inp mb-3">
                        <span class="f-text mt-1">Drawing Shadow Offset</span>
                        <input type="number" class="editor-ipt small-inp drawing-shadow-offset-inp" value="0" min="0" max="50">
                    </div>
                    <div class="shadow-offset-slider">
                        <input type="range" value="0" min="0" max="50" class="ipt-slider cn-range-slider" id="drawing-shadow-offset">
                    </div>
                </div>
                <!-- Draw Color-->
                <div class="drawing-pen-mode-color mt-3">
                    <span class="f-text mt-1">Drawing Color</span>
                    <div class="draw-color mt-2">
                        <input type="text" class="tc-color-picker" id="drawing-color" value="#000000">
                    </div>
                </div>
                <!-- Draw Shadow Color -->
                <div class="draw-pen-mode-shadow-color mt-3">
                    <span class="f-text mt-1">Drawing Shadow Color</span>
                    <div class="shadow-color mt-2">
                        <input type="text" class="tc-color-picker" id="drawing-shadow-color">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>