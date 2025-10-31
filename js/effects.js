//#region Effect Filter Functions
// Effect Variables
const canvasParent = $(".canvas-parent");
let $canvasCon = $('.showSingle').find('.canvas-parent');

// Effect Initialize fn
function initializeCanvas(canvas_id, properties = {}) {
    let canvasProp = {
        isDrawingMode: false,
        preserveObjectStacking: true
    };
    for (var key in properties) {
        canvasProp[key] = properties[key];
    }
    fcanvas = new fabric.Canvas(canvas_id, canvasProp);
    fcanvas.setDimensions({
        width: parseInt(230),
        height: parseInt(125),
    });
    fcanvas.backgroundColor = 'white';
    fcanvas.requestRenderAll();
    return fcanvas;
}

// Background Image Filter fn
function backgroundImageFilters(index, filter, canvas) {
    canvas.forEachObject(obj => {
        obj.filters[index] = filter;
        var timeStart = +new Date();
        obj.applyFilters();
        let timeEnd = +new Date();
        let dimString = obj.width + ' x ' +
            obj.height;
        parseFloat(timeEnd - timeStart) + 'ms';
        canvas.renderAll();
    });

}

// Add Filter Image fn
function filterImage(canvas, image, properties = {}, filter) {
    const file = new Image();
    file.src = image;
    file.onload = function () {
        // Add Image
        fabric.Image.fromURL(image, function (img) {
            let myImg = img.set({
                scaleX: canvas.width / img.width,
                scaleY: canvas.height / img.height,
                ...properties,
            });
            canvas.add(myImg);
        });
    };
    setTimeout(() => {
        backgroundImageApplyFilter(filter, canvas);
    }, 500);
};

// Effect Canvas Init
const filterOne = initializeCanvas('effect-canvas1'),
    filterTwo = initializeCanvas('effect-canvas2'),
    filterThree = initializeCanvas('effect-canvas3'),
    filterFour = initializeCanvas('effect-canvas4'),
    filterFive = initializeCanvas('effect-canvas5'),
    filterSix = initializeCanvas('effect-canvas6'),
    filterSeven = initializeCanvas('effect-canvas7'),
    filterEight = initializeCanvas('effect-canvas8'),
    filterNine = initializeCanvas('effect-canvas9'),
    filterTen = initializeCanvas('effect-canvas10'),
    filterElen = initializeCanvas('effect-canvas11'),
    filterTwel = initializeCanvas('effect-canvas12'),
    filterThir = initializeCanvas('effect-canvas13'),
    filterFourt = initializeCanvas('effect-canvas14'),
    filterFif = initializeCanvas('effect-canvas15'),
    filterSixt = initializeCanvas('effect-canvas16'),
    filterSevent = initializeCanvas('effect-canvas17'),
    filterEightn = initializeCanvas('effect-canvas18'),
    filterNint = initializeCanvas('effect-canvas19'),
    filterTwent = initializeCanvas('effect-canvas20'),
    filterTone = initializeCanvas('effect-canvas21'),
    filterTtwo = initializeCanvas('effect-canvas22'),
    filterTthree = initializeCanvas('effect-canvas23'),
    filterTfour = initializeCanvas('effect-canvas24'),
    filterTfive = initializeCanvas('effect-canvas25'),
    filterTsix = initializeCanvas('effect-canvas26');

// All Canvas
const allCanvasData = [filterOne, filterTwo, filterThree, filterFour, filterFive, filterSix, filterSeven, filterEight, filterNine, filterTen, filterElen, filterTwel, filterThir, filterFourt, filterFif, filterSixt, filterSevent, filterEightn, filterNint, filterTwent, filterTone, filterTtwo, filterTthree, filterTfour, filterTfive, filterTsix];

