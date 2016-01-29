<?php
	include 'lxapi/webApi.php';
	$db = middle::load('mysql');//加载middle中的load自动加载方法
	$db ->loadSql('db1',1);
	$data = $db->table('wx_ul_taobao')->where(array('id' => trim(http_req('aid','get',0)));)->selectOne();
	if(!$data) return false;
	//查找对应的店铺
	$storeInfo = $db->table('wx_ul_tmall')->where(array('id' => $data['store_id']);)->selectOne();
	$title = $storeInfo['title'].$data['title'];
	$smarty = LxWeb::_Temp();
	$smarty ->assign('title',$title);
	$smarty ->assign('arcinfo',$data);
	$smarty ->assign('storeInfo',$storeInfo);
	$smarty->display('index.html');
?>
