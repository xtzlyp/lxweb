<?php
/* Smarty version 3.1.29, created on 2016-02-01 17:57:10
  from "C:\xing\php\11\1\lxweb\webs\web2\tpl\index.html" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56af2bf6e8c6e4_59351920',
  'file_dependency' => 
  array (
    '595478fb44f3360fdd131208d8eb7f54546ec5ea' => 
    array (
      0 => 'C:\\xing\\php\\11\\1\\lxweb\\webs\\web2\\tpl\\index.html',
      1 => 1454320610,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56af2bf6e8c6e4_59351920 ($_smarty_tpl) {
if (!is_callable('smarty_modifier_date_format')) require_once 'C:\\xing\\php\\11\\1\\lxweb\\lx\\view\\smarty\\plugins\\modifier.date_format.php';
?>
<!DOCTYPE html>
<html>
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
  <meta charset="utf-8" /> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
  <meta name="viewport" content="width=device-width, initial-scale=1" /> 
  <meta name="renderer" content="webkit" /> 
  <title>微信素材_微信文章</title> 
  <meta name="keywords" content="" /> 
  <meta name="description" content="" /> 
  <link href="/public/style/bootstrap.min.css" rel="stylesheet" /> 
  <link href="/public/style/module.css" rel="stylesheet" /> 
  <link href="/public/style/style.css" rel="stylesheet" /> 
  <?php echo '<script'; ?>
 src="/public/style/jquery-1.11.2.min.js" type="text/javascript"><?php echo '</script'; ?>
> 
 </head> 
 <body> 
  <div class="container-fluid"> 
   <nav class="navbar navbar-fixed-top some-header"> 
    <div class="container"> 
     <div class="navbar-header"> 
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> 
      <a class="navbar-brand" href="/public/style/index.html"><img src="/public/style/logo.png" /></a> 
     </div> 
     
    </div> 
    <div class="container"> 
     <div id="navbar" class="some-navbar navbar-collapse collapse"> 
       <ul class="nav navbar-nav"> 
       <li><a href="/">首页</a></li> 
        <li class="active"><a href="/l/1" class="active">推荐</a></li>
       <li><a href="/l/2" class="active">思想</a></li>
       <li><a href="/l/3" class="active">教育</a></li>
       <li><a href="/l/4" class="active">科学</a></li>
       <li><a href="/l/5" class="active">美学</a></li>
       <li><a href="/l/6" class="active">资讯</a></li>
       <li><a href="/l/7" class="active">财富</a></li>
       <li><a href="/l/8" class="active">人物</a></li>
       <li><a href="/l/9" class="active">健康</a></li>
       <li><a href="/l/10" class="active">读书</a></li>
       <li><a href="/l/11" class="active">图库</a></li>
       <li><a href="/l/12" class="active">趣味</a></li> 
      </ul> 
     </div> 
    </div> 
   </nav> 
  </div> 
  <div id="wrapper" class="container"> 
   <div class="col-xs-12 col-sm-8"> 
    <div class="panel"> 
     <div class="panel-heading"> 
      <span class="title">全部</span> 
      <!-- <a class="fr" href="http://www.buyvnoble.com/subject/faith.html">全部</a>  -->
     </div> 
     <div class="panel-body subject-list"> 
	 
	 <?php
$_from = $_smarty_tpl->tpl_vars['arcli']->value;
if (!is_array($_from) && !is_object($_from)) {
settype($_from, 'array');
}
$__foreach_li_0_saved_item = isset($_smarty_tpl->tpl_vars['li']) ? $_smarty_tpl->tpl_vars['li'] : false;
$_smarty_tpl->tpl_vars['li'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['li']->_loop = false;
foreach ($_from as $_smarty_tpl->tpl_vars['li']->value) {
$_smarty_tpl->tpl_vars['li']->_loop = true;
$__foreach_li_0_saved_local_item = $_smarty_tpl->tpl_vars['li'];
?>
	<div class="subject"> 
       <div class="col-xs-12 col-sm-4 subject-thumb fl"> 
        <a class="thumbnail" href="/a/<?php echo $_smarty_tpl->tpl_vars['li']->value['id'];?>
" title="【<?php echo $_smarty_tpl->tpl_vars['li']->value['shop_title'];?>
_Tmall】<?php echo $_smarty_tpl->tpl_vars['li']->value['title'];?>
" style="background-image:url(<?php echo $_smarty_tpl->tpl_vars['li']->value['shop_pic'];?>
)"></a> 
       </div> 
       <div class="subject-title"> 
        <h1><a href="/a/<?php echo $_smarty_tpl->tpl_vars['li']->value['id'];?>
"><font style="font-size: 14px;font-weight: 500;">[<?php echo $_smarty_tpl->tpl_vars['li']->value['shop_title'];?>
_Tmall]</font><?php echo $_smarty_tpl->tpl_vars['li']->value['title'];?>
</a></h1> 
       </div> 
       <div class="subject-meta"> 
        <span><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['li']->value['createtime'],'%Y-%m-%d %H:%M:%S');?>
</span> 
       </div> 
     </div>
	<?php
$_smarty_tpl->tpl_vars['li'] = $__foreach_li_0_saved_local_item;
}
if ($__foreach_li_0_saved_item) {
$_smarty_tpl->tpl_vars['li'] = $__foreach_li_0_saved_item;
}
?>
	
	<?php echo $_smarty_tpl->tpl_vars['page_data']->value;?>

     </div> 
    </div>
   </div> 
   <div class="col-xs-12 col-sm-4"> 
    <div class="panel"> 
     <div class="panel-heading"> 
      <span class="title">热门推荐</span> 
      <a class="more change-rec-mod fr" href="javascript:;" data-page="1">换一换 <i class="fa fa-refresh"></i></a>
     </div> 
     <div class="panel-body"> 
      <ul class="widget-list widget-recommends">
        <?php
$_from = $_smarty_tpl->tpl_vars['rightFirst']->value;
if (!is_array($_from) && !is_object($_from)) {
settype($_from, 'array');
}
$__foreach_ri_1_saved_item = isset($_smarty_tpl->tpl_vars['ri']) ? $_smarty_tpl->tpl_vars['ri'] : false;
$__foreach_ri_1_saved_key = isset($_smarty_tpl->tpl_vars['key']) ? $_smarty_tpl->tpl_vars['key'] : false;
$_smarty_tpl->tpl_vars['ri'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['key'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['ri']->_loop = false;
foreach ($_from as $_smarty_tpl->tpl_vars['key']->value => $_smarty_tpl->tpl_vars['ri']->value) {
$_smarty_tpl->tpl_vars['ri']->_loop = true;
$__foreach_ri_1_saved_local_item = $_smarty_tpl->tpl_vars['ri'];
?>
	   <li><a href="" class="num"><?php echo $_smarty_tpl->tpl_vars['key']->value+1;?>
</a><a href="/a/<?php echo $_smarty_tpl->tpl_vars['ri']->value['id'];?>
" title="[<?php echo $_smarty_tpl->tpl_vars['ri']->value['shop_title'];?>
_Tmall]<?php echo $_smarty_tpl->tpl_vars['li']->value['title'];?>
">[<?php echo $_smarty_tpl->tpl_vars['ri']->value['shop_title'];?>
_Tmall]<?php echo $_smarty_tpl->tpl_vars['ri']->value['title'];?>
</a></li>
		<?php
$_smarty_tpl->tpl_vars['ri'] = $__foreach_ri_1_saved_local_item;
}
if ($__foreach_ri_1_saved_item) {
$_smarty_tpl->tpl_vars['ri'] = $__foreach_ri_1_saved_item;
}
if ($__foreach_ri_1_saved_key) {
$_smarty_tpl->tpl_vars['key'] = $__foreach_ri_1_saved_key;
}
?>
	  </ul> 
     </div> 
    </div> 
   <div class="panel"> 
     <div class="panel-heading">
      <span class="title">今日热搜</span> 
      <a class="fr" href="#">更多</a>
     </div> 
     <div class="panel-body"> 
      <ul class="widget-list widget-tags"> 
       <li><a href="#" style="background-color:rgb(170,228,191)">中国</a></li>
        </ul> 
     </div> 
    </div> 
    <div class="panel"> 
     <div class="panel-heading">
      <span class="title">热门栏目</span>
     </div> 
     <div class="panel-body"> 
      <ul class="widget-list widget-thumb"> 
       <li> <a href="#"" class="fl"><img src="/public/style/faith.jpg" alt="" /></a> <p><a href=""><strong>信仰</strong></a> <a class="btn btn-xs btn-some btn-feed fr" href="" data-id="7" data-type="forum">订阅</a> </p> <p>希拉里说，中国是世界上少数没有信仰的可怕国家之一。民族没有信仰，道德滑坡就是必然的，腐败就是必然的。 </p> </li>
       </ul> 
     </div> 
    </div> 
   </div> 
   <div class="col-xs-12 col-sm-12 main"> 
    <div class="panel"> 
     <div class="panel-heading">
      友情链接
     </div> 
     <div class="panel-body links"> 
      <ul class="widget-list widget-tags"> 
       <li><a href="http://www.baidu.com/" target="_blank" >百度首页</a></li>
      </ul> 
     </div> 
    </div> 
   </div> 
  </div> 
  <div id="wx-qrcode"></div> 
 </body>
</html><?php }
}
