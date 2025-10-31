const $propsPanel = $('#propsPanel'),
    $objPropsNav = $("#objPropsNav"),
    $objPropsContainer = $(".obj-prop-panel-container");
// Active Properties Panel on active
function activeObjPropsPanel(obj) {
    showObjPropsNav(obj);
    if (!obj) {
        return false;
    }
    // Show panel according to selected object type
    let item = obj.originalItem;
    if (!item) return false;
    let type = item.class,
        types = {
            'shape': 'shapes',
            'text': 'add-text',
            'image': 'imageUpload',
        };
    showObjProps(type, obj);
    showObjectColors();
    fillActiveObjPropsInputs();
    // Fill Object props to inputs
    // return true;
    //  return true because prop panel is migrated to another place
    return false;
    let panel = types[type];
    let $panel = $(`.editor-sidebar .option-properties[data-toggle="${panel}"]`),
        $tab = $(`.editor-sidebar .sidebar-item[data-target="${panel}"]`),
        $overlayPanels = $(`.option-properties[data-overlay="true"]`),
        isOverlayPanelActive = $overlayPanels.hasClass("active"),
        hideOtherPanels = isOverlayPanelActive ? false : true;
    showSidebarPanel([
        $panel,
        $tab
    ]);
    if (isOverlayPanelActive) {
        $overlayPanels.addClass("active");
    }
}
// Show obj props
function showObjProps(types, obj) {
    // Hide specific properties
    $objPropsContainer.find('.specific-prop.active').removeClass("active");
    $objPropsNav.find(".cn-obj-props-list").dnone(true);
    if (types == null) return true;
    if (typeof types == 'string')
        types = [types];
    types.forEach(type => {
        if (getObjType() != type)
            return true;
        $objPropsContainer.find(`[data-type*="${type}"]`).addClass('active');
    });
    if (!obj) return false;
    if (obj.originalItem.class === "selectionRect") {
        $objPropsNav.find(`.cn-obj-props-list[data-type="selectionRect"]`).dnone(false);
    } else if (obj.originalItem.class === "CnSelectionRect") {
        $objPropsNav.find(`.cn-obj-props-list[data-type="CnSelectionRect"]`).dnone(false);
    } else {
        $objPropsNav.find(`.cn-obj-props-list[data-type="default"]`).dnone(false);
    }
}
// Hide obj props
function hideObjProps() {
    $objPropsNav.removeClass("active");
    $propsPanel.removeClass("active");
}
// Show Colors of selected object
function showObjectColors() {
    let obj = canvas.getActiveObject(),
        $shapeColorCon = $('.shape-fill-container');
    if (!obj) return false;
    $shapeColorCon.html('');
    if (!obj.originalItem) return false;
    let $colorPickerInput = $(`<input class="tc-color-picker cn-obj-props-changer" data-prop="fillPath" type="text" value="#000000" />`);
    // check if isn't group
    if (!obj._objects) {
        let $input = $colorPickerInput.clone();
        $input.attr("data-prop", "fill");
        $shapeColorCon.append($input);
    } else {
        let objColorLenghtArr = obj._objects.slice(1, 20);
        let colorsLength = objColorLenghtArr.length - 4;
        let templateColorsLength = objColorLenghtArr.length - 8;
        $shapeColorCon.each(function () {
            let isCollapseClrs = $(this).hasClass("collapse-clrs"),
                templateCollapseClrs = $(this).hasClass('.template-collapse-clrs'),
                $shapeColorContainer = $(this);
            obj._objects.forEach((item, i) => {
                if (i > 20) return false;
                let $input = $colorPickerInput.clone(),
                    color = item.fill || '#000';
                $input.attr("data-fill-id", i);
                $input.attr("value", color);
                // colors langth 4
                if (i >= 4 && isCollapseClrs) {
                    if ($shapeColorContainer.find(".tc-clrs-dropdown").length == 0) {
                        // Append Dropdown
                        $shapeColorContainer.append(`<div class="dropdown tc-clrs-dropdown">
                        <span class="tc-clr-circle" data-toggle="dropdown">+${colorsLength}</span>
                        <div class="dropdown-menu"></div>
                        </div>`)
                    }
                    $shapeColorContainer.find(".tc-clrs-dropdown .dropdown-menu").append($input);
                } else if (i >= 8) {
                    if ($shapeColorContainer.find(".tc-clrs-dropdown").length == 0) {
                        // Append Dropdown
                        $shapeColorContainer.append(`<div class="dropdown tc-clrs-dropdown">
                        <span class="tc-clr-circle" data-toggle="dropdown">+${templateColorsLength}</span>
                        <div class="dropdown-menu"></div>
                        </div>`)
                    }
                    $shapeColorContainer.find(".tc-clrs-dropdown .dropdown-menu").append($input);
                } else {
                    $shapeColorContainer.append($input);
                }

            });
        });
    }
    tcColorPicker();
    objPropsInputsHandler();
}
// Show obj props panel
$(document).on('click', ".cn-obj-props-nav .cn-nav-item.properties-panel-show", function () {
    $propsPanel.addClass("active");
});
// Hide obj props panel
$propsPanel.on("click", ".close-obj-props-panel", function () {
    $propsPanel.removeClass('active');
});

