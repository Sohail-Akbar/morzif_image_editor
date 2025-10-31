const spinner = '<span class="spinner"></span>',
    l = console.log.bind(this),
    logError = console.error.bind(this);
let GLOBAL_COUNT = 0;
function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}
/* 
    Parse text for add tags
    Example 1:
            syntax: tag_name:classes[inner text]
            example: b:text-success[new value]
    Example 2: 
        Link
            syntax: tag_name:classes[inner text](url)
            example: a:text-info[naxotop](https://naxotop.com/)
    */
function parseMarkDownText(text) {
    text = text.replace(/(\w+):([\w-]+)?\[([^\]]*)\](\(([^)]+)\))?/mig, '<$1 class="$2" href="$5">$3</$1>');
    text = text.replace(/( href="">)/m, ">");
    return text;
}

// is json
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}    // Get Number
function toNumber(str) {
    if (typeof (str) == "number" || typeof (str) == "float") return str;
    if (str) {
        str = str.replace(/[^\d.]/g, "");
        if (str.length > 0) {
            str = parseFloat(str);
        }
    }
    str = parseFloat(str);
    if (isNaN(str)) {
        return false;
    } else {
        return str;
    }
}
// To boolean
function toBoolean(data) {
    if (typeof data === "boolean") return data;
    if (isJson(data)) {
        data = JSON.parse(data);
    }

    return data ? true : false;
}
function ltrim(str, char) {
    if (!str.length) return str;
    let rgx = new RegExp(`^(${char})+`, "g");
    return str.replace(rgx, "");
}
function rtrim(str, char) {
    if (!str.length) return str;

    let rgx = new RegExp(`(${char})+$`, "g");
    return str.replace(rgx, "");
}
function trim(str, char = " ") {
    str = ltrim(str, char);
    str = rtrim(str, char);
    return str;
}
// Alert Fuction
function sAlert(text, heading, options = {}) {
    let type = ("type" in options) ? options.type : false,
        html = ("html" in options) ? options.html : false;

    if (!type)
        type = heading.toLowerCase();

    let icons = ["success", "error", "warning", "info", "question"];
    if (!icons.includes(type)) type = '';
    let msgOptions = {
        type: type,
        title: heading,
        text: text,
    };
    if (html) {
        delete msgOptions.text;
        msgOptions.html = text;
    }
    Swal.fire(msgOptions);
}
// Handle Alert
function handleAlert(res, showSuccessAlert = true) {
    let success = false;
    if (typeof res === "string") {
        if (!isJson(res)) return false;
        else res = JSON.parse(res);
    }
    if (res.status == "success") success = true;
    let heading = ("heading" in res) ? res.heading : res.status;
    if (!success || showSuccessAlert)
        sAlert(res.data, heading, {
            type: res.status,
            ...res
        });
    return success;
}
// Error
function makeError(error = 'Something went wrong! Please try again') {
    if (typeof error !== "string")
        error = 'Something went wrong! Please try again';
    Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: error,
    });
}
// Disaled button
function disableBtn(btn) {
    btn = $(btn);
    btn.html(spinner);
    btn.addClass('disabled');
    btn.prop('disabled', true);
}
// Enable button
function enableBtn(btn, text) {
    btn = $(btn);
    btn.html(text);
    btn.removeClass('disabled');
    btn.prop('disabled', false);
}
function isObject(obj) {
    if (obj.__proto__.toString) {
        return (obj.toString() == "[object Object]")
    }
    return false;
}
// Loader
function getLoader(text) {
    let loader = '';
    loader += '<div class="loader">';
    loader += '<span class="load"></span>';
    if (text)
        loader += '<span class="text">Loading</span>';
    loader += '</div>';
    return loader;
}
const loader = getLoader(false);
function convertObjToQueryStr(Obj) {
    return Object.keys(Obj).map(function (key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(Obj[key]);
    }).join('&');
}


