<?php
/**
 * 功能：自动加载模块
 * 作者：xtzlyp
*/
class middle{
	//加载并实例化
	static function load($com_name){
		$path = dirname(dirname(__FILE__));
		if(!class_exists($com_name)){
			include ($path.'/com/'.$com_name.'.class.php');
		}
		$com =  ucfirst($com_name);
		$obj = $com::init();
		return $obj;
	}
}

?>
