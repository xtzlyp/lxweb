<meta http-equiv="content-type" content="text/html;charset=utf-8">
<?php
	include 'lxapi/webApi.php';
	$db = middle::load('mysql');//加载middle中的load自动加载方法
	$db ->loadSql('db1',1);
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
	# 功能：组合数据
	#
	function bottled(){
		//$id = rand(1,79419);
		$storeInfo = $db->table('csm_store_tall')->setFiles(array('id' , 'seller_nick' , 'user_id' , 'pic_url'))->where(array('t_type'=>1))->limit(1)->selectOne();
		//$wxid = rand(2,11999);
		$newInfo = $db->table('csm_ul_wx')->setFiles(array('url' , 'id'))->where(array('t_type'=>1))->order('id desc')->limit(1)->selectOne();
		getcontent($newInfo['url'] , $newInfo['id']);

	}

	#
	# 功能：采集数据
	#
	public function getcontent($url,$pid){
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
			echo 'mmmm';
			die();
		}
		$pids=array(1,2,3,4,5,6,7,8,9,10,11,12,13,14);
		$piddd=$pids[rand(0,29)];
		$storeInfo = $db->table('a_tmall_wx')->insert();
		
		$sql="insert into a_tmall_wx (title,content,createtime,pid) values ('".$title."','".$content."','".time()."','".$piddd."');";
		$dats=$this->db->update($sql);
		if(!$dats){
			 die('cuowu ');
		}
		$upSql="update csm_ul_wx set t_type=2 where id=".$pid;
		$this->db->update($upSql);
	}


	function httpGet($url){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);    
		curl_setopt($ch, CURLOPT_HEADER, 0); 
		curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
		curl_setopt($ch, CURLOPT_TIMEOUT, 15);
		$output = curl_exec($ch);
		curl_close($ch);
		return $output;
	}



	die();
?>