// Fill active object props inputs
function fillActiveObjPropsInputs($targets = null) {
    let obj = canvas.getActiveObject();
    if (!obj) return false;
    if (!obj.originalItem) return false;
    if (obj.originalItem.type === "group") return false;
    if ($targets === null)
        $targets = $(".cn-obj-props-changer");
    $targets.each(function () {
        let type = $(this).data("prop"),
            inputType = $(this).attr("type"),
            inputValue = $(this).val(),
            isBooleanValue = $(this).dataVal("value-type") === "boolean",
            value = obj[type],
            objType = obj.originalItem.class;
        if (isBooleanValue) {
            if (isJson(inputValue)) inputValue = JSON.parse(inputValue);
        }
        // Check if toggle type mean (radio or checkbox)
        let isToggleType = ["checkbox", "radio"].includes(inputType);
        // Validate value
        if (inputType == "number" || inputType == "range") {
            if (typeof value !== "object")
                value = parseFloat(value);
        }
        if (type === "shadow") {
            // Shadow
            if (value) {
                let $shadowCon = $(".cn-obj-props-shadow")
                $shadowCon.find(`.cn-obj-props-changer[name="color"]`).val(value.color);
                $shadowCon.find(`.cn-obj-props-changer[name="blur"]`).val(value.blur);
                $shadowCon.find(`.cn-obj-props-changer[name="offsetX"]`).val(value.offsetX);
                $shadowCon.find(`.cn-obj-props-changer[name="offsetY"]`).val(value.offsetY);
            }
        } else if (type === "clipPath") {
            // Radius
            let val = $(this).attr("min");
            if (value) {
                if (value.inputValue)
                    value = value.inputValue
            } else {
                value = val;
            }
            $(this).val(value);
        } else if (type === 'src' && objType === 'image') {
            // Image src
            let $backgroundImg = $('.background-prop-head').find('.file-upload-data-con .background-image'),
                src = obj.getSrc();
            $backgroundImg.css("background-image", "url(" + src + ")");
        } else if (type === 'textAlign' && objType == 'text') {
            let textAlign = obj.textAlign;
            $('.cn-obj-props-nav .text-align-icon').find('i').dnone(true);
            $(this).find(`.text-align-icon .${textAlign}-icon`).dnone(false);
        } else if (type === 'fontFamily' && objType == 'text') {
            let $textFontFamily = $('.tc-select .tc-select-label.font-family-name');
            $textFontFamily.each(function () {
                $(this).text(obj.fontFamily);
            });
        } else if (type === 'fontSize' && objType == 'text') {
            $('.tc-select.font-size-head').each(function () {
                $(this).find('input').val(obj.fontSize);
            });
        } else {
            if (isToggleType) {
                // Checkbox or radio
                let name = $(this).attr("name");
                $(this).prop("checked", value == inputValue);
                if ($(this).hasClass("prop-toggle-checkbox")) {
                    $(this).trigger("canvasObjChanged");
                }
            } else {
                if (type === "scaledWidth") value = obj.getScaledWidth();
                else if (type === "scaledHeight") value = obj.getScaledHeight();
                else if (type === "opacity") value = toNumber(value) * 100;
                $(this).val(value);
            }
        }
        // check if color input
        if ($(this).hasClass("tc-color-picker") && objType != 'shape') {
            // $(this).parents(".asColorPicker-wrap").find('.asColorPicker-trigger span').css("background-color", value);
            this.dispatchEvent(new Event('input', { bubbles: true }))
        }
    });
}

