//#region Drawing Functions
const drawingPropObject = {

}

const editingDrawPanel = $(".editor-sidebar .draw-prop-head"),
    $drawParent = $('.draw-prop-head');
var brushsize = parseInt(editingDrawPanel.find(".eraser-size_slider").val()),
    pencilBrushSize = parseInt(editingDrawPanel.find(".draw-brush-size").val());

// Drawing Brush Curser
const getDrawCursor = () => {
    let color = editingDrawPanel.find(".drawing-color-pick").val(),
        opacity = editingDrawPanel.find(".draw-opacity").val();
    const circle = `
		<svg
			height="${pencilBrushSize}"
			fill="${rgbaColorGenerator(color, opacity)}"
			viewBox="0 0 ${pencilBrushSize * 2} ${pencilBrushSize * 2}"
			width="${pencilBrushSize}"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="50%"
				cy="50%"
				r="${pencilBrushSize}" 
			/>
		</svg>
	`;

    return `data:image/svg+xml;base64,${window.btoa(circle)}`;
};

// Eraser Bursh Curser
const getEraserCursor = () => {
    const circle = `
		<svg
			height="${brushsize}"
			fill="rgba(0, 0, 255, 0.6)"
			viewBox="0 0 ${brushsize * 2} ${brushsize * 2}"
			width="${brushsize}"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="50%"
				cy="50%"
				r="${brushsize}" 
			/>
		</svg>
	`;

    return `data:image/svg+xml;base64,${window.btoa(circle)}`;
};

// Drawing Mode 
function startDrawingMode(prop = {}) {
    pencilBrushSize = prop.width;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = prop.color;
    canvas.freeDrawingCursor = `url(${getDrawCursor()}) ${pencilBrushSize / 2} ${pencilBrushSize / 2}, crosshair`;
    canvas.freeDrawingBrush.width = prop.width || 1;
    canvas.isDrawingMode = true;
    canvas.isDrawingMode.item = '10';
    canvas.renderAll();
}

// Eraser Mode fn
const eraser = (inverted = false, width = 20) => {
    brushsize = width;
    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.freeDrawingBrush.width = width || 1;
    canvas.freeDrawingBrush.inverted = inverted
    canvas.isDrawingMode = true;
    canvas.freeDrawingCursor = `url(${getEraserCursor()}) ${brushsize / 2} ${brushsize / 2}, crosshair`;
    canvas.renderAll();
    saveHistory();
}

// Drawing Mode False
function drawingModeFalse() {
    // delete object id
    delete drawingPropObject.id;
    // all objects erasable true 
    canvas.forEachObject(obj => {
        if (!obj) return false;
        obj.set({ erasable: true });
        canvas.renderAll();
    });
    // drawing mode false
    canvas.isDrawingMode = false;
    canvas.renderAll();
    // Curser Event Change
    changeCurserEvent();
    // Drawing Group
    drawingPropertiesSet();
}

// Drawing Properties Set
function drawingPropertiesSet() {
    let id = createNewId(),
        drawingPaths = canvas._objects.filter(obj => obj.type == "path" && !obj.rendered && !obj.originalItem);
    if (!drawingPaths.length) return false;
    drawingPaths.map(obj => obj.set({
        rendered: true,
        dirty: true
    }));
    let group = new fabric.Group(drawingPaths);
    group.set({
        originalItem: {
            class: "shape",
            fileType: "path",
            id,
            src: "path",
            type: "drawing",
        },
        id,
        dirty: true,
        options: {
            centerObject: false
        }
    });
    canvas.add(group);
    addItemToEditorCallback(id);
}

//#endregion Drawing 

//#region Drawing Pen Tool

// Drawing Pen Tool
$(document).on('click', ".draw-prop-head .draw-pen-tool", function () {
    canvas.isDrawingMode = true;
    canvas.renderAll();
    invertEraserOff();
    saveHistory();
});

