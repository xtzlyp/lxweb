/*
Powered by ly200.com		http://www.ly200.com
广州联雅网络科技有限公司		020-83226791
*/

var frame_obj={
	main_page_init:function(){
		if(self.location!=top.location){top.location=self.location;}
		$('body, html').css('overflow', 'hidden');
		$('a').click(function(){this.blur();});
		$('#main .menu a').click(function(){
			$('#main .menu dd').removeClass('cur');
			$(this).parent().addClass('cur');
		});
		
		$('#main').height($(window).height()-$('#header').height()-$('#footer').height());
		var w=$(window).width()-90;
		w=w<780?780:w;
		$('#main .iframe').width(w);
	},
	
	search_form_init:function(){
		var get_request_value=function(argname){
			var url=document.location.href;
			var arrStr=url.substring(url.indexOf('?')+1).split('&');
			for(var i=0; i<arrStr.length; i++){
				var loc=arrStr[i].indexOf(argname+'=');
				if(loc!=-1){
					return arrStr[i].replace(argname+'=', '').replace('?', '');
					break;
				}
			}
			return '';
		}
		var utf8_decode=function(txt){
			txt=unescape(txt).replace(/\+/g, ' ');
			var string='';
			var i=c=c1=c2=0;
			while(i<txt.length ){
				c=txt.charCodeAt(i);
				if(c<128){
					string+=String.fromCharCode(c);
					i++;
				}else if(c>191 && c<224){
					c2=txt.charCodeAt(i+1);
					string+=String.fromCharCode(((c&31) << 6) | (c2&63));
					i+=2;
				}else{
					c2=txt.charCodeAt(i+1);
					c3=txt.charCodeAt(i+2);
					string+=String.fromCharCode(((c&15) << 12) | ((c2&63) << 6) | (c3&63));
					i+=3;
				}
			}
			return string;
		}
		
		$('#search_form input[type=text]').each(function(){
			$(this).val(utf8_decode(get_request_value($(this).attr('name'))));
		});
		$('#search_form select').each(function(){
			$(this).find('option[value='+utf8_decode(get_request_value($(this).attr('name')))+']').attr('selected', true);
		});
	},
	
	menu_init:function(Module){
		if(Module!='app' && parent.$('#main .menu a[href$='+Module+']').size()){
			parent.$('#main .menu dd').removeClass('cur');
			parent.$('#main .menu a[href$='+Module+']').parent().addClass('cur');
		}
	},
	
	department_select:function(o0, o1, o2, Module){	//参数：表单对象，jstree对象，保存部门ID的表单对象
		typeof(Module)=='undefined' && (Module='');
		o0.find('dl dd .del').click(function(){
			var del_id=$(this).parent().attr('noteid');
			$(this).parent().remove();
			o2.val(o2.val().replace(del_id+',', ''));
		});
		
		var getX=function(e){
  			e=e || window.event;
			return e.pageX || e.clientX + document.body.scroolLeft;
		}
		var getY=function(e){
			e=e|| window.event;
			return e.pageY || e.clientY + document.body.scrollTop;
		}
		$(document).click(function(e){
			var x=getX(e);
			var y=getY(e);
			var offset=o1.offset();
			if(x<offset.left || x>offset.left+o1.width() || y<offset.top-o0.height() || y>offset.top+o1.height()){
				o1.hide();
			}
		});
		
		o0.click(function(){
			var offset=$(this).offset();
			o1.show().offset({
				left:offset.left,
				top:offset.top+o0.height()+6
			});
		});
		o1.jstree({
			core:{
				'data':{
					'url':'?do_action=department.get_department&Module='+Module,
					'data':function(node){
						return{'id':node.id};
					}
				},
				'check_callback':true,
				'themes':{
					'responsive':false
				}
			},
			contextmenu:{
				select_node:!1,
			},
			plugins:['contextmenu','wholerow']
		}).on('select_node.jstree', function(e, data){
			var id=data.node.id;
			if(o2.val().indexOf(id+',')==-1){
				var html='<dd noteid="'+id+'"><div class="ico"></div><div class="text">'+data.node.text+'</div><div class="del"><div></dd>';
				o0.find('dl').append(html);
				o0.find('.r_con_rangelist').scrollTop(10000);
				o2.val(o2.val()+id+',');
				o0.find('dl dd .del:last').click(function(){
					var del_id=$(this).parent().attr('noteid');
					$(this).parent().remove();
					o0.click();
					o2.val(o2.val().replace(del_id+',', ''));
				});
			}
		}).on('loaded.jstree', function(e, data){
			data.instance.open_node(o1.find('li:first'));
		});
	},
	
	department_user_select:function(o0, o1, par, radio, RangeListHtml, Module){	//参数：弹出层对象，回调函数，调用方式（0全部，1用户选择器，2部门选择器），是否单选，初始化的html
		(typeof(AccountList)=='undefined' || AccountList=='') && (AccountList=',');
		(typeof(TxDIdList)=='undefined' || TxDIdList=='') && (TxDIdList=',');
		typeof(Module)=='undefined' && (Module='');
		RangeListHtml=='' && (RangeListHtml='<dl></dl>');
		o0.find('.r_con_rangelist').html(RangeListHtml+'<div class="clear"></div>');
		o0.find('.r_con_rangelist dd .del').click(function(){
			var del_id=$(this).parent().attr('id');
			$(this).parent().remove();
			if($(this).parent().attr('rel')=='Account'){
				AccountList=AccountList.replace(','+del_id+',', ',');
				o0.find('.userlist li[Account='+del_id+']').attr('rel', 0).removeClass('clicked').find('input').prop('checked', false);
			}else{
				TxDIdList=TxDIdList.replace(','+del_id+',', ',');
				o0.find('.department .jstree').jstree('uncheck_node', o0.find('.department .jstree #'+del_id));
			}
		});
		if(par==1){
			o0.find('.range .change li').eq(0).addClass('cur');
			o0.find('.range .change li').eq(1).hide();
			o0.find('.department').hide();
			o0.find('.user').show();
		}else if(par==2){
			o0.find('.range .change li').eq(0).hide();
			o0.find('.range .change li').eq(1).addClass('cur');
			o0.find('.user').hide();
			o0.find('.department').show();
		}
		if(radio){
			o0.find('.r_con_rangelist').hide();
			o0.find('.range').css('padding-top', 0);
			o0.find('.range .change').css('margin-top', 0);
			o0.find('.btn').hide();
			if(par!=1){
				o0.find('.department .jstree').jstree('uncheck_all');
			}
		}
		frame_obj.pop_form_init(o0);
		o0.find('.department .jstree li').each(function(){
			if(TxDIdList.indexOf(','+$(this).attr('id')+',')==-1){
				o0.find('.department .jstree').jstree('uncheck_node', $(this));
			}
		});
		o0.find('.userlist li').removeClass('clicked').attr('rel', 0);
		var d=AccountList.split(',');
		for(var i=1; i<d.length-1; i++){
			o0.find('.user .userlist li[Account='+d[i]+']').addClass('clicked').attr('rel', 1);
		}
		o0.find('.user .userlist:visible li input').prop('checked', false);
		o0.find('.user .userlist:visible li[rel=1] input').prop('checked', true);
		
		var range_list=function(t, a, id, text){
			id=id.replace(/\./g,'\\\.').replace(/@/g,'\\\@');
			if(t=='Account'){
				if(a){
					if(o0.find('.r_con_rangelist dd[id='+id+'][rel=Account]').size()){return false;}
					var o=o0.find('.userlist li[Account='+id+']');
					var img=o.find('.face').html();
					var name=o.find('.name').html();
					var html='<dd id="'+id+'" rel="Account"><div class="img">'+img+'</div><div class="text">'+name+'</div><div class="del"><div></dd>';
					o0.find('.r_con_rangelist dl').append(html);
					o0.find('.r_con_rangelist dd:last .del').click(function(){
						var del_id=$(this).parent().attr('id');
						$(this).parent().remove();
						AccountList=AccountList.replace(','+del_id+',', ',');
						o.attr('rel', 0).removeClass('clicked').find('input').prop('checked', false);
					});
					radio && o0.find('.btn_ok').click();
				}else{
					o0.find('.r_con_rangelist dd[id='+id+'][rel=Account]').remove();
				}
			}else{
				if(a){
					if(o0.find('.r_con_rangelist dd[id='+id+'][rel=DId]').size()){return false;}
					TxDIdList+=id+',';
					var html='<dd id="'+id+'" rel="DId"><div class="ico"></div><div class="text">'+text+'</div><div class="del"><div></dd>';
					o0.find('.r_con_rangelist dl').append(html);
					o0.find('.r_con_rangelist dd:last .del').click(function(){
						var del_id=$(this).parent().attr('id');
						$(this).parent().remove();
						TxDIdList=TxDIdList.replace(','+del_id+',', ',');
						o0.find('.department .jstree').jstree('uncheck_node', o0.find('.department .jstree #'+del_id));
					});
					radio && o0.find('.btn_ok').click();
				}else{
					TxDIdList=TxDIdList.replace(','+id+',', ',');
					o0.find('.r_con_rangelist dd[id='+id+'][rel=DId]').remove();
				}
			}
			o0.find('.r_con_rangelist').scrollTop(10000);
		}
		
		o0.find('.range .change li').eq(0).click(function(){
			o0.find('.range .change li').removeClass('cur');
			$(this).addClass('cur');
			$('.range .department').hide();
			$('.range .user').show();
		});
		o0.find('.range .change li').eq(1).click(function(){
			o0.find('.range .change li').removeClass('cur');
			$(this).addClass('cur');
			$('.range .department').show();
			$('.range .user').hide();
		});
		o0.find('.btn_ok').off().click(function(){
			o0.find('.btn_cancel').click();
			o1(AccountList, TxDIdList, o0.find('.r_con_rangelist').html());
		});
		
		var get_user=function(did){
			$.get('./?m=department&do_action=department.get_user&top_no_get_all=1&id='+did, function(data){
				var html='<ul class="userlist" id="userlist_'+did+'">';
				var rel, checked, classname;
				for(var i=0; i<data.msg.length; i++){
					Account=data['msg'][i]['Account'].replace(/\./g,'\\\.').replace(/@/g,'\\\@');
					if(o0.find('.r_con_rangelist dd[id='+Account+'][rel=Account]').size()){
						rel=1;
						checked='checked';
						classname='clicked';
					}else{
						rel=0;
						checked=classname='';
					}
					if(radio){
						var input='<input type="radio" name="Account" value="'+data['msg'][i]['Account']+'" '+checked+' />';
					}else{
						var input='<input type="checkbox" name="Account[]" value="'+data['msg'][i]['Account']+'" '+checked+' />';
					}
					
					!data['msg'][i]['Face'] && (data['msg'][i]['Face']=system_obj.domain('static')+'/images/ico/face.png');
					html+='<li rel="'+rel+'" Account="'+data['msg'][i]['Account']+'" class="'+classname+'">';
					html+='<div class="face"><img src="'+data['msg'][i]['Face']+'"></div>';
					html+='<div class="name">'+data['msg'][i]['Name']+'</div>';
					html+='<div class="input">'+input+'</div>';
					html+='</li>';
				}
				html+'</ul>';
				o0.find('.user .userlist').hide();
				o0.find('.user').append(html);
				o0.find('#userlist_'+did+' li').click(function(){
					if(radio){
						o0.find('.userlist li').removeClass('clicked').attr('rel', 0);
						$(this).addClass('clicked');
						$(this).find('input').prop('checked', true);
						AccountList=','+$(this).attr('Account')+',';
						o0.find('.r_con_rangelist dd').remove();
						range_list('Account', 1, $(this).attr('Account'));
					}else{
						AccountList=parseInt($(this).attr('rel'))?AccountList.replace(','+$(this).attr('Account')+',', ','):AccountList+=$(this).attr('Account')+',';
						$(this).find('input').prop('checked', !parseInt($(this).attr('rel')));
						range_list('Account', !parseInt($(this).attr('rel')), $(this).attr('Account'));
						$(this).toggleClass('clicked').attr('rel', parseInt($(this).attr('rel'))?0:1);
					}
				});
			}, 'json');
		}
		
		if(typeof(department_user_select_init)=='undefined'){
			department_user_select_init=true;
			$(window).height()<=680 && o0.find('.user, .user .jstree, .department, .department .jstree').height(280);
			o0.find('.user .jstree').jstree({
				core:{
					'data':{
						'url':'?do_action=department.get_department&Module='+Module,
						'data':function(node){
							return{'id':node.id};
						}
					},
					'check_callback':true,
					'themes':{
						'responsive':false
					}
				},
				contextmenu:{
					select_node:!1,
				},
				plugins:['contextmenu','wholerow']
			}).on('select_node.jstree', function(e, data){
				var did=data.node.id;
				if(o0.find('#userlist_'+did).size()){
					o0.find('.user .userlist').hide();
					o0.find('#userlist_'+did).show();
					o0.find('.userlist li').removeClass('clicked').attr('rel', 0);
					var d=AccountList.split(',');
					for(var i=1; i<d.length-1; i++){
						o0.find('.user .userlist li[Account='+d[i]+']').addClass('clicked').attr('rel', 1);
					}
					o0.find('#userlist_'+did+' li input').prop('checked', false);
					o0.find('#userlist_'+did+' li[rel=1] input').prop('checked', true);
					return true;
				}
				get_user(did);
			}).on('loaded.jstree', function(e, data){
				var o=o0.find('.user .jstree li:first');
				data.instance.open_node(o);
				o.attr('aria-disabled')!='true' && get_user(o.attr('id'));
			});
			//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			o0.find('.department .jstree').jstree({
				core:{
					'data':{
						'url':'?do_action=department.get_department&Module='+Module,
						'data':function(node){
							return{'id':node.id};
						}
					},
					'check_callback':true,
					'themes':{
						'responsive':false
					}
				},
				contextmenu:{
					select_node:!1,
				},
				plugins:['contextmenu','wholerow','checkbox']
			}).on('select_node.jstree', function(e, data){
				range_list('DId', 1, data.node.id, data.node.text);
			}).on('deselect_node.jstree', function(e, data){
				range_list('DId', 0, data.node.id, data.node.text);
			}).on('loaded.jstree', function(e, data){
				var first=o0.find('.department .jstree li:first');
				data.instance.open_node(first);
				if(TxDIdList.indexOf(','+first.attr('id')+',')!=-1){
					o0.find('.department .jstree').jstree('check_node', first);
				}
			}).on('after_open.jstree', function(e, data){
				o0.find('.department .jstree #'+data.node.id+' li').each(function(){
					var TxDIdList_ary=TxDIdList.split(',');
					for(var i=0; i<TxDIdList_ary.length; i++){
						if($(this).attr('id')==TxDIdList_ary[i]){
							o0.find('.department .jstree').jstree('check_node', $(this));
						}
					}
				});
			});
		}
	},
	
	pop_form_init:function(o){
		system_obj.div_mask();
		o.slideDown().css('left', $(document).width()/2-o.width()/2);
		if($(document).height()<=680){
			o.css('top', 0);
			o.find('.r_con_form').css({'height':280,'overflow-y':'auto'});
		}
		o.find('.t h2').add(o.find('.btn_cancel')).click(function(){
			o.slideUp(function(){
				system_obj.div_mask(1);
			});
		});
	},
	
	checked_all:function(obj, list){
		obj.click(function(){
			if(!obj.is(':checked')){
				list.prop('checked', false);
			}else{
				list.prop('checked', true);
			}
		});
	},
	
	list_del:function(list, tips, par){
		if(!list.size()){
			alert(tips);
			return false;
		}
		if(!confirm('删除后不可恢复，继续吗？')){return false}
		$.get(par, function(data){
			if(data.ret==1){
				window.location=data.msg;
			}
		}, 'json');
	},
	
	list_delete:function(arg){
		if(!arg.list.size()){
			alert(arg.tips);
			return false;
		}
		if(!confirm('删除后不可恢复，继续吗？')){return false;}
		$.get(arg.url, arg.list.serialize(), function(data){
			if(data.ret==1){
				window.location=arg.jump;
			}else{
				alert(data.msg);
			}
		}, 'json');
	},
	
	ajax_post_tips:function(remove, msg){
		if(remove==1){
			$('#ajax_post_tips').html(msg).fadeOut(2500, function(){
				$('#ajax_post_tips').remove();
			});
		}else{
			$('body').prepend('<div id="ajax_post_tips">'+(msg?msg:'数据提交中...')+'</div>');
			$('#ajax_post_tips').css({position:'fixed', width:250, height:36, 'line-height':'36px', 'font-size':'12px', background:'#55A290', color:'#fff', 'text-align':'center', left:$(window).width()/2-125, top:200, zIndex:100000});
		}
	},
	
	file_upload:function(file_input_obj, filepath_input_obj, img_detail_obj, size){
		var multi=(typeof(arguments[4])=='undefined' || arguments[4]=='')?false:arguments[4];
		var queueSizeLimit=(typeof(arguments[5])=='undefined' || arguments[5]=='')?5:arguments[5];
		var callback=(typeof(arguments[6])=='undefined' || arguments[6]=='')?'':arguments[6];
		var fileExt=(typeof(arguments[7])=='undefined' || arguments[7]=='')?'*.jpg;*.png;*.gif;*.jpeg;*.bmp':arguments[7];
		var fileSize=(typeof(arguments[8])=='undefined' || arguments[8]=='')?500:arguments[8];
		var do_action=(typeof(arguments[9])=='undefined' || arguments[9]=='')?'action.file_upload':arguments[9];
		file_input_obj.omFileUpload({
			action:'./?session_id='+session_id,
			actionData:{
				do_action:do_action,
				size:size
			},
			fileExt:fileExt,
			fileDesc:'Files',
			sizeLimit:fileSize*1024,
			onError:function(ID, fileObj, errorObj, event){
				if(errorObj.type=='File Size'){
					alert('上传的文件大小不能超过'+fileSize+'KB！');
				}
			},
			autoUpload:true,
			multi:multi,
			queueSizeLimit:queueSizeLimit,
			swf:'/static/inc/fileupload.swf?r='+Math.random(),
			method:'post',
			onComplete:function(ID, fileObj, response, data, event){
				var jsonData=eval('('+response+')');
				if(jsonData.status==1){
					if($.isFunction(callback)){
						callback(jsonData);
					}else{
						filepath_input_obj.val(jsonData.filepath);
						img_detail_obj && img_detail_obj.html(frame_obj.upload_img_detail(jsonData.filepath));
						if($('input[name=SourchSize]').size()){
							$('input[name=SourchSize]').val(jsonData.filesize);	
						}
					}
				}else{
					alert('文件上传失败，出现未知错误！');
				};
			}
		});
	},
	
	upload_img_detail:function(img){
		if(!img){return;}
		return '<a href="'+img+'" target="_blank"><img src="'+img+'"></a>';
	},
	
	map_init:function(){
		var myAddress=$('input[name=Address]').val();
		var destPoint=new BMap.Point($('input[name=PrimaryLng]').val(), $('input[name=PrimaryLat]').val());
		var map=new BMap.Map('map');
		map.centerAndZoom(new BMap.Point(destPoint.lng, destPoint.lat), 20);
		map.enableScrollWheelZoom();
		map.addControl(new BMap.NavigationControl());
		var marker=new BMap.Marker(destPoint);
		map.addOverlay(marker);
		
		map.addEventListener('click', function(e){
			destPoint=e.point;
			set_primary_input();
			map.clearOverlays();
			map.addOverlay(new BMap.Marker(destPoint)); 
		});
		
		/*var ac=new BMap.Autocomplete({'input':'Address','location':map});
		ac.addEventListener('onhighlight', function(e){
			ac.setInputValue(e.toitem.value.business);
		});
		
		ac.setInputValue(myAddress);
		ac.addEventListener('onconfirm', function(e){//鼠标点击下拉列表后的事件
			var _value=e.item.value;
			myAddress=_value.business;
			ac.setInputValue(myAddress);
			
			map.clearOverlays();    //清除地图上所有覆盖物
			local=new BMap.LocalSearch(map,{renderOptions:{map: map}}); //智能搜索
			local.setMarkersSetCallback(markersCallback);
			local.search(myAddress);
		});*/
		
		var markersCallback=function(posi){
			$('#Primary').attr('disabled', false);
			if(posi.length==0){
				alert('定位失败，请重新输入详细地址或直接点击地图选择地点！');
				return false;
			}
			for(var i=0; i<posi.length; i++){
				if(i==0){
					destPoint=posi[0].point;
					set_primary_input();
				}
				posi[i].marker.addEventListener('click', function(data){
					destPoint=data.target.getPosition(0);
				});  
			}
		}
		
		var set_primary_input=function(){
			$('input').filter('[name=PrimaryLng]').val(destPoint.lng).end().filter('[name=PrimaryLat]').val(destPoint.lat);
		}
		
		$('input[name=Address]').keyup(function(event){
			if(event.which==13){
				$('#Primary').click();
			}
		});
		
		$('#Primary').click(function(){
			if(system_obj.check_form($('input[name=Address]'))){return false};
			$(this).attr('disabled', true);
			local=new BMap.LocalSearch(map,{renderOptions:{map: map}}); //智能搜索
			local.setMarkersSetCallback(markersCallback);
			local.search($('input[name=Address]').val());
			return false;
		});
	},
	
	chart:function(){
		$('.chart').height(frame_obj.chart_par.height).highcharts({
            chart:{
				type:frame_obj.chart_par.themes,
				backgroundColor:frame_obj.chart_par.bg
            },
            title:{text:''},
			tooltip: {
				shared: true,
				valueSuffix: frame_obj.chart_par.valueSuffix, 
				pointFormat: frame_obj.chart_par.pointFormat            
			},
			xAxis:{categories:chart_data.date},
			yAxis:[{
				title:{text:''},
				min:0
			}],
			legend:frame_obj.chart_par.legend,
			plotOptions:{
				line:{
					dataLabels:{enabled:true},
					enableMouseTracking:false
				},
				bar:{
					dataLabels:{enabled:true}
				},
				column: {stacking: frame_obj.chart_par.plotOptions},
				series:{pointWidth:50}
			},
			series:chart_data.count,
			exporting:{enabled:false}
        });
	},
	
	chart_par:{themes:'column',height:500,bg:'',legend:{},valueSuffix:'',plotOptions:'',pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'}
}