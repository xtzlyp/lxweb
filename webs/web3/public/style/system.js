/*
Powered by ly200.com		http://www.ly200.com
广州联雅网络科技有限公司		020-83226791
*/

var system_obj={
	domain:function(domain){
		var http_host_ary=window.location.host.split('.');
		http_host_ary.shift();
		var http_host=http_host_ary.join('.');
		var domain_list={
			www:'http://'+window.location.host,
			static:'http://static.'+http_host,
			img:'http://img.'+http_host
		};
		return domain_list[domain]
	},
	
	check_form:function(notnull_obj, format_obj){
		var flag=false;
		if(notnull_obj){
			notnull_obj.each(function(){
				if($(this).val()==''){
					$(this).css('border', '1px solid red');
					flag==false && ($(this).focus());
					flag=true;
				}else{
					$(this).removeAttr('style');
				}
			});
			if(flag){return flag;};
		}
		if(format_obj){
			var reg={
				'MobilePhone':/^1[34578]\d{9}$/,
				'IdNum':/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
				'Telephone':/^(0\d{2,3})(-)?(\d{7,8})(-)?(\d{3,})?$/,
				'Fax':/^(0\d{2,3})(-)?(\d{7,8})(-)?(\d{3,})?$/,
				'QQ':/^[1-9]\d{4,10}$/,
				'Email':/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
			};
			var tips={
				'MobilePhone':'请正确填写手机号码！',
				'IdNum':'请正确填写身份证号码！',
				'Telephone':'请正确填写电话号码！',
				'Fax':'请正确填写传真号码！',
				'QQ':'请正确填写QQ号码！',
				'Email':'请正确填写邮箱地址！'
			};
			format_obj.each(function(){
				var o=$(this);
				if(!o.val()){
					return true;
				}else if(reg[o.attr('format')].test(o.val())===false){
					if(window.location.href.indexOf('/api/')!=-1){
						global_obj.win_alert(tips[o.attr('format')], function(){o.focus();});
					}else{
						alert(tips[o.attr('format')]);
						o.focus();
					}
					flag=true;
					return false;
				}
			});
		}
		return flag;
	},
	
	div_mask:function(remove){
		if(remove==1){
			$('#div_mask').remove();
		}else{
			$('body').prepend('<div id="div_mask"></div>');
			$('#div_mask').css({width:'100%', height:$(document).height(), overflow:'hidden', position:'absolute', top:0, left:0, background:'#000', opacity:0.6, 'z-index':10000});
		}
	}
};