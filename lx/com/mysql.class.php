<?php
/**
 * 功能：mysql执行插件
 * 作者：xtzlyp
 */
class Mysql{
	static $obj;
	private $tableName;
	private $where;
	private $con;
	private $type;
	private $dbChoose;
	private $sqlSet = array(
							'file' => '*',
							'limit' => '',
							'order' => '',
							);
	static function init(){
		if(!self::$obj){
                	self::$obj = new Mysql();
                }
                return self::$obj;
	}

	#
	# 功能：加载不同的数据库
	#
	public function loadSql($dbChoose,$type){
		global $dbList;
		if(@$dbChoose == $this->dbChoose) return $this;
		$this->type = $type;
		$this->dbChoose = $dbChoose;
		$config = $dbList[$dbChoose];
		$this->con = mysql_connect($config['host'],$config['username'],$config['psd']);
		mysql_select_db($config['dbname'],$this->con);	
		mysql_query('set names utf8',$this->con);	
		return $this;
	}

	#
	# 功能：定义表
	#
	public function table($tableName){
		$this->table = $tableName;
		return $this;
	}


	public function where($condition = array()){
		if($condition){
			$i = 0;
			foreach($condition as $ke => $va){
				if($i>0){
					$where = $where . " and `{$ke}` = '".mysql_real_escape_string($va)."' ";
				}else{
					$where = "`{$ke}` = '".mysql_real_escape_string($va)."'";
				}
				$i++;
			}
		}
		$this->where = $where;
		return $this;
	}

	public function order($str){
		$this->sqlSet['order'] = 'order by '.$str;
		return $this;
	}


	public function setFiles($fileArr){
		$this->sqlSet['file'] = implode(',', $fileArr);
		return $this;
	}

	public function limit($str){
		$this->sqlSet['limit'] = 'limit '.$str;
		return $this;
	}

	#
	# 功能：执行SQL语句
	#
	private function query($sql){
		if($sql){
			$result = mysql_query($sql,$this->con);
			return $result;
		}else{
			return false;
		}
	}

	#
	# 功能：组装sql语句
	#
	private function makeSql($type = 1){
		switch ($type) {
			case 1:
				//查询select
				$sql = "select ".$this->sqlSet['file']." from ".$this->table."
				 where ".$this->where." ".$this->sqlSet['order'].' '.$this->sqlSet['limit'];
				break;
			case 2:
				//插入insert
				//$sql = "insert into ".$this->table.' ('.implode(',',$first).') values ('.implode(',',$after).')';
				break;
			default:
				# code...
				break;
		}
		return $sql;
	}

	#
	# 功能：查出一个
	#
	public function selectOne(){
		if(!$this->table) die('table is not exit');
		$sql = $this->makeSql(1);
		$result = $this->query($sql);
		$row = array();
		$row = mysql_fetch_assoc($result);
		return $row;
	}

	#
	# 功能：查出所有
	#
	public function selectAll(){
		if(!$this->table) die('table is not exit');
		$sql = $this->makeSql(1);
		echo $sql;
		$result = $this->query($sql);
		$arrList = array();
		$row = array();
		while ( $row = mysql_fetch_assoc($result)) {
			$arrList[] = $row;
		}
		return $arrList;
	}

	#
	# 功能：插入
	#
	public function insert($inArr = array()){
		if(!$this->table) die('table is not exit');
		foreach ($inArr as $ke => $va){
			$first[] = '`'.$ke.'`';
			$after[] ="'".$va."'";
		}
		$sql = " insert into ".$this->table.' ('.implode(',',$first).') values ('.implode(',',$after).')';
		$result = $this->query($sql);
		if($result == 1){
			return true;
		}else{
			return mysql_error().':Sql='.$sql;
		}
	}

	#
	# 功能：更新
	#
	public function update($upArr = array()){
		if(!$this->table) die('table is not exit');
		//$update = implode(',', $upArr);
		$update = '';
		$i = 0;
		foreach ($upArr as $ke => $va){
			if($i>0){
				$update = $update . " , {$ke} = '".$va."' ";
			}else{
				$update = "{$ke} = '".$va."'";
			}
			$i++;
		}
		$sql = " update ".$this->table.' set '.$update.' where '.$this->where;
		$result = $this->query($sql);
		if($result == 1){
			return true;
		}else{
			return mysql_error().':Sql='.$sql;
		}
	}

	#
	# 功能：删除
	#
	public function delete(){
		if(!$this->table) die('table is not exit');
		$sql = " delete from ".$this->table.' where '.$this->where;
		$result = $this->query($sql);
		if($result == 1){
			return true;
		}else{
			return mysql_error().':Sql='.$sql;
		}
	}


	#
	# 功能：返回错误
	#
	private function sqlError(){



	}

}

?>
