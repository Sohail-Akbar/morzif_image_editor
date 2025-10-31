let freeDraw = {
    enable: false,
    isDrawing: false,
    canvasSelection: canvas.selection
};

// enable shape drawing
function enableFreeShapeDrawing(item) {
    changeCanvasCursor("freeShapeDrawing");
    freeDraw.item = item;
}
// Stop shape drawing
function disableFreeShapeDrawing() {
    changeCanvasCursor("default");
}

canvas.on('mouse:down', function (e) {
    if (!freeDraw.enable) return true;
    if (canvas.getActiveObject()) return true;
    freeDraw.isDrawing = true;
    let { x, y } = canvas.getPointer(e.e);
    addItemToEditor(freeDraw.item, {
        left: x,
        top: y,
    }, {
        centerObject: false,
        beforeRender: obj => {
            let { width, height } = obj,
                scale = 1 / width;
            obj.scale(scale);
            freeDraw.objId = obj.id;
        }
    });
});

canvas.on('mouse:move', function (e) {
    if (!freeDraw.isDrawing) return true;
    let obj = canvas.getActiveObject();
    if (!obj) return true;
    let { x, y } = canvas.getPointer(e.e),
        { left, top } = obj,
        width = (x - left),
        height = (y - top),
        scale = width / obj.width;
    //is check positive negative values 
    if (scale = +scale) {
        obj.set({
            flipX: false,
            flipY: false,
        });
    } else {
        obj.set({
            flipX: true,
            flipY: true,
        });
    }
    obj.scale(scale);
    canvas.renderAll();
});

canvas.on('mouse:up', function (e) {
    freeDraw.isDrawing = false;
    disableFreeShapeDrawing();
});