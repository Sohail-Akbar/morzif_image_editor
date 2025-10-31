let layers = [];

// add layer object
let layerCount = 0;
// Add layer html
const addLayerHTML = (item, isSubLayer = false) => {
    if (!item) return '';
    let image = item.src,
        imageTag = '',
        lockIcon = '',
        subLayers = '',
        subLayerBtn = '',
        type = item.class;

    if (type == 'image' || type == "shape") {
        imageTag = `<img src="${image}" alt="img" class="layer-img">`;
    } else if (type == 'text') {
        imageTag = `<i class="layer-icon_">${EDITOR_ICON.textHeight}</i>`;
    } else if (type == 'group') {
        imageTag = `<i class="layer-icon_">${EDITOR_ICON.folder}</i>`;
        subLayerBtn = `<i class="visibility-icon sub-layer-toggle">${EDITOR_ICON.layerGroup}</i>`;
        subLayers = '<div class="sub-layers">' + subLayersData(item.id) + '</div>';
    }
    // layer id
    if (!isSubLayer)
        layers.unshift(item.id);
    let layer =
        `<div class="layer-content" data-item-id="${item.id}" data-type="${item.type}">
        <div class="media content-center">
                ${imageTag}
            <div class="media-body">
                <span class="layer-name">Layer ${++layerCount}</span>
                <div class="layer-options">
                    <i class="visibility-icon delete-item" data-delete-item="true">${EDITOR_ICON.trash}</i>
                    <i class="visibility-icon object-view" data-view="true">${EDITOR_ICON.eye}</i>
                    ${subLayerBtn}
                </div>
            </div>
        </div>
        <!-- sub layers -->
        ${subLayers}
    </div>`;
    return layer;
}

// Add Layer fn 
const addLayer = (objId) => {
    let obj = getObjById(objId);
    if (!obj) return false;
    if ($layersContainer.find(`[data-item-id="${obj.id}"]`).length) return false;
    let layerHTML = addLayerHTML(obj.originalItem);
    $('.layer-content-part').find('.layer-content-head').prepend(layerHTML);
};

// sub layers fn
let subLayerCount = 0;
function subLayersData(groupId) {
    let group = getObjById(groupId),
        subLayersHTML = '';
    if (!group) return subLayersHTML;
    group._objects.forEach(obj => {
        if (obj.originalItem) {
            let image = (obj.originalItem.src) ? obj.originalItem.src : '';
            // layer
            subLayersHTML += addLayerHTML(obj.originalItem, true)
        }
    });
    return subLayersHTML;
}

// Label Layers according to the layers pattern
function labelLayers(new_layers_pattren = null) {
    if (new_layers_pattren === null) {
        new_layers_pattren = [];
        $(".layer-content-head .layer-content").each(function () {
            new_layers_pattren.push(toNumber($(this).attr('data-item-id')));
        });
    }
    // Old Layers = layers
    // New Layers = new_layers_pattren

    let new_indexes = [];

    layers.forEach(function (l_id, i) {
        let old_index = i,
            new_index = new_layers_pattren.indexOf(l_id),
            move_index = old_index - new_index;
        if (move_index < 0) {
            new_indexes.push({
                "layer_id": l_id,
                "move_index": move_index
            });
        }
    });

    // Set New Layers to editor objects
    for (let i = new_indexes.length - 1; i >= 0; i--) {
        canvas.forEachObject((obj) => {
            if (obj.id == new_indexes[i].layer_id) {
                for (let j = new_indexes[i].move_index; j < 0; j++) {
                    canvas.sendBackwards(obj);
                }
            }
        });
    }
    canvas.requestRenderAll();
    layers = new_layers_pattren;
}

// Change Layers
$(".layer-content-part .layer-content-head").sortable({
    start: function (e, ui) {
        ui.item.addClass("focused");
    },
    stop: function (e, ui) {
        ui.item.removeClass("focused");
        labelLayers();
    }
});


// object hide and show
$(document).on('click', ".object-view[data-view='true']", function () {
    let $parent = $(this).parents(".layer-content"),
        targetId = $parent.attr('data-item-id'),
        activeObj = canvas.getActiveObject();
    opacityVal = null;
    if ($(this).hasClass('fa-eye')) {
        opacityVal = 0;
        $(this).removeClass('fa-eye');
        $(this).addClass('fa-eye-slash');
    } else {
        opacityVal = 1;
        $(this).addClass('fa-eye');
        $(this).removeClass('fa-eye-slash');
    }
    canvas.forEachObject(obj => {
        if (targetId == obj.id) {
            obj.set("opacity", opacityVal);
        }
        canvas.requestRenderAll();
    });
});
// Active layer object
function activeLayerObj(objId) {
    $layersContainer.find(".layer-content.active").removeClass("active");
    $layersContainer.find(`.layer-content[data-item-id="${objId}"]`).addClass("active");
    let obj = getObjById(objId);
    if (!obj) return false;
    setActiveObject_(obj);
}
// Active sublayer
$(document).on("click", ".layer-content-head .sub-layers .layer-content", function (e) {
    e.preventDefault();
    e.stopPropagation();
    let layerId = $(this).dataVal("item-id");
    activeLayerObj(layerId);
});
// layer active or object active
$(document).on('click', ".layer-content-head .layer-content", function () {
    let layerId = $(this).dataVal("item-id");
    activeLayerObj(layerId);
});


// active multiple object so create group fn
function createObjectsGroup(activeObj) {
    if (!activeObj) return false;
    if (activeObj.type !== 'activeSelection') return false;
    // Get upper object in group
    let upperObjId = activeObj._objects[activeObj._objects.length - 1].id,
        upperObjIndex = canvas._objects.findIndex(obj => obj.id == upperObjId);
    // create group
    let activeGroup = activeObj.toGroup(),
        id = createNewId();
    activeGroup.set({
        id,
        originalItem: {
            id,
            type: 'group',
            fileType: 'group',
            class: 'group'
        },
    });
    canvas.getActiveObject(activeGroup);
    canvas.renderAll();
    renderCanvasObject(id);
    layerReload();
    // New layer pattren
    let layersPattren = [];
    canvas.forEachObject(obj => {
        if (obj.id == id) return true;
        layersPattren.push(obj.id);
    });
    layersPattren.splice(upperObjIndex - 1, 0, id);
    labelLayers(layersPattren.reverse());
}

// layer reload
function layerReload() {
    $('.layer-content-part .layer-content-head .layer-content').remove();
    // canvas objects
    layers = [];
    canvas.forEachObject(obj => {
        if (obj.originalItem) {
            addLayer(obj.id);
        }
    });
}


// create group
$(document).on('click', ".create-active-group[data-target='group']", function () {
    let activeObj = canvas.getActiveObject();
    if (!activeObj) return false;
    createObjectsGroup(activeObj);
    $(".all-ungroup-btn[data-all-ungroup='true']").dnone(false);
});
// Un group
$(document).on("click", '.ungroup-active-selection[data-target="ungroup"]', function () {
    unGroupObjects();
    layerReload();
});


// sub layer shows 
$(document).on('click', ".layer-content .sub-layer-toggle", function () {
    let $parent = $(this).parents('.layer-content');
    $parent.find('.sub-layers').slideToggle(200);
});

