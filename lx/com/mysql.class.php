<?php
class Mysql{
	static $obj;
	private $tableName;
	private $where;
	private $con;
	private $type;
	private $dbChoose;
	static function init(){
		if(!self::$obj){
                	self::$obj = new Mysql();
                }
                return self::$obj;
	}	

//	function __call(){
		//$function = $function_name.'Action';
               // $result = $this->$function($args);
               // return $result;
//	}
	
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

	public function table($tableName){
		$this->table = $tableName;
		return $this;
	}

	public function where($condition = array()){
		if($condition){
			$i = 0;
			foreach($condition as $ke => $va){
				if($i>0){
					$where = $where . " and {$ke} = '".$va."' ";

				}else{
					$where = "{$ke} = '".$va."'";
				}
				$i++;
			}
		}
		$this->where = $where;
		return $this;
	}

	public function sel(){
		if(!$this->table) die('table is not exit');
		$sql = "select * from ".$this->table." where ".$this->where;
		return $sql;
	}

	public function insert($inArr = array()){
		if(!$this->table) die('table is not exit');
		foreach ($inArr as $ke => $va){
			$first[] = '`'.$ke.'`';
			$after[] ="'".$va."'";
		}
		$sql = " insert into ".$this->table.' ('.implode(',',$first).') values ('.implode(',',$after).')';
		return $sql;

	}


	public function updata(){

	}


	public function setFiles(){
		
	}
}

?>
