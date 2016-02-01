<?php
	include 'lxapi/webApi.php';
	$smarty = LxWeb::_Temp();
	$db = middle::load('mysql');//加载middle中的load自动加载方法
	$db ->loadSql('db1',1);

	$count = $db->table('a_tmall_wx')->where(array('pid'=>intval($_GET['list'])))->count();
	$page = middle::load('page');
	$page->setConf($count,20,'page/',5);
	$page_data = $page->showpage();
	$arcList = $db->table('a_tmall_wx')->order('id desc')->where(array('pid'=>intval($_GET['list'])))->setFiles(array('title','id','shop_title','createtime','shop_pic'))->limit($page->limit)->selectAll();
	$rightFirst = getRand(15);
	$smarty->assign('rightFirst',$rightFirst);
	$smarty->assign('arcli',$arcList);
	$smarty->assign('page_data',$page_data);
	$smarty->display('index.html');



	function getRand($limit = 10){
		global $db;
		$arcList = $db->table('a_tmall_wx')->setFiles(array('title','id','shop_title','shop_pic'))->order('rand()')->limit($limit)->selectAll();
		return $arcList;
	}
?>
