<!-- Editor Shapes -->
<div class="shape-prop-head prop-head">
    <!-- Heading -->
    <?php cnPropPanelHeading(['name' => 'Elements']) ?>
    <!-- Content -->
    <div class="shape-content-part prop-content-part col-12">
        <div class="shape-type-part mt-3">
            <div class="shapes-icon">
                <div class="col-12">
                    <?php
                    $categories = $db->select("categories", '*', ['type' => 'shapes']);
                    if ($categories) {
                        foreach ($categories as $category) {
                            $shapes = $db->select('shapes', '*', ['category_id' => $category['id']]);
                            if ($shapes) {
                    ?>
                                <div class="cn-elements-container mb-4" data-category-sub-type="<?= $category['sub_type']; ?>" data-category-id="<?= $category['id'] ?>">
                                    <div class="pull-away align-center">
                                        <h3 class="f-text mb-0 shape-title"><?= $category['title']; ?></h3>
                                        <span class="cn-ele-items-show-btn">See all</span>
                                    </div>
                                    <button class="cn-ele-items-show-btn ele-icons-btn">
                                        <div class="row m-0">
                                            <?php
                                            $shapeCount = 0;
                                            foreach ($shapes  as $shape) {
                                                if (++$shapeCount <= 8) { ?>
                                                    <div class="col-md-3 p-2">
                                                        <div class="ele-shape">
                                                            <img src="./images/shapes/<?= $shape['image']; ?>" class="img-fluid">
                                                        </div>
                                                    </div>
                                            <?php  }
                                            } ?>
                                        </div>
                                    </button>
                                </div>
                    <?php
                            }
                        }
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
    <!-- // Catgories shapes -->
    <?php require('./components/panels/properties/all-shapes.php'); ?>
</div>