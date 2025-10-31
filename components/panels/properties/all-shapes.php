<div class="all-shapes-container d-none" id="shapesViewContainer">
    <div class="panel-heading">
        <i class="icon align-center">
            <?= svg_icon('fas-fa-arrow-left') ?>
        </i>
        <h4 class="heading f-text ml-4">Icons</h4>
    </div>
    <div class="all-shapes-content">
        <!-- Search input -->
        <div class="input-group search-container mt-3">
            <input type="text" class="form-control search-input tc-search" data-target=".tc-select-item" data-radius=".shape-show-data-con" placeholder="Search ...">
            <div class="input-group-append">
                <i class="align-center">
                    <?= svg_icon('fas-fa-search'); ?>
                </i>
            </div>
        </div>
        <!-- is Free Drawing -->
        <div class="is-free-drawing-shape-con col-md-12">
            <h4 class="f-text">Free Drawing</h4>
            <label class="switch">
                <input type="checkbox" class="card-toggler free-shape-draw-checkbox">
                <span class="slider round"></span>
            </label>
        </div>
        <div class="row m-0 mt-3 shape-show-data-con all-shapes">
        </div>
        <!-- shape Loading -->
        <div class="cn-load-more-shape-con">
            <button class="cn-load-more-btn btn">
                Load More
            </button>
        </div>
    </div>
    <div class="spinner-loading d-none" id="spinner-loader">
        <div class="spinner"></div>
        <span class="loading-txt">Loading ...</span>
    </div>
</div>