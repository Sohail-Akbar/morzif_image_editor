// delete object with layer icon
$(document).on('click', ".delete-item[data-target='true']", function () {
    deleteEditorObject();
    CtMenu.hide();
});

// #region adding items to editor
function addItemToEditor(item, properties = {}, options = {}) {
    let shape = 0,
        { src, type, fileType } = item,
        id = createNewId();
    if (!fileType)
        fileType = type;
    // Item class
    if (!item.class) {
        let itemClasses = {
            'svg': 'shape'
        },
            itemClass = fileType in itemClasses ? itemClasses[fileType] : fileType;
        item.class = itemClass;
    }

    properties.id = id;
    properties.name = item.type;
    item.id = id;
    item.fileType = fileType;
    properties.options = options;
    properties.originalItem = item;

    if (fileType == "svg") {
        properties = {
            ...properties,
        };
        fabric.loadSVGFromURL(src, function (objects, options) {
            obj = fabric.util.groupSVGElements(objects, options);
            if (item.type === "mask") {
                // add mask on active object
                let activeObj = canvas.getActiveObject();
                if (!activeObj) return false;
                let svgObj = obj,
                    { width, height } = activeObj;
                svgObj.set({
                    left: -(width / 2),
                    top: -(height / 2),
                })
                let scale = width / svgObj.width;
                svgObj.scaleX = scale;
                scale = height / svgObj.height;
                svgObj.scaleY = scale;

                activeObj.dirty = true;
                activeObj.clipPath = svgObj;
                canvas.renderAll();
                return true;
            }
            // add svg icon
            obj.set(properties)
                .setCoords();
            if (!options.beforeRender) {
                obj.scaleToWidth(200);
            }
            // Add item to Editor
            canvas.add(obj);
            addItemToEditorCallback(id);
        });
    } else if (fileType == "text") {
        properties = {
            fontFamily: 'sans-serif',
            fill: '#333',
            erasable: false,
            ...properties,
        };
        shape = new fabric.IText(src, properties);
        canvas.add(shape);
        addItemToEditorCallback(id);
    } else if (fileType == "image") {
        fabric.Image.fromURL(src, function (img) {
            img.set(properties);
            // Add item to Editor
            canvas.add(img);
            addItemToEditorCallback(id);
        });
    }
}
// add layers, etc of editor object
function addItemToEditorCallback(objId) {
    let obj = getObjById(objId);
    if (!obj) return false;
    let options = obj.options || {},
        centerObject = "centerObject" in options ? options.centerObject : true,
        selected = "selected" in options ? options.selected : true;
    // Before Render Callback
    if (options.beforeRender) {
        options.beforeRender(obj);
    }
    // Add layers, etc
    renderCanvasObject(objId);
    // center object
    if (centerObject) {
        alignmentObject('centerH', obj);
        alignmentObject('centerV', obj);
    }
    // Make obj active
    if (selected)
        obj.erasable = false;
    canvas.setActiveObject(obj);
    // Render canvas
    canvas.renderAll();
    saveHistory();
}
// #endregion  adding items to editor
// #region Render Canvas object (call this when add new object)
function renderCanvasObject(objId = null) {
    let obj = getObjById(objId);
    if (!obj) return false;
    // Add Layer
    addLayer(objId);
}
// #endregion Render Canvas object (call this when add new object)
// Add Text
$($editorSidebarParent).on('click', ".add-text-button", function () {
    let $parent = $('.add-text-prop-head');
    // Text
    addItemToEditor({
        type: 'text',
        src: 'Lorem ipsum ....'
    });
    $parent.find('.text-all-prop').dnone(false);
});

// Set Text Transform Value (upperCase And LowerCase)
function setTextTransformOfObj(transformType, obj = null) {
    if (!obj) {
        obj = canvas.getActiveObject();
        if (!obj) return false;
    }
    let text = obj.text;
    if (transformType === "uppercase")
        text = text.toUpperCase();
    else if (transformType === "lowercase")
        text = text.toLowerCase();

    obj.set('text', text);
}

const createdAndUpdatedProp = (e) => {
    let activeObject = canvas.getActiveObject();
    // Active Obj props panel
    activeObjPropsPanel(activeObject);
    // Check Page Accessed By Reload
    BeforePageLoadPopup();
    if (!activeObject) return false;
    // Active Object ID
    let objectId = activeObject.id;
    // Current Layers
    $layersContainer.find(".layer-content.active").removeClass("active");
    $layersContainer.find(".layer-content[data-item-id='" + objectId + "']").addClass("active");

    // Background Image lockMovement Check X And Y 
    let $navLockIcon = $('#TcObjectLock');
    if (activeObject.lockMovementY) {
        $navLockIcon.find('.lock-btn').dnone(false);
        $navLockIcon.find('.unlock-btn').dnone(true);
        activeObject.lockScalingX = true;
        activeObject.lockScalingY = true;
    } else {
        $navLockIcon.find('.lock-btn').dnone(true);
        $navLockIcon.find('.unlock-btn').dnone(false);
        activeObject.lockScalingX = false;
        activeObject.lockScalingY = false;
    }
}

