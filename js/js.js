// JavaScript Document
$(function(){  
	var d=document;
	var gameContainer=d.getElementById('wrapper');	
	// определяет реальное соотношение между максимальным и текущим размером окна, напр. 813/1024. При этом расчёт производится на основании соотношений сторон экрана.
	// Если оно более 1024/768 (параметры фоновой картинки для блока),
	// его высота устанавливается в 100% и измеряется реальная ширина,
	// иначе, наоборот, выставляется максимальная ширина и измеряется высота.
	// текущий масштаб:
	var scale;
	var setScreenParams = function(){
		var scaleRatio;
		// wide, height = 100%
		if((d.body.clientWidth/
			d.body.clientHeight)>=1.33333333333333){ // 
			scaleRatio=screen.height/768;
			scale=screen.height/d.body.offsetHeight;
		}else{	
			scaleRatio=screen.width/1024;
			scale=screen.width/d.body.offsetWidth;
		}
		
		Scale=1/scale*scaleRatio;
		
		if(scale!==1) {
			$(gameContainer).css({
				transform:'scale('+Scale+','+Scale+')',
				marginLeft:function(){
					return (d.body.offsetWidth-1024*Scale)/2+'px';
				}
			});
		}
		if(navigator.userAgent.indexOf('MSIE')!==-1){
			var xLeft=(d.body.offsetWidth-gameContainer.offsetWidth)/2;
			gameContainer.style.marginLeft=xLeft+'px';
			var hDiff=d.body.offsetHeight-768;
			if(hDiff) gameContainer.style.top=hDiff/2+'px';
		} 
	}
	setScreenParams();
	window.onresize=function(){
		setScreenParams();
	} 
});
