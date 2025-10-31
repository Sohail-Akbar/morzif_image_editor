const tc = {};
// TC Functions
tc.fn = {
    // callbacks
    cb: {},
    // call before
    bc: {},
    _has: function (elem, attrName) {
        let hasCallback = false;
        elem = $(elem);
        if (elem.hasAttr("data-" + attrName)) {
            let callbackName = $(elem).attr("data-" + attrName);
            if (callbackName in this) {
                hasCallback = callbackName;
            }
        }
        return hasCallback;
    },
    _handle: function (elem, parameter = null, attrName = "callback") {
        let callback = $(elem).dataVal(attrName),
            valid = true,
            type = attrName === "callback" ? "cb" : null;
        if (attrName === "callbefore") type = "bc";
        if (!type) {
            type = "fn";
            // return console.error("invalid parameter attrName " + attrName);
        }
        if (!callback) return null;
        let fns = type === "fn" ? this : this[type];
        // Check if fn is not defined
        if (!(callback in fns)) {
            console.error('Uncaught TypeError: tc.fn.' + type + '.' + callback + ' is not a function');
            valid = false;
        } else {
            if (parameter !== null)
                valid = fns[callback](elem, parameter);
            else
                valid = fns[callback](elem);
        }
        return valid;
    }
}