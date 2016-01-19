<?php
	
	include './lxapi/webApi.php';
	$smarty = LxWeb::_Temp();
	print_r($smarty);
	$smarty->display('index.tpl');
?>
