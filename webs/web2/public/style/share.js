/**
 * 分享组件
 */
var share = {
	hover:null,
	share_info:{},
	popover:$('#share-tool'),
	obj:null,
	thread:false,
	init:function(){
		
		if(share.popover.data('type')=='thread'){
			share.obj = share.popover;
			share.thread = true;
			share.initInfo();
		}else{
			$('body').delegate('.btn-share','mouseover',function(e){
				share.obj = $(this);
				share.initInfo();
				share.showPopover();
			});
			share.bindFunc();
		}
		share.shareClickBtn();
		share.shareHoverBtn();
	},
	initInfo:function(){
		share.share_info = {
			id:share.obj.data('id'),
			url:share.obj.data('url')+'?f='+window.is_login,
			text:share.obj.data('text'),
			desc:share.obj.data('desc'),
			thumb:share.obj.data('thumb'),
		}
	},
	bindFunc:function(){
		$('body').delegate('.btn-share','mouseout',function(){
			share.hover=share.later(500,function(){
				share.hidePopover();
			});
		});
		share.popover && share.popover.on('mouseover',function(){
			return share.hover ? share.hover.cancel() : null;
		});
		share.popover && share.popover.on('mouseout',function(){
			share.hover=share.later(500,function(){
				share.hidePopover();
			});
		});
	},
	showPopover:function(){
		var xy = share.getXY(share.obj);
		$(share.popover).css({
			left:xy.left-35,
			top:xy.top+24,
		}).show();
	},
	hidePopover:function(){
		share.popover.hide();
	},
	//按钮分享
	shareClickBtn:function(){
		$(document).on('click','#share-tool a',function(){
			var type = $(this).data('type'),url='';
			switch(type){
				case 'weibo':
				url = "http://service.weibo.com/share/share.php?url="+encodeURIComponent(share.share_info.url)+"&title=" + share.share_info.text + "&pic="+encodeURIComponent(share.share_info.thumb)+"&appkey=2504490989&searchPic=true";
				
				break;
			}
			return url!=='' ? window.open(url, "_blank") : false;
		})
	},
	//聚焦分享
	shareHoverBtn:function(){
		$(document).on('mouseover','#share-tool a',function(){
			var that=$(this), type=that.data('type'),id=share.share_info.id;
			if(type=='weixin'){
				var has = $('#wx-qrcode').data('id');
				if(has===undefined || parseInt(has)!=id){
					var src = window.apiUrl+'qrcode&thread='+id;
					var html = '<p>分享到微信朋友圈</p><img src="'+src+'"/>';
					$('#wx-qrcode').html(html).data('id',id);
				}
				var xy = share.getXY(that);
				if(share.thread){
					xy.left -= 10;
					xy.top += 32;
				}else{
					xy.left -= 83;
					xy.top += 32;
				}
				$('#wx-qrcode').css({
					left:xy.left,
					top:xy.top,
				}).fadeIn(500);
			}else{
				return false;
			}
		});
		$(document).on('mouseout','#share-tool a',function(){
			var type=$(this).data('type');
			if(type=='weixin'){
				$('#wx-qrcode').hide();
			}else{
				return false;
			}
			
		});
	}
}
share.getXY = function(obj){
	var xy = obj.offset();
	return xy;
}
share.later = function(time,func){
	time = time || 0;
	var c = setTimeout(func,time);
	return {
		cancel:function(){clearTimeout(c)}
	};
}