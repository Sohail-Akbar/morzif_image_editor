$(document).on("keydown", function (e) {
    if ($(":focus").length) return true;
    let obj = canvas.getActiveObject();
    let keyCode = e.keyCode || e.which,
        shiftKey = e.shiftKey,
        ctrlKey = e.ctrlKey,
        altKey = e.altKey,
        keyFound = false;

    // Not active object
    if (!obj) return true;
    let objType = obj.type,
        item = obj.originalItem || {};
    // Active Object
    // Group
    if (ctrlKey && keyCode == 71 && objType === 'activeSelection') {
        keyFound = true;
        $('.create-active-group[data-target="group"]').trigger('click');
    }
    // ungroup
    else if (ctrlKey && shiftKey && keyCode == 71 && objType === 'group') {
        keyFound = true;
        $('.ungroup-active-selection').trigger('click');
    }
    // to front
    else if (ctrlKey && shiftKey && keyCode === 219) {
        keyFound = true;
        $('.ct-menu-opt[data-target="bringToFront"]').trigger("click")
    }
    // bring forward
    else if (ctrlKey && keyCode === 219) {
        keyFound = true;
        $('.ct-menu-opt[data-target="bringForward"]').trigger("click")
    }
    // backward
    else if (ctrlKey && keyCode === 221) {
        keyFound = true;
        $('.ct-menu-opt[data-target="sendBackwards"]').trigger("click")
    }
    // to back
    else if (ctrlKey && shiftKey && keyCode === 221) {
        keyFound = true;
        $('.ct-menu-opt[data-target="sendToBack"]').trigger("click")
    }
    // Copy
    else if (ctrlKey && keyCode === 67) {
        keyFound = true;
        $('.ct-menu-opt[data-target="copy"]').trigger("click")
    }
    // Copy
    else if (ctrlKey && keyCode === 86) {
        keyFound = true;
        $('.ct-menu-opt[data-target="paste"]').trigger("click")
    }
    // duplicate
    else if (ctrlKey && keyCode === 68) {
        keyFound = true;
        $('.duplicate-item').trigger("click", { dontMove: shiftKey })
    }
    // Lock / Unlock
    else if (ctrlKey && keyCode === 76) {
        keyFound = true;
        $('#TcObjectLock').trigger("click")
    }
    // Delete
    else if (keyCode === 46) {
        keyFound = true;
        deleteEditorObject();
    }
    // Undo
    else if (ctrlKey && keyCode === 122) {
        keyFound = true;
        $('.undo-items').trigger('click');
    }
    // Redo
    else if (ctrlKey && keyCode === 121) {
        keyFound = true;
        $('.redo-items').trigger('click');
    }

    if (keyFound)
        e.preventDefault();
});