let textFontSizeNavVal = $('.tc-select-label.font-size-val').text();
//#region Aspect ration change
const $aspectRatioCheckbox = $(".toggle-transform");
let isAspectRatioChecked = $aspectRatioCheckbox.prop("checked");
$aspectRatioCheckbox.on("change", function () {
    isAspectRatioChecked = this.checked;
});
// object properties change event
function objPropsInputsHandler() {
    $(".cn-obj-props-changer:not([data-launch-prop])").each(function () {
        $(this).attr("data-launch-prop", "true");
        let tagName = $(this).tagName(),
            inputType = $(this).attr('type'),
            event = 'click';
        tagName == 'input' ? event = 'input' : event;
        tagName == 'textarea' ? event = 'input' : event;
        // Check if toggle type mean (radio or checkbox)
        let isToggleType = ["checkbox", "radio"].includes(inputType),
            dataUncheckValue = $(this).dataVal("uncheck");
        if (isToggleType || inputType == "file" || tagName === "select")
            event = "change";
        $(this).on(event, function () {
            let val = $(this).data("prop-value"),
                activeObj = canvas.getActiveObject();
            if (!val)
                val = $(this).val();
            // Check if value is boolean
            if ($(this).dataVal("value-type") === "boolean") {
                if (isJson(val))
                    val = JSON.parse(val);
                if (isToggleType) {
                    val = $(this).is(":checked");
                }
            }
            //s uncheck value for checkbox
            if (isToggleType) {
                if (!$(this).is(":checked") && dataUncheckValue)
                    val = dataUncheckValue;
            }
            prop = $(this).dataVal('prop');
            // #region Fill Value
            let target = $(this).dataVal("fill-val");
            if (target)
                $(target).not(this).val(val);
            // #endregion Fill Value
            if (!prop) return false;
            // Validate value
            if (inputType == "number" || inputType == "range") {
                val = parseFloat(val);
                if (isNaN(val)) return false;
            }
            let originalValue = val;
            // Validate props
            // Shadown
            if (prop == 'shadow') {
                let $shadowCon = $(".cn-obj-props-shadow");
                let shadowVal = {
                    color: $shadowCon.find(`.cn-obj-props-changer[name="color"]`).val(),
                    blur: parseInt($shadowCon.find(`.cn-obj-props-changer[name="blur"]`).val()),
                    offsetX: parseInt($shadowCon.find(`.cn-obj-props-changer[name="offsetX"]`).val()),
                    offsetY: parseInt($shadowCon.find(`.cn-obj-props-changer[name="offsetY"]`).val()),
                };
                if ($(this).hasAttr('data-shadow') == true) {
                    let shadowColor = $(this).data('shadow-color'),
                        shadowBlur = parseInt($(this).data('shadow-size')),
                        shadowOffsetX = parseInt($(this).data('offset-x')),
                        shadowOffsetY = parseInt($(this).data('offset-y'));
                    shadowVal = {
                        color: shadowColor,
                        blur: shadowBlur,
                        offsetX: shadowOffsetX,
                        offsetY: shadowOffsetY,
                    }
                    $shadowCon.find(`.cn-obj-props-changer[name="color"]`).val(shadowColor);
                    $shadowCon.find(`.cn-obj-props-changer[name="blur"]`).val(shadowBlur);
                    $shadowCon.find(`.cn-obj-props-changer[name="offsetX"]`).val(shadowOffsetX);
                    $shadowCon.find(`.cn-obj-props-changer[name="offsetY"]`).val(shadowOffsetY);
                }
                val = shadowVal;
            }
            // Object Radius (clipath)
            if (prop === 'clipPath') {
                let radius = Math.abs(val);
                val = (obj) => {
                    let objWidth = obj.width + obj.height,
                        radiusPer = (radius * objWidth) / 100;
                    return new fabric.Rect({
                        width: obj.width,
                        height: obj.height,
                        rx: radiusPer / obj.scaleX,
                        ry: radiusPer / obj.scaleY,
                        left: -obj.width / 2,
                        top: -obj.height / 2,
                        objectCaching: false
                    });
                    return new fabric.Circle({
                        radius: radiusPer,
                        inputValue: originalValue,
                        originX: 'center',
                        originY: 'center',
                    });
                }
            }
            // Set width
            let isAspectRatio = isAspectRatioChecked;
            if (prop === 'scaledWidth') {
                let scale = originalValue / activeObj.width;
                val = obj => {
                    if (!isAspectRatio)
                        obj.set("scaleX", scale);
                    else
                        obj.scale(scale);
                    return undefined;
                }
            }
            // Set height
            if (prop === 'scaledHeight') {
                let scale = originalValue / activeObj.height;
                val = obj => {
                    if (!isAspectRatio)
                        obj.set("scaleY", scale);
                    else
                        obj.scale(scale);
                    return undefined;
                }
            }
            // File src
            if (prop === "src") {
                if (!this.files.length) return false;
                let file = this.files[0];
                let current_width = activeObj.getWidth(),
                    current_height = activeObj.getHeight();
                uploadObjectImage(file, src => {
                    activeObj.setSrc(src, () => {
                        activeObj.originalItem.src = src;
                        activeObj.scaleToWidth(current_width);
                        activeObj.scaleToHeight(current_height);
                        activeObj.dirty = true;
                        canvas.requestRenderAll();
                    }, { crossOrigin: 'annonymous' });
                });
                val = undefined
            }
            // Alignments
            if (prop == 'textAlign') {
                let textAlignment = activeObj.textAlign;
                if (textAlignment == 'left') {
                    textAlignment = 'center';
                } else if (textAlignment == 'center') {
                    textAlignment = 'right';
                } else if (textAlignment == 'right') {
                    textAlignment = 'left';
                }
                $('.cn-obj-props-nav .text-align-icon').find('i').dnone(true);
                $(this).find(`.text-align-icon .${textAlignment}-icon`).dnone(false);
                val = textAlignment;
            }
            // Property toggler checkbox
            if ($(this).hasClass("prop-toggle-checkbox")) {
                let targetProp = $(this).data("target-prop"),
                    isChecked = $(this).is(":checked"),
                    oldPropsKey = `${prop}Old`,
                    oldProps = activeObj[oldPropsKey] || {};

                // Set Value of checkbox
                val = $(this).is(":checked") ? 'true' : 'false';
                activeObj.set(prop, val);
                canvas.requestRenderAll();
                // Set values of other props
                targetProp.split(",").forEach(prop => {
                    if (prop === "shadow") {
                        if (!isChecked) {
                            oldProps.shadow = {
                                color: '#0000',
                                blur: 0,
                                offsetX: 0,
                                offsetY: 0,
                                target_id: null,
                            }
                        }
                        let currentValues = {};
                        for (let key in oldProps.shadow) {
                            let keyValue = oldProps.shadow[key];
                            let $input = $propsPanel.find(`[data-prop="shadow"][name="${key}"]`);
                            currentValues[key] = $input.val();
                            $input.val(keyValue);
                        }
                        $propsPanel.find(`[data-prop="shadow"][name="blur"]`).trigger("input");
                        if (!isChecked) {
                            oldProps[prop] = currentValues;
                        }
                        return true;
                    }
                    let $targetProp = $propsPanel.find(`[data-prop="${prop}"]`),
                        defaultValue = $targetProp.attr("type") == "number" ? 0 : '',
                        oldPropValue = oldProps[prop] || defaultValue;
                    if (!$targetProp.length) return true;
                    if (isChecked) {
                        $targetProp.val(oldPropValue).trigger('input');
                    } else {
                        oldProps[prop] = $targetProp.val();
                        $targetProp.val(defaultValue).trigger('input');
                    }
                });
                if (!isChecked) {
                    activeObj[oldPropsKey] = oldProps;
                }
                return true;
            }
            // Font Family
            if (prop === 'fontFamily') {
                let $textFontFamily = $('.tc-select .tc-select-label.font-family-name');
                $textFontFamily.each(function () {
                    $(this).text(val);
                });
            }
            // Rotate
            if (prop === "angle") {
                val = obj => {
                    obj.rotate(originalValue);
                    return undefined;
                }
            }
            if (prop === 'fontSize') {
                let textFontSize = '';
                if ($(this).data('font-size') == 'minus')
                    textFontSizeNavVal = +textFontSizeNavVal - 2;
                else if ($(this).data('font-size') == 'plus')
                    textFontSizeNavVal = +textFontSizeNavVal + 2
                else
                    textFontSizeNavVal = val;

                val = textFontSizeNavVal;
                $('.tc-select.font-size-head').each(function () {
                    $(this).find('input').val(val);
                });
            }
            // Layer system (send back or bring forward)
            if (prop === "bringForward") {
                val = obj => {
                    canvas.bringForward(obj);
                    return undefined;
                }
            }
            if (prop === "sendBackwards") {
                val = obj => {
                    canvas.sendBackwards(obj);
                    return undefined;
                }
            }
            // Fill paths from shapes
            if (prop === "fillPath" && activeObj._objects) {
                let pathIndex = $(this).dataVal("fill-id");
                activeObj._objects[pathIndex].set("fill", originalValue);
                canvas.requestRenderAll();
                return true;
            }
            // Opacity
            if (prop === "opacity") {
                val = toNumber(val) / 100;
            }
            // Justify content
            if (prop === 'justifyContent') {
                let dir = $(this).dataVal("direction");
                activeSelectionFlex(dir, val);
                return true;
            }
            let props = {};
            props[prop] = val;
            activeObjPropSet(props);
        });
        let historyEvent = "change";
        // history save event
        $(this).on(historyEvent, function () {
            saveHistory();
        });
    });
}
objPropsInputsHandler();

// Object events
(function () {
    let events = ['moving', 'scaling', 'rotating', 'skewing', 'resizing'];
    events.forEach(event => {
        canvas.on(`object:${event}`, function (e) {
            let $targets = $(`.cn-obj-props-changer[data-modify-event="${event}"]`);
            fillActiveObjPropsInputs($targets);
        });
    });
})();
// Fix coords for canvas ctx
function fixCoords(coord) {
    return coord * window.devicePixelRatio;
}
$(".prop-toggle-checkbox").on("canvasObjChanged", function () {
    let isChecked = $(this).is(":checked"),
        $parent = $(this).parents(".tc-folding-card"),
        $header = $parent.find(".card-header"),
        $body = $parent.find(".tc-collapse");
    if (isChecked) {
        $header.addClass("active");
        $body.slideDown(0);
    } else {
        $header.removeClass("active");
        $body.slideUp(0);
    }
});