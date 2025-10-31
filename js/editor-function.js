// Global Variables
let editorGlobalId = 0,
    $editorSidebarParent = '.editor-sidebar',
    $canvasContainer = $('.image-editor-con').find('.col-target2 .editor-con-header'),
    $layersContainer = $("#layers-container"),
    $canvasDiv = $(".canvas-upper-div"),
    _canvas_cursor_ = 'default';
// Canvas Initialize
const canvas = this.__canvas = new fabric.Canvas('image-editor', {
    // controlsAboveOverlay: true,
    preserveObjectStacking: true,
    width: $canvasContainer.width(),
    height: $canvasContainer.height(),
    selectionKey: "ctrlKey",
    selection: true
}),
    f = fabric.Image.filters;[] // Filter variable
const CANVAS_OBJECT_DYNAMIC_KEYS = ['id', 'name', 'originalItem', 'lockMovementX', 'lockMovementY', 'isPositioningLine', 'name'],
    canvasCTX = canvas.getContext(),
    $canvasContainerDiv = $(".canvas-container");
// Get editor object id
function createNewId() {
    return getRand(30);
}
// Change cursor
function changeCanvasCursor(cursor) {
    // OLD CURSOR CHECK
    // color picker
    if (_canvas_cursor_ === "colorpicker") {
        $canvasDiv.dnone(true);
    }
    // free drawing cursor
    if (_canvas_cursor_ === "freeShapeDrawing") {
        freeDraw.enable = false;
        freeDraw.isDrawing = false;
        canvas.selection = freeDraw.canvasSelection;
        delete freeDraw.item;
        $('.all-shapes-container .cn-shape-element').removeClass('free-drawing');
    }

    // NEW CURSORS
    // Color picker
    if (cursor === "colorpicker") {
        $canvasDiv.dnone(false);
    }
    // Free drawing cursor
    if (cursor === "freeShapeDrawing") {
        changeCurserEvent('crosshair');
        freeDraw.enable = true;
        canvas.selection = false;
    }
    else if (cursor === 'default')
        changeCurserEvent('default');

    _canvas_cursor_ = cursor;
}
// Get current canvas cursor
function getCanvasCursor() {
    return _canvas_cursor_;
}
// TC Color picker
function tcColorPicker() {
    // Color Picker (library)
    $(".tc-color-picker:not([data-launch-color])").each(function () {
        $(this).attr("data-launch-color", "true");
        let colorPickerId = ++GLOBAL_COUNT,
            selector = `.tc-color-picker[data-clr-id="${colorPickerId}"]`,
            defaultColor = $(this).val() || "#000";
        $(this).attr("data-clr-id", colorPickerId);
        Coloris({
            el: selector,
            swatches: [
                '#264653',
                '#2a9d8f',
                '#e9c46a',
                '#f4a261',
                '#e76f51',
                '#d62828',
                '#023e8a',
                '#0077b6',
                '#0096c7',
                '#00b4d8',
            ]
        });
        Coloris.setInstance(selector, {
            theme: 'pill',
            themeMode: 'dark',
            formatToggle: true,
            defaultColor
        });


        // Change cursor on close
        $(this).on("close", function () {
            $(".tc-color-picker.active").removeClass("active");
            if (_canvas_cursor_ === "colorpicker")
                changeCanvasCursor('default');
        });
        // Active color picker
        $(this).on("open", function () {
            $(".tc-color-picker.active").removeClass("active");
            $(this).addClass("active");
        });
    });

}
// Document Ready
$(document).ready(function () {
    // Fill available width and height to resize popup
    ResizeDefaultValSet();
    // #region cookie val set (setting)
    let $workSpaceColor = $('.dropdown-menu .cn-color-mode').find('input[type="checkbox"]');
    if (readCookie('workSpaceColor') === 'dark')
        $workSpaceColor.prop('checked', true);
    else if (readCookie('workSpaceColor') === 'light')
        $workSpaceColor.prop('checked', false);
    $('body').attr('data-theme', readCookie('workSpaceColor'));
    // #endregion cookie val set (setting)
    // #region Color picker
    // Color picker from canvas
    $(document).on("click", ".clr-picker-icon", function (e) {
        e.preventDefault();
        changeCanvasCursor('colorpicker');
    });
    // slider value update
    $("input[type='range']").each(function () {
        updateSliderVal($(this));
    });
    return false;
    function asColorPickerHandler(color) {
        $('div#asColorPicker-dropdown').css("--currentColor", color);
    }
    $(".tc-color-picker").asColorPicker({
        mode: 'gradient',
        // direction: 'horizontal',
        // hideInput: true,
        hideFireChange: true,
        onInit: function () {
            $(this.element).trigger("init");
        },
        onOpen: function () {
            asColorPickerHandler(this.originValue);
            // Set input color to color picker
            $(this.element).trigger("open");
        },
        onChange: function (color) {
            l('input')
            asColorPickerHandler(color);
            $(this.element).trigger("input");
        },
        onClose: function () {
            $(this.element).trigger("close");
            if (_canvas_cursor_ === "colorpicker")
                changeCanvasCursor('default');
        },
        onApply: function () {
            l('apply')
            $(this.element).trigger("change");
        }
    });
});
/* 
convert
    'linear-gradient(91deg, rgb(14, 0, 255) 0%, rgb(255, 0, 0) 100%)' OR
    'linear-gradient(91deg, ##0E00FF 0%, #ff0000 100%)'
    to
    {
        angle: 91,
        colorStops: [
            {
                color: color1,
                position: position1
            },
            {
                color: color2,
                position: position2
            }
        ]
    }
*/
function convertlinearGradientToObject(gradient) {
    let angle = 0,
        colorStops = [];
    gradient = gradient.replace('linear-gradient(', '');
    // remove ) from end of string
    gradient = gradient.replace(/\)$/, '');
    let data = gradient.split(/,(.*)/s);
    angle = data[0];
    angle = angle.replace('deg', '');
    angle = angle.replace('to ', '');
    let angleStrings = {
        'top': 180,
        'bottom': 0,
        'left': 90,
        'right': 270
    };
    if (angle in angleStrings)
        angle = angleStrings[angle];
    angle = parseInt(angle);
    colorStops = data[1].trim();
    // split by %
    colorStops = colorStops.split('%');
    // Fetch color and position
    let colorStopsData = [];
    colorStops.forEach(function (colorStop) {
        colorStop = trim(colorStop, ', ');
        colorStop = colorStop.replace(/(, )/gm, ',');
        if (!colorStop.length) return false;
        let clrData = colorStop.split(' ');
        colorStopsData.push({
            color: clrData[0],
            position: clrData[1]
        });
    });
    return {
        angle: angle,
        colorStops: colorStopsData
    };
}

