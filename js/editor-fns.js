// Check is active object
function isActiveObj() {
    return canvas.getActiveObject() ? true : false;
}
// Get Obj type
function getObjType(obj = null, fabricJSType = false) {
    if (!obj)
        obj = canvas.getActiveObject();
    if (!obj) return false;
    if (fabricJSType)
        return obj.type;
    return obj.originalItem.class;
}