// Load text templates
$(document).ready(function () {
    let $textTemplatesCon = $(".editor-sidebar .text-templates-con"),
        categoryId = $textTemplatesCon.data("id");
    fetchTemplatesData(categoryId, $textTemplatesCon, {
        isOverlayTemplate: true
    });
});
// Load selected category template
$(document).ready(function () {
    let $specifCatContainer = $(".spec-templates-container"),
        id = $specifCatContainer.dataVal("id");
    if (!id) return false;
    fetchTemplatesData(id, $specifCatContainer);
});
//#region Show Single Category Templates
const $editorResizeMdl = $('#editorResize');
$editorResizeMdl.find(".media-templates-con .single-media-template").on("click", function () {
    let width = $(this).data("width"),
        height = $(this).data("height"),
        id = $(this).data("id");
    // Activate this
    $editorResizeMdl.find(".single-media-template.active").removeClass("active");
    $(this).addClass("active");
    // Fill width and height
    $editorResizeMdl.find('.editor-width-input').val(width);
    $editorResizeMdl.find('.editor-height-input').val(height);

    // Load templates of this category
    let $templatesCon = $editorResizeMdl.find(".cn-all-tamplates-con");
    $templatesCon.attr("data-id", id);
    $templatesCon.html('');
    fetchTemplatesData(id, $templatesCon);
});
//#endregion Show Single Category Templates