const tcl = 'linear-gradient(91deg, #f00f00 0%, #ff0000 100%)';
// Get angle
const getAngle = ([x1, y1, x2, y2], startAngle = 0) => {
    let angle = 0,
        x = x2 - x1,
        y = y2 - y1;

    if (x === 0) {
        angle = y === 0 ? 0 : y > 0 ? Math.PI / 2 : (Math.PI * 3) / 2;
    } else if (y === 0) {
        angle = x > 0 ? 0 : Math.PI;
    } else {
        angle =
            x < 0
                ? Math.atan(y / x) + Math.PI
                : y < 0
                    ? Math.atan(y / x) + 2 * Math.PI
                    : Math.atan(y / x);
    }
    return (angle * 180) / Math.PI + startAngle;
};
const angle2rect = (angle, sx, sy) => {
    while (angle < 0) angle += 360; angle %= 360;

    var a = sy, b = a + sx, c = b + sy, // 3 first corners
        p = (sx + sy) * 2, // perimeter
        rp = p * 0.00277, // ratio between perimeter & 360
        pp = Math.round(((angle * rp) + (sy >> 1)) % p); // angle position on perimeter

    if (pp <= a) return { x: 0, y: sy - pp };
    if (pp <= b) return { y: 0, x: pp - a };
    if (pp <= c) return { x: sx, y: pp - b };
    return { y: sy, x: sx - (pp - c) };
};
/* 
This function will convert 
    'linear-gradient(to top, #ff0000 0%, #000cff 100%)' to 
    new fabric.Gradient object
        return new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'pixels', // or 'percentage'
            coords: { x1: 0, y1: 0, x2: object.getWidth() / 2, y2: 0 },
            colorStops: [
                colorStop1,
            ]
        });
*/
function convertLinearGradientToFabricGradient(linearGradient, obj) {
    let
        = {
        type: 'linear',
        gradientUnits: 'pixels', // or 'percentage'
        coords: { x1: 0, y1: 0, x2: 100, y2: 0 },
        colorStops: [],
    };
    let colorData = convertlinearGradientToObject(linearGradient),
        angle = colorData.angle,
        colorStops = colorData.colorStops.map(clr => {
            return {
                color: clr.color,
                offset: parseFloat(clr.position) / 100,
            };
        });
    // Now angle is in degrees integer
    // Colorstops is like [{color: '#ff0000', offset: 0}, {color: '#000cff', offset: 1}]
    // Calculate x1,y1,x2,y2 for fabric.Gradient
    let cangle = getAngle([obj.left, obj.top, obj.left + obj.width, obj.top + obj.height], -angle),
        { x, y } = angle2rect(cangle, obj.width, obj.height),
        coords = {
            x1: x,
            y1: y,
            x2: obj.width - x,
            y2: obj.width - y
        };
    gradient.coords = coords;
    gradient.colorStops = colorStops;
    return new fabric.Gradient(gradient);
    // gradient.coords = { x1: x1, y1: y1, x2: x2, y2: y2 };
    // gradient.colorStops = colorStops;
    // return new fabric.Gradient(gradient);
}


