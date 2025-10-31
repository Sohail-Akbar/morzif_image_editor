<?php if ($type === "public_templates") { ?>
    <div class="col-md-6">
        <div class="form-group">
            <span class="label">Resolution</span>
            <select name="meta_data[resolution_id]" class="form-control">
                <option value="0" selected>-- Select --</option>
                <?php $resolutions = $db->select("editor_resolutions");
                foreach ($resolutions as $res) {
                    $title = $res['title'] . " (" . $res['width'] . "x" . $res['height'] . ")";
                ?>
                    <option value="<?= $res['id'] ?>"><?= $title ?></option>
                <?php } ?>
            </select>
        </div>
    </div>
<?php } ?>