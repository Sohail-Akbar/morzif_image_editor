// Group alignment
function groupAlignment(direction) {
    let activeGroup = canvas.getActiveObject();
    if (activeGroup.type === 'activeSelection') {
        // Group width and height
        let groupWidth = activeGroup.getBoundingRect(true).width,
            groupHeight = activeGroup.getBoundingRect(true).height;
        // Group inner objects
        activeGroupPosition = {
            left: activeGroup.left,
            top: activeGroup.top,
            groupWidth: activeGroup.getBoundingRect(true).width,
            groupHeight: activeGroup.getBoundingRect(true).height,
        };
        activeGroup._objects.forEach(function (obj, i) {
            // objects Width & height
            let objWidth = obj.getBoundingRect(true).width,
                objHeight = obj.getBoundingRect(true).height;
            // Center
            if (direction === 'top') {
                obj.set({
                    top: -groupHeight / 2,
                });
            } else if (direction === 'bottom') {
                obj.set({
                    top: groupHeight / 2 - objHeight
                });
            } else if (direction === 'centerV') {
                obj.centerV();
            } else if (direction === 'centerH') {
                obj.centerH();
            } else if (direction === 'left') {
                obj.set({
                    left: -groupWidth / 2
                });
            } else if (direction === 'right') {
                obj.set({
                    left: groupWidth / 2 - objWidth
                });
            } else if (direction === 'center') {
                obj.center();
            }

        });
        groupObjectsWidthUpdate(activeGroup);
        canvas.renderAll();
        if (direction === 'centerV' || direction === 'centerH' || direction === 'center') {
            activeGroup.set({
                left: activeGroupPosition.left,
                top: activeGroupPosition.top,
            });
            canvas.renderAll();
        }
    }
}

// Group Objects Width Update
function groupObjectsWidthUpdate(group) {
    group.forEachObject(function (item) {
        group.removeWithUpdate(item).addWithUpdate(item);
    });
    group.setCoords();
    canvas.renderAll();
}

// object Scaling
canvas.on({
    'object:modified': objectScaling
});

// Object Scaling
function objectScaling(options) {
    if (options.target.isType('group')) {
        groupObjectsWidthUpdate(options.target);
    }
}

// check obj left
function checkObjDir(a, b, type) {
    if (a[type] < b[type]) {
        return -1;
    }
    if (a[type] > b[type]) {
        return 1;
    }
    return 0;
}

// Space between
function activeSelectionFlex(property, value) {
    let type = value;
    if (!['x', 'y'].includes(property)) return false;

    let activeObj = canvas.getActiveObject();
    if (!activeObj) return true;
    if (activeObj.type !== 'activeSelection') return true;

    let dimType = property === "x" ? 'getWidth' : 'getHeight',
        dirType = property === "x" ? 'left' : 'top',
        objects = activeObj._objects.sort(function (a, b) {
            l(dirType)
            l(a[dirType])
            if (a[dirType] < b[dirType]) return -1;
            if (a[dirType] > b[dirType]) return 1;
            return 0;
        }),
        allObjWidths = objects.reduce((a, b) => a + b[dimType](), 0),
        selectionWidth = activeObj[dimType](),
        emptySpaceWidth = selectionWidth - allObjWidths,
        x = 0,
        offsetLeftPerObj = 0,
        xValues = [];
    if (emptySpaceWidth <= 0) return false;
    // Left
    if (type == "left") {
        objects.forEach((obj, i) => {
            xValues.push(x);
            x += obj[dimType]();
        });
    }
    // Right
    else if (type === 'right') {
        x = emptySpaceWidth;
        objects.forEach((obj, i) => {
            xValues.push(x);
            x += (obj[dimType]());
        });
    }
    // Center
    else if (type === 'center') {
        x = emptySpaceWidth / 2;
        objects.forEach((obj, i) => {
            xValues.push(x);
            x += (obj[dimType]());
        });
    }
    // Space between
    else if (type == 'spaceBetween') {
        offsetLeftPerObj = emptySpaceWidth / (objects.length - 1);

        objects.forEach((obj, i) => {
            let left = i == 0 ? 0 : offsetLeftPerObj;
            x += left;
            xValues.push(x);
            x += obj.getScaledWidth();
        });
    }
    // Space Around
    else if (type === 'spaceAround') {
        offsetLeftPerObj = (emptySpaceWidth / objects.length) / 2;
        objects.forEach((obj, i) => {
            x += offsetLeftPerObj;
            xValues.push(x);

            x += (obj[dimType]() + offsetLeftPerObj);
        });
    }

    // Set left
    objects.forEach((obj, i) => {
        let left = xValues[i] - (selectionWidth / 2);
        obj.set(dirType, left);
    });
    canvas.renderAll();
}
