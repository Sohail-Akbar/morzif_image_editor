<div class="dropdown tc-select font-size-head">
    <input type="number" class="tc-select-input tc-select-label cn-obj-props-changer" data-toggle="dropdown" data-prop="fontSize">
    <div class="dropdown-menu">
        <?php for ($i = 6; $i < 150; $i += 6) {  ?>
            <div class="tc-option align-center" data-value="<?= $i ?>"><?= $i ?></div>
        <?php } ?>
    </div>
</div>