function dataTable() {
    $(".dataTable:not([data-launch])").each(function () {
        $(this).attr("data-launch", "true");
        var table = $(this).DataTable({
            // orderCellsTop: true,
            // fixedHeader: true
        });
        // Filters
        if ($(this).hasAttr("data-filters") || false) {
            $(this).find("thead tr th, thead tr td").each(function (i) {
                let parent = $(this).parents(".table-responsive");
                if (parent.find(".filter-row").length < 1) {
                    parent.prepend('<div class="row filter-row pb-3"></div>');
                }
                let filtersParent = parent.find(".filter-row"),
                    name = $(this).text();
                //lists for search
                if ($(this).hasAttr("data-filter")) {
                    let columnData = [];
                    data = table.column(i).data(),
                        selector = 'table-filter-' + name.replace(/[^a-zA-Z]/g, '');
                    for (let j = 0; j < data.length; j++) {
                        let cData = data[j];
                        if (!columnData.includes(cData))
                            columnData.push(cData)
                    }
                    let filterType = $(this).data("filter"),
                        element = '',
                        event = "change";
                    if (filterType === "list") {
                        let listItems = '',
                            listItemsArr = [];
                        columnData.forEach(item => {
                            let items = filterItems(item);
                            if (items === false) {
                                item = stripTags(item);
                                items = [item];
                            }
                            items.forEach(fItem => {
                                fItem = fItem.trim();
                                let itemText = capitalizeFirstLetter(fItem);
                                if (!listItemsArr.includes(fItem)) {
                                    listItems += `<option value="${fItem}">${itemText}</option>`;
                                    listItemsArr.push(fItem);
                                }
                            })
                        });
                        element = `<select class="form-control ${selector}">
                                        <option value="">-- Select --</option>
                                        ${listItems}
                                    </select>`;
                    } else if (filterType === "date") {
                        element = `<input type="date" class="form-control date_input ${selector}">`;
                    }
                    let col = 'col-lg-3';
                    if ($(this).data("col")) col = $(this).data("col");
                    let list = `
                    <div class="${col}">
                    <span class="label">${name}</span>
                    ${element}
                    </div>`;
                    filtersParent.append(list);

                    // Add filter functionality
                    $('.' + selector).on('change', function () {
                        setTimeout(() => {
                            if (table.column(i).search() !== this.value) {
                                table
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                            }
                        }, 500);
                    });
                }
            });
        }
    });

};

// Scroll to element
function scrollTo_($elem, duration = 1000, direction = 'top', scrollFrom = 'html, body') {
    if (!$elem.length) return false;
    let scrollDir = "scroll" + capitalize(direction, true),
        offset = $elem.offset(),
        totalOffset = (direction in offset) ? offset[direction] : 0;

    let data = {};
    data[scrollDir] = totalOffset;
    $(scrollFrom).animate(totalOffset, duration);
}
// check if image file
function isImageFile(file) {
    let allowedExt = ['jpg', 'png', 'jpeg', 'gif', 'jfif', 'svg', 'webp'];
    let ext = file.name.split('.').pop().toLowerCase();
    if (allowedExt.includes(ext)) {
        return true;
    } else {
        return false;
    }
}
function tcFns() {
    // Set Height to other element height
    $('[data-js-height]').each(function () {
        let $elem = $($(this).dataVal("js-height"));
        if ($elem.length) {
            $(this).height($elem.height());
        }
        $(this).removeAttr("data-js-height");
    });
}
// TC REsponsive image
function tcResImage() {
    $(".tc-res-img[src]").each(function () {
        $(this).css("background-image", `url(${$(this).attr("src")})`);
        $(this).removeAttr("src");
        $(this).removeClass("tc-res-img");
        $(this).addClass("tc-res-img-div");
    });
}
// Refresh Functions
function refreshFns() {
    bsTooltips(); // bootstrap tooltips & Popover
    tcCheckbox(); // Checkbox
    initTcJxElements('.tc-jx-element'); // Jx Elements
    tcFns(); // Custom Functions
    tcResImage(); // TC Responsive Image
    dataTable(); // Data Table 
    if (typeof tcColorPicker != 'undefined')
        tcColorPicker(); // TC Color picker
    initTcSelect();
}
$(document).ready(function () {
    refreshFns();
    // Click on element
    $("[data-click='true']").trigger("click");
});