// Pattern Brush
if (fabric.PatternBrush) {
    var vLinePatternBrush = new fabric.PatternBrush(canvas);
    vLinePatternBrush.getPatternSrc = function () {

        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = 10;
        var ctx = patternCanvas.getContext('2d');

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(10, 5);
        ctx.closePath();
        ctx.stroke();

        return patternCanvas;
    };
    // Horizontal Line Brush
    var hLinePatternBrush = new fabric.PatternBrush(canvas);
    hLinePatternBrush.getPatternSrc = function () {

        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = 10;
        var ctx = patternCanvas.getContext('2d');

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(5, 10);
        ctx.closePath();
        ctx.stroke();

        return patternCanvas;
    };
    // Square Pattern Brush
    var squarePatternBrush = new fabric.PatternBrush(canvas);
    squarePatternBrush.getPatternSrc = function () {

        var squareWidth = 10,
            squareDistance = 2;

        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
        var ctx = patternCanvas.getContext('2d');

        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, squareWidth, squareWidth);

        return patternCanvas;
    };
    // Diamond Pattern Brush
    var diamondPatternBrush = new fabric.PatternBrush(canvas);
    diamondPatternBrush.getPatternSrc = function () {

        var squareWidth = 10,
            squareDistance = 5;
        var patternCanvas = fabric.document.createElement('canvas');
        var rect = new fabric.Rect({
            width: squareWidth,
            height: squareWidth,
            angle: 45,
            fill: this.color
        });

        var canvasWidth = rect.getBoundingRect().width;

        patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
        rect.set({
            left: canvasWidth / 2,
            top: canvasWidth / 2
        });

        var ctx = patternCanvas.getContext('2d');
        rect.render(ctx);

        return patternCanvas;
    };

    var img = new Image();
    img.src = '../assets/honey_im_subtle.png';

    var texturePatternBrush = new fabric.PatternBrush(canvas);
    texturePatternBrush.source = img;
}

// Drawing Pen Mode On
$(document).on('input change', ".pen-type-selectm #pen-mode", function () {
    var drawMode = $(this).val();
    if (drawMode === 'hline') {
        canvas.freeDrawingBrush = vLinePatternBrush;
    } else if (drawMode === 'vline') {
        canvas.freeDrawingBrush = hLinePatternBrush;
    } else if (drawMode === 'square') {
        canvas.freeDrawingBrush = squarePatternBrush;
    } else if (drawMode === 'diamond') {
        canvas.freeDrawingBrush = diamondPatternBrush;
    } else if (drawMode === 'texture') {
        canvas.freeDrawingBrush = texturePatternBrush;
    } else {
        canvas.freeDrawingBrush = new fabric[drawMode + 'Brush'](canvas);
    }

    if (canvas.freeDrawingBrush) {
        var brush = canvas.freeDrawingBrush,
            lineWidth = $drawParent.find('#drawing-line-width').val(),
            drawShadowWidth = $drawParent.find('#drawing-shadow-width').val(),
            drawShadowColor = $drawParent.find('#drawing-shadow-color').val();
        brush.color = $drawParent.find('#drawing-color').val();
        if (brush.getPatternSrc) {
            brush.source = brush.getPatternSrc.call(brush);
        }
        // lineWidth
        brush.width = parseInt(lineWidth, 10) || 1;
        brush.shadow = new fabric.Shadow({
            blur: parseInt(drawShadowWidth, 10) || 0,
            offsetX: 0,
            offsetY: 0,
            affectStroke: true,
            color: drawShadowColor,
        });
    }
    saveHistory();
});

// Eraser Inverted  (On And Off)
function invertEraserOff() {
    if ($('.eraser-invert-con').find('.eraser-invert').is(':checked')) {
        $('.eraser-invert-con').find('.eraser-invert').click();
    }
}
//#endregion Drawing Pen Tool

// Drawing Color
$(document).on('input change', ".draw-prop-head #drawing-color", function () {
    let brush = canvas.freeDrawingBrush;
    brush.color = $(this).val();
    if (brush.getPatternSrc) {
        brush.source = brush.getPatternSrc.call(brush);
    }
});

// Drawing Shadow Color
$(document).on('input change', "#drawing-shadow-color", function () {
    canvas.freeDrawingBrush.shadow.color = $(this).val();
});

// Drawing line width with (Slider)
$(document).on('input change', ".draw-prop-head #drawing-line-width", function () {
    let drawSize = $(this).val();
    canvas.freeDrawingBrush.width = parseInt(drawSize, 10) || 1;
    this.previousSibling.innerHTML = $(this).val();
    //Set size in (Input)
    $drawParent.find('.draw-pen-size-inp').val(drawSize);
});

