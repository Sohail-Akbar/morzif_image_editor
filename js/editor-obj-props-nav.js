
const $cnObjPropsNav = $('.cn-obj-props-nav');
function showObjPropsNav(obj, moving = false) {
    if (!obj) {
        $cnObjPropsNav.removeClass("active");
        return false;
    }
    if (!moving)
        $cnObjPropsNav.addClass("active");
    let offset = $canvasContainerDiv.offset(),
        x = offset.left + (obj.left * canvas.getZoom()),
        y = offset.top + (obj.top * canvas.getZoom());
    $cnObjPropsNav.css({
        left: x + "px",
        top: y + "px"
    });

}
canvas.on("object:moving", e => {
    showObjPropsNav(e.target, true);
});

// nav hide
$(document).on('click', ".cn-obj-props-nav .nav-close-btn", function () {
    let $this = $(this),
        $parent = $this.parents('.cn-obj-props-nav');
    $parent.removeClass('active');
});