// Set Active Object Properties
const activeObjPropSet = (properties = {}, targetType = null) => {
    let activeObj = canvas.getActiveObject();
    if (!activeObj) return false;
    if (targetType) {
        if (activeObj.type != targetType)
            return false;
    }
    // Set Text Transform Properties
    for (let prop in properties) {
        if (prop === "textTransform") {
            let value = properties[prop];
            setTextTransformOfObj(value);
        }
    }
    // Is Check Multiple Objects
    let objects = (activeObj._objects) ? activeObj._objects : [activeObj];
    objects = [activeObj];
    Array.from(objects).forEach(obj => {
        for (let key in properties) {
            let value = properties[key];
            if (typeof value == 'function') {
                properties[key] = value(obj);
            }
            // Check if value is color
            if (typeof value == 'string') {
                if (value.includes('linear-gradient')) {
                    value = convertLinearGradientToFabricGradient(value, obj);
                    properties[key] = value;
                }
            }
            if (properties[key] === undefined)
                delete properties[key];
        }
        obj.set(properties);
    });
    canvas.renderAll();
}

// Change Curser Event
function changeCurserEvent(cursor = "default", targetCanvas = canvas) {
    if (cursor.indexOf(".") !== -1) {
        cursor = `url(${cursor}), auto`;
    }
    if (targetCanvas.defaultColor == cursor) return true;
    targetCanvas.defaultCursor = `${cursor}`;
    targetCanvas.hoverCursor = `${cursor}`;
    targetCanvas.moveCursor = `${cursor}`;
}

// Deselect Objects
function deselectObject() {
    canvas.discardActiveObject();
    $layersContainer.find(".layer-content.active").removeClass("active");
    canvas.requestRenderAll();
}
// Set active object
function setActiveObject_(object) {
    if (isObjInGroup(object.id)) {
        l(object.id)
        object.hasBorders = true;
        object.hasControls = false;
    }
    canvas.setActiveObject(object);
    canvas.renderAll();
}
// Check if is event target
function isEventTarget(e, selector) {
    let $target = $(e.target);
    if ($target.is(selector) || $target.parents(selector).length)
        return true;
    return false;
}
// Deselect Object when click away from canvas
$('.editor-con-header').on('click', function (e) {
    if (!isEventTarget(e, '.canvas-container, .canvas-upper-div'))
        deselectObject();
});
$(document).on('keyup', function (e) {
    if (e.keyCode === 27) {
        deselectObject();
    }
});