// Drawing line width with (Input)
$(document).on('input change', ".draw-prop-head .draw-pen-size-inp", function () {
    let drawSize = $(this).val();
    canvas.freeDrawingBrush.width = parseInt(drawSize, 10) || 1;
    this.previousSibling.innerHTML = $(this).val();
    //Set size in (Input)
    $drawParent.find('#drawing-line-width').val(drawSize);
});

// Drawing Shadow Width with (Slider)
$(document).on('input change', "#drawing-shadow-width", function () {
    let shadowWidth = $(this).val();
    canvas.freeDrawingBrush.shadow.blur = parseInt(shadowWidth, 10) || 0;
    this.previousSibling.innerHTML = shadowWidth;
    $drawParent.find('.drawing-shadow-width-inp').val(shadowWidth);
});

// Drawing Shadow Width with (Slider)
$(document).on('input change', ".draw-prop-head .drawing-shadow-width-inp", function () {
    let shadowWidth = $(this).val();
    canvas.freeDrawingBrush.shadow.blur = parseInt(shadowWidth, 10) || 0;
    this.previousSibling.innerHTML = shadowWidth;
    $drawParent.find('#drawing-shadow-width').val(shadowWidth);
});

// Drawing Shadow Offset Width (Input)
$(document).on('input change', ".draw-prop-head #drawing-shadow-offset", function () {
    let shadowOffset = $(this).val();
    canvas.freeDrawingBrush.shadow.offsetX = parseInt(shadowOffset, 10) || 0;
    canvas.freeDrawingBrush.shadow.offsetY = parseInt(shadowOffset, 10) || 0;
    this.previousSibling.innerHTML = shadowOffset;
    $drawParent.find('.drawing-shadow-offset-inp').val(shadowOffset);
});

// Drawing Shadow Offset Width (Input)
$(document).on('input change', ".draw-prop-head .drawing-shadow-offset-inp", function () {
    let shadowOffset = $(this).val();
    canvas.freeDrawingBrush.shadow.offsetX = parseInt(shadowOffset, 10) || 0;
    canvas.freeDrawingBrush.shadow.offsetY = parseInt(shadowOffset, 10) || 0;
    this.previousSibling.innerHTML = shadowOffset;
    $drawParent.find('#drawing-shadow-offset').val(shadowOffset);
});

// Drawing Width Val 
if (canvas.freeDrawingBrush) {
    let lineWidth = $drawParent.find('#drawing-line-width').val();
    canvas.freeDrawingBrush.color = $drawParent.find('#drawing-color').val();
    // canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call($(this).get(0));
    canvas.freeDrawingBrush.width = parseInt(lineWidth, 10) || 1;
    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: parseInt($('#drawing-shadow-width').val(), 10) || 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: $('#drawing-shadow-color').val(),
    });
}

// Drawing ( Width And Color )
$($editorSidebarParent).on('click', ".draw-prop-head .draw-brush", function () {
    let color = $('.draw-prop-head').find('.drawing-color-pick').val(),
        opacity = $('.brush-softness').find('.draw-opacity').val(),
        rgbaCol = rgbaColorGenerator(color, opacity);
    startDrawingMode({
        width: parseInt(20),
        color: rgbaCol,
    });
    invertEraserOff();
});

// Drawing Brush Size Width (Slider)
$($editorSidebarParent).on('input change', ".draw-prop-head .draw-brush-size", function () {
    let $parent = $(this).parents('.brush-size'),
        color = $('.draw-prop-head').find('.drawing-color-pick').val(),
        opacity = $('.brush-softness').find('.draw-opacity').val(),
        rgbaCol = rgbaColorGenerator(color, opacity);
    drawBrushSize = $(this).val();
    startDrawingMode({
        width: parseInt(drawBrushSize),
        color: rgbaCol,
    });
    $parent.find('.draw-brush-size-inp').val(drawBrushSize);
    $('.draw-prop-head .background-image').find('.draw-circle').css({
        width: drawBrushSize + 'px',
        height: drawBrushSize + 'px',
        'background-color': color,
    });
});

// Drawing Brush Size Width (Input)
$($editorSidebarParent).on('input change', ".draw-prop-head .draw-brush-size-inp", function () {
    let $parent = $(this).parents('.brush-size'),
        color = $('.draw-prop-head').find('.drawing-color-pick').val(),
        drawBrushSize = $(this).val();
    startDrawingMode({
        width: parseInt(drawBrushSize),
    });
    $parent.find('.draw-brush-size').val(drawBrushSize);
    $('.draw-prop-head .background-image').find('.draw-circle').css({
        'width': drawBrushSize + 'px',
        'height': drawBrushSize + 'px',
        'background-color': color,
    });
});

