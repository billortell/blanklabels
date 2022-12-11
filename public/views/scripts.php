<?php foreach ($_SESSION['_flashscripts'] as $script) : ?>
<script src="<?php echo $script;?>"></script>
<?php endforeach;
$_SESSION['_flashscripts'] = [];
