// JavaScript Document
var d=document;
$(function(){  
	var game={
		LasVegas:d.getElementById('wrapper'),
		zWidth:d.body.clientWidth,
		zHeight:d.body.clientHeight,
		ratio:function(){
			return zWidth/zHeight;
		}
	};
	
	var setScreenParams = function(){
		
		var hDiff;
		if(game.ratio>=1.33333333333333){ // wide, height = 100%
			console.log('wide');
			$(game.LasVegas).outerHeight('100%')
					  .outerWidth($(game.LasVegas).outerHeight()/6*8)
					  .css({
						bottom:0,
						top:0
					});
			if(hDiff=d.body.clientWidth-$(game.LasVegas).outerWidth()){
				$(game.LasVegas).css({
					left:hDiff/2
				});
				console.log('Выровнять по горизонтали, hDiff/2 = '+(hDiff/2));
			}
		}else{	
			console.log('narrow');
			$(game.LasVegas).outerWidth('100%') // narrow, width = 100%
					  .outerHeight($(game.LasVegas).outerWidth()/8*6)
					  .css({
						left:0,
						right:0
					});
			if(hDiff=d.body.clientHeight-$(game.LasVegas).outerHeight()){
				$(game.LasVegas).css({
					top:hDiff/2
				});
				console.log('Выровнять по вертикали, hDiff/2 = '+(hDiff/2));
			}
		}
	}
	setScreenParams();	
	window.onresize=function(){
		setScreenParams();
		//$(game.LasVegas)
	} 
});
