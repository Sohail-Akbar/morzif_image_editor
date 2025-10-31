<!-- Editor Content -->
<div class="col-target2 pl-0" style="flex: 1; position: relative;">
    <!-- editor nav -->
    <div class="editor-nav-con">
        <!-- nav left items -->
        <div class="nav-left-items d-flex">
            <!-- group text fill on image text background -->
            <div class="align-center mt-1">
                <input type="checkbox" class="tc-checkbox toggle-object-controls" data-label="Show Transform Controls" checked>
            </div>
            <i class="mx-2 mt-1 fill-image-bg cp" title="Text Background Image Fill">
                <?= svg_icon('fas-fa-object-ungroup'); ?>
            </i>
        </div>
        <!-- nav right items -->
        <div class="nav-right-items align-center">
            <div class="cn-obj-align-justify-container d-none">
                <div class="d-flex">
                    <!-- Align item justify (x) -->
                    <span class="mr-1">X :</span>
                    <div class="dropdown tc-select mr-3">
                        <div class="tc-dropdown-label-head px-1" data-toggle="dropdown">
                            <div class="tc-select-label tc-selected-content"></div>
                            <i class="align-center">
                                <?= svg_icon('fas-fa-chevron-down'); ?>
                            </i>
                        </div>
                        <input type="hidden" class="tc-select-input cn-obj-props-changer" data-prop="justifyContent" data-direction="x">
                        <div class="dropdown-menu">
                            <?php foreach (['left', 'right', 'center', 'spaceBetween', 'spaceAround'] as $value) {
                                $text = toNormalCase($value);
                                $text = ucwords($text); ?>
                                <div class="tc-option align-center" data-value="<?= $value ?>"><?= $text ?></div>
                            <?php } ?>
                        </div>
                    </div>
                    <!-- Align item justify (Y) -->
                    <span class="mr-1">Y :</span>
                    <div class="dropdown tc-select mr-3">
                        <div class="tc-dropdown-label-head px-1" data-toggle="dropdown">
                            <div class="tc-select-label tc-selected-content"></div>
                            <i class="align-center">
                                <?= svg_icon('fas-fa-chevron-down'); ?>
                            </i>
                        </div>
                        <input type="hidden" class="tc-select-input cn-obj-props-changer" data-prop="justifyContent" data-direction="y">
                        <div class="dropdown-menu">
                            <?php foreach (['left', 'right', 'center', 'spaceBetween', 'spaceAround'] as $value) {
                                $text = toNormalCase($value);
                                $text = ucwords($text); ?>
                                <div class="tc-option align-center" data-value="<?= $value ?>"><?= $text ?></div>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
            <!-- group alignment -->
            <div class="group-alignment-container d-flex">
                <div class="top-btn mx-2 pt-1" title="Align Top edges" data-align-item="top" onclick="groupAlignment('top')">
                    <i><?= svg_icon('fas-fa-align-top-edges') ?></i>
                </div>
                <div class="centerH-btn mx-2 pt-0" title="Align Horizontaly edges" data-align-item="centerV" onclick="groupAlignment('centerV')">
                    <div class="rotate-90 p-0">
                        <i class=""><?= svg_icon('fas-fa-vartically-center-edges'); ?></i>
                    </div>
                </div>
                <div class="bottom-btn mx-2 pt-1" title="Align Bottom edges" onclick="groupAlignment('bottom')">
                    <i><?= svg_icon('fas-fa-align-bottom-edges'); ?></i>
                </div>
                <div class="left-btn mx-2 pt-1" title="Align Left edges" onclick="groupAlignment('left')">
                    <i><?= svg_icon('fas-fa-align-left-edges'); ?></i>
                </div>
                <div class="centerV-btn mx-2 pt-1" title="Align Vartically edges" onclick="groupAlignment('centerH')">
                    <i><?= svg_icon('fas-fa-vartically-center-edges'); ?></i>
                </div>
                <div class="right-btn mx-2 pt-1" title="Align Right edges" onclick="groupAlignment('right')">
                    <i><?= svg_icon('fas-fa-align-right-edges') ?></i>
                </div>
            </div>
            <!-- Curser -->
            <i class="item item-selected" title="Items Select">
                <?= svg_icon('fas-fa-mouse-pointer'); ?>
            </i>
            <!-- Resize -->
            <div class="Resize mx-2 cp" title="Resize" data-toggle="modal" data-target="#editorResize">
                <i class="mx-2 canvas-resize">
                    <?= svg_icon('fas-fa-expand-arrows-alt') ?>
                </i>
            </div>
            <!-- Download dropdown -->
            <div class="dropdown mx-2">
                <i data-toggle="dropdown">
                    <?= svg_icon('fas-fa-download'); ?>
                </i>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item download" data-target="download" data-type="png">PNG</a>
                    <a href="#" class="dropdown-item download" data-target="download" data-type="jpg">JPG</a>
                    <a href="#" class="dropdown-item download" data-target="download" data-type="svg">SVG</a>
                    <a href="#" class="dropdown-item download" data-target="download" data-type="pdf">PDF</a>
                </div>
            </div>
            <!-- Save Projects -->
            <?php if (IS_ADMIN) { ?>
                <i class="mx-2" title="Save" data-toggle="modal" data-target="#saveProjects">
                    <?= svg_icon('fas-fa-save'); ?>
                </i>
            <?php } ?>
            <!-- Themes -->
            <div class="dropdown mx-3">
                <i data-toggle="dropdown">
                    <?= svg_icon('fas-fa-setting'); ?>
                </i>
                <div class="dropdown-menu cn-dropdown-stopPropagation">
                    <div class="cn-theme-container pull-away">
                        <label class="cn-color-mode">
                            <span class="setting-name">Workspace color</span>
                            <div class="toggle-switch-btn">
                                <label class="switch mb-0">
                                    <input type="checkbox" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- editor canvas -->
    <div class="editor-con-header">
        <div class="canvas-editor-con">
            <div class="canvas-tag-container">
                <div class="tc-cn-items">
                    <div class="cn-crop-icon cn-start-crop-btn cp" title="Canvas Crop" data-crop-type="canvas">
                        <i>
                            <?= svg_icon('fas-fa-crop-alt'); ?>
                        </i>
                    </div>
                    <div class="cn-bg-color" title="Background Color">
                        <input type="text" value="#ffffff" class="tc-color-picker">
                    </div>
                </div>
                <canvas class="image-editor" id="image-editor"></canvas>
                <div class="canvas-upper-div d-none clr-picker-prevent">
                    <div class="content">
                        <div class="color-picker-cursor">
                            <img src="images/editor-icon/color-picker-cursor.svg" alt="picker icon" class="picker-icon">
                            <span class="color-box"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- content footer -->
    <div class="editor-content-footer">
        <!-- left items -->
        <div class="left-items">
        </div>
        <!-- center items -->
        <div class="center-items d-flex">
            <button class="editor-btn mr-3 full-screen py-1" title="Full Screen">
                <i class="align-center">
                    <?= svg_icon('fas-fa-compress'); ?>
                </i>
            </button>
            <button class="editor-btn mr-3 reset-zoom py-1" title="Zoom Reset">
                <i class="align-center">
                    <?= svg_icon('fas-fa-search') ?>
                </i>
            </button>
            <!-- zoom -->
            <div class="zoom-header">
                <button class="editor-btn zoom-in">
                    <i class="cp">
                        <?= svg_icon('fas-fa-search-plus'); ?>
                    </i>
                </button>
                <div class="zoom-amount mx-3">
                    <input type="number" class="zoom-val" value="100" minlength="100">
                </div>
                <button class="editor-btn zoom-out">
                    <i class="cp">
                        <?= svg_icon('fas-fa-search-minus'); ?>
                    </i>
                </button>
            </div>
        </div>
        <!-- right items -->
        <div class="right-items">
            <button class="py-1 undo-items editor-btn mx-1" title="Undo">
                <i class="align-center">
                    <?= svg_icon('fas-fa-undo'); ?>
                </i>
            </button>
            <button class="py-1 redo-items editor-btn mx-1" title="Redo">
                <i class="align-center">
                    <?= svg_icon('fas-fa-redo') ?>
                </i>
            </button>
        </div>
    </div>
</div>