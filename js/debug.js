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
	var bg=false,
		d=document;
	if(bg=getUrlParams().debug){
		var calc=function(){
			var	wrapper=d.getElementById('wrapper');
			console.log('wrapper.offsetHeight: '+d.getElementById('wrapper').offsetHeight);
			var Height=d.body.clientHeight,
				Width=d.body.clientWidth,
				wrapperHeight=wrapper.offsetHeight,
				wrapperWidth=wrapper.offsetWidth;
			
			d.getElementById('vwHeight').innerHTML=Height;
			d.getElementById('vwWidth').innerHTML=Width;
			d.getElementById('vwRatio').innerHTML=(Width/Height);
			d.getElementById('wrHeight').innerHTML=wrapperHeight;
			d.getElementById('wrWidth').innerHTML=wrapperWidth;
			d.getElementById('wrRatio').innerHTML=(wrapperWidth/wrapperHeight);
		};
		//calc();
		//window.onresize=function(){calc();};
		var urlParams=getUrlParams();
		$('#css_screen').after('<link media="screen" href="stylesheets/debug.css" rel="stylesheet" type="text/css">');
	}
});
