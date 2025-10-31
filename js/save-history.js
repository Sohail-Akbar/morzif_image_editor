// undo redo btns
const undoBtn = $('.image-editor-con .undo-items'),
    redoBtn = $('.image-editor-con .redo-items');

// undo and redo object modified
canvas.on({
    "object:modified": saveHistory
});

// editor history save
let editorHistory = {
    state: false,
    undo: [],
    redo: [],
};

// Save Editor State
function saveHistory() {
    redo = [];
    if (editorHistory.state) {
        editorHistory.undo.push(editorHistory.state);
    }
    editorHistory.state = {
        json: canvas.toJSON(CANVAS_OBJECT_DYNAMIC_KEYS),
    };
    fileSaved = false;
}


// Change Editor History
function changeHistory(playStack, saveStack) {
    saveStack.push(editorHistory.state);
    editorHistory.state = playStack.pop();
    // Add State To canvas
    canvas.clear();
    let stateData = editorHistory.state
    if (!stateData) return false;
    canvasLoadFromJSON(stateData.json);
}

// udno
undoBtn.on("click", function () {
    if (editorHistory.undo) {
        changeHistory(editorHistory.undo, editorHistory.redo);
    }
});

// redo
redoBtn.on("click", function () {
    if (editorHistory.redo.length) {
        changeHistory(editorHistory.redo, editorHistory.undo)
    }
});


