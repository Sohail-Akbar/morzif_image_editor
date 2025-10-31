// toggle object selection
function toggleObjectsSelection(toggle) {
    canvas._objects.forEach(obj => {
        if (toggle) {
            if ("selectableCache" in obj)
                obj.selectable = obj.selectableCache;
        } else {
            obj.selectableCache = obj.selectable;
            obj.selectable = false;
        }
    });
    canvas.renderAll();
}
// Close Btn Click (Selection Rect Remove)
const selectionRectRemove = () => {
    toggleObjectsSelection(true);
    let rect = canvas._objects.find(obj => obj.name === "selectionRect");
    if (!rect) return true;
    let obj = getObjById(rect.cropObjId);
    if (obj) {
        if (!obj.clipPath && obj.clipPathOld) {
            obj.dirty = true;
            obj.clipPath = obj.clipPathOld;
        }
    }
    canvas.remove(rect);
}
// Hide all objects
function hideAllObjects(exclude = null) {
    canvas.forEachObject(obj => {
        if (obj.id === exclude) return true;
        obj.set("visible", false);
    }).renderAll();
}
// Show all objects
function showAllObjects(exclude = null) {
    canvas.forEachObject(obj => {
        if (obj.id === exclude) return true;
        obj.set("visible", true);
    }).renderAll();
}