// Search
const tcSearch = function (element) {
    let val = $(element).val().toLowerCase();
    if (!element.hasAttribute("data-target")) return false;
    let target = $(element).attr("data-target"),
        radius = $(element).dataVal("radius", 'body');

    target = $(element).parents(radius).first().find(target);
    target.filter(function () {
        let dataTarget = $(this).hasAttr("data-match") ? $(this).find($(this).attr("data-match")) : $(this);
        let txt = dataTarget.text();
        if (txt) {
            $(this).toggle(txt.toLowerCase().indexOf(val) > -1);
        }
    });
}

// tc Search 
$(document).on("keyup", ".tc-search", function () {
    tcSearch(this);
});
// Get File Extension
function getExtension(path) {
    let basename = path.split(/[\\/]/).pop(),
        pos = basename.lastIndexOf(".");
    if (basename === "" || pos < 1)
        return "";
    return basename.slice(pos + 1);
}
// canvas data url to file
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
        type: mime
    });
}
// Check if blob url
function isBlobUrl(url) {
    return url.startsWith('blob:');
}
// Get file from url
async function getFileFromUrl(url, name, defaultType = 'image/jpeg') {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], name, {
        type: data.type || defaultType,
    });
}
// Check is file
function isFile(data) {
    if (typeof data !== "object") return false;
    return data.lastModified && data.size;
}
// Generate random string
function getRand(length = 30, type = 'string') {
    let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (type === 'integer') {
        characters = '0123456789';
    }
    let charactersLength = characters.length,
        randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomString;
}
// Create Cookie
function createCookie(name, value, timeInSeconds = 10000000000000000000000) {
    var date = new Date();
    date.setTime(date.getTime() + (timeInSeconds * 1000));
    var expires = "; expires=" + date.toGMTString();

    document.cookie = name + "=" + value + expires + "; path=/";
}
// Get Cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// read cookie
function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var cookieVal = ca[i];
        while (cookieVal.charAt(0) === ' ')
            cookieVal = cookieVal.substring(1, cookieVal.length);
        if (cookieVal.indexOf(nameEQ) === 0)
            return decodeURIComponent(cookieVal.substring(nameEQ.length, cookieVal.length));
    }
    return null;
}
/*
    @param value - value
    @param total - total of the value
    @param newTotal - total of new value
*/
function getValueWithNewPercentage(value, total, newTotal) {
    let per = (value / total) * 100,
        newValue = (per * newTotal) / 100;
    return newValue;
}


//#region Popup Window
// Show Popup Window
$(document).on("click", ".popup-window-btn,[data-toggle='popup']", function (e) {
    e.preventDefault();
    let target = $(this).attr("data-target");
    if (!target) return false;
    $(target).addClass("active");
    let event = {
        target: $(target),
        relatedTarget: $(this)
    };
    tc.fn._handle($(target), event);
});
$(document).on("click", ".popup-window", function (e) {
    let target = $(e.target),
        validCloseClassSelectors = ['close-window', 'popup-window'],
        popupWindow = $(this);
    validCloseClassSelectors.forEach(function (className) {
        if (target.hasClass(className)) {
            popupWindow.removeClass("active");
        }
    })
});

$(document).on("click", ".popup-window [data-close='popup-window'], [data-dismiss='popup']", function () {
    $(this).parents(".popup-window").popup("hide");
});

// TC Popup
$.fn.popup = function (type = '') {
    if (!$(this).hasClass("popup-window")) return false;
    if (type === "show") {
        $(this).addClass("active");
    } else if (type === 'hide') {
        $(this).removeClass("active");
    }
}
//#endregion Popup Window



// update slider val
function updateSliderVal(sliderEle) {
    let $slider = sliderEle,
        sliderMinVal = $slider.attr("min"),
        sliderMaxVal = $slider.attr("max"),
        sliderVal = $slider.val();
    let percentageVal = (sliderVal - sliderMinVal) / (sliderMaxVal - sliderMinVal) * 100;
    $slider.css({
        "background-image": `linear-gradient(90deg, #fff ${percentageVal}%, transparent ${percentageVal}%)`,
    });
}