const $cropperContainerDiv = $('.free-crop-canvas-con');
const cropper = new fabric.Canvas('free-cropper', {
    preserveObjectStacking: true,
    selectionKey: "ctrlKey",
    selection: true,
    width: $cropperContainerDiv.width(),
    height: $cropperContainerDiv.height(),
}),
    cropWindow = $("#freeCropWindow"),
    cropOffset = $(".free-crop-canvas-con").offset();

// Get crop canvas offset
function getCropCanvasOffset(type) {
    let offset = $(".free-crop-canvas-con").offset();
    return offset[type];
}
// Start Crop
tc.fn.cb.freeCropWindowOpen = ($el, e) => {
    let activeObj = canvas.getActiveObject();
    let cropperObj = canvas._objects.find(obj => obj.originalItem.id == activeObj.cropObjId);
    cropShape(cropperObj);
}
// Crop setting
let crop = {
    start: false,
    type: "free",
    line: "",
    points: [],
    target: false
};
// Add free Crop line
function addCropLine(e) {
    let x = e.pageX - getCropCanvasOffset("left"),
        y = e.pageY - getCropCanvasOffset("top");
    crop.start = true;
    crop.line = new fabric.Line([x, y, x, y], {
        stroke: "#fff",
        shadow: {
            color: "#000",
            offsetX: 0,
            offsetY: 0,
            blur: 10,
            opacity: 1
        },
        strokeDashArray: [5, 5],
        strokeWidth: 2,
        selectable: false,
        cropLine: true
    });
    cropper.add(crop.line);
}
// check if point is near to starting point
function isOnStartingPoint(x, y) {
    changeCurserEvent('crosshair', cropper);
    if (!crop.points.length) return false;
    let pointX = crop.points[0].x,
        pointY = crop.points[0].y;
    let minX = x - 5,
        maxX = x + 5,
        minY = y - 5,
        maxY = y + 5;
    if (pointX >= minX && pointX <= maxX) {
        if (pointY >= minY && pointY <= maxY) {
            changeCurserEvent('copy', cropper);
            return true;
        }
    }
    return false;
}
// Start crop line
cropper.on("mouse:down", function (e) {
    e = e.e;
    addCropLine(e);
});
// Move crop line
cropper.on("mouse:move", function (e) {
    e = e.e;
    let x = e.pageX - getCropCanvasOffset("left"),
        y = e.pageY - getCropCanvasOffset("top");
    if (!crop.start) return false;
    crop.line.set("x2", x);
    crop.line.set("y2", y);
    cropper.renderAll();
    // change cursor when on starting point
    isOnStartingPoint(x, y);
});
// Finish crop line on double click
cropper.on("mouse:dblclick", function (e) {
    e = e.e;
    addCropLine(e);
    let x = e.pageX - getCropCanvasOffset("left"),
        y = e.pageY - getCropCanvasOffset("top");
    crop.start = false;
    crop.points.push({
        x: x,
        y: y
    });
    if (crop.start === false) drawPolygon(crop.points);
});
// create new point at crop line
cropper.on("mouse:up", function (e) {
    e = e.e;
    addCropLine(e);
    let x = e.pageX - getCropCanvasOffset("left"),
        y = e.pageY - getCropCanvasOffset("top");
    if (isOnStartingPoint(x, y)) {
        x = crop.points[0].x;
        y = crop.points[0].y;
        crop.start = false;
    }
    crop.points.push({
        x: x,
        y: y
    });
    if (crop.start === false) drawPolygon(crop.points);
});
// Set final crop on object
function drawPolygon(coords) {
    cropper.getObjects().forEach((obj) => {
        if (obj.freeCropObject) {
            let poly = new fabric.Polygon(coords, {
                absolutePositioned: true
            });
            obj.clipPath = poly;
        } else if ("cropLine" in obj) {
            cropper.remove(obj);
        }
    });
    cropper.renderAll();
    crop.points = [];
}
// Init Crop Shape
function cropShape(shape) {
    if (!shape) return;
    crop.target = shape;
    let src = shape.originalItem.src,
        width = shape.width,
        height = shape.height;
    // Set cropper. according to the next shape
    cropper.clear();
    cropper.setWidth(width);
    cropper.setHeight(height);
    // cropWindow.find(".cropper").css("width", width + "px");
    // cropWindow.find(".cropper").css("height", height + "px");
    // Add modified props on crop object (so we can change it back when crop done)
    crop.targetProps = {
        selectable: false,
        evented: false,
        freeCropObject: true,
        dirty: true,
        objectCaching: false,
        top: 0,
        left: 0,
    };
    // add shape to cropper
    shape.clone(function (obj) {

        obj.set(crop.targetProps);
        obj.scaleToWidth(width * 0.8);
        cropper.add(obj);
        cropper.centerObject(obj);
        cropper.renderAll();
    })
    // let obj = fabric.util.object.clone(shape);
    return true;
    if (shape.get('type') === "image") {
        let img = new fabric.Image.fromURL(src, function (img) {
            img.set(shapeProperties);
            img.scaleToWidth(width / 1.5);
            cropper.add(img);
            cropper.centerObject(img);
            cropper.renderAll();
        });
    } else {
        fabric.loadSVGFromURL(src, function (objects, options) {
            obj = fabric.util.groupSVGElements(objects, options);
            obj.scaleToWidth(width / 1.5)
                .set(shapeProperties)
                .setCoords();
            obj.center();
            cropper.add(obj);
            cropper.centerObject(obj);
            cropper.renderAll();
        });
    }


    cropWindow.addClass("active");
    cropper.renderAll();
}
// Save crop
cropWindow.on("click", ".save-crop", function (e) {
    let svgStr = cropper.toSVG(),
        svg64 = btoa(svgStr);
    b64Start = 'data:image/svg+xml;base64,';
    l(b64Start)
    let svg = b64Start + svg64,
        item = crop.target.originalItem;
    item.fileType = "svg";
    item.src = svg;
    // Get properties of original object
    let props = crop.targetProps;
    for (let key in props) {
        props[key] = crop.target[key];
    }
    props.strokeWidth = 0;
    addItemToEditor(item, props, {
        centerObject: false
    });
    canvas.remove(crop.target);
    cropWindow.removeClass("active");
    // Remove selection Rect
    selectionRectRemove()
});