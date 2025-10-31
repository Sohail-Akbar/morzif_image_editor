<script>
    const _GET = <?= json_encode($_GET); ?>,
        IS_ADMIN_ = <?= json_encode(IS_ADMIN) ?>;
</script>
<?php
$global_js_files = [
    "jquery.min.js",
    "popper.min.js",
    "bootstrap.min.js",
    "sweetalert.min.js",
    "jquery-ui.min.js",
    "jquery.dataTables.min.js",
    "TC.js",
    "functions.js",
    "tc.jquery.fn.js",
    "tc.jquery.js",
    "tc.forms.js",
    "tc-file-upload.js",
];

$global_js_files = minify_files($global_js_files, [
    'path' => _DIR_ . "js",
    'type' => 'js',
    'is_global_files' => true
]);
assets_file($global_js_files, 'js', _DIR_ . "js");

$JS_FILES_ = minify_files($JS_FILES_, [
    'path' => DIR . 'js',
    'type' => 'js',
]);


assets_file($JS_FILES_, 'js', 'js');
