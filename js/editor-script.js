// Editor File Upload Fn
$(document).on('change', ".add-image-input", function () {
    if (!this.files.length) return false;
    let $parent = $(this).parents('.file-upload'),
        file = this.files[0];
    // Clear
    canvasClearAll(true);
    uploadObjectImage(file, src => {
        backgroundImageChange(src);
        $('.file-upload-parent').dnone(true);
    });
    $('.editor-con-header').find('.mini-canvas-contanier').dnone(false);
    $(this).val('');
});

// Without Image Upload
$(document).on('click', ".file-upload-parent .without-upload-image", function () {
    let $parent = $('.image-editor-container'),
        $target = $('#editorResize').find('.apply-resize');
    $target.attr('data-target', 'without-image');
    $('#editorResize').modal('show');

    // all tamplate show

});

// Background Image Change (Editor) 
function backgroundImageChange(imageSrc) {
    // Remove existing image
    let obj = canvas._objects.find(obj => obj.type == 'background-image');
    if (obj) {
        canvas.remove(obj);
        canvas.renderAll();
    }
    // Add Image
    let img = new Image();
    img.src = imageSrc;
    img.onload = function () {
        addItemToEditor({
            type: 'background-image',
            src: imageSrc,
            fileType: 'image'
        }, {
            left: 0,
            top: 0,
            erasable: false,
            name: 'background-image',
            lockMovementX: true,
            lockMovementY: true,
        }, {
            selected: false,
            centerObject: false
        });
        // Canvas Resize
        resizeCanvas({
            width: img.width,
            height: img.height
        });
    }
}

// Add Shape
$(document).on('click', ".modal-dialog .add-image-layer-label", function () {
    $('.editor-sidebar').find('.image-upload-on-editor').click();
    $('.editor-sidebar').find('.multiple-file-upload').click();
});


// Add file to editor
function addFileToEditor(file, cb = null) {
    if (!isImageFile(file))
        return true;
    uploadObjectImage(file, src => {
        let filename = file.name,
            ext = getExtension(filename),
            fileId = createNewId();
        fileType = ext == 'svg' ? 'svg' : 'image';
        let $shapeImage =
            `<div class="col-md-6 p-1">
                <div class="image-shape cp" data-id="${fileId}">
                <img src="${src}" alt="Shapes" class="img-fluid shape-img" data-file-type="${fileType}">
                </div>
            </div>`;
        $('.image-editor-con .shapes-template-con').prepend($shapeImage);
        if (cb) {
            let $file = $(`.image-editor-con .shapes-template-con .image-shape[data-id="${fileId}"]`);
            cb($file);
        }
    });
}
// Upload image on editor
$($editorSidebarParent).on('change', ".cn-image-upload-btn .multiple-file-upload", function () {
    let files = this.files;
    if (!files.length) return false;
    Array.from(files).forEach(file => {
        addFileToEditor(file);
    })
});

$(document).on('click', ".shapes-template-con .image-shape", function () {
    let $img = $(this).find(".shape-img"),
        fileType = $img.dataVal('file-type'),
        src = $img.attr("src");
    addItemToEditor({
        type: 'image',
        fileType,
        src
    });
});

// Repace Shape Parameters
function replaceShapePara(prop = {}) {
    let $imageParent = $(".background-prop-head").find('.file-upload-data-con .background-image');
    $imageParent.css("background-image", "url(" + prop.image + ")");
    $imageParent.attr('data-image-type', prop.type);
    $imageParent.attr('data-image-id', prop.id);
}

// Sidebar Items Toggle Callback
function cbSidebarItemToggle(showPropPanel = true) {
    let $activePanels = $('.option-properties.active');
    // Active panel container
    if ($activePanels.length) {
        $(".properties-panels").addClass("active");
    } else {
        $(".properties-panels").removeClass("active");
    }
    // Show properties panel if active object
    return true;
    // return true because prop panel is migrated to another place
    if (!showPropPanel) return true;
    if (!isActiveObj()) return true;
    let activePanelType = $(".option-properties.active:not(#propsPanel)").dataVal("type");
    if (activePanelType && activePanelType == getObjType())
        showPropPanels(activePanelType);
    else
        hidePropPanels();
}

