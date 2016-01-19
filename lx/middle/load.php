<?php
class middle{
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
