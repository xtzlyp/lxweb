<meta http-equiv="content-type" content="text/html;charset=utf-8">
<?php
	include 'lxapi/webApi.php';
	$db = middle::load('mysql');//加载middle中的load自动加载方法
	$db ->loadSql('db1',1);
	
	#
	# 功能：分页
	#
	$page = middle::load('page');
	$page->setConf(1000,10,'/page/',5);
	$page_data = $page->showpage();
	print_r($page_data);

	#
	# 功能：数据库执行
	#
	//$sql = 'select * from tmall_list order by id desc '.$page->limit;//LIMIT 130,10
	$result = $db->table('csm_ul_num')->where(array('num' =>65))->setFiles(array('id' , 'wxdat'))
	->order('id desc')->limit('3')->selectAll();
	$resultOne = $db->table('csm_ul_num')->where(array('id' =>'96'))->selectOne();
	print_r($resultOne);
	print_r($result);
	#$update = $db->table('csm_ul_num')->where(array('id' =>93))->update(array('num'=>65,'dat'=>1));
	//print_r($update);
	
	#$insert = $db->table('csm_ul_num')->insert(array('num'=>65,'dat'=>1));
	#print_r($insert);

	//$delete = $db->table('csm_ul_num')->where(array('id'=>98))->delete();
	//print_r($delete);

	#
	# 功能：视图设置
	#
	//$smarty = LxWeb::_Temp();
	//$smarty->display('index.html');
	die();
?>
