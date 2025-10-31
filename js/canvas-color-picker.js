// Get canvas color
function getCanvasColorAt(x, y) {
    var rgb = canvasCTX.getImageData(...[x, y, 1, 1].map(fixCoords)).data;
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}
// Color picker cursor
const $colorPickerCursor = $canvasDiv.find(".color-picker-cursor");
// Show Color Picker
$canvasDiv.on("mouseover", function (e) {
    $colorPickerCursor.show();
});
// Show color picker cursor on move
$canvasDiv.on("mousemove", function (e) {
    let x = e.offsetX,
        y = e.offsetY,
        color = getCanvasColorAt(x, y);
    y = y - ($colorPickerCursor.height() / 2) - 5;
    // return true;
    $colorPickerCursor.css({
        left: x + 'px',
        top: y + 'px',
        "--cursor-color": color,
    });
});
// Hide color picker cursor
$canvasDiv.on("mouseleave", function (e) {
    $colorPickerCursor.hide();
});
// Pick color
$canvasDiv.on("mousedown", e => {
    if (_canvas_cursor_ != 'colorpicker' || !$(".clr-picker.clr-open").length) {
        return true;
    }
    e.preventDefault();
    e.stopPropagation();
    let color = getCanvasColorAt(e.offsetX, e.offsetY);
    $(".tc-color-picker.active").val(color);
    $(".tc-color-picker.active").get(0).dispatchEvent(new Event('input', { bubbles: true }));

    // return color;
    return false;
})