// Objects Selection Created
canvas.on("selection:created", function (e) {
    createdAndUpdatedProp(e);
    saveHistory();
});

// Objects Selection Updated
canvas.on("selection:updated", function (e) {
    createdAndUpdatedProp(e);
    saveHistory();
});

// selection updated
canvas.on("selection:cleared", function () {
    createdAndUpdatedProp();
});

// Mouse up on Canvas 
canvas.on('mouse:up', function (e) {
    let activeObject = canvas.getActiveObject();
    if (!activeObject) {
        $('#propsPanel .close-obj-props-panel').trigger('click');
        $('.cn-obj-align-justify-container').dnone(true);
    } else {
        // justify show and hide when is selection rect
        if (activeObject.type === 'activeSelection') {
            $('.cn-obj-align-justify-container').dnone(false);
        } else {
            $('.cn-obj-align-justify-container').dnone(true);
        }
    }
});

// select clear


// Alignment Text 
$(document).on('change', ".obj-alignment-head .obj-alignment", function () {
    let activeObj = canvas.getActiveObject(),
        alignmentType = $(this).val();
    if (!activeObj) return false;
    alignmentObject(alignmentType, activeObj);
    canvas.renderAll();
    saveHistory();
});

// Canvas Resize (Width And Height)
$(document).on('click', "#editorResize .apply-resize", function () {
    let $resizeParent = $(this).parents('#editorResize'),
        width = $resizeParent.find('.editor-width-input').val(),
        height = $resizeParent.find('.editor-height-input').val();
    // remove selectionRect
    selectionRectRemove()
    // Resize fn
    resizeCanvas({
        width: width,
        height: height
    });
    $('.modal').modal('hide');
});
// Export canvas
function exportCanvasFile(type, options = {}) {
    if (!type) return false;
    startDownloadCanvas();
    let downloadLink,
        downloadFile = ("downloadFile" in options) ? options.downloadFile : true;

    if (type == "svg") {
        let svgStr = canvas.toSVG(),
            svg64 = btoa(svgStr);
        b64Start = 'data:image/svg+xml;base64,';
        downloadLink = b64Start + svg64;
    } else if (type == "png") {
        downloadLink = canvas.toDataURL("image/png");
    } else {
        let bgColor = canvas.backgroundColor;
        if (!bgColor)
            canvas.backgroundColor = "#fff";
        downloadLink = canvas.toDataURL("image/jpeg");
        canvas.backgroundColor = bgColor;
    }
    if (downloadFile) {
        var anchor = document.createElement('a');
        anchor.href = downloadLink;
        anchor.target = '_blank';
        anchor.download = "image." + type;
        anchor.click();
    }

    finishDownloadCanvas();
    return downloadLink;
}
// Editor Image Download
$(document).on('click', ".download[data-target='download']", function (e) {
    e.preventDefault();
    let type = $(this).attr('data-type');
    // Download pdf
    if (type === "pdf") {
        let svgData = exportCanvasFile("svg", {
            downloadFile: false
        });
        fetch(svgData)
            .then(res => res.blob())
            .then(blob => {
                const svgFile = new File([blob], "pdf-file-" + Math.floor(Math.random() * 500) + ".svg")
                let formData = new FormData();
                formData.append('file', svgFile);
                formData.append('exportPdfFile', true);
                $.ajax({
                    url: "controllers/export-pdf",
                    method: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    success: function (res) {
                        if (res.status == 'success') {
                            resData = res.data;
                            // PDF file download
                            downloadLink = resData.url;
                            var anchor = document.createElement('a');
                            anchor.href = downloadLink;
                            anchor.target = '_blank';
                            anchor.download = resData.fileName;
                            anchor.click();
                        }
                    },
                    error: makeError
                });
            })
        return true;
    }
    // Download jpg, png, svg
    exportCanvasFile(type);
});

// Toggle Full Screen
$(document).on('click', ".editor-content-footer .full-screen", function () {
    toggleFullScreen();
});

// Delete item
$(document).on('click', ".delete-item[data-delete-item='true']", function () {
    deleteEditorObject();
});

//Duplicate object / clone
$(document).on('click', ".duplicate-item[data-target='duplicate']", function (e, data = {}) {
    let obj = canvas.getActiveObject();
    copyEditorObject(canvas, data);
});

// lock and unlock item
$(document).on('click', "#TcObjectLock", function () {
    let activeObj = canvas.getActiveObject();
    if (!activeObj) return false;
    if (activeObj.lockMovementY == true) {
        activeObj.set({
            lockMovementY: false,
            lockMovementX: false,
            lockScalingX: false,
            lockScalingY: false,
        });
        $(this).find('.unlock-btn').dnone(false);
        $(this).find('.lock-btn').dnone(true);
    } else if (activeObj.lockMovementY == false) {
        activeObj.set({
            lockMovementY: true,
            lockMovementX: true,
            lockScalingX: true,
            lockScalingY: true,
        });
        $(this).find('.unlock-btn').dnone(true);
        $(this).find('.lock-btn').dnone(false);
    }
    canvas.renderAll();
    // Context menu hide
    CtMenu.hide();
});
// orginal width and height
function ResizeDefaultValSet() {
    let $resizeParent = $('#editorResize'),
        canvasWidth = canvas.getWidth(),
        canvasHeight = canvas.getHeight();
    $resizeParent.find('.editor-width-input').val(parseInt(canvasWidth));
    $resizeParent.find('.editor-height-input').val(parseInt(canvasHeight));
}

