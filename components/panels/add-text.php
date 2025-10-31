<!-- Add Text -->
<div class="add-text-prop-head">
    <!-- Header -->
    <?php cnPropPanelHeading(['name' => 'Add Text']); ?>
    <!-- Content -->
    <div class="text-content-header ">
        <!-- add btn -->
        <div class="add-text-button editor-text-btn">
            <button class="add-button">
                <span>Add New Text </span>
            </button>
        </div>
    </div>
    <!-- Text templates -->
    <?php
    $text_templates_cat = $db->select_one("categories", 'uid', ['sub_type' => 'text_templates'], [
        'default' => ''
    ]);
    ?>
    <div class="text-templates-con cn-obj-non-active-content" data-id="<?= $text_templates_cat ?>"></div>
</div>