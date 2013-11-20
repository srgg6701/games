// JavaScript Document
$(function(){  
	var d=document;
	var gameContainer=d.getElementById('wrapper');	
	// определяет реальное соотношение между максимальным и текущим размером окна, напр. 813/1024. При этом расчёт производится на основании соотношений сторон экрана.
	// Если оно более 1024/768 (параметры фоновой картинки для блока),
	// его высота устанавливается в 100% и измеряется реальная ширина,
	// иначе, наоборот, выставляется максимальная ширина и измеряется высота.
	var ratio;
	// текущий масштаб:
	var scale;
	//var maxWidth =  
	var setScreenParams = function(){
		var hDiff;
		scale=screen.width/document.body.offsetWidth;
		var txtTest=$('#span'),txtDim;

		if((d.body.clientWidth/
			d.body.clientHeight)>=1.33333333333333){ // wide, height = 100%
			txtDim = "Height 100%";
			$(gameContainer).height('100%')
					  .width($(gameContainer).height()/6*8)
					  .css({
						bottom:0,
						top:0
					});
			if(hDiff=d.body.clientWidth-gameContainer.offsetWidth){
				$(gameContainer).css({
					left:hDiff/2
				}); //console.log('Выровнять по горизонтали, hDiff/2 = '+(hDiff/2));
			}
			ratio=window.outerWidth/screen.width;
		}else{	
			txtDim = "Width 100%";
			$(gameContainer).width('100%') // narrow, width = 100%
					  .height($(gameContainer).width()/8*6)
					  .css({
						left:0,
						right:0
					});
			if(hDiff=d.body.clientHeight-gameContainer.offsetHeight){
				$(gameContainer).css({
					top:hDiff/2
				}); 
			}
			ratio=window.outerHeight/screen.height;
		}
		var maxContainerWidth=screen.width/6*8; 
		//var ratio=gameContainer.offsetWidth/maxContainerWidth; 
		
		d.title="ratio: "+ratio;
		// 	0.8789 =			       900 / 1024 
		//0.1
		if(scale!==1) {
			$('div:not(.radial)',gameContainer).css('zoom',1/scale);
			var scalable="Go zoom!";
		}
		else{
			var scalable="No zoom needed...";
		} 
		$('#span').html("scale: "+scale+"<br>maxContainerWidth = "+maxContainerWidth+"<br>gameContainer.offsetWidth = "+gameContainer.offsetWidth+"<br>window.outerWidth = "+window.outerWidth+'<br>'+txtDim+'<br>'+scalable);
	}
	setScreenParams();
	window.onresize=function(){
		setScreenParams();
	} 
});
