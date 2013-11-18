// JavaScript Document
 $(function(){  
	var d=document;
	var wrapper=d.getElementById('wrapper');
	var main=d.getElementById('main');
	
	var currentRatio=function(){
		return d.body.clientWidth/d.body.clientHeight;
	};
	var setScreenParams = function(){
		
		var ratio=currentRatio();
		
		var hDiff;
		if(ratio>=1.33333333333333){ // wide, height = 100%
			console.log('wide');
			$(wrapper).outerHeight('100%')
					  .outerWidth($(wrapper).outerHeight()/6*8)
					  .css({
						bottom:0,
						top:0
					});
			if(hDiff=d.body.clientWidth-$(wrapper).outerWidth()){
				$(wrapper).css({
					left:hDiff/2
				});
				console.log('Выровнять по горизонтали, hDiff/2 = '+(hDiff/2));
			}
		}else{	
			console.log('narrow');
			$(wrapper).outerWidth('100%') // narrow, width = 100%
					  .outerHeight($(wrapper).outerWidth()/8*6)
					  .css({
						left:0,
						right:0
					});
			if(hDiff=d.body.clientHeight-$(wrapper).outerHeight()){
				$(wrapper).css({
					top:hDiff/2
				});
				console.log('Выровнять по вертикали, hDiff/2 = '+(hDiff/2));
			}
		}
	}
	setScreenParams();	
	window.onresize=function(){
		setScreenParams();
	} 
});
