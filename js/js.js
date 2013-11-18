// JavaScript Document
$(function(){  
	var d=document;
	var gameContainer=d.getElementById('wrapper');	
	
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
		if(defaultOffsets){
			var dInits=defaultOffsets.inits();
			var newOffsets = [
				gameContainer.offsetWidth/dInits[0], 
				gameContainer.offsetHeight/dInits[1]
			];
			var newZoomScale=(newOffsets[0]+newOffsets[1])/2; 
			//console.log('new scale: %c%d','color:red',newZoomScale);
			//console.log('%cgameContainer offsets: ','color:blue');
			console.table({
				init_values:{width:dInits[0],height:dInits[1]},
				new_values:{width:gameContainer.offsetWidth,height:gameContainer.offsetHeight},
				ratio:{byWidth:newOffsets[0],byHeight:newOffsets[1]},
				new_scale:{zoom:newZoomScale}
			});
		}
	}
	
	setScreenParams();	

	var defaultOffsets=function(){
		var initWidth=gameContainer.offsetWidth;
		var initHeight=gameContainer.offsetHeight;
		return {
			inits:function(){
				//console.log('defaultOffsets.inits() works!');
				return [initWidth,initHeight];
			}
		};
	}();	

	window.onresize=function(){
		setScreenParams();
	} 
});
