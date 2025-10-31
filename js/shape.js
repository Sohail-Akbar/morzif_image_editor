let shapes;
function starPolygonPoints(spikeCount, outerRadius, innerRadius) {
    var rot = Math.PI / 2 * 3;
    var cx = outerRadius;
    var cy = outerRadius;
    var sweep = Math.PI / spikeCount;
    var points = [];
    var angle = 0;

    for (var i = 0; i < spikeCount; i++) {
        var x = cx + Math.cos(angle) * outerRadius;
        var y = cy + Math.sin(angle) * outerRadius;
        points.push({ x: x, y: y });
        angle += sweep;

        x = cx + Math.cos(angle) * innerRadius;
        y = cy + Math.sin(angle) * innerRadius;
        points.push({ x: x, y: y });
        angle += sweep
    }
    return (points);
}

// Add Shape type (svg)
$(document).on('click', ".shape-show-data-con .cn-add-shape", function () {
    let imgSrc = $(this).find('.shape-img').attr('src'),
        ext = getExtension(imgSrc),
        fileType = ext === "svg" ? "svg" : "image",
        type = $(this).dataVal("category") == "mask" ? "mask" : "shape";

    let isDrawShape = $(".free-shape-draw-checkbox").prop("checked");
    // add svg shape
    let item = {
        type: type,
        fileType: fileType,
        src: imgSrc
    };
    if (isDrawShape) {
        enableFreeShapeDrawing(item);
        $(this).addClass('free-drawing');
    } else {
        addItemToEditor(item)
    }
});

