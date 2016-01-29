/**
 * 基础脚本
 */
$(function(){
	//返回按钮
	$(window).scroll(function(){
		if($(this).scrollTop()>180) {
			$('#wrap-nav').fadeIn();
		}else{
			$('#wrap-nav').fadeOut();
		}
	});
	$('#scroll-top').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);}); 
	//全选的实现
	$(".check-all").click(function(){
		$(".ids").prop("checked", this.checked);
	});
	$(".ids").click(function(){
		var option = $(".ids");
		option.each(function(i){
			if(!this.checked){
				$(".check-all").prop("checked", false);
				return false;
			}else{
				$(".check-all").prop("checked", true);
			}
		});
	});
	$(document).on('click','.misc-verify',function(){
		var that = $(this),src = that.data('src');
		if(src===undefined){
			src = that.attr('src');
			that.data('src',src);
		}
		that.attr('src',src+'&'+Math.random());
		
	});
	//ajax GET
	$(document).on('click','.ajax-get',function(){
		var that = $(this);
		if ( that.hasClass('confirm') ) {
			var con = that.data('con');
			if(con===undefined){
				con = '确认执行此操作吗?';
			}
			dconfirm(con,function(){
				this.close();
				ajaxGet(that);
				return false;
			});
        }else{
			ajaxGet(that);
		}
		function ajaxGet(obj){
			var url = obj.attr('href')===undefined ? obj.attr('url') : obj.attr('href');
			$.get(url).success(function(rs){
				dalert(rs.info);
				if(rs.status==1){
					url = rs.url==='' ? window.location.href : rs.url;
					setTimeout(function () {
						window.location.href = url;
					}, 1500);
				}
			});
		}
		return false;
	});
	//ajax-post
	$(document).on('click','.ajax-post',function(){
		var that = $(this);
		that.attr('disabled',true);
		if ( that.hasClass('confirm') ) {
			var con = that.data('con');
			if(con===undefined){
				con = '确认执行此操作吗?';
			}
			dconfirm(con,function(){
				this.close();
				ajaxPost(that);
				return false;
			});
		}else{
			ajaxPost(that);
		}
		function ajaxPost(obj){
			var target = obj.attr('target');
			var form = $('#'+target);
			var query = form.serialize();
			var action = form[0].action;
			var url = obj.attr('href')===undefined ? obj.attr('url') : obj.attr('href');
			url = (action.length>0) ? action : url;
			if(url===undefined) return false;
			if(query===''){
				dalert('请选择要操作的数据!',1500);
				that.removeAttr('disabled');
			}else{
				$.post(url,query).success(function(rs){
					dalert(rs.info)
					if(rs.status==1){
						url = rs.url===undefined ? window.location.href : rs.url;
						setTimeout(function () {
							window.location.href = url;
						}, 1500);
					}
					that.removeAttr('disabled');
				});
			}
		}
	});
	//切换图文显示模式
	$('.list-style-btn').click(function(){
		setListStyle();
	});
	//切换正文字体大小
	$('.mate-fontsize a').click(function(){
		var size = $(this).data('size');
		setFontSize(size);
	});
	//订阅
	$('.btn-feed').click(function(){
		var that = $(this),id = that.data('id'),type = that.data('type');
		if(id===undefined || type===undefined){
			return false;
		}
		var url = window.apiUrl+'/user/feed'
		$.post(url,'id='+id+'&type='+type).success(function(rs){
			if(rs.status==1){
				that.text('已订阅');
			}else{
				dalert(rs.info);
			}
		});
		return false;
	});
	$('.btn_fellow').click(function(){
		var that = $(this),uid = that.data('uid');
		if(uid===undefined){
			return false;
		}
		$.get(window.apiUrl+'/user/addfellow&uid='+uid).success(function(rs){
			if(rs.status==1){
				that.text('已关注!');
			}else{
				dalert(rs.info);
			}
		});
		return false;
	});
	//回复
	$('.btn-comment').click(function(){
		var that = $(this);form= that.parents('form');
		var action = form[0].action, query = form.serialize();
		var listDiv = $('#comment-list'),num=listDiv.data('num');
		that.attr('disabled',true);
		if(form.find("textarea[name=content]").val()==''){
			dalert('回复的内容不能为空',1500);
			return false;
		}
		$.post(action,query).success(function(rs){
			if(rs.status==1){
				listDiv.show().data('num',num+1).prepend(rs.html);
				listDiv.parents('.comment-panel').show().find('.panel-heading span').text(num+1);
				//$(rs.html).appendTo(listDiv);
				form.find("textarea[name=content]").val('');
				that.removeAttr('disabled');
			}else{
				dalert(rs.info,2000);
			}
		});
		return false;
	});
	//加载更多内容
	$('.show-more').click(function(){
		var that = $(this);
		var fid = $(this).data('fid');
		var total = parseInt($(this).data('total'));
		var page = parseInt($(this).data('page'));
		var num = parseInt($(this).data('num'));
		var tmpl = $(this).data('tmpl');
		var append = $(this).data('append');
		var api = $(this).data('api');
		api = window.apiUrl+((api===undefined) ? '/thread/index' : api );
		
		if(page<=0){
			return false;
		}
		if(total!==undefined && page>total){
			dalert('没有更多的内容了1!');
			return false;
		}
		that.text('正在加载中...');
		$.get(api+'&fid='+fid+'&p='+(page+1)+'&num='+num).success(function(rs){
			if(rs.status==1){
				var html = template(tmpl, rs.data);
				//$(html).appendTo(that.prev('.section_articles'));
				if(append=='append'){
					$(html).appendTo(that.parents('.panel').find('.subject-list'));
				}else{
					that.parents('.panel').find('.subject-list').html(html);
					$('html,body').animate({scrollTop: '0px'}, 80);
				}
				if(tmpl=='photo_tmpl'){
					setPhotoFall('#photo-list',20,'.photo');
				}
				that.data('page',page+1);
				if(page+1==total){
					that.text('最后一页了');
				}else{
					that.text('当前第'+(page+1)+'页，点击加载更多');
				}
				//that.parents('.page').find('#show-more-page').html(showPageSpan(page,5));
			}else{
				that.data('page',0);
				that.text('没有更多内容了');
			}
		});
	});
	//赞
	$('.btn-like').click(function(){
		var that = $(this),id=that.data('id'),op = that.data('op');
		var url = window.apiUrl+'/thread/likeHate&id='+id+'&op='+op;
		$.get(url).success(function(rs){
			if(rs.status!=1){
				dalert(rs.info);
			}else{
				var num = parseInt(that.find('i').text());
				that.find('i').text(' '+(num+1));
			}
		});
	});
	$('.go-page .page-input-btn').click(function(){
		var goPage = $('.go-page'),url = goPage.data('url');val = goPage.find('.page-input').val();
		if(url!==undefined && val!==undefined)
			window.location.href = url+'?p='+val;
	});
	$(document).on('click','#comment-page a',function(){
		var that = $(this),url = that.attr('href');
		ajaxGetComment(url);
		return false;
	})
	window.onload = function(){
		setFontSize(0);
		ajaxGetMsg();
	};
	
});
function showPic(){
	$('.subject-photo-link').rebox({ selector: '.thumbnail' });
}
function ajaxGetMsg(){
	if(window.is_login>0){
		$.ajax({async:false,type:'GET',dataType:'jsonp',jsonpCallback:'jsonpReturn',
			url:window.apiUrl+'/user/notice',
			success:function(rs){
				var obj = $('.top-msg-box').find('ul');
				if(rs['status']==1){
					var html = '';
					$.each(rs['list'],function(k,v){
						html += '<li><a href="'+v['url']+'">'+v['title']+'('+v['count']+')</a>';
					});
					obj.html(html);
					$('.top-msg-box .msg-num').text('('+rs['count']+')');
					$('.top-msg-box').find('.dropdown-toggle').attr('data-toggle','dropdown');
				}else{
					obj.removeClass('top-dropdown').html('');
					$('.top-msg-box .msg-num').text('');
				}
			},
		});
		/* 取消
		setTimeout(function(){
			ajaxGetMsg();
		},60*1000);*/
	}
}
function ajaxGetComment(url){
	var listDiv = $('#comment-list'),id = listDiv.data('id'),href = listDiv.data('href'),load = $('#comment-loading');
	listDiv.parent().css({'height':listDiv.height()});
	listDiv.hide();
	load.show();
	var isFirst = (url===undefined) ? true : false;
	url = (url===undefined) ? href+'?id='+id : url;
	$.get(url).success(function(rs){
		if(rs.status==1){
			listDiv.html(rs.html).show().parent().removeAttr('style');
			if(rs.page!=1){
				$('#comment-page').html(rs.show).show();
			}
		}
		if(isFirst && rs.status==0){
			listDiv.parents('.comment-panel').hide();
		}
	});
	load.hide();
	return false;
}


