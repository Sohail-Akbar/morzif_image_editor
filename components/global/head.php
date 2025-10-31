<?php
require_once global_file('meta');
require_once global_file('css');

$CSS_FILES_ = minify_files($CSS_FILES_, [
    'path' => DIR . 'css',
    'type' => 'css'
]);
assets_file($CSS_FILES_, 'css', 'css');
