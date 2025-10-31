<!-- add text area -->
<div class="add-text-head mt-3 pb-2">
    <div class="row">
        <div class="col-12 mb-3">
            <span class="f-text">Text</span>
            <textarea id="textarea" class="editor-ipt w-100 cn-obj-props-changer" data-prop="text" id="textChange" rows="3"></textarea>
        </div>
        <!-- Font styles (family)-->
        <div class="col-md-12 mb-4">
            <span class="f-text">Font Styles</span>
            <div class="row m-0 mt-2">
                <div class="col-md-8 pr-1 py-0 pl-0">
                    <div class="specific-prop" data-type="text">
                        <?php require('./components/panels/properties/font-family.php'); ?>
                    </div>
                </div>
                <!-- Font Size -->
                <div class="col-md-4 pr-1 pl-0 py-0">
                    <div class="specific-prop active" data-type="text">
                        <?php require('./components/panels/properties/font-size.php'); ?>
                    </div>
                </div>
                <!-- line height -->
                <div class="col-md-6 pr-1 pl-0 py-0 mt-2">
                    <div class="cn-text-font-con small-con">
                        <input type="number" class="font-small-inp cn-obj-props-changer" data-prop="lineHeight">
                    </div>
                    <div class="style-name">Line Height</div>
                </div>
                <!-- line spacing -->
                <div class="col-md-6 pr-1 pl-0 py-0 mt-2">
                    <div class="cn-text-font-con small-con">
                        <input type="number" class="font-small-inp cn-obj-props-changer" data-prop="charSpacing">
                    </div>
                    <div class="style-name">Spacing</div>
                </div>
            </div>
        </div>

        <!-- font Size -->
        <div class="col-12 d-none">
            <div class="font-size-head mt-2">
                <span class="f-text">Font Size</span>
                <select name="text-font-size" class="custom-selectbox form-control cn-obj-props-changer" data-prop="fontSize" id="textFontSizeVal">
                    <?php for ($i = 6; $i < 150; $i += 5) { ?>
                        <option value="<?= $i ?>"><?= $i ?></option>
                    <?php } ?>
                </select>
            </div>
        </div>
        <!-- text alignment -->
        <div class="col-12">
            <div class="text-alignment-header mt-2">
                <span class="f-text">Text Align</span>
                <div class="alignment-icons">
                    <label class="text-alignment-label" title="Left">
                        <input type="radio" name="textAlign" class="cn-obj-props-changer" value="left" data-prop="textAlign">
                        <i class="editor-icon align-center">
                            <?= svg_icon('fas-fa-align-left'); ?>
                        </i>
                    </label>
                    <label class="text-alignment-label" title="Center">
                        <input type="radio" name="textAlign" class="cn-obj-props-changer" value="center" data-prop="textAlign">
                        <i class="editor-icon align-center">
                            <?= svg_icon('fas-fa-align-center'); ?>
                        </i>
                    </label>
                    <label class="text-alignment-label" title="Right">
                        <input type="radio" name="textAlign" class="cn-obj-props-changer" value="right" data-prop="textAlign">
                        <i class="editor-icon align-center">
                            <?= svg_icon('fas-fa-align-right'); ?>
                        </i>
                    </label>
                </div>
            </div>
        </div>
        <!-- text Style -->
        <div class="col-12">
            <div class="text-alignment-header mt-2">
                <span class="f-text">Style</span>
                <div class="alignment-icons">
                    <label class="label" title="Uppercase">
                        <input type="checkbox" class="cn-obj-props-changer" data-prop="textTransform" value="uppercase" data-uncheck="lowercase">
                        <i class="editor-icon align-center">
                            <?= svg_icon('fas-fa-text-height'); ?>
                        </i>
                    </label>
                    <label class="label" title="italic">
                        <input type="checkbox" class="cn-obj-props-changer" value="italic" data-prop="fontStyle" data-uncheck="normal">
                        <i class="editor-icon align-center">
                            <?= svg_icon('fas-fa-italic'); ?>
                        </i>
                    </label>
                    <label class="label" title="Bold">
                        <input type="checkbox" class="cn-obj-props-changer" name="fontWeight" value="bold" data-prop="fontWeight" data-uncheck="normal">
                        <i class="editor-icon align-center">
                            <?= svg_icon('fas-fa-bold'); ?>
                        </i>
                    </label>
                    <br>
                    <label class="label" title="Under Line">
                        <input type="checkbox" class="cn-obj-props-changer" data-value-type="boolean" value="true" data-prop="underline">
                        <i class="editor-icon mt-2 px-3 align-center">
                            <?= svg_icon('fas-fa-underline'); ?>
                        </i>
                    </label>
                    <label class="label" title="Over Line">
                        <input type="checkbox" class="cn-obj-props-changer" data-value-type="boolean" value="true" data-prop="overline">
                        <i class="editor-icon mt-2 align-center" style="transform: rotate(180deg);">
                            <?= svg_icon('fas-fa-underline'); ?>
                        </i>
                    </label>
                    <label class="label" title="Line Through">
                        <input type="checkbox" class="cn-obj-props-changer" data-value-type="boolean" value="true" data-prop="linethrough">
                        <i class="editor-icon mt-2 align-center">
                            <?= svg_icon('fas-fa-unlink'); ?>
                        </i>
                    </label>
                </div>
            </div>
        </div>
    </div>
</div>