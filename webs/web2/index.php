<?php
	include './../../lx/lx.php';
	require './../../lx/view/smarty/Smarty.class.php';
	$smarty = new Smarty;
	$smarty->setTemplateDir("templates");
	$smarty->setCacheDir("cache");
	$smarty->left_delimiter = "<{"; 
	$smarty->right_delimiter = "}>";
	$smarty->display('index.tpl');
?>