// Toggle sidebar panels
function showSidebarPanel($items = [], hideOtherPanels = true, showPropPanel = true) {
    // Hide all panels
    if (hideOtherPanels) {
        $(".editor-sidebar .sidebar-item").removeClass("active");
        $(".editor-sidebar .option-properties").removeClass("active");
    }
    // Show selected panels
    $items.forEach($item => {
        $($item).addClass("active");
    });
    // Callback
    cbSidebarItemToggle(showPropPanel);
}

// Sidebar Item
$('.editor-sidebar').on('click', ".sidebar-item", function (e) {
    e.preventDefault();
    let $parent = $(this).parents('.editor-sidebar'),
        $parentTwo = $('.image-editor-con'),
        $target = $(this).attr('data-target'),
        $activePanel = $parent.find(`.option-properties[data-toggle='${$target}']`);
    // Crop Attr Set
    $('.image-editor-con').find('.crop-sidebar-icon').attr('data-crop', 'true');
    // Hide if already active
    if ($(this).hasClass('active'))
        showSidebarPanel();
    else
        showSidebarPanel([
            $(this),
            $activePanel
        ]);
});

// Close Sidebar Panel
$($editorSidebarParent).on('click', ".option-properties .close-icon", function () {
    showSidebarPanel();
    selectionRectRemove();
});

$(document).on('click', "#propsPanel .close-icon", function () {
    $propsPanel.removeClass("active");
});

// Redirect Home Page
$(document).on('click', ".editor-options .dir-home-page", function () {
    window.location.reload();
});

// Add Layer Type
$(document).on('click', "#add-layer-type div", function () {
    let type = $(this).data("layer");
    if (type == "crop") {
        $(document).find(".crop-sidebar-icon").click();
    } else if (type == "text") {
        $(document).find(".add-text-icon").click();
    } else if (type == "shape") {
        $(document).find(".add-shape-icon").click();
    }
    $("#add-layer-modal .close-icon").click();
});


$(document).on('click', ".editor-sidebar .editor-options a.sidebar-item", function () {
    // crop
    let target = $(this).data("target");
    if (target !== "crop") {
        canvas.forEachObject(obj => {
            if (obj.name == "selectionRect") {
                canvas.remove(obj);
            }
        })
        canvas.renderAll();
        $('.editor-options').find('.crop-sidebar-icon').attr('data-crop', 'true');
    }
    // drowing 
    if (target !== 'draw') {
        drawingModeFalse();
    }
});
// Save Projects
function saveProjectAsTemplate() {
    let $parent = $('.save-editor-form'),
        editorData = JSON.stringify(canvas.toJSON(CANVAS_OBJECT_DYNAMIC_KEYS));
    // Canvas Data
    editorData = {
        editorData,
        canvasDimensions,
    };
    // Canvas Blob
    const ext = "png";
    const editorImage = canvas.toDataURL({
        format: ext,
        quality: 1.0,
        enableRetinaScaling: true
    });
    // Thumbnail Image
    let file = dataURLtoFile(editorImage, 'editor-image.png');
    // Append editor data
    $parent.find(".editor-data").val(JSON.stringify(editorData));
    // Form Data
    submitForm($parent.get(0), {
        editorData: JSON.stringify(editorData),
        image: file
    });
}
$(document).on('click', '#saveProjects .modal-body .save-editor-data', function (e) {
    e.preventDefault();
    saveProjectAsTemplate();
});

