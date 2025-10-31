// Hide Rotate Controls
function HideRotateControl(rotateControl = false) {
    if (!rotateControl) return false;
    const controls = fabric.Object.prototype.controls,
        rotateControls = controls.mtr;
    rotateControls.visible = false;
    canvas.renderAll();
}

//#region Curser style
// Object transform control
function toggleObjectTranformControl(hasControl) {
    fabric.Object.prototype.hasBorders = hasControl;
    fabric.Object.prototype.hasControls = hasControl;
    canvas.renderAll();
}
$(document).on("change", ".toggle-object-controls", function () {
    toggleObjectTranformControl($(this).is(":checked"));
});
// fabric.Object.prototype.centeredRotation = false
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.borderColor = '#007bff';
fabric.Object.prototype.borderScaleFactor = 0.5;
fabric.Object.prototype.cornerStrokeColor = '#007bff';
fabric.Object.prototype.cornerColor = '#fff';
fabric.Object.prototype.cornerStyle = 'circle';
fabric.Object.prototype.cornerSize = 10;
fabric.Object.prototype.padding = 0;

//#endregion Curser style

//#region Active Object control properties change

let rotateIcon = "./images/editor-icon/rotate-icon.svg",
    imageDataRotate = document.createElement('img');
imageDataRotate.src = rotateIcon;

// here's where your custom rotation control is defined
fabric.Object.prototype.controls.mtr = new fabric.Control({
    x: 0,
    y: 0.5,
    offsetY: 30,
    cursorStyle: 'grab',
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    actionName: 'rotate',
    render: renderIcon,
    cornerSize: 12,
    withConnection: false
});

// here's where the render action for the control is defined
function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    let size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(imageDataRotate, -size / 2, -size / 2, size, size);
    ctx.restore();
}

//#endregion Active Object control properties changes

// Group in object selectable (true)
fabric.util.object.extend(fabric.Object.prototype, {
    getAbsoluteCenterPoint: function () {
        var point = this.getCenterPoint();
        if (!this.group)
            return point;
        var groupPoint = this.group.getAbsoluteCenterPoint();
        return {
            x: point.x + groupPoint.x,
            y: point.y + groupPoint.y
        };
    },
    containsInGroupPoint: function (point) {
        if (!this.group)
            return this.containsPoint(point);

        var center = this.getAbsoluteCenterPoint();
        var thisPos = {
            xStart: center.x - this.getScaledWidth() / 2,
            xEnd: center.x + this.getScaledWidth() / 2,
            yStart: center.y - this.getScaledHeight() / 2,
            yEnd: center.y + this.getScaledHeight() / 2
        };

        if (point.x >= thisPos.xStart && point.x <= (thisPos.xEnd)) {
            if (point.y >= thisPos.yStart && point.y <= thisPos.yEnd) {
                return true;
            }
        }
        return false;
    },
    // Get Object Width
    getWidth: function () {
        return this.getScaledWidth();
    },
    // Get Object Height
    getHeight: function () {
        return this.getScaledHeight();
    }
});

// group prototype
canvas.on('mouse:dblclick', function (options) {
    var mousePos = canvas.getPointer(options.e),
        target = options.target;
    if (!target) return false;
    let item = target.originalItem || {};
    if (!(target.type == 'group' && item.fileType == 'group'))
        return;

    options.target.forEachObject(function (object, i) {
        if (object.containsInGroupPoint(mousePos)) {
            object.hasControls = false;
            object.hasBorders = true;
            canvas.setActiveObject(object);
        }
    });
    canvas.requestRenderAll();
});

//#endregion Active Object control properties changes