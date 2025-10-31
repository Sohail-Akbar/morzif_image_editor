//#region Adjust Filter fn

// Apply Filter Fn
const applyFilter = (index, filter) => {
    let activeObj = canvas.getActiveObject();
    if (!activeObj) return false;
    if (activeObj.type === 'image') {
        activeObj.filters[index] = filter;
        activeObj.applyFilters();
        canvas.renderAll();
    }
}

// Get Filter fn
function getFilter(index) {
    let activeObj = canvas.getActiveObject();
    if (!activeObj) return false;
    if (activeObj.type === 'image') {
        return obj.filters[index];
    }
}

// Apply Filter Value
function applyFilterValue(index, prop, value) {
    let activeObj = canvas.getActiveObject();
    if (!activeObj) return false;
    if (activeObj.type === 'image') {
        if (activeObj.filters[index]) {
            activeObj.filters[index][prop] = value;
            activeObj.applyFilters();
            canvas.renderAll();
        }
    }
}

//#endregion Adjust Filter 

// Apply Filter
$(document).on('click', ".basic-filter-part div", function () {
    let filter = $(this).data("filter");
    resetAllFilter();
    switch (filter) {
        case 'auto':
            resetAllFilter();
            break;
        case 'bw':
            applyFilter(19, true && new f.BlackWhite());
            break;
        case 'prop':
            applyFilter(6, true && new f.Contrast({
                contrast: 0.2
            }));
            break;
    }
    saveHistory();
});

// Filter Apply
$(document).on('input change', ".adjust-content-part .ipt-slider", function () {
    let sliderFilter = $(this).data("filter"),
        amount = parseFloat($(this).val());
    // Filter Apply (fn)
    filterApplyOnImage(sliderFilter, amount);
});

// Filter Apply On (Background Image)
function filterApplyOnImage(filterType, amount) {
    switch (filterType) {
        case 'vibrance':
            applyFilter(8, true && new f.Vibrance({
                vibrance: parseFloat(amount),
            }));
            break;
        case 'saturation':
            applyFilter(7, true && new f.Saturation({
                saturation: parseFloat(amount),
            }));
            break;
        case 'hue':
            applyFilter(21, true && new f.HueRotation({
                rotation: amount,
            }));
            break;
        case 'brightness':
            applyFilter(5, true && new f.Brightness({
                brightness: parseFloat(amount)
            }));
            break;
        case 'contrast':
            applyFilter(6, true && new f.Contrast({
                contrast: parseFloat(amount)
            }));
        case 'sharpen':
            amountVal = (amount == 0) ? false : true;
            applyFilter(12, amountVal && new f.Convolute({
                matrix: [0, -1, 0,
                    -1, 5, -1,
                    0, -1, 0
                ]
            }));
            break;
        case 'blur':
            applyFilter(11, true && new f.Blur({
                value: parseFloat(amount)
            }));
            applyFilterValue(11, 'blur', parseFloat(amount, 10));
            break;
        case 'pixelate':
            applyFilter(10, true && new f.Pixelate({
                blocksize: parseInt(amount, 10)
            }));
            applyFilterValue(10, 'blocksize', parseInt(amount, 10));
            break;
        case 'noise':
            amountVal = (amount == 0) ? false : true;
            applyFilter(9, amountVal && new f.Noise({
                noise: parseInt(amount, 10)
            }));
            break;
        case 'emboss':
            amountVal = (amount == 0) ? false : true;
            applyFilter(13, amountVal && new f.Convolute({
                matrix: [1, 1, 1,
                    1, 0.7, -1,
                    -1, -1, -1
                ]
            }));
            break;
        default:
            break;
    }
}

// Blend Mode Filter
$(document).on('input change', ".fill-blendmode-part #blend-mode", function () {
    let mode = $(this).val(),
        color = $('.fill-color-part').find('.fill-color-pick').val(),
        opacity = $('.fill-amount-part').find('.ipt-slider').val();
    if (mode === 'none') {
        resetAllFilter();
        opacity = $('.fill-amount-part').find('.ipt-slider').val(0);
    } else {
        applyFilter(16, true && new f.BlendColor({
            color: color,
            mode: mode,
            alpha: opacity,
        }));
    }
});

// Filter Tint Color Mode
$(document).on('input change', ".fill-color-part .fill-color-pick", function () {
    let color = $(this).val(),
        opacity = $('.fill-amount-part').find('.ipt-slider').val(),
        mode = $('.fill-blendmode-part').find('#blend-mode').val();
    applyFilter(16, true && new f.BlendColor({
        color: color,
        mode: mode,
        alpha: opacity,
    }));
});

// Filter Tint Color Opacity
$(document).on('input change', ".fill-amount-part .ipt-slider", function () {
    let opacity = $(this).val(),
        color = $('.fill-color-part').find('.fill-color-pick').val(),
        mode = $('.fill-blendmode-part').find('#blend-mode').val();
    applyFilter(16, true && new f.BlendColor({
        color: color,
        mode: mode,
        alpha: opacity,
    }));
});

// Filters Reset
$(document).on('click', ".adjust-reset-part .adjust-reset-btn", function () {
    resetAllFilter();
});


// Add property blur
$(document).on('input', ".item-blur[data-filter='blur']", function () {
    let filterType = $(this).data('filter'),
        BlurSize = $(this).val();
    filterApplyOnImage(filterType, BlurSize);
});