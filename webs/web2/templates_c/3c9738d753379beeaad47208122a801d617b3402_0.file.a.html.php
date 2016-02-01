<?php
/* Smarty version 3.1.29, created on 2016-02-01 17:58:19
  from "C:\xing\php\11\1\lxweb\webs\web2\tpl\a.html" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56af2c3b7d9179_49726525',
  'file_dependency' => 
  array (
    '3c9738d753379beeaad47208122a801d617b3402' => 
    array (
      0 => 'C:\\xing\\php\\11\\1\\lxweb\\webs\\web2\\tpl\\a.html',
      1 => 1454320600,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56af2c3b7d9179_49726525 ($_smarty_tpl) {
if (!is_callable('smarty_modifier_date_format')) require_once 'C:\\xing\\php\\11\\1\\lxweb\\lx\\view\\smarty\\plugins\\modifier.date_format.php';
?>
<!DOCTYPE html>
<!-- saved from url=(0041)http://www.buyvnoble.com/topic/17100.html -->
<html>
 <!--<![endif]-->
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
  <meta charset="utf-8" /> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
  <meta name="viewport" content="width=device-width, initial-scale=1" /> 
  <title>[<?php echo $_smarty_tpl->tpl_vars['arcInfo']->value['shop_title'];?>
_Tmall]_<?php echo $_smarty_tpl->tpl_vars['arcInfo']->value['title'];?>
</title> 
  <meta name="keywords" content="" /> 
  <meta name="description" content="" /> 
  <link href="/public/style/bootstrap.min.css" rel="stylesheet" /> 
  <link href="/public/style/module.css" rel="stylesheet" /> 
  <link href="/public/style/style.css" rel="stylesheet" /> 
  <?php echo '<script'; ?>
 src="/public/style/hm.js"><?php echo '</script'; ?>
>
  <?php echo '<script'; ?>
 src="/public/style/jquery-1.11.2.min.js" type="text/javascript"><?php echo '</script'; ?>
> 
  <!--[if lt IE 9]>
        <?php echo '<script'; ?>
 src="http://www.buyvnoble.com/static/js/html5shiv.min.js"><?php echo '</script'; ?>
>
        <?php echo '<script'; ?>
 src="http://www.buyvnoble.com/static/js/respond.min.js"><?php echo '</script'; ?>
>
      <![endif]--> 

 </head> 
 <body> 
  <div class="container-fluid"> 
   <nav class="navbar navbar-fixed-top some-header"> 
    <div class="container"> 
     <div class="navbar-header"> 
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> 
      <a class="navbar-brand" href="/"><img src="/public/style/logo.png" /></a> 
     </div> 
     <div id="navbar" class="navbar-collapse collapse"> 
      <form class="navbar-form hidden-sm navbar-right" method="GET"> 
       <div class="form-group"> 
        <input type="text" name="q" class="form-control input-sm" style="width:220px;" placeholder="请输入要搜索的内容" autocomplete="off" /> 
       </div> 
       <button type="submit" class="btn btn-some btn-sm">搜索</button> 
      </form> 
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
   <div class="col-xs-12 main"> 
    <div class="panel subject-index"> 
     <div class="panel-heading"> 
      <h2>[<?php echo $_smarty_tpl->tpl_vars['arcInfo']->value['shop_title'];?>
_Tmall]_<?php echo $_smarty_tpl->tpl_vars['arcInfo']->value['title'];?>
</h2> 
      <div class="subject-meta"> 
       <span><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['arcInfo']->value['createtime'],'%Y-%m-%d %H:%M');?>
</span> 
       <span class="mate-fontsize">字体： <a href="javascript:;" class="fontSize" data-size="16">小</a> <a href="javascript:;" class="fontSize" data-size="18">中</a> <a href="javascript:;" class="fontSize" data-size="22">大</a> </span> 
       <a class="sideSwitch active" href="javascript:;" title="打开边栏!"><i class="fa fa-arrow-left"></i></a> 
      </div> 
     </div> 
     <div class="panel-body fs16" data-font="yes"> 
      <div class="a_content" id="a_content" style="border:0px none;margin:0px;padding:10px 0px 0px;vertical-align:baseline;color:#1C3357;font-family:tahoma, arial;background-color:#FFFFFF;"> 
		<?php echo $_smarty_tpl->tpl_vars['arcInfo']->value['content'];?>

      </div> 
      <div class="alert alert-info"> 
       <p>本文链接：<a class="alert-link">http://www.buyvnoble.com/a/<?php echo $_smarty_tpl->tpl_vars['arcInfo']->value['id'];?>
</a></p> 
       <p>(本文收集自互联网，不代表微信文章网的观点和立场)</p> 
      </div> 
	  <!--
      <ul class="near-tool"> 
       <li> 上一篇： <a  title=""></a> </li> 
       <li> 下一篇： 没有了 </li> 
      </ul> -->
     </div> 
    </div> 
    <div class="panel related"> 
     <div class="panel-heading"> 
      <span class="title">相关推荐</span> 
     </div> 
     <div class="panel-body"> 
      <ul> 
		<?php
$_from = $_smarty_tpl->tpl_vars['rightFirst']->value;
if (!is_array($_from) && !is_object($_from)) {
settype($_from, 'array');
}
$__foreach_ri_0_saved_item = isset($_smarty_tpl->tpl_vars['ri']) ? $_smarty_tpl->tpl_vars['ri'] : false;
$__foreach_ri_0_saved_key = isset($_smarty_tpl->tpl_vars['key']) ? $_smarty_tpl->tpl_vars['key'] : false;
$_smarty_tpl->tpl_vars['ri'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['key'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['ri']->_loop = false;
foreach ($_from as $_smarty_tpl->tpl_vars['key']->value => $_smarty_tpl->tpl_vars['ri']->value) {
$_smarty_tpl->tpl_vars['ri']->_loop = true;
$__foreach_ri_0_saved_local_item = $_smarty_tpl->tpl_vars['ri'];
?>
	  <li class="col-sm-6"><a href="/a/<?php echo $_smarty_tpl->tpl_vars['ri']->value['id'];?>
" title="<?php echo $_smarty_tpl->tpl_vars['ri']->value['shop_title'];?>
_Tmall]<?php echo $_smarty_tpl->tpl_vars['ri']->value['title'];?>
">[<?php echo $_smarty_tpl->tpl_vars['ri']->value['shop_title'];?>
_Tmall]<?php echo $_smarty_tpl->tpl_vars['ri']->value['title'];?>
</a></li>
		<?php
$_smarty_tpl->tpl_vars['ri'] = $__foreach_ri_0_saved_local_item;
}
if ($__foreach_ri_0_saved_item) {
$_smarty_tpl->tpl_vars['ri'] = $__foreach_ri_0_saved_item;
}
if ($__foreach_ri_0_saved_key) {
$_smarty_tpl->tpl_vars['key'] = $__foreach_ri_0_saved_key;
}
?>
       </ul> 
     </div> 
    </div>
   </div> 
  </div> 
  <div id="wx-qrcode"></div> 
  <?php echo '<script'; ?>
 src="/public/style/bootstrap.min.js" type="text/javascript"><?php echo '</script'; ?>
> 
  <?php echo '<script'; ?>
 src="/public/style/dialog.min.js" type="text/javascript"><?php echo '</script'; ?>
> 
  <?php echo '<script'; ?>
 src="/public/style/template.js" type="text/javascript"><?php echo '</script'; ?>
> 
  <?php echo '<script'; ?>
 src="/public/style/common.js" type="text/javascript"><?php echo '</script'; ?>
> 
  <?php echo '<script'; ?>
 src="/public/style/login.js" type="text/javascript"><?php echo '</script'; ?>
> 
  <?php echo '<script'; ?>
 src="/public/style/share.js"><?php echo '</script'; ?>
> 
  <?php echo '<script'; ?>
>
$(function(){
  ajaxGetComment(); share.init();
  $('.sideSwitch').click(function(){
    sideSwitch(true);
  });
  function sideSwitch(click){
    var that = $('.sideSwitch');
    var record = getCookie('sideSwitch');
    var switchFunc = {
        show:function(){
          $('.main').removeClass('col-sm-8');
          $('.sidebar').hide();
          that.addClass('active').attr('title','打开边栏!').find('i').removeClass('fa-arrow-right').addClass('fa-arrow-left');
        },
        hide:function(){
          $('.main').addClass('col-sm-8');
          $('.sidebar').show();
          that.removeClass('active').attr('title','关闭边栏!').find('i').removeClass('fa-arrow-left').addClass('fa-arrow-right');
        }
    };
    //点击
    if(click){
      that.hasClass('active') ? switchFunc.hide() : switchFunc.show();
      record!==null ? delCookie('sideSwitch') :setCookie('sideSwitch','active');
    }else{
      //记录
      record!==null ? switchFunc.hide() : switchFunc.show();
    }
  }
  sideSwitch();
});
<?php echo '</script'; ?>
> 
 </body>
</html><?php }
}