// Delete Active Object
function deleteEditorObject() {
    let obj = canvas.getActiveObject();
    if (!obj) return;
    if (obj.get('type') == "activeSelection") {
        obj.forEachObject(function (object) {
            canvas.remove(object);
        });
    } else {
        canvas.remove(obj);
    }
    deselectObject();
    // layer delete
    $('.layer-content-head').find('.layer-content').each(function () {
        let layerId = $(this).attr('data-item-id');
        if (obj.id == layerId) {
            $(this).remove();
        }
    });

    saveHistory();
}

// Set Canvas Height Width
(function () {
    canvas.setDimensions({
        width: $canvasContainer.width(),
        height: $canvasContainer.height(),
    });
})();

// Toggle Full Screen
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

// Reset All Filters
function resetAllFilter() {
    let activeObj = canvas.getActiveObject();
    if (!activeObj) return false;
    if (activeObj.type === 'image') {
        activeObj.filters = [];
        activeObj.applyFilters();
        canvas.renderAll();
    }
}

// Set Object Alignment
function alignmentObject(val, activeObj) {
    let canvasWidth = canvasDimensions.resizedWidth,
        canvasHeight = canvasDimensions.resizedHeight;
    switch (val) {
        case 'left':
            activeObj.set({
                left: 0,
            });
            break;
        case 'right':
            activeObj.set({
                left: canvasWidth - activeObj.getWidth(),
            });
            break;
        case 'top':
            activeObj.set({
                top: 0,
            });
            break;
        case 'bottom':
            activeObj.set({
                top: canvasHeight - activeObj.getHeight(),
            });
            break;
        case 'centerH':
            activeObj.set({
                left: (canvasWidth / 2) - (activeObj.getWidth() / 2),
            });
            break;
        case 'centerV':
            activeObj.set({
                top: (canvasHeight / 2) - (activeObj.getHeight() / 2),
            });
            break;
    }
}

// rgba Color Generator 
function rgbaColorGenerator(color, opacity) {
    const rgbaColor = 'rgba(' + parseInt(color.slice(-6, -4), 16) + ',' + parseInt(color.slice(-4, -2), 16) + ',' + parseInt(color.slice(-2), 16) + ',' + opacity + ')';
    return rgbaColor;
}

// Clone Active Object (Duplicate)
function cloneObj(objectId) {
    canvas.forEachObject(obj => {
        let id = createNewId();
        if (obj.id == objectId) {
            let type = obj.originalItem.type;
            clone = fabric.util.object.clone(obj);
            if (clone) {
                let item = obj.originalItem;
                item.id = id;
                clone.id = id;
                clone.originalItem = item;
                canvas.add(clone);
                canvas.renderAll();
                addLayer({
                    item: {
                        type: type,
                        id: id,
                    },
                });
            }
        }
    });
}

// Set Active Object With (Target) 
function setActiveObject(target) {
    canvas.forEachObject(obj => {
        if (obj.originalItem.type === target) {
            canvas.setActiveObject(obj);
            canvas.renderAll();
        }
    });
}

// Active Object Properties Value Set
function setObjProp(prop, value) {
    let shape = canvas.getActiveObject();
    if (!shape) return;
    let type = shape.get('type');
    shape.set(prop, value);
    // prop Object
    if (type == "path") {
        if (shape.paths) {
            for (var i = 0; i < shape.paths.length; i++) {
                shape.paths[i].set(prop, value);
            }
        }
    } else if (type == "group") {
        Array.from(shape._objects).forEach((object) => {
            object.set(prop, value);
        })
    } else if (type == "activeSelection") {
        Array.from(shape._objects).forEach((object) => {
            object.set(prop, value);
            if (object.paths) {
                for (var i = 0; i < object.paths.length; i++) {
                    object.paths[i].set(prop, value);
                }
            }
        })
    }
    // Render Canvas
    canvas.renderAll();
}

// canvas all clear
function canvasClearAll(layerClear = false) {
    // Layer Clear
    if (layerClear == true) {
        $('.layer-content-head').find('.layer-content').each(function () {
            $(this).remove();
        });
    }
    // Canvas Clear
    canvas.clear();
};

