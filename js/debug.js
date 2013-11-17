// JavaScript Document
function getUrlParams(){
	var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
	args = {},
	items = qs.length ? qs.split("&") : [],
	item = null,
	name = null,
	value = null,
	i = 0,
	len = items.length;
	for (i=0; i < len; i++){
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		if (name.length) {
			args[name] = value;
		}
	}
	return args;
}
$(function(){
	/*window.onresize=function(){
		var Height=document.body.clientHeight,
			Width=document.body.clientWidth;
		console.log('width: '+Width+', height: '+Height+'\nratio: '+(Width/Height));
	};*/
	var bg=false;
	var urlParams=getUrlParams();
	if(bg=urlParams.debug){
		/* 	значения для bg:
			1 - подложка для верхней части страницы
			2 - для средней 
			3 - для нижней
		 */
		//document.write('>');
		$('#css_screen').after('<link media="screen" href="stylesheets/debug.css" rel="stylesheet" type="text/css">');
		
		/*$('#bg_container').css('background','none');
		
		var bgPos=(bg==3)?
			'70px -2px': '172px 0';
		
		$('body').css({
			background:'url(_sources/pg_test'+bg+'.png)  no-repeat fixed',
			backgroundPosition:bgPos,
			backgroundSize:'initial'
		});	
		$('#content').css('opacity',0.5);
		$('#top').css('opacity',0.5);*/
	}
});