// Fetch Categories Data
function fetchTemplatesData(category_id, $parent, options = {}) {
    let data = {
        getCategoryData: true,
        category_id
    },
        isOverlay = ("isOverlayTemplate" in options) ? options.isOverlayTemplate : false,
        cb = options.cb || null;
    $.ajax({
        url: "controllers/save-editor-data",
        method: "POST",
        data: data,
        dataType: "json",
        success: function (res) {
            if (res.status == 'success') {
                if (cb) {
                    cb(res.data);
                    return false;
                }
                let categoryData = res.data;
                for (let i = 0; i < categoryData.length; i++) {
                    const categories = categoryData[i];
                    categoriesHtml = `
          <div class="card mt-2 editor-detail template-card" data-editor-data-id="${categories.category_id}" data-category-data-id="${categories.category_data_id}" data-overlay="${isOverlay}" style="background-color: var(--bgColor);">
              <img class="card-img-top" src="./images/editor-image/${categories.image}">
            <div class="card-body p-1">
                <h6 class="card-title text-light mb-0">${categories.title}</h6>
            </div>
          </div>`;
                    $($parent).append(categoriesHtml).addClass('editor-templates-con');
                }
            }
        },
        error: makeError
    });
}

// Get Categories Data Options
$($editorSidebarParent).on('change', ".editor-categories-option", function () {
    let type = $(this).val(),
        $editorDataParent = $('.categories-prop-head').find('.categories-data-head');
    $editorDataParent.find('.editor-detail').remove();
    fetchTemplatesData(type, $editorDataParent);
});
// Label Canvas objects id
function renderCanvasObjects() {
    canvas.forEachObject(function (obj) {
        renderCanvasObject(obj.id);
    });
}
// Load cavnas data from json
function canvasLoadFromJSON(jsonData, options = {}, cb = null) {
    let { dimensions } = options;
    canvas.loadFromJSON(jsonData, function () {
        canvas.renderAll();
        hideAllPositioningLines();
        if (dimensions) {
            // Resize Canvas
            resizeCanvas({
                width: dimensions.resizedWidth,
                height: dimensions.resizedHeight
            });
        }
        // Render canvas objects
        renderCanvasObjects();
        if (cb) cb();
    });
}
// Loard Editor Data
$(document).on('click', ".editor-templates-con .template-card", function () {
    let category_id = $(this).attr('data-editor-data-id'),
        category_data_id = $(this).attr('data-category-data-id'),
        isOverlay = toBoolean($(this).data("overlay"));
    if (!isOverlay) {
        canvasClearAll(true);
    }
    data = {
        category_id: category_id,
        category_data_id: category_data_id,
        getEditorDataAndLoard: true,
    };
    $.ajax({
        url: "controllers/save-editor-data",
        method: "POST",
        data: data,
        dataType: "json",
        success: function (res) {
            if (res.status == 'success') {
                let editorData = res.data,
                    canvasData = JSON.parse(editorData.editorData);
                // Set template 
                if (!isOverlay) {
                    canvasLoadFromJSON(canvasData, {
                        dimensions: editorData.canvasDimensions
                    });
                    // Set Seletecd template
                    $("#saveProjects").find(`[name="template_id"]`).val(category_data_id);
                    $("#saveProjects").find(`.template_text`).text(editorData.templateName)

                } else {
                    // Set Private Templates Data (like texts, etc)
                    canvasData.objects.forEach(function (object, index) {
                        fabric.util.enlivenObjects([object], function (objects) {
                            objects.forEach(function (obj) {
                                canvas.add(obj);
                                canvas.setActiveObject(obj);
                                canvas.renderAll();
                            });
                            canvas.renderAll();
                        });
                    })
                }
                // file upload content (hide)
                let $fileUploadParent = $('.image-editor-container');
                $fileUploadParent.find('.file-upload-parent').dnone(true);
                $fileUploadParent.find('.image-editor-con').dnone(false);
                $('.modal').modal('hide');

                // is check background color
                if (canvas.backgroundColor !== '') {
                    let cnBgColor = canvas.backgroundColor;
                    $('.cn-bg-color .clr-field').css('color', cnBgColor);
                    $('.cn-bg-color .clr-field .tc-color-picker').val(cnBgColor);
                }
            }
            saveHistory();
        },
        error: makeError
    });
});
// Load category templates
$(document).on("change", "#saveProjects .categories-input", function () {
    let uid = $(this).find("option:selected").data("uid"),
        $parent = $("#saveProjects"),
        $templateInput = $parent.find(".templates-input");
    fetchTemplatesData(uid, null, {
        cb: templates => {
            let html = '<option selected value="new">-- New --</option>';
            html += templates.map(item => `<option value="${item.category_data_id}">${item.title}</option>`).join(',');
            $templateInput.html(html);
        }
    });
});
$(document).ready(function () {
    $("#saveProjects .categories-input").trigger("change");
});

