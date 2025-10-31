<?php
define('DIR', '../');
require_once(DIR . 'includes/db.php');

// export pdf file
if (isset($_POST['exportPdfFile'])) {
    $editor_image_path = '../images/editor-image';
    $file = $_fn->upload_file("file", [
        'path' => $editor_image_path
    ]);
    if ($file['status'] !== 'success') returnError("File Can't Upload");
    // Convert to pdf
    $pdf_file = generate_file_name('pdf', $editor_image_path);
    $pdf_file_path = merge_path($editor_image_path, $pdf_file);

    $res = $tc_ext->execute("python::svg-to-pdf", [
        'svg_file' => "../" . $file['filepath'],
        'pdf_file' => "../" . $pdf_file_path
    ]);

    if (!file_exists($pdf_file_path)) {
        returnError("File Can't Created");
    }

    returnSuccess([
        'url' => merge_path(SITE_URL, 'images/editor-image', $pdf_file),
        'fileName' => $file['original_file_name']
    ]);
}
