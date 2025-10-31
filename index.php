<?php
require_once('includes/db.php');
$page_name = 'Home';
#region editor types
$type = _GET('type', ['default' => '*']);
$is_template_type = false;
$editor_category_id = '';
$editor_category = null;

$setting_ = [
	'upload_file' => true,
	'select_resolutions' => true
];
$resolution = null;
if ($type === "category") {
	$editor_category_id = _GET('category_id');
	$is_template_type = true;
	$editor_category = $db->select_one('categories', '*', ['uid' => $editor_category_id]);
	if (!$editor_category) {
		errorMsgPage('Category not found');
	}
	$setting_['upload_file'] = false;
	// Check category resolution
	$meta_data = $db->json_decode($editor_category['meta_data']);
	$res_id = arr_val($meta_data, 'resolution_id', 0);
	$resolution = get_resolution_by_id($res_id);
}
if ($type !== "*") {
	$setting_['select_resolutions'] = false;
}
$editor_type = $type;
function is_editor_type($type = null, $output  = 'data-click="true"')
{
	global $editor_type;
	return $editor_type === $type ? $output : "";
}
#endregion editor types
// Google Fonts
$editor_fonts = $db->select("editor_fonts");

// Editor files
require_once('./components/includes/files.php');

?>
<!DOCTYPE html>
<html lang="en" data-image-editor="show">

<head>
	<!-- Font Family -->
	<?php
	// Google Fonts
	$editor_fonts = $db->select("editor_fonts");
	if (!$editor_fonts) $editor_fonts = [];
	$google_fonts_url = "";
	foreach ($editor_fonts as $font) {
		$google_fonts_url .= '&family=' . $font['url'];
	}
	$google_fonts_url = ltrim($google_fonts_url, '&');
	if (strlen($google_fonts_url)) {
	?>
		<link rel="stylesheet" href="https://fonts.googleapis.com/css2?<?= $google_fonts_url ?>&display=swap">
	<?php } ?>
	<?php require_once('./includes/head.php'); ?>
</head>

<body data-theme='<?= $WORKSPACE_THEME ?>'>
	<!-- Editor Container -->
	<div class="image-editor-container">
		<div class="file-select-header">
			<img src="" class="d-none editor-main-image">
			<!-- File Upload -->
			<?php require_once('./components/file-upload.php') ?>
			<!-- Editor Content -->
			<div class="image-editor-con">
				<div class="row m-0">
					<?php
					// Sidebar
					require_once('./components/panels/sidebar.php');
					// Content
					require_once('./components/panels/editor-content.php');
					// Object Properties
					require_once "./components/panels/obj-props.php";
					?>
				</div>
			</div>
		</div>
	</div>
	<?php
	// Context Menu (dropdown)
	require_once('./components/panels/context-menu.php');
	// Context nav with active object (active object top bar)
	require_once('./components/panels/cn-props-nav.php');
	// Editor Resize modal (popup)
	require_once('./components/popups/editor-resize.php');
	// Draw Polygon Cropper (crop)
	require_once('./components/popups/free-crop.php');
	// Save editor project modal (popup) 
	if (IS_ADMIN) {
		require_once('./components/popups/save-editor-project.php');
	}
	?>
	<script>
		const editor_resolution = <?= json_encode($resolution); ?>;
		let EDITOR_ICON = {
			textHeight: <?= json_encode(svg_icon('fas-fa-text-height')); ?>,
			layerGroup: <?= json_encode(svg_icon('fas-fa-layer-group')); ?>,
			trash: <?= json_encode(svg_icon('fas-fa-trash-alt')); ?>,
			eye: <?= json_encode(svg_icon('fas-fa-eye')); ?>,
			check: <?= json_encode(svg_icon('fas-fa-check')); ?>,
			plus: <?= json_encode(svg_icon('fas-fa-plus')); ?>,
			time: <?= json_encode(svg_icon('fas-fa-times')); ?>,
			folder: <?= json_encode(svg_icon('fas-fa-folder')); ?>
		};
	</script>
	<?php //  JS Files 
	require_once('./includes/js.php'); ?>

</body>

</html>