function setPhotoFall(obj,width,item){
	//console.log('initPhoto');
	obj = obj !== undefined ? obj :'#photo-list';
	width = width !== undefined ? width : 18;
	item = item !== undefined ? item : '.photo';
	var $container = $(obj);
	$container.imagesLoaded( function(){
	  $container.masonry({
		columnWidth : width,
		itemSelector : item
	  });
	});
	$container.masonry('reload');
}
function showHot(){
	var w= $('.hot-words').width(),list = $('.hot-words li');
	$.each(list,function(k,v){
		var thisWidth = $(v).width(); 
		var nextWidth = $(list[k+1]).width();
		if(thisWidth!=w && $(v).data('parse')!=1){
			if(thisWidth>w/2){
				$(v).css({'width':w-3,'margin-right':0});
			}else{
				$(list[k+1]).css({'width':w-thisWidth-10,'margin-right':0}).data('parse',1);
			}
		}
	});
	return false;
}

function dalert(msg,t,modal){
	var d = dialog({
		fixed:true,
		content:msg,
		quickClose: true, // 点击空白处快速关闭
		cancelValue: '确定',
	    cancel: function () {this.remove();}
	});
	if(modal){
		d.showModal();	
	}else{
		d.show();
	}
	if(t!==undefined){
		setTimeout(function(){
			d.remove();
		},t);
	}
}
function dconfirm(msg,f){
	var d = dialog({
		title:'提示信息',
		content:msg,
		quickClose: true,
		okValue: '确定',
	    ok: f,
		cancelValue: '取消',
	    cancel: function () {this.remove();}
	});
	d.show();
}
//cookie null|0|1 null|0 表示图文，1表示列表
function setListStyle(){
	if(window.is_forum==1){
		var cookie = getCookie('listStyle');
		cookie = (cookie==null || cookie==1) ? 0 : 1;
		setCookie('listStyle',cookie);
		if(cookie==0){ //图文 null
			$('.subject-list').removeClass('li');
			$('.list-style-btn').removeClass('active');
		}else{ //列表 1
			$('.subject-list').addClass('li');
			$('.list-style-btn').addClass('active');
		}	
	}
}
function setFontSize(size){
	var realSize,local = getCookie('fontSize');
	localsize = local==null ? 16 : local;
	realSize = size==0 ? localsize : size;
	var no = $('.subject-index .panel-body').data('font');
	if(no!==undefined){
		$('.subject-index .panel-body').attr('class','panel-body fs'+realSize);
		if(size!=0){
			setCookie('fontSize',realSize);
		}
	}
}
function setCookie(name,value){  
    var Days = 30;  
    var exp  = new Date();  
    exp.setTime(exp.getTime() + Days*24*60*60*1000);  
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();  
}
function getCookie(name) { 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]); 
    else 
        return null; 
}
function delCookie(name){  
    var exp = new Date();  
    exp.setTime(exp.getTime() - 1);  
    var cval=getCookie(name);  
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();  
}
function get_region(level,reset){
	var data,html;
	var id_1 = $("#region_val_1").val(),id_2 = $("#region_val_2").val(),id_3 = $("#region_val_3").val();
	if(reset==true) {if(level==1) $("#region_val_3").val(-1);}
	if(level==1) {$(".region[level=3]").remove();}
	level = parseInt(level)+1;
	$(".region[level="+level+"]").remove();
	if(reset==true) {$("#region_val_"+level).val(-1);}
	if(level==1){
		data = region;
	}else if(level==2){
		data = region[id_1]['child'];
	}else if(level==3){
		data = region[id_1]['child'][id_2]['child'];
	}else{
		data = null;
	}
	if(data != null){
		html = "<select class='form-control region' level='"+level+"'><option value='-1'>请选择</option>";
		$.each(data,function(i,o){
			html += "<option value='"+o.id+"'>"+o.name+"</option>";
		});
		html += "</select>";
		$(".region_box").append(html);
	}
}
function setValue(name,value){
	var first = name.substr(0,1), input, i = 0, val;
	if(value === "") return;
	if("#" === first || "." === first){
		input = $(name);
	} else {
		input = $("[name='" + name + "']");
	}
	if(input.eq(0).is(":radio")) { //单选按钮
		input.filter("[value='" + value + "']").each(function(){this.checked = true});
	} else if(input.eq(0).is(":checkbox")) { //复选框
		if(!$.isArray(value)){
			val = new Array();
			val[0] = value;
		} else {
			val = value;
		}
		for(i = 0, len = val.length; i < len; i++){
			input.filter("[value='" + val[i] + "']").each(function(){this.checked = true});
		}
	} else {  //其他表单选项直接设置值
		input.val(value);
	}
}
function countDown(time,id){
	var day_elem = $(id).find('.day');
	var hour_elem = $(id).find('.hour');
	var minute_elem = $(id).find('.minute');
	var second_elem = $(id).find('.second');
	var end_time = new Date(time).getTime(),//月份是实际月份-1
	sys_second = (end_time-new Date().getTime())/1000;
	var timer = setInterval(function(){
		if (sys_second > 1) {
			sys_second -= 1;
			var day = Math.floor((sys_second / 3600) / 24);
			var hour = Math.floor((sys_second / 3600) % 24);
			var minute = Math.floor((sys_second / 60) % 60);
			var second = Math.floor(sys_second % 60);
			day_elem && $(day_elem).text(day);//计算天
			$(hour_elem).text(hour<10?"0"+hour:hour);//计算小时
			$(minute_elem).text(minute<10?"0"+minute:minute);//计算分钟
			$(second_elem).text(second<10?"0"+second:second);//计算秒杀
		} else { 
			clearInterval(timer);
		}
	}, 1000);
}
/**
 * 编辑器
 */
