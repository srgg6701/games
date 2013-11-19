// JavaScript Document
$(function(){  
	var d=document;
	var gameContainer=d.getElementById('wrapper');	
	//var maxWidth =  
	var setScreenParams = function(){
		
		var hDiff;
		if((d.body.clientWidth/
			d.body.clientHeight)>=1.33333333333333){ // wide, height = 100%
			//console.log('wide');
			$(gameContainer).outerHeight('100%')
					  .outerWidth($(gameContainer).outerHeight()/6*8)
					  .css({
						bottom:0,
						top:0
					});
			if(hDiff=d.body.clientWidth-gameContainer.offsetWidth){
				$(gameContainer).css({
					left:hDiff/2
				}); //console.log('Выровнять по горизонтали, hDiff/2 = '+(hDiff/2));
			}
		}else{	
			console.log('narrow');
			$(gameContainer).outerWidth('100%') // narrow, width = 100%
					  .outerHeight(gameContainer.offsetWidth/8*6)
					  .css({
						left:0,
						right:0
					});
			if(hDiff=d.body.clientHeight-$(gameContainer).outerHeight()){
				$(gameContainer).css({
					top:hDiff/2
				}); //console.log('Выровнять по вертикали, hDiff/2 = '+(hDiff/2));
			}
		}
		var maxContainerWidth=screen.width/6*8; 
		var scale=gameContainer.offsetWidth/maxContainerWidth; 
		// 	0.8789 =			       900 / 1024 
		//0.1
		console.log('scale: '+scale);
		$('>*',gameContainer).css('zoom',scale/6*8);
	}
	setScreenParams();
	window.onresize=function(){
		setScreenParams();
	} 
});
