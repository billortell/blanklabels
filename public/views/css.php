<?php foreach ($_SESSION['_flashcss'] as $css) : ?>
<link href="<?php echo $css;?>" rel="stylesheet" />
<?php endforeach;
$_SESSION['_flashcss'] = [];

