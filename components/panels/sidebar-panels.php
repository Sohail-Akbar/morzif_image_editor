<div class="properties-panels">
    <!-- Templates -->
    <?php if ($is_template_type) { ?>
        <div class="option-properties" data-toggle="templates">
            <?php require_once './components/templates/all.php'; ?>
        </div>
    <?php } ?>
    <!-- Sidebar panels -->
    <div class="option-properties editing-panel-css" data-toggle="add-text" data-type="text">
        <!-- Add Text -->
        <?php require_once('./components/panels/add-text.php'); ?>
    </div>
    <!-- Crop -->
    <div class="option-properties" data-toggle="crop">
        <!-- Crop -->
        <?php require_once('./components/panels/crop.php'); ?>
    </div>
    <!-- Drawing -->
    <div class="option-properties" data-toggle="draw">
        <!-- Editor Drawing -->
        <?php require_once('./components/panels/drawing.php'); ?>
    </div>
    <!-- Effect Filter -->
    <div class="option-properties" data-toggle="effect">
        <?php
        // require_once('./components/panels/effects-filter.php');
        ?>
    </div>
    <!-- Shapes -->
    <div class="option-properties" data-toggle="shapes" data-type="shape">
        <?php require_once('./components/panels/shapes.php'); ?>
    </div>
    <!-- Adjust Filter -->
    <div class="option-properties" data-toggle="adjust">
        <?php require_once('./components/panels/adjust-filters.php'); ?>
    </div>
    <!-- Categories -->
    <div class="option-properties" data-toggle="categories">
        <?php require_once('./components/panels/categories.php'); ?>
    </div>
    <!-- Editor File Upload -->
    <div class="option-properties" data-toggle="imageUpload" data-type="image">
        <?php require_once('./components/panels/file-upload.php'); ?>
    </div>
    <!-- editor Layer -->
    <div class="option-properties layer-properties-panel" data-toggle="editor-layer" data-type="editor-layer" data-overlay="true">
        <!-- adjust properties -->
        <?php require_once('./components/panels/layer.php'); ?>
    </div>
</div>