<!-- context menu -->
<div class="nc-context-menu" data-target="canvas.image-editor" data-callbefore="objContextMenu">
    <ul>
        <li class="ct-menu-opt copy-item pull-away" data-target="copy" data-action="OpenInBrowser">
            <div>
                <i class="mr-2">
                    <?= svg_icon('fas-fa-copy'); ?>
                </i>
                <span>Copy</span>
            </div>
            <div class="shortcut-key">ctrl + C</div>
        </li>
        <li class="ct-menu-opt paste-item pull-away" data-target="paste" data-action="OpenInBrowser">
            <div>
                <i class="mr-2">
                    <?= svg_icon('fas-fa-paste'); ?>
                </i>
                <span>Paste</span>
            </div>
            <div class="shortcut-key">ctrl + V</div>
        </li>
        <hr class="my-1">
        <li class="ct-menu-opt pull-away menu-options hide-option" title="Lock" id="TcObjectLock" data-action="OpenInBrowser">
            <div>
                <i class="mr-2 unlock-btn">
                    <?= svg_icon('fas-fa-unlock'); ?>
                </i>
                <i class="mr-2 d-none lock-btn">
                    <?= svg_icon('fas-fa-lock'); ?>
                </i>
                <span class="label-name">Lock</span>
            </div>
            <div class="shortcut-key">ctrl + L</div>
        </li>
        <hr class="my-1">
        <li class="ct-menu-opt create-active-group pull-away hide-option" data-target="group" data-action="OpenInBrowser">
            <div>
                <i>
                    <?= svg_icon('fas-fa-object-group'); ?>
                </i>
                <span>Group</span>
            </div>
            <div class="shortcut-key">ctrl + G</div>
        </li>
        <li class="ct-menu-opt group-to-ungroup-btn pull-away hide-option" data-target="ungroup" data-action="OpenInBrowser">
            <div>
                <i>
                    <?= svg_icon('fas-fa-object-ungroup-regular'); ?>
                </i>
                <span>Un Group</span>
            </div>
            <div class="shortcut-key">ctrl + shfit + G</div>
        </li>
        <li class="ct-menu-opt all-ungroup-btn pull-away hide-option" data-all-ungroup='true' data-target="All Un Group" data-action="OpenInBrowser">
            <div>
                <i>
                    <?= svg_icon('fas-fa-object-ungroup-regular'); ?>
                </i>
                <span>All Un Group</span>
            </div>
            <div class="shortcut-key"></div>
        </li>
        <li class="ct-menu-opt forward-item pull-away menu-options hide-option" data-target="bringForward" data-action="OpenInBrowser">
            <div>
                <i class="mr-2">
                    <?= svg_icon('fas-fa-arrow-up'); ?>
                </i>
                <span>Forward</span>
            </div>
            <div class="shortcut-key">ctrl + [</div>
        </li>
        <li class="ct-menu-opt backward-item pull-away menu-options hide-option" data-target="sendBackwards" data-action="OpenInBrowser">
            <div>
                <i class="mr-2">
                    <?= svg_icon('fas-fa-arrow-down'); ?>
                </i>
                <span>Backward</span>
            </div>
            <div class="shortcut-key">ctrl + ]</div>
        </li>
        <li class="ct-menu-opt bring-to-front pull-away menu-options hide-option" data-target="bringToFront" data-action="OpenInBrowser">
            <div>
                <i class="mr-2">
                    <?= svg_icon('fas-fa-arrow-up'); ?>
                </i>
                <span>To Front</span>
            </div>
            <div class="shortcut-key">ctrl + shift + [</div>
        </li>
        <li class="ct-menu-opt bring-to-back pull-away menu-options hide-option" data-target="sendToBack" data-action="OpenInBrowser">
            <div>
                <i class="mr-2">
                    <?= svg_icon('fas-fa-arrow-down'); ?>
                </i>
                <span>To back</span>
            </div>
            <div class="shortcut-key">ctrl + shift + ]</div>
        </li>
    </ul>
</div>