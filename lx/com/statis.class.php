<?php
	#
	# 统计组件
	#
	class Statis {
		static private $obj;


		static function init(){
			if(!self::$obj){
				self::$obj = new Statis();	
			}
			return self::$obj;
			
		}
		function __call( $function_name , $args){
			
			
			$function = $function_name.'Action';
			$result = $this->$function($args);
			return $result;	

		}
		

		private function setCookieAction($type){
			return '777777';
		}
		
		/*
		 * 判断是否可以统计
		 *
		 */
		private function checkCount(){
						
		}

		private function getFrom(){
			//$fromType = array(0 => '');
			// 1 来源于百度  2 来源360  3 来源于其他
				
			return 1;
		}

		private function saveCountAction(){
			$fromType = $this->getFrom();
			$pv = 1;
			$uv = 1;
			$insertArr = array(
					'formtype' => $fromType,'pv' => $pv , 'uv' => $uv , 'date'=>date('Ymd',time())
					);
			$Smysql = middle::load('mysql');
			$res = $Smysql->table('countdata')->where($insertArr)->sel();
print_r($res);	
	//	return $res:1?false;	
		}

	}









?>
