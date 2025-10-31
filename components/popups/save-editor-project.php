        <!-- Save editor project modal (popup) -->
        <div class="modal fade" id="saveProjects" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <!-- Content -->
                <div class="modal-content">
                    <!-- Header -->
                    <div class="modal-header">
                        <h6 class="modal-title f-text" id="exampleModalLabel">Save Editor Data</h5>
                            <button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <!-- Content body -->
                    <div class="modal-body">
                        <form class="save-editor-form" action="save-editor-data">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <span class="f-text">Title</span>
                                        <input type="text" class="form-control inp title" name="title" required data-length='[0-250]'>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <span class="f-text">Categories Type</span>
                                        <select name="category_id" class="form-control inp category_id categories-input">
                                            <option value="" selected>--- Select Option ----</option>
                                            <?php $categories = $db->select("categories", "*", [
                                                "type" => [
                                                    'value' => "('public_templates', 'text_templates')",
                                                    'operator' => 'IN'
                                                ]
                                            ], ['query' => false]);
                                            foreach ($categories as $value) {
                                                $category_id = $value['id'];
                                            ?>
                                                <option value="<?= $category_id ?>" <?= $value['uid'] == $editor_category_id ? "selected" : "" ?> data-uid="<?= $value['uid'] ?>"><?= $value['title']; ?></option>
                                            <?php
                                            } ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <span class="f-text">Template</span>
                                        <select name="template_id" class="form-control inp templates-input"></select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <span class="f-text">Discription</span>
                                        <textarea name="discription" class="form-control inp discription"></textarea>
                                    </div>
                                </div>
                                <div class="col-12 text-right mt-3">
                                    <input type="hidden" name="saveEditorData" value="true">
                                    <button type="submit" class="submit-btn btn save-editor-data">
                                        <i class="align-center">
                                            <?= svg_icon('fas-fa-save'); ?>
                                        </i>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>