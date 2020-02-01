<?php
	$map = "var MAP = " . $_POST['map'];
	$folder = $_POST['folder'];

	$fp = fopen($folder, 'w');
	fwrite($fp, $map);
	fclose($fp);
?>
