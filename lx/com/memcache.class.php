<?php
class Mem{
	static $obj;
	static function init(){
		if(!self::$obj){
                	self::$obj = new Mem();
                }
                return self::$obj;
	}

	
	public function loadSql($dbChoose,$type){
		global $dbList;
		if(@$dbChoose == $this->dbchoose) return $this;
		$this->type = $type;
		$this->dbChoose = $dbChoose;
		$config = $dbList[$dbChoose];
		$this->con = mysql_connect($config['host'],$config['username'],$config['psd']);
		mysql_select_db($config['dbname'],$this->con);	
		mysql_query('set names utf8',$this->con);	
		return $this;
	}

}

?>
