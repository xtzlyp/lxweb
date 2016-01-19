<?php
	include '../../lx/lx.php';
	include 'config.php';
	class LxWeb{
		//设置模板返回模板实例
		static public function _Temp(){
			global $__tempConfig__ ;
			$tpl = $__tempConfig__ ;
			if($tpl['type'] == 'smarty'){
				include '../../lx/view/smarty/Smarty.class.php';
				$smarty = new Smarty();
				$smarty->left_delimiter($tpl['left_delimiter']);
				$smarty->right_delimiter($tpl['right_delimiter']);
				$smarty->template_dir($tpl['tempFile']);
				return $smarty;
			}else{

			}
		}
	}
?>
