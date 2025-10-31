const $zoomPercentage = $('.image-editor-con .editor-content-footer').find('.zoom-header .zoom-val');
// Fill zoom input value
function fillZoomInputValue() {
    // persontage value
    let persontageVal = (canvas.getZoom() / 1) * 100;
    $zoomPercentage.val(parseInt(persontageVal));
}
function changeCanvasZoom(newZoom) {
    if (newZoom > 6) newZoom = 6;
    let newWidth = canvasDimensions.resizedWidth * newZoom,
        newHeight = canvasDimensions.resizedHeight * newZoom;
    setCanvasDimensions({
        width: newWidth,
        height: newHeight,
        zoom: newZoom
    });
    // Scroll to center of canvas
    let scrollLeft = (newWidth - canvasDimensions.adjustedWidth) / 2,
        scrollTop = (newHeight - canvasDimensions.adjustedHeight) / 2;
    fillZoomInputValue();
}
// zoom in and zoom out with wheel
canvas.on('mouse:wheel', function (opt) {
    if (!opt.e.shiftKey) return;
    let delta = opt.e.deltaY,
        zoom = canvas.getZoom();
    let $con = $(".editor-con-header");

    let x = opt.e.pageX - $(".canvas-container").offset().left,
        y = opt.e.pageY - $(".canvas-container").offset().top,
        xPer = x / canvasDimensions.adjustedWidth * 100,
        yPer = y / canvasDimensions.adjustedHeight * 100,
        leftScroll = (xPer * $con.width()) / 100,
        topScroll = (yPer * $con.height()) / 100;
    // l(parseInt(xPer) + "%", parseInt(yPer) + "%");
    // l(leftScroll, topScroll);
    $con.filter(function () {
        // leftScroll -= $(this).width() / 2;
        // topScroll -= $(this).height() / 2;
        $(this).scrollLeft(leftScroll);
        $(this).scrollTop(topScroll);
    });
    zoom *= 0.999 ** delta;
    changeCanvasZoom(zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
});

// zoom in
$(document).on('click', '.image-editor-con .editor-content-footer .zoom-in', function () {
    changeCanvasZoom(canvas.getZoom() * 1.1)
});

// zoom out
$(document).on('click', '.image-editor-con .editor-content-footer .zoom-out', function () {
    changeCanvasZoom(canvas.getZoom() / 1.1)
});

// zoom out with input
$(document).on('change', '.image-editor-con .editor-content-footer .zoom-val', function () {
    let zoomVal = $(this).val();
    changeCanvasZoom(zoomVal);
});


// zoom reset 
$(document).on('click', ".image-editor-con .editor-content-footer .reset-zoom", function () {
    changeCanvasZoom(canvasDimensions.defaultZoom);
});