// Drawing Opacity Width (Input)
$($editorSidebarParent).on('input change', ".brush-softness .draw-opacity", function () {
    let opacity = $(this).val(),
        color = $('.draw-prop-head').find('.drawing-color-pick').val(),
        rgbaCol = rgbaColorGenerator(color, opacity);
    brushSize = $('.draw-prop-head').find('.draw-brush-size').val();
    startDrawingMode({
        width: parseInt(brushSize),
        color: rgbaCol,
    });
    $('.brush-softness').find('.draw-opacity-inp').val(opacity);
    $('.draw-prop-head .background-image').find('.draw-circle').css({
        width: brushSize + 'px',
        height: brushSize + 'px',
        'background-color': rgbaCol,
    });
});

// Drawing Opacity Width (Slider)
$($editorSidebarParent).on('input change', ".brush-softness .draw-opacity-inp", function () {
    let opacity = $(this).val(),
        color = $('.draw-prop-head').find('.drawing-color-pick').val(),
        rgbaCol = rgbaColorGenerator(color, opacity);
    brushSize = $('.draw-prop-head').find('.draw-brush-size').val();
    startDrawingMode({
        width: parseInt(brushSize),
        color: rgbaCol,
    });
    $('.brush-softness').find('.draw-opacity').val(opacity);
});

// Drawing Color Change
$($editorSidebarParent).on('change input', ".draw-prop-head .drawing-color-pick", function () {
    let $parent = $(this).find('.draw-color-head'),
        color = $(this).val(),
        opacity = $('.brush-softness').find('.draw-opacity').val(),
        brushSize = $('.brush-size').find('.draw-brush-size').val(),
        rgbaCol = rgbaColorGenerator(color, opacity);
    // draw mode
    startDrawingMode({
        width: parseInt(brushSize),
        color: rgbaCol,
    });
    // circle opacity
    $('.draw-prop-head .background-image').find('.draw-circle').css({
        width: brushSize + 'px',
        height: brushSize + 'px',
        'background-color': rgbaCol,
    });
});

// Drawing Mode False (Selectable True)
$(document).on('click', ".editor-nav-con .item-selected", function () {
    drawingModeFalse();
});

//#region Eraser Start
// Eraser Size
$($editorSidebarParent).on('click', ".eraser-mode", function () {
    let activeObject = canvas.getActiveObject();
    if (activeObject) {
        drawingPropObject.id = activeObject.originalItem.id;
        cnObjectPropertiesSet(drawingPropObject.id, { erasable: true }, { erasable: false });
    }
    eraser(false, 20);
    invertEraserOff();
});

// Eraser Invert
$($editorSidebarParent).on('click', ".eraser-invert-con", function () {
    let $eraserInvert = $(this).find('.eraser-invert');
    if ($eraserInvert.is(':checked') == true) {
        eraser(true, 20);
    } else {
        eraser(false, 20);
    }
});

// Eraser Size Width (Slider)
$($editorSidebarParent).on('input change', ".eraser-size-con .eraser-size_slider", function () {
    let $parent = $(this).parents('.eraser-size-con'),
        eraserSize = $(this).val();
    eraser(false, eraserSize);
    $parent.find('.eraser-size-input').val(eraserSize);
    invertEraserOff();
});

// Eraser Size Width (Input)
$($editorSidebarParent).on('input change', ".eraser-size-con .eraser-size-input", function () {
    let $parent = $(this).parents('.eraser-size-con'),
        eraserSize = $(this).val();
    eraser(false, eraserSize);
    $parent.find('.eraser-size_slider').val(eraserSize);
    invertEraserOff();
});


// Drawing Select 
$(document).on('click', ".editor-sidebar .sidebar-list-items .list-item", function () {
    let opacity = $('.brush-softness').find('.draw-opacity').val(),
        color = $('.draw-prop-head').find('.drawing-color-pick').val(),
        rgbaCol = rgbaColorGenerator(color, opacity);
    brushSize = $('.draw-prop-head').find('.draw-brush-size').val();
    if ($(this).attr("data-index") === 'draw') {
        startDrawingMode({
            width: parseInt(brushSize),
            color: rgbaCol,
        });
    } else {
        canvas.isDrawingMode = false;
    }
    canvas.renderAll();
});