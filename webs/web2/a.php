<?php
/*
 * 内容详细页面
 */
	include 'lxapi/webApi.php';
	$smarty = LxWeb::_Temp();
	$db = middle::load('mysql');//加载middle中的load自动加载方法
	$db ->loadSql('db1',1);
	$arcInfo = $db->table('a_tmall_wx')
	->where(array('id' =>intval($_GET['pid'])))->selectOne();
	if(!$arcInfo){
		die();
	}
	//print_r($arcInfo);
	$rightFirst = getRand(15);
	$smarty->assign('rightFirst',$rightFirst);
	$smarty->assign('arcInfo',$arcInfo);
	$smarty->display('a.html');


	function getRand($limit = 10){
		global $db;
		$arcList = $db->table('a_tmall_wx')->setFiles(array('title','id','shop_title','shop_pic'))->order('rand()')->limit($limit)->selectAll();
		return $arcList;
	}
?>
