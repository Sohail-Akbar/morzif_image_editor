// #region Profile Picture
$('.sidebar .user-info .user-img-file').on('change', function () {
    let file = this.files;
    if (file.length < 1) return false;
    file = file[0];
    if (!isImageFile(file)) {
        sAlert('Invalid File type. Please upload an image file', 'error');
        return false;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        file = reader.result;
        parent = $(this).parents('.user-image-container');
        parent.find('.user-img').attr('src', file);
        parent.addClass('active');
    }
});
$('.sidebar .user-info .save-img').on('click', function () {
    let imagecontainer = $(this).parent().find('.user-image-container'),
        file = imagecontainer.find('.user-img-file').get(0).files,
        btn = $(this),
        btnText = $(this).html();
    if (file.length < 1) {
        imagecontainer.removeClass('active');
        return false;
    }
    file = file[0];
    if (!isImageFile) {
        sAlert('Invalid File type. Please upload an image file', 'error');
        return false;
    }
    let formData = new FormData();
    formData.append('changeUserImage', file);
    $.ajax({
        url: "controllers/user",
        type: 'POST',
        data: formData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
            disableBtn(btn);
        },
        success: function (response) {
            enableBtn(btn, btnText);
            imagecontainer.removeClass('active');
            sAlert('Image Changed Successfully!', 'success');
        },
        error: function () {
            enableBtn(btn, btnText);
            makeError();
        }
    })
});
// #endregion Profile Picture

// #region Sidebar links dropdown
$(document).on("click", ".sidebar .nav .nav-item.with-sub-menu > .nav-link", function (e) {
    e.preventDefault();
    let $li = $(this).parent();
    let $submenu = $li.find(".sub-menu");
    $submenu.slideToggle(300);
    $li.toggleClass("active", !$li.is(".active"));
});
// #endregion Sidebar links dropdown
// #region Sidebar links active
function activeSidebarLink() {
    let url = window.location.href.split("/").pop(),
        $li = $(`.sidebar .nav .nav-link[href="${url}"]`).parent();
    if ($li.parents(".nav-item").length > 0) {
        $li.parents(".nav-item").children('.nav-link').trigger("click");
    }
    $li.addClass("active");
    l($li.parents(".nav-item"))
}
activeSidebarLink();
// #endregion Sidebar links active

//#region Credits Start

// is checked credit container show || hide
$(document).on('change', ".toggle-template-credit", function () {
    let $target = $('.template-credit-container');
    this.checked ? $target.slideDown() : $target.slideUp();
});

// default credit text add in textarea
$(document).on('click', ".credit-text-defualt-paste", function () {
    let $parent = $(this).parents('.credit-text-container');
    $parent.find('.credit-textarea').val(null);
    $parent.find('.credit-textarea').val($(this).text());
});

// credits add 
$(document).on('click', ".template-credit-container .credit-plus-btn", function () {
    let $creditParent = $(this).parents('.template-credit-container');
    let creditHtml =
        `<div class="row credit-html-data col-md-12">
            <div class="col-md-4 pl-0">
                <div class="form-group">
                    <span class="f-text">Credit Position</span>
                    <select name="credit_position[]" class="form-control inp">
                        <option value="" selected>--- Credit ----</option>
                        <option value="inside download button">Inside Download Button</option>
                        <option value="below canvas">Below Canvas</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group credit-text-container">
                    <div class="pull-away">
                        <span class="f-text">Credit Text</span>
                        <span class="credit-text-defualt-paste f-text cp">a:class[text](url)</span>
                    </div>
                    <textarea name="credit_text[]" class="inp form-control credit-textarea"></textarea>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group content-center">
                    <i class="mx-2 credit-plus-btn" title="Add Credit">${EDITOR_ICON.plus}</i>
                    <i class="mx-2 credit-close-btn" title="Close Credit">${EDITOR_ICON.time}</i>
                </div>
            </div>
        </div>`;
    $creditParent.append(creditHtml);
});

// close credit
$(document).on('click', ".template-credit-container .credit-close-btn", function () {
    $(this).parents('.credit-html-data').remove();
});

//#endregion Credit End