//  After click start crop add the mask to canvas
$(document).on('click', ".cn-start-crop-btn", function () {
    let cropType = $(this).dataVal("crop-type");
    // Is check canvas crop
    if (cropType === 'canvas') {
        $('.cn-start-crop-btn').dnone(true);
        $(`.cn-nav-item[data-crop-type="free"]`).dnone(true);
        $(this).dnone(false);
    } else {
        $('.cn-start-crop-btn').dnone(false);
        $(`.cn-nav-item[data-crop-type="free"]`).dnone(false);
    }

    let activeObj = canvas.getActiveObject(),
        dim = {
            top: 0,
            left: 0,
            width: canvasDimensions.resizedWidth,
            height: canvasDimensions.resizedHeight,
            cropType: 'canvas',
            cropObjId: 0
        };
    selectionRectRemove();
    if (activeObj) {
        if (activeObj.name === "selectionRect" && activeObj.cropObjId) {
            activeObj = getObjById(activeObj.cropObjId)
        }
        dim = {
            top: activeObj.top,
            left: activeObj.left,
            width: activeObj.width,
            height: activeObj.height,
            cropType: 'object',
            cropObjId: activeObj.id,
            scaleX: activeObj.scaleX,
            scaleY: activeObj.scaleY
        }
        activeObj.set({
            dirty: true,
            clipPathOld: activeObj.clipPath,
            clipPath: null
        });
    }
    // Free crop
    if (cropType === 'free') {
        if (activeObj)
            cropShape(activeObj.id);
        return true;
    }
    toggleObjectsSelection(false);
    let selectionRect = new fabric.Rect({
        fill: "rgba(0,0,0,0.3)",
        opacity: 1,
        name: 'selectionRect',
        hasRotatingPoint: false,
        originalItem: {
            id: createNewId(),
            type: 'rect',
            fileType: 'rect',
            class: 'selectionRect'
        },
        ...dim
    });
    if (cropType === 'circle') {
        selectionRect.rx = dim.width;
        selectionRect.ry = dim.height;
    }
    canvas.add(selectionRect);
    selectionRect.controls.mtr.visible = false;
    canvas.setActiveObject(selectionRect);
    canvas.renderAll();
    saveHistory();

});
// Object to svg
function canvasObjToSVG(activeObj) {
    let width = activeObj.width,
        height = activeObj.height;
    let output = activeObj.toSVG();
    output = output.replace(/(transform=")([^"]*)(")/gm, '');
    output = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 ${width} ${height}" style="enable-background:new 0 0 ${width} ${height};" xml:space="preserve">
        ${output}
        </svg>`;

    let svgStr = output,
        svg64 = btoa(svgStr);
    b64Start = 'data:image/svg+xml;base64,';

    output = b64Start + svg64;
    return output;
}
// Click the crop button croped the masked area
$(document).on('click', ".cn-apply-crop-btn", function () {
    let selectionRect = canvas._objects.find(obj => obj.name === "selectionRect"),
        cropDimensions = {
            top: selectionRect.top,
            left: selectionRect.left,
            width: selectionRect.getScaledWidth(),
            height: selectionRect.getScaledHeight(),
        };
    // Canvas Crop
    if (selectionRect.cropType === "canvas") {
        let cnCropData = canvas.toJSON(CANVAS_OBJECT_DYNAMIC_KEYS);
        canvas.loadFromJSON(cnCropData, function () {
            canvas.renderAll();
            hideAllPositioningLines();
            if (cropDimensions) {
                // Resize Canvas
                resizeCanvas({
                    width: cropDimensions.width,
                    height: cropDimensions.height
                });
            }
            selectionRectRemove();
        }, function (obj, object) {
            object.top = object.top - cropDimensions.top;
            object.left = object.left - cropDimensions.left;
            canvas.renderAll();
        })
        saveHistory();
        return false;
    }
    // Object Crop
    let activeObj = getObjById(selectionRect.cropObjId);
    if (!activeObj) return false;
    let objType = activeObj.originalItem.fileType;
    if (objType === 'svg') {


        // Add Clippath to svg
        let left0 = -(selectionRect.width / 2),
            top0 = -(selectionRect.height / 2),
            cropLeftPer = (selectionRect.left - activeObj.left) / selectionRect.getWidth() * 100,
            cropTopPer = (selectionRect.top - activeObj.top) / selectionRect.getHeight() * 100,
            left = (cropLeftPer * selectionRect.width) / 100,
            top = (cropTopPer * selectionRect.height) / 100;
        left = left0 + left;
        top = top0 + top;
        // Width and hieght
        let rectWidthPer = (selectionRect.getWidth() / activeObj.getWidth()) * 100,
            rectHeightPer = (selectionRect.getHeight() / activeObj.getHeight()) * 100,
            rectWidth = (rectWidthPer * selectionRect.width) / 100,
            rectHeight = (rectHeightPer * selectionRect.height) / 100;
        // left = left + (selectionRect.left - activeObj.left);
        // top = top + (selectionRect.top - activeObj.top);

        let rect = {
            originX: "left",
            originY: "top",
            left,
            top,
            width: rectWidth,
            height: rectHeight,
            scaleX: 1,
            scaleY: 1
        };
        let newRect = fabric.util.object.clone(selectionRect);
        newRect.set(rect);
        activeObj.set("dirty", true);
        activeObj.set("clipPath", newRect);
        selectionRectRemove();
        return true;
    }
    // Init new image instance
    var cropped = new Image();
    // Disable all object expect the current one
    hideAllObjects(selectionRect.cropObjId);
    startDownloadCanvas();
    // set src value of canvas croped area as toDataURL
    cropped.src = canvas.toDataURL(cropDimensions);
    // Show all objects
    finishDownloadCanvas();
    showAllObjects();
    // after onload clear the canvas and add cropped image to the canvas
    cropped.onload = function () {
        let item = activeObj.originalItem;
        item.fileType = "image";
        item.src = cropped.src;
        addItemToEditor(item, {
            top: cropDimensions.top,
            left: cropDimensions.left,
        }, {
            centerObject: false
        });
        canvas.remove(activeObj);
        // activeObj.setSrc(cropped.src);
        canvas.requestRenderAll();
    };
    selectionRectRemove();
    canvas.renderAll();
    saveHistory();
});

// Selection Rect Remove 
$(document).on('click', ".cn-crop-close-btn", function () {
    selectionRectRemove();
    saveHistory();
});
// Remove crop selection when click away from editor
canvas.on("mouse:up", function (e) {
    let activeObj = canvas.getActiveObject();
    if (!activeObj)
        selectionRectRemove();
});

//#endregion Canvas Crop end