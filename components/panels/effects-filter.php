<!-- Editor Effect On (Image) -->
<div class="effect-prop-head prop-head">
    <!-- Heading -->
    <div class="effect-heading prop-heading">
        <span class="heading">Effect</span>
        <span class="close-icon">
            <?= svg_icon('fas-fa-times'); ?>
        </span>
    </div>
    <!-- Content -->
    <div class="effect-content-part prop-content-part col-12">
        <div class="row add-filter-img mt-2 mx-0">
            <div class="col-12 p-0">
                <div class="photo-to-back-color">
                    <div class="menu multiple-arts">
                        <div class="all-effects">
                            <?php
                            $title = ['Brightness', 'Contrast', 'Saturation', 'Sharpen', 'Sepia', 'Hue', 'Noise', 'Pixelate', 'Blur', 'Sophia', 'Superone', 'Violin', 'Just-blues', 'Peter', 'Fellowing', 'Karen', 'Lucas', 'Reddish', 'Light', 'Drak street', 'Red street', 'Blue steel', 'Wifortress', 'Bluper', 'Atonic', 'Blue street'];
                            $img = 1;
                            foreach ($title as $names) {
                            ?>
                                <div class='showSingle mt-1' data-filter='<?= $names ?>'>
                                    <div class="canvas-parent">
                                        <canvas id="effect-canvas<?= $img++ ?>" class="mt-2"></canvas>
                                    </div>
                                    <span class='f-text content-center first-text'><?= $names ?></span>
                                </div>
                            <?php
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Reset Btn -->
    <div class="col-12">
        <div class="d-flex apply-btn-parent mt-3">
            <button class="filter-reset-btn">Reset</button>
        </div>
    </div>
</div>