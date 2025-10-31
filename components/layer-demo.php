<?php for ($i = 0; $i < 1; $i++) {  ?>
    <div class="layer-content" data-item-id="1" data-type="background-image">
        <div class="media content-center">
            <img src="./images/alone image.jpg" alt="img" class="layer-img">
            <div class="media-body">
                <input type="text" class="name" value="Layer <?= $i ?>" name="layer_name" autocomplete="off">
                <i class="align-center visibility-icon  delete-object">
                    <?= svg_icon('fas-fa-trash-alt') ?>
                </i>
                <i class="align-center visibility-icon visible-icon">
                    <?= svg_icon('fas-fa-eye'); ?>
                </i>
                <i class="align-center visibility-icon sub-layer-toggle">
                    <?= svg_icon('fas-fa-layer-group'); ?>
                </i>
            </div>
        </div>
        <div class="sub-layer-con">
            <div class="media content-center">
                <img src="./images/alone image.jpg" alt="img" class="layer-img">
                <div class="media-body">
                    <input type="text" class="name" value="Layer <?= $i ?>" name="layer_name" autocomplete="off">
                    <i class="align-center visibility-icon  delete-object">
                        <?= svg_icon('fas-fa-trash-alt') ?>
                    </i>
                    <i class="align-center visibility-icon visible-icon">
                        <?= svg_icon('fas-fa-eye'); ?>
                    </i>
                </div>
            </div>
            <div class="media content-center">
                <img src="./images/alone image.jpg" alt="img" class="layer-img">
                <div class="media-body">
                    <input type="text" class="name" value="Layer <?= $i ?>" name="layer_name" autocomplete="off">
                    <i class="align-center visibility-icon  delete-object">
                        <?= svg_icon('fas-fa-trash-alt') ?>
                    </i>
                    <i class="align-center visibility-icon visible-icon">
                        <?= svg_icon('fas-fa-eye'); ?>
                    </i>
                </div>
            </div>
        </div>
    </div>
<?php  } ?>