// Without Image Upload
$(document).on('click', "#editorResize .apply-resize[data-target='without-image']", function () {
    let $parent = $('.image-editor-container'),
        $target = $('#editorResize').find('.apply-resize');
    // hide prop
    $parent.find('.file-upload-parent').dnone(true);
    $parent.find('.image-editor-con').dnone(false);
    $target.removeAttr('data-target');
});

// Click Drawing button show Tools
$(document).on("click", ".drawing-modes a", function () {
    if ($(window).width() < 500) {
        $(".drawing-content").addClass('d-block');
    } else {
        $(".drawing-content").addClass('d-block');
    }
})

// Add Media Query
if ($(window).width() < 500) {
    $(".properties-panels").addClass('d-none');
    $(".file-select-header .editor-sidebar .editor-options").addClass('d-none');
} else {
    $(".properties-panels").removeClass('d-none');
    $(".file-select-header .editor-sidebar .editor-options").removeClass('d-none');
}

$(document).on("change", ".file-upload-input", function () {
    $(".properties-panels").removeClass('d-none');
    $(".file-select-header .editor-sidebar .editor-options").removeClass('d-none');
})

// Canvas active object nav font select
$(document).on('click', "#font-family .font-family-con .font-family", function () {
    let $parent = $(this).parents('#font-family'),
        activeObj = canvas.getActiveObject(),
        fontName = $(this).data('font-name');
    fontFamily = $(this).data('prop-value')
    $parent.find('.font-family-name').text(fontFamily.substring(0, 15));
    $parent.find('.font-family-name').css('font-family', fontFamily);
});

// all shapes 
// shape elements hide
$(document).on('click', ".all-shapes-container .panel-heading .icon", function () {
    let $this = $(this);
    $this.parents('.all-shapes-container').dnone(true);
});

// Shapes element show
$(document).on('click', ".cn-ele-items-show-btn", function () {
    let $parent = $(this).parents('.cn-elements-container');
    // heading get and set shapes
    shapeHeading = $parent.find('.shape-title').text();
    $('.all-shapes-container').find('.panel-heading .heading').text(shapeHeading);
    $('.all-shapes-container').dnone(false);
    // Hide option free drawing shape
    let category_type = $parent.data('category-sub-type');
    if (category_type === 'draw' || category_type === 'mask') {
        $('.is-free-drawing-shape-con').dnone(true);
    } else {
        $('.is-free-drawing-shape-con').dnone(false);
    }
});

// get shapes
const $shapesViewPanel = $("#shapesViewContainer"),
    $shapesViewContainer = $shapesViewPanel.find(".all-shapes");
$(document).on('click', ".cn-elements-container", function () {
    let category_id = $(this).data("category-id");
    // Remove previous category attributes
    $shapesViewPanel.removeAttr("data-loading");
    $shapesViewPanel.removeAttr("data-all-loaded");
    // get Shapes data
    getShapeData({
        category_id,
        clearContainer: true
    });
});
// Search Shapes
$shapesViewPanel.on("keyup", ".search-input", function () {
    $shapesViewPanel.removeAttr("data-all-loaded");
    getShapeData({
        category_id: $shapesViewPanel.dataVal("category-id"),
        clearContainer: true
    });
});

// fetch Shapes fn
function getShapeData(options, $parentTarget) {
    let $spinnerLoader = $('#spinner-loader.spinner-loading');
    if ($shapesViewPanel.dataVal("loading") || $shapesViewPanel.dataVal("all-loaded"))
        return false;
    let data = {
        getShapeData: true,
        loaded: 0,
        limit: 20,
        ...options
    };
    //#region Search
    data.query = $shapesViewPanel.find(".search-input").val();
    //#endregion Search
    // Clear container before appending shapes
    let { clearContainer } = options;
    if (clearContainer) {
        $shapesViewContainer.html("");
    }
    $shapesViewPanel.attr("data-category-id", data.category_id);
    $shapesViewPanel.attr("data-loading", "true");
    // loading (spinner)
    $spinnerLoader.dnone(false);
    $('.all-shapes-container').find('.cn-load-more-shape-con').dnone(false);
    // Send ajax
    $.ajax({
        url: "controllers/fetch-shapes",
        method: "POST",
        data: data,
        dataType: "json",
        success: function (res) {
            let success = handleAlert(res, false);
            if (!success) return false;
            // Append shapes
            res.shapes.forEach(function (item, i) {
                shapeEleHTML = `
                <div class="col-md-6 cn-shape-element cn-add-shape" data-category="${res.categories[i].sub_type}" title="${item.title}">
                    <img src="./images/shapes/${item.image}" class="img-fluid shape-img" style="width:40px;">
                    <span class="d-none">${item.title}</span>
                </div>`;
                $shapesViewContainer.append(shapeEleHTML);
            });
            if (res.shapes.length < data.limit) {
                $shapesViewPanel.attr("data-all-loaded", "true");
                $('.all-shapes-container').find('.cn-load-more-shape-con').dnone(true);
            }
            // spinner loader
            setTimeout(() => {
                $spinnerLoader.dnone(true);
            }, 500);
        },
        error: makeError,
        complete: function () {
            $shapesViewPanel.removeAttr("data-loading");
        }
    });
}

// scroll shapes penal
$('button.cn-load-more-btn').on('click', function (e) {
    e.preventDefault();
    let alreadyLoaded = $('.all-shapes-container').find(".cn-shape-element").length;
    getShapeData({
        loaded: alreadyLoaded,
        category_id: $shapesViewPanel.dataVal("category-id")
    });
});

// scroll resize shape
$('.cn-all-tamplates-con').on('scroll', function (e) {
    e.preventDefault();
    if ($(this).prop('scrollHeight') - $(this).scrollTop() <= $(this).outerHeight() + 50) {
        let alreadyLoaded = $(this).find(".template-card").length;
        l(alreadyLoaded);
        getShapeData({
            loaded: alreadyLoaded,
            category_id: $(this).find('.template-card').data('category-data-id'),
        });
    }
});

// setting
$(document).on('click', '.cn-dropdown-stopPropagation', function (e) {
    e.stopPropagation();
});

// Workspace color
$(document).on('change', ".dropdown-menu .cn-color-mode", function () {
    let $workSpaceColor = $(this).find('.switch input[type="checkbox"]'),
        isChecked = $workSpaceColor.is(':checked'),
        colorMode = isChecked ? 'dark' : 'light';
    createCookie('workSpaceColor', colorMode);
    $('body').attr('data-theme', readCookie('workSpaceColor'));
});


// file upload with drag and drop
$(document).on('drop', ".file-upload-header .image-upload-wrap", function (e) {
    let dt = e.originalEvent.dataTransfer,
        files = dt.files;
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    //Loop through files
    for (var i = 0; i < files.length; i++) {
        l(files[i]);
        canvasClearAll(true);
        uploadObjectImage(files[i], src => {
            backgroundImageChange(src);
            $('.file-upload-parent').dnone(true);
        });
        $('.editor-con-header').find('.mini-canvas-contanier').dnone(false);
    }
    $(this).removeClass('drop-image');
});

// container enter image
$(document).on('dragover dragenter', '.file-upload-header .image-upload-wrap', function (e) {
    e.preventDefault();
    $(this).addClass('drop-image');
});

// container leave
$(document).on('dragexit dragleave', '.file-upload-header .image-upload-wrap', function (e) {
    e.preventDefault();
    $(this).removeClass('drop-image');
});