// Background Image Apply Filter
function backgroundImageApplyFilter(filterType, applyTarget) {
    switch (filterType) {
        case 'Brightness':
            backgroundImageFilters(5, true && new f.Brightness({
                brightness: parseFloat(0.5)
            }), applyTarget);
            break;
        case 'Contrast':
            backgroundImageFilters(6, true && new f.Contrast({
                contrast: parseFloat(1)
            }), applyTarget);
            break;
        case 'Saturation':
            backgroundImageFilters(7, true && new f.Saturation({
                saturation: parseFloat(1)
            }), applyTarget);
            break;
        case 'Sharpen':
            backgroundImageFilters(12, true && new f.Convolute({
                matrix: [0, -1, 0,
                    -1, 5, -1,
                    0, -1, 0]
            }), applyTarget);
            break;
        case 'Hue':
            backgroundImageFilters(21, true && new f.HueRotation({
                rotate: parseFloat(1.3)
            }), applyTarget);
            break;
        case 'Noise':
            backgroundImageFilters(9, true && new f.Noise({
                noise: parseFloat(200)
            }), applyTarget);
            break;
        case 'Pixelate':
            backgroundImageFilters(10, true && new f.Pixelate({
                blocksize: parseInt(3)
            }), applyTarget);
            break;
        case 'Blur':
            backgroundImageFilters(11, true && new f.Blur({
                value: parseInt(1)
            }), applyTarget);
            break;
        case 'Sophia':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#c97354',
                mode: 'add',
                alpha: 1
            }), applyTarget)
            break;
        case 'Superone':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#40ed54',
                mode: 'add',
                alpha: 1
            }), applyTarget)
            break;
        case 'Violin':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#f46b6b',
                mode: 'add',
                alpha: 1
            }), applyTarget)
            break;
        case 'Just-blues':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#8552dd',
                mode: 'add',
                alpha: 1
            }), applyTarget)
            break;
        case 'Peter':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#507ced',
                mode: 'add',
                alpha: 1
            }), applyTarget)
            break;
        case 'Fellowing':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#50d5ed',
                mode: 'add',
                alpha: 1
            }), applyTarget)
            break;
        case 'Karen':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#d3ed2d',
                mode: 'add',
                alpha: 1
            }), applyTarget)
            break;
        case 'Lucas':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#fe6f02',
                mode: 'add',
                alpha: 1
            }), applyTarget)
            break;
        case 'Reddish':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#b5bcb5',
                mode: 'add',
                alpha: 1
            }), applyTarget)
            break;
        case 'Light':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#c97354',
                mode: 'subtract',
                alpha: 1
            }), applyTarget)
            break;
        case 'Drak street':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#40ed54',
                mode: 'subtract',
                alpha: 1
            }), applyTarget)
            break;
        case 'Red':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#f46b6b',
                mode: 'subtract',
                alpha: 1
            }), applyTarget)
            break;
        case 'street':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#8552dd',
                mode: 'subtract',
                alpha: 1
            }), applyTarget)
            break;
        case 'Blue steel':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#507ced',
                mode: 'subtract',
                alpha: 1
            }), filterTthree)
            break;
        case 'Wifortress':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#50d5ed',
                mode: 'subtract',
                alpha: 1
            }), applyTarget)
            break;
        case 'Bluper':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#d3ed2d',
                mode: 'subtract',
                alpha: 1
            }), applyTarget)
            break;
        case 'Atonic':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#fe6f02',
                mode: 'subtract',
                alpha: 1
            }), applyTarget)
            break;
        case 'Blue street':
            backgroundImageFilters(16, true && new f.BlendColor({
                color: '#b5bcb5',
                mode: 'subtract',
                alpha: 1
            }), applyTarget)
            break;
        case 'Sepia':
            backgroundImageFilters(3, true && new f.Sepia(), applyTarget)
            break;
        default:
            break;
    }

}

// Effect Image Apply fn
function effectImageApply(image) {
    let img = image;
    allFilter = ['Brightness', 'Contrast', 'Saturation', 'Sharpen', 'Sepia', 'Hue', 'Noise', 'Pixelate', 'Blur', 'Sophia', 'Superone', 'Violin', 'Just-blues', 'Peter', 'Fellowing', 'Karen', 'Lucas', 'Reddish', 'Light', 'Drak street', 'Red street', 'Blue steel', 'Wifortress', 'Bluper', 'Atonic', 'Blue street'];
    for (let i = 0; i < allCanvasData.length; i++) {
        let allCanvas = allCanvasData[i];
        filterImage(allCanvas, img, {
            selectable: false,
            name: 'effect-background-image',
        }, allFilter[i]);
    }
};

//#endregion Effect

// Filter Apply
$(document).on('click', ".add-filter-img .showSingle", function () {
    l(this);
    let filter = $(this).attr('data-filter');
    resetAllFilter();
    backgroundImageApplyFilter(filter, canvas);
});

// Filters Reset
$(document).on('click', ".apply-btn-parent .filter-reset-btn", function () {
    resetAllFilter();
});