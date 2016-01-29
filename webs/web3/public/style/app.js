/*
Powered by ly200.com		http://www.ly200.com
广州联雅网络科技有限公司		020-83226791
*/

var app_obj={
	helper_init:function(index){
		var show=function(o){
			$('#flow .step dt').removeClass('cur').eq(o).addClass('cur');
			$('#flow .setp_info').hide().eq(o).show();
		}
		show(index);
		$('#flow .step dt').click(function(e){
			show($(this).attr('rel'));
		});
	},
	
	menu_publish_init:function(Module){
		$('.menu_publish').click(function(){
			$(this).blur();
			$.get('?do_action=app.menu_publish&Module='+Module, function(data){
				if(data.ret==1){
					alert('菜单发布成功，24小时后可看到效果，或取消关注再重新关注可即时看到效果！');
				}else{
					alert(data.msg);
				}
			}, 'json')
		});
		$('.menu_init').click(function(){
			if(!confirm("自定义菜单重置将清除您的自定义设置并且不可恢复，继续吗？")){return false}
			$(this).blur();
			$.get('?do_action=app.menu_init&Module='+Module, function(data){
				if(data.ret==1){
					alert(data.msg);
				}
			}, 'json')
		});
	},
	
	menu_edit_init:function(Module){
		$('#app_menu .m_lefter dl').dragsort({
			dragSelector:'dd',
			dragEnd:function(){
				var data=$(this).parent().children('dd').map(function(){
					return $(this).attr('MId');
				}).get();
				$.get('?m=app&a=config&Module='+Module, {do_action:'app.menu_order', sort_order:data.join('|')});
			},
			dragSelectorExclude:'ul, a',
			placeHolderTemplate:'<dd class="placeHolder"></dd>',
			scrollSpeed:5
		});
		
		$('#app_menu .m_lefter ul').dragsort({
			dragSelector:'li',
			dragEnd:function(){
				var data=$(this).parent().children('li').map(function(){
					return $(this).attr('MId');
				}).get();
				$.get('?m=corp&a=config&Module='+Module, {do_action:'app.menu_order', sort_order:data.join('|')});
			},
			dragSelectorExclude:'a',
			placeHolderTemplate:'<li class="placeHolder"></li>',
			scrollSpeed:5
		});
		
		$('#app_menu .m_lefter ul li').hover(function(){
			$(this).children('.opt').show();
		}, function(){
			$(this).children('.opt').hide();
		});
		
		var display_row=function(){
			var v=$('#app_menu_form select[name=MsgType]').val();
			if(v==0){
				$('#img_msg_row, #url_msg_row').hide();
				$('#text_msg_row').show();
			}else if(v==1){
				$('#text_msg_row, #url_msg_row').hide();
				$('#img_msg_row').show();
			}else{
				$('#text_msg_row, #img_msg_row').hide();
				$('#url_msg_row').show();
			}
		}
		
		display_row();
		$('#app_menu_form select[name=MsgType]').on('change blur', display_row);
		$('#app_menu_form').submit(function(){return false;});
		$('#app_menu_form input:submit').click(function(){
			if(system_obj.check_form($('*[notnull]'))){return false};
			$(this).attr('disabled', true);
			$.post('?', $('form').serialize(), function(data){
				if(data.status==1){
					window.location='?m=app&a=config&d=menu_edit&Module='+Module;
				}else{
					alert(data.msg);
					$('#app_menu_form input:submit').attr('disabled', false);
				}
			}, 'json');
		});
	}
}