$(function(){
	var sign_title = {'login':'登录百对社区','register':'加入百对社区','resetpwd':'找回密码'};
	$(document).on('click','.js-account',function(){
		var sign = $(this).data('sign');
		showSign(sign_title[sign],template(sign+'-dialog'));
		return false;
	});
	function showSign(title,html){
		var d = dialog.get('sign-dialog');
		if(d===undefined){
			d = dialog({
				id:'sign-dialog',
				title:title,
				content:html,
				width:300,
			});
			d.showModal();
		}else{
			d.title(title);
			d.content(html);
		}
	}
	//登录表单验证
	$('.tab-login input').blur(function(){
		var that = $(this);
		var name = that.attr('name');
		var val = that.val();
		var api = that.data('api') !== undefined ? that.data('api') : window.site_url+'/api/user/checkLogin';
		if(val==''){
			loginMsg(that,'不能为空!');
			that.data('error',1);
		}else{
			if(name=='account'){
				$.get(api+'?name='+name+'&val='+val).success(function(rs){
					if(rs.status!=1){
						loginMsg(that,rs.info);
						that.data('error',1);
					}
				});
			}
			that.data('error',0);
		}
	});
	//处理登录
	$('.btn-login').click(function(){
		var that = $(this);
		var form = $('#loginForm');
		var query = form.serialize();
		var action = form[0].action;
		var error = 0;
		that.attr('disabled','disabled');
		$.each(form.find('input'),function(k,v){
			if($(v).data('error')==1 || $(v).data('error')===undefined){
				$(v).focus();
				error +=1;
			}
		});
		if(error!=0){
			that.removeAttr('disabled');
			return false;
		}
		$.post(action,query).success(function(rs){
			if(rs.status==1){
				that.text('登录成功，正在跳转...');
				var url = rs.url===undefined ? window.location.href : rs.url;
				setTimeout(function(){
					window.location.href = url;
				},1000);
			}else{
				loginMsg(that,rs.info);
				that.removeAttr('disabled');
			}
		});
		return false;
	});
	
	//表单切换
	$('.login-form .resetPass').click(function(){
		$('.login-form .login-tab-item').removeClass('active');
		$('.login-form .tab-forget').addClass('active').find('input[name=verify]').val('').find('.verifyCode').click();
	});
	$('.login-form .hasVerify').click(function(){
		$('.login-form .login-tab-item').removeClass('active');
		$('.login-form .tab-verify').addClass('active').find('input[name=verify]').parent().show();
	});
	
	
	//处理申请重置密码
	$('.btn-forget').click(function(){
		var that = $(this);
		var form = $('#forgetForm');
		var query = form.serialize();
		var action = form[0].action;
		that.attr('disabled','disabled');
		$.get(action+'?'+query).success(function(rs){
			if(rs.status==1){
				var account = form.find('input[name=account]').val(),i=10,txt = that.text();
				var timer = setInterval(function(){
					if(i==0){
						that.text(txt);
						that.removeAttr('disabled');
						clearInterval(timer)
					}else{
						that.text(i+'秒后重新申请重置');
					}
					i -=1;
				},1000);
				$('.login-form .login-tab-item').removeClass('active');
				$('.tab-verify').addClass('active').find('input[name=account]').val(account);
			}else{
				if(rs.item !== undefined){
					loginMsg(form.find('input[name='+rs.item+']'),rs.info);
				}else{
					loginMsg(that,rs.info);
				}
				that.removeAttr('disabled');
			}
		});
		return false;
	});
	//处理重置密码
	$('.btn-verify').click(function(){
		var that = $(this);
		var form = $('#verifyForm');
		var query = form.serialize();
		var action = form[0].action;
		that.attr('disabled','disabled');
		$.post(action,query).success(function(rs){
			if(rs.status==1){
				that.text(rs.info);
				var url = rs.url===undefined ? window.location.href : rs.url;
				setTimeout(function(){
					window.location.href = url;
				},1000);
			}else{
				if(rs.item !== undefined){
					loginMsg(form.find('input[name='+rs.item+']'),rs.info);
				}else{
					loginMsg(that,rs.info);
				}
				that.removeAttr('disabled');
			}
		});
		return false;
	});
	//验证找回密码表单
	$('.tab-forget input').blur(function(){
		var that = $(this);
		var name = that.attr('name');
		var val = that.val();
		var api = that.data('api') !== undefined ? that.data('api') : window.site_url+'/api/user/checkLogin';
		if(val==''){
			loginMsg(that,'不能为空!');
			that.data('error',1);
		}else{
			if(name=='account'){
				$.get(api+'?name='+name+'&val='+val).success(function(rs){
					if(rs.status!=1){
						loginMsg(that,rs.info);
						that.data('error',1);
					}
				});
			}
			that.data('error',0);
		}
	});
	//验证重置密码表单
	$('.tab-verify input').blur(function(){
		var that = $(this);
		var name = that.attr('name');
		var val = that.val();
		
		if(val==''){
			loginMsg(that,'不能为空!');
			that.data('error',1);
		}else{
			if(name=='password'){
				if(trim(val).length<6){
					loginMsg(that,'密码长度不足8个字符');
					that.data('error',1);
					return false;
				}
				var strong = /[a-zA-Z\~\)\!\$\%\*\(\_\+\-\=\{\}\[\]\|\:\;\<\>\?\,\.\/\@\#\^\"\'\`\?\&]/;
				if(!strong.test(trim(val))){
					loginMsg(that,'密码强度不够，请包含字母和数字');
					that.data('error',1);
					return false;
				}
			}
			if(name=='repassword'){
				if(val != $('.login-form .tab-verify input[name=password]').val()){
					loginMsg(that,'两次输入的密码不一致!');
					that.data('error',1);
					return false;
				}
			}
			that.data('error',0);
		}
	});
	//隐藏错误提示
	$('.errorMsg').click(function(){
		$(this).removeClass('tips').html('').hide().prev().focus()
	});
	$('.login-form input').focus(function(){
		$(this).next('.errorMsg').removeClass('tips').html('').hide();
	});
});
function loginMsg(obj,info,tips){
	$(obj).next().html(info).show().addClass(tips);
}
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
};