// Set Properties With (Target Active Object Properties Set)
const setPropWithTarget = (target, prop = {}) => {
    canvas.forEachObject(obj => {
        if (obj.name === target) {
            obj.set({
                ...prop
            });
            canvas.requestRenderAll();
        }
    });
}

// Copy Editor Object
function copyEditorObject(editor, options = {}) {
    let activeObject = editor.getActiveObject(),
        objId = createNewId();
    if (!activeObject) return;
    activeObject.clone()
    activeObject.clone(function (cloned) {
        editor.discardActiveObject();
        let pxToMove = options.dontMove ? 0 : 5;
        cloned.set({
            top: cloned.top + pxToMove,
            left: cloned.left + pxToMove,
            evented: true
        });
        // let layer_name = get_layer_clone_name(activeObject.name);
        cloned.id = objId;
        cloned.originalItem.id = objId;
        if (cloned.type === "group") {
            // set new id to group objects
            Array.from(cloned._objects).forEach((object) => {
                let subObjId = createNewId();
                object.id = subObjId;
                object.originalItem.id = subObjId;
            });
        }
        editor.add(cloned);
        editor.setActiveObject(cloned);
        editor.requestRenderAll();
        addLayer(objId);
    }, CANVAS_OBJECT_DYNAMIC_KEYS);
}
// Ungroup layers
function unGroupObjects() {
    let group = canvas.getActiveObject();
    if (!group) return false;
    if (group.type !== 'group') return false;
    let objects = group._objects;
    group._restoreObjectsState();
    canvas.remove(group);
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        obj.hasControls = true;
        canvas.add(obj);
    }
    canvas.renderAll();
}

// Get Layer Clone Name
function get_layer_clone_name(layer_name) {
    layer_name = layer_name.trim();
    tmp_layer_name = layer_name.toLowerCase();
    // if string is copy
    if (tmp_layer_name.replace(/[^a-zA-Z]/gmi, "") === "copy") {
        return layer_name + " copy";
    }
    // if not contain copy
    if (tmp_layer_name.indexOf('copy') !== -1) {
        // if contain copy
        tmp_layer_name = removeSpaces(tmp_layer_name);
        if (tmp_layer_name.indexOf('copy') === tmp_layer_name.length - 4) {
            // return copy with 1
            layer_name += " 1";
        } else {
            // increment in copy number
            let matches = layer_name.match(/(copy +[\d]+)/gmi);
            if (matches) {
                let oldCopyName = matches[0];
                let number = parseInt(oldCopyName.substr(4));
                number += 1;
                layer_name = layer_name.substr(0, layer_name.length - oldCopyName.length);
                layer_name += " copy " + number;
                layer_name = layer_name.replace(/(  )/g, " ");
            }
        }
    } else {
        layer_name += " copy";
    }
    return layer_name;
}

// Get canvas object by id
function getObjById(id) {
    let targetObj = null;
    // let obj = canvas._objects.find(obj => obj.id == id);
    let targetObject = null;
    canvas._objects.forEach(obj => {
        if (targetObject) return true;
        if (obj.id == id) {
            targetObject = obj;
        }
        else if (obj._objects) {
            let groupObj = obj._objects.find(object => object.id == id);
            if (groupObj) {
                targetObject = groupObj;
            }
        }
    });
    return targetObject;
}
// Check if obj is inside a group
function isObjInGroup(id) {
    let obj = getObjById(id);
    if (!obj) return false;
    return obj.group == undefined ? false : true;
}
// Check if has blob images in canvas
function hasBlobImages() {
    let hasBlob = false;
    canvas.forEachObject(obj => {
        if (obj.originalItem.class === "image" && isBlobUrl(obj.getSrc())) {
            hasBlob = true;
        }
    });
    return hasBlob;
}
// Upload canvas object images
function uploadCanvasObjectImages(cb) {
    let files = [];
    canvas._objects.forEach(obj => {
        let src = obj.getSrc();
        if (obj.originalItem.class === "image" && isBlobUrl(src)) {
            if (file) {
                file.objId = obj.id;
                files.push(file);
            }
        }
    });
    tc.ajax(
        "controllers/save-editor-data",
        { uploadEditorImages: true, files },
        res => {
            let uploadedFiles = res.data;
            files.forEach((file, i) => {
                let filepath = uploadedFiles[i].filepath;
                let obj = canvas._objects.find(obj => obj.id == file.objId);
                if (obj) {
                    obj.setSrc(filepath, function () {
                        canvas.renderAll();
                    });
                }
            });
        }
    );
}
// convert image to data url
function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}
// Convert file to base 64
function getBase64(file, cb) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
// Upload image
function uploadObjectImage(file, cb) {
    if (!IS_ADMIN_) {
        getBase64(file, base64 => {
            cb(base64);
        });
        return true;
    }
    tc.ajax(
        "controllers/save-editor-data",
        { uploadEditorImages: true, file },
        res => {
            let filepath = res.data;
            cb(filepath);
        }
    )
}

let _clipboard_obj_id = null,
    _clipboardPasteId = null;
// Clone OR Duplicate item
function cloneObj(objId) {
    // let activeObject = canvas.getActiveObject();
    canvas.forEachObject(activeObject => {
        if (!activeObject) return false;
        if (activeObject.id != objId) return false;
        objId = createNewId();
        activeObject.clone(function (cloned) {
            canvas.discardActiveObject();
            cloned.set({
                top: cloned.top + 5,
                left: cloned.left + 5,
                evented: true
            });
            let layer_name = get_layer_clone_name(activeObject.originalItem.class);
            cloned.id = objId;
            cloned.name = activeObject.name;
            if (activeObject.type === 'group' || activeObject.type === 'image' || activeObject.type === 'text') {
                cloned.originalItem = {
                    id: objId,
                    src: activeObject.originalItem.src,
                    type: activeObject.originalItem.type,
                    fileType: activeObject.originalItem.fileType,
                    class: activeObject.originalItem.class
                };
            } else {
                cloned.originalItem = {
                    id: objId,
                    type: activeObject.originalItem.type,
                    fileType: activeObject.originalItem.fileType,
                    src: activeObject.originalItem.src,
                    class: activeObject.originalItem.class
                };
            }
            addLayer({
                item: {
                    type: cloned.type,
                    id: objId,
                },
            });
            _clipboardPasteId = objId;
            canvas.add(cloned);
            canvas.setActiveObject(cloned);
            canvas.requestRenderAll();
        });
        layerReload();
        CtMenu.hide();
    });
}

// Active Obj Position Change
function activeObjPositionChange(type) {
    let activeObj = canvas.getActiveObject();
    if (!type && !activeObj) return false;
    if (type === 'bringForward') {
        canvas.bringForward(activeObj);
    } else if (type === 'sendBackwards') {
        canvas.sendBackwards(activeObj);
    } else if (type === 'bringToFront') {
        canvas.bringToFront(activeObj);
    } else if (type === 'sendToBack') {
        canvas.sendToBack(activeObj);
    }
    canvas.renderAll();
    layerReload();
    CtMenu.hide();
}


// Editor Object properties set all object
function cnObjectPropertiesSet(id, prop1 = {}, prop2 = {}) {
    canvas.forEachObject(obj => {
        if (!obj) return false;
        if (obj.originalItem.id === id) {
            obj.set({ ...prop1 });
        } else {
            obj.set({ ...prop2 });
        }
        canvas.renderAll();
    });
}


// On before unload
function BeforePageLoadPopup() {
    return true;
    // Check Page Accessed By Reload
    const pageAccessedByReload = (
        (window.performance.navigation && window.performance.navigation.type === 1) ||
        window.performance
            .getEntriesByType('navigation')
            .map((nav) => nav.type)
            .includes('reload'));
    // Check Page Accessed By Reload (true)
    if (pageAccessedByReload == true) {
        if (canvas._objects.length) {
            window.onbeforeunload = function () {
                let returnMessage = 'Data will be lost if you leave the page, are you sure?';
                return returnMessage;
            };
        }
    }
}
