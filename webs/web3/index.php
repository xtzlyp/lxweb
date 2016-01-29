<?php
	include 'lxapi/webApi.php';
	$db = middle::load('mysql')->loadSql('db1',1);//加载middle中的load自动加载方法
	$page = middle::load('page');
	$count = $db->table('wx_ul_taobao')->count();
	
	$smarty->display('index.html');
?>