// image fill in text background
$(document).on('click', ".editor-nav-con .fill-image-bg", function () {
    let activeObj = canvas.getActiveObject();
    if (!activeObj) return false;
    if (activeObj.type != 'activeSelection') return false;
    let text = activeObj._objects.find(obj => obj.originalItem.class === "text"),
        image = activeObj._objects.find(obj => obj.originalItem.class === "image");
    if (!text || !image) return false;
    let src = image.getSrc();
    canvas.remove(image);
    deselectObject();
    canvas.setActiveObject(text);
    fabric.util.loadImage(src, function (img) {
        text.set({
            fill: new fabric.Pattern({
                source: img,
                repeat: 'repeat'
            })
        });
        canvas.renderAll();
    });
});


// Context Menu Dropdown
let canvasRightPosition = {};
//copy item acitve Object
$(document).on('click', ".copy-item[data-target='copy']", function () {
    let obj = canvas.getActiveObject();
    if (!obj) return false;
    _clipboard_obj_id = obj.id;
    // Context menu hide
    CtMenu.hide();
});

//Paste item active
$(document).on('click', ".paste-item[data-target='paste']", function (event) {
    let obj = canvas.getActiveObject();
    if (!obj && !_clipboard_obj_id) return false;
    cloneObj(_clipboard_obj_id);
    // Paste item position set
    canvas.forEachObject(object => {
        if (object.id == _clipboardPasteId) {
            object.set({
                top: canvasRightPosition.pageY,
                left: canvasRightPosition.pageX
            });
        }
    });
    canvas.renderAll();
    // Context menu hide
    CtMenu.hide();
});

// Active Obj Forward
$(document).on('click', ".forward-item[data-target='bringForward']", function () {
    let type = $(this).data('target');
    activeObjPositionChange(type)
});

// Active Obj Backward
$(document).on('click', ".backward-item[data-target='sendBackwards']", function () {
    let type = $(this).data('target');
    activeObjPositionChange(type)
});

// Active Obj To Front
$(document).on('click', ".bring-to-front[data-target='bringToFront']", function () {
    let type = $(this).data('target');
    activeObjPositionChange(type)
});

// Active Obj To back
$(document).on('click', ".bring-to-back[data-target='sendToBack']", function () {
    let type = $(this).data('target');
    activeObjPositionChange(type)
});
// Active object on context menu
tc.fn.bc.objContextMenu = ($contextMenu, e) => {
    canvasRightPosition.pageX = e.offsetX;
    canvasRightPosition.pageY = e.offsetY;
    // Check if paste available
    $contextMenu.find('.paste-item').toggleClass("disabled", _clipboard_obj_id === null);
    let obj = canvas.findTarget(e);

    if (!obj) {
        deselectObject();
        return true;
    }

    canvas.setActiveObject(obj);
    canvas.renderAll();
    return true;
}

// Group to unGroup
$(document).on('click', ".group-to-ungroup-btn[data-target='ungroup']", function () {
    let activeObj = canvas.getActiveObject();
    if (!activeObj && activeObj.type != 'group') return false;
    unGroupObjects();
    // active Object properties set
    canvas.forEachObject(obj => {
        if (!obj) return false;
        obj.set({
            hasControls: true,
            hasBorders: true,
        });
        canvas.renderAll();
    })
});


// drag and drop on canvas
$(document).on('drop', ".canvas-container", function (e) {
    let dt = e.originalEvent.dataTransfer,
        files = dt.files;
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    //Loop through files
    for (var i = 0; i < files.length; i++) {
        addFileToEditor(files[i], ($file) => {
            $file.trigger("click");
        });
    }
    $(this).removeClass('drag-and-drop');
});


$(document).on('dragover dragenter', '.canvas-container', function (e) {
    e.preventDefault();
    $(this).addClass('drag-and-drop');
});

$(document).on('dragexit dragleave', '.canvas-container', function (e) {
    e.preventDefault();
    $(this).removeClass('drag-and-drop');
});


// Copy Paste image 
$(window).on('paste', function (e) {
    let items = e.originalEvent.clipboardData.items;
    if (!items.length) return true;
    //Loop through files
    for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') == -1) continue;
        let file = items[i],
            imageData = file.getAsFile();
        // Add Image
        addFileToEditor(imageData, ($file) => {
            $file.trigger("click");
        });
    }
});


// Editor Background  Color
$(document).on('input', ".tc-cn-items .cn-bg-color .tc-color-picker", function () {
    bgColor = $(this).val();
    canvas.backgroundColor = bgColor;
    canvas.renderAll();
});


// update slider value
$(document).on('change input', "input[type='range']", function () {
    updateSliderVal($(this));
});