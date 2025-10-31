<!-- Editor file upload -->
<div class="row m-0 file-upload-parent  <?= !$setting_['upload_file'] ? "d-none" : "" ?>">
    <div class="col-12">
        <!-- Content -->
        <div class="file-upload-header">
            <div class="file-upload">
                <div class="image-upload-wrap">
                    <input class="file-upload-input add-image-input" type='file' accept="image/*" />
                    <div class="drag-text">
                        <h3>Drop your image OR Browse </h3>
                        <div class="file-text-upload">
                            <p class="file-editor">Welcome to modern photo editor. Start editing by clicking on the open photo button, drag n' drop a file.</p>
                        </div>
                        <button class="file-upload-btn" onclick="$('.file-upload-input').click()" type="button">Upload Image</button>
                        <div class="<?= $setting_['select_resolutions'] ? "" : "d-none" ?> content-center" style="    flex-direction: column;">
                            <span class="f-text mt-3">OR</span>
                            <button class="without-upload-image mx-3 mt-2 e-without-img">Continue without Image</button>
                        </div>
                    </div>
                </div>
                <!-- File upload Btn -->
                <div class="file-upload-content">
                    <img class="file-upload-image" src="#" alt="your image" />
                    <div class="image-title-wrap">
                        <button type="button" class="remove-image">
                            Remove
                            <span class="image-title">Uploaded Image</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>