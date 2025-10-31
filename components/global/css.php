<?php

$global_css_files = minify_files([
    'font-awesome.min.css',
    'bootstrap.min.css',
    'jquery-ui.min.css',
    "jquery.dataTables.min.css",
    'custom.css',
    'TC.css',
], [
    'path' => _DIR_ . 'css',
    'type' => 'css',
    'is_global_files' => true
]);

assets_file($global_css_files, 'css', _DIR_ . "css");


$CSS_FILES_ = isset($CSS_FILES_) ? $CSS_FILES_ : [];
