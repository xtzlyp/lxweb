<?php
/* Smarty version 3.1.29, created on 2016-01-20 16:30:58
  from "C:\xing\php\11\1\lxweb\webs\web2\tpl\stage_3.html" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_569f45c261f185_46001419',
  'file_dependency' => 
  array (
    '487abac19c43731bc8fbebdcc6b8eb2ae087d1a4' => 
    array (
      0 => 'C:\\xing\\php\\11\\1\\lxweb\\webs\\web2\\tpl\\stage_3.html',
      1 => 1453278649,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_569f45c261f185_46001419 ($_smarty_tpl) {
?>
<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>lx微信相册制作</title>
<link href="/public/style/global.css" rel="stylesheet" type="text/css">
<link href="/public/style/tps.css" rel="stylesheet" type="text/css">
<?php echo '<script'; ?>
 type="text/javascript" src="/public/style/jquery-1.10.2.min.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 type="text/javascript" src="/public/style/frame.js"><?php echo '</script'; ?>
>
</head>
<body>
<div>
	<div class="header">
    	<div class="leftheader" >
        	<img class="logo" src="/public/img/logo.png">
        </div>
        <div class="rightheader">
        	<img src="/public/img/back.png">
            <span>回到首页</span>
            <img src="/public/img/zhuce.png">
            <span>注册</span>
        </div>
    </div>
</div>
<div id="iframe_page" >
<link href="/public/style/app.css" rel="stylesheet" type="text/css">
<div class="r_con_wrap" id="flow">
	<div class="blank20"></div>
	<dl class="step" >
		<a href="/index.php"><dt rel="0" ><h1>1</h1><h2>第一步</h2></dt></a>
		<dd></dd>
		<a href="/stage_2.php"><dt rel="1"><h1>2</h1><h2>第二步</h2></dt></a>
		<dd></dd>
		<a href="/stage_3.php"><dt rel="2" class="cur"><h1>3</h1><h2>第三步</h2></dt></a>
		<dd></dd>
		<a href="stage_4.php"><dt rel="3"><h1>4</h1><h2>完成</h2></dt></a>
	</dl>
	<div class="info">
		<div class="setp_info" style="display: block;">
			<h1 class="tips">选择模板</h1>
			<div class="img">
				<div class="teplist">
					<ul>
						<li>
							<div class="d_img"><img src='/public/img/2.PNG' width="223px" height="359px" /></div>
							<div>
								<a href="#" class='btn_sm'>选择<a>
								<a href="#" class='btn_sm'>预览<a>
							</div>
						</li>

					<ul>
				</div>
			</div>
		</div>
		
	</div>
</div>
<div class="blank20"></div></div>
</body></html><?php }
}