function getEditor(params){
	KindEditor.ready(function(K){
		var el = K.undef(params.editDiv,'#content');
		if($(el).length>0){
			var editor = K.create(el,{
				resizeType : 1,
				allowFlashUpload : false,
				allowMediaUpload : false,
				afterBlur: function(){K('.ke-container').removeClass('focus');},
				afterFocus: function(){K('.ke-container').addClass('focus');},
				width: K.undef(params.width,'100%'),
				minHeight: K.undef(params.minHeight,400),
				items : ['source', 'code', '|', 'bold', 'italic', 'underline', 'forecolor', 'insertunorderedlist', 'insertorderedlist', 'quickformat','removeformat', '|', 'link', 'unlink', '|', 'media','emoticons','fullscreen'],
			});
		}
		var thumb = K.editor({
			uploadJson:K.undef(params.uploadJson,'misc/upload'),
		});
		K('#uploadAttach').click(function() {
			
			thumb.loadPlugin('multiimage', function() {
				thumb.plugin.multiImageDialog({
					clickFn : function(urlList) {
						var div = $('#attach-list');
						var html= '';
						K.each(urlList, function(i, data) {
							console.log(data);
							html += '<li><a data-key="' + data.url + '" data-title="' + data.title + '" href="javascript:;" class="insert">' + data.title + '(未使用)</a>';
							html += '<div class="attach-info">'+data.size+'B,<a href="#" data-key="' + data.url + '"><i class="fa fa-remove"></i></a></div>';
							html += '<span class="setThumb"><i class="fa fa-image"></i></span><input type="checkbox" name="thumb" value="'+data.url+'"></li>';
						});
						if(div.find('li').length>0){
							$(html).insertBefore(div.find('li:first'))
						}else{
							$(html).appendTo(div);
						}
						thumb.hideDialog();
					}
				});
			});
		});
		$(document).on('click','#attach-list .insert',function(){
			var key = $(this).data('key'),title = $(this).data('title');
			editor.insertHtml('<img src="'+key+'" alt="'+title+'" title="'+title+'"/>');
			return false;
		});
	});
}