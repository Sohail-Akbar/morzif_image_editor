 <!-- Sidebar Menu -->
 <div class="editor-options editor-mode-dark" data-editor-mode="bgdark">
     <a href="#" class="d-block px-1 link-dark text-decoration-none dir-home-page">
         <img src="./images/editor-icon/32.png" class="w-60 editor-logo">
     </a>
     <div class="main-divider"></div>
     <ul class="nav nav-pills sidebar-list-items flex-column text-center">
         <?php if ($is_template_type) { ?>
             <li title="Templates" class="list-item" data-index="templates">
                 <a class="nav-link py-3 sidebar-item" data-click="true" data-target="templates">
                     <?= svg_icon('fas-fa-large'); ?>
                 </a>
             </li>
         <?php } ?>
         <li title="Add Text" class="list-item" data-index="add-text">
             <a class="nav-link py-3 sidebar-item add-text-icon" <?= is_editor_type("addTextOnImage") ?> data-target="add-text">
                 <?= svg_icon('fas-fa-text-height'); ?>
             </a>
         </li>
         <li title="Draw" class="list-item" data-index="draw">
             <a class="nav-link py-3  sidebar-item" <?= is_editor_type("drawOnImage") ?> data-target="draw">
                 <?= svg_icon('fas-fa-paint-brush'); ?>
             </a>
         </li>
         <!-- <li title="Effect" class="list-item" data-index="effect">
                    <a class="nav-link py-3  filter-effects sidebar-item" data-target="effect">
                        <i class="fas fa-adjust" aria-hidden="true"></i>
                    </a>
                </li> -->
         <li title="Add Shapes" class="list-item" data-index="shapes">
             <a class="nav-link py-3  sidebar-item add-shape-icon" data-target="shapes">
                 <?= svg_icon('fas-fa-shapes'); ?>
             </a>
         </li>
         <li title="Image Upload" class="list-item" data-index="imageUpload">
             <a class="nav-link py-3 sidebar-item image-upload-on-editor" data-target="imageUpload">
                 <?= svg_icon('fas-fa-images'); ?>
             </a>
         </li>
         <li title="Adjust Filters" class="list-item d-none" data-index="adjust">
             <a class="nav-link py-3  sidebar-item adjust-filter-button" <?= is_editor_type("effectOnImage") ?> data-target="adjust">
                 <?= svg_icon('fas-fa-sliders-h'); ?>
             </a>
         </li>
         <?php if (IS_ADMIN) { ?>
             <li title="Categories" class="list-item" data-index="categories">
                 <a class="nav-link py-3  sidebar-item" data-target="categories">
                     <?= svg_icon('fas-fa-large'); ?>
                 </a>
             </li>
         <?php } ?>
         <!-- Layer -->
         <li title="Editor Layer" class="list-item editor-layer-btn" data-index="layer">
             <a class="nav-link py-3  sidebar-item adjust-filter-button" data-target="editor-layer">
                 <?= svg_icon('fas-fa-layer-group'); ?>
             </a>
         </li>
     </ul>
 </div>