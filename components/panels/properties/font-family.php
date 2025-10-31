 <!-- Font Family -->
 <div class="dropdown tc-select">
     <div class="tc-dropdown-label-head px-1" data-toggle="dropdown">
         <div class="tc-select-label tc-selected-content font-family-name"></div>
         <i class="align-center">
             <?= svg_icon('fas-fa-chevron-down'); ?>
         </i>
     </div>
     <input type="hidden" class="tc-select-input cn-obj-props-changer" data-prop="fontFamily">
     <div class="dropdown-menu font-family">
         <input type="text" class="tc-search form-control border-bottom" data-target=".tc-option" data-radius=".tc-select" placeholder="Search ...">
         <?php foreach ($editor_fonts as $font) {
                $style = rtrim($font['style'], ';');
            ?>
             <div class="tc-option align-center" style="font-family: <?= $style ?>" data-value="<?= $style ?>"><?= $font['name'] ?></div>
         <?php } ?>
     </div>
 </div>