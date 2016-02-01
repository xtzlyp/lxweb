<?php
/*
 * 给添加数据工具  访问http://task.csdfg.com/1.php
 * @xtzlyp@aliyun.com
 */
	include 'lxapi/webApi.php';
	$db = middle::load('mysql');//加载middle中的load自动加载方法
	$db ->loadSql('db1',1);
	bottled();
	#
	# 功能：组合数据
	#
	function bottled(){
		global $db;
		$storeInfo = $db->table('csm_store_tall_copy')->setFiles(array('id' , 'shop_title' , 'shop_url' , 'user_id' ))->order('rand()')->where(array('t_type'=>1))->limit(1)->selectOne();
		$newInfo = $db->table('csm_ul_wx')->setFiles(array('url' , 'id'))->where(array('t_type'=>1))->order('id desc')->limit(1)->selectOne();
		if($storeInfo && $newInfo){
			$content = getcontent($newInfo['url'] , $newInfo['id']);
			$pids=array(1,2,3,4,5,6,7,8,9,10,11,12);
			$piddd=$pids[rand(0,11)];
			$re = $db->table('a_tmall_wx')->insert(array(
														'title'=>$content['title'],
														'content'=>$content['content'],
														'createtime'=>time(),
														'shop_title'=>$storeInfo['shop_title'],
														'shop_pic'=>$storeInfo['shop_url'],
														'shop_user_id'=>$storeInfo['user_id'],
														'shop_id'=>$storeInfo['id'],
														'wx_id'=>$newInfo['id'],
														'pid'=>$piddd
														));
			if($re){
				$db->table('csm_store_tall_copy')->where(array('id'=>$storeInfo['id']))->delete();
				$db->table('csm_ul_wx')->where(array('id'=>$newInfo['id']))->update(array('t_type'=>2));
				echo 1;
			}else{
				echo 2;
			}
		}
	}
	
	#
	# 功能：采集数据
	#
	function getcontent($url){
		global $db;
		$data=httpGet($url);
		preg_match('/<title>(.*)<\/title>/', $data, $title);
		preg_match('/<div class=\"rich_media_content \" id=\"js_content\">(.*)<div class=\"rich_media_area_extra\">/is', $data, $content);
		$title=$title[1];
		$content=$content[0];
		$content=str_replace('http://mmbiz.qpic.cn','http://img01.store.sogou.com/net/a/04/link?appid=100520031&w=900&h=105&url=http://mmbiz.qpic.cn',$content);
		$content=str_replace('fieldset','p',$content);
		$content=str_replace('data-src','src',$content);
		$content=explode('<script',$content);
		$content=$content[0];
		if(!$title||!$content){
			return false;
		}
		return array('title'=>$title,'content'=>$content);
		//$pids=array(1,2,3,4,5,6,7,8,9,10,11,12,13,14);
		//$piddd=$pids[rand(0,29)];
		//$storeInfo = $db->table('a_tmall_wx')->insert();
		
	}



	die();
?>
