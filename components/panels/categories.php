<!-- Editor Categoes as (Save projects data categories) -->
<div class="categories-prop-head prop-head">
    <!-- Heading -->
    <?php cnPropPanelHeading(['name' => 'Categories']); ?>
    <!-- Content -->
    <div class="categories-content-part prop-content-part">
        <div class="col-12">
            <div class="font-head mt-2">
                <span class="f-text">Categories</span>
                <select name="text-font" class="custom-selectbox editor-categories-option text-font form-control">
                    <option value="" selected>--- Select Option ----</option>
                    <?php $categories = $db->select("categories", 'uid, title', [
                        'type' => 'public_templates'
                    ]);
                    foreach ($categories as $value) { ?>
                        <option value="<?= $value['uid']; ?>"><?= $value['title']; ?></option>
                    <?php } ?>
                </select>
            </div>
            <!-- Border (line) -->
            <div class="main-divider"></div>
            <!-- Categories Data -->
            <div class="categories-data-head">
            </div>
        </div>
    </div>
</div>