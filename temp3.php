<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>Exps</title>
<style>
html, body {
 height: 100%;
 margin:0;
 padding:0;
}
#wrapper {
	background-color:#FFFFCC;
	margin:auto;
}
#main {
	position: absolute;
	top: 0; bottom: 0; right: 0; left: 0; /*fill parent*/
	background-color: rgb(0, 162, 232);
	font-family: 'Arial', Helvetica, Sans-Serif;
	color: white;
}

/*@media (min-aspect-ratio: 8/6){ 
	#wrapper {
		top:0;
		bottom:0;
		position: relative;
	}
}
@media (max-aspect-ratio: 8/6){ 
	#wrapper {
		left:0px;
		right:0px;
		position: absolute;
	}
}*/
</style>
<script src="js/jquery-1.9.1.js"></script>
<script>
 $(function(){  
	var d=document;
	var wrapper=d.getElementById('wrapper');
	var main=d.getElementById('main');
	
	var currentRatio=function(){
		return d.body.clientWidth/d.body.clientHeight;
	};
	var setScreenParams = function(){
		
		var ratio=currentRatio();
		
		if(ratio>=1.33333333333333){ // wide, height = 100%
			console.log('wide');
			$(wrapper).outerHeight('100%')
					  .outerWidth($(wrapper).outerHeight()/6*8)
					  .css({
						position:'relative',
						bottom:0,
						top:0
					});
		}else{	
			console.log('narrow');
			$(wrapper).outerWidth('100%') // narrow, width = 100%
					  .outerHeight($(wrapper).outerWidth()/8*6)
					  .css({
						position:'absolute',
						left:0,
						right:0
					});
			var hDiff;
			if(hDiff=d.body.clientHeight-$(wrapper).outerHeight()){
				//wrapper.offsetTop=hDiff/2+'px';
				$(wrapper).css({
					top:hDiff/2
				});
				console.log('Выровнять по вертикали, hDiff/2 = '+(hDiff/2));
			}
		}
	}

	var calc=function(){
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
	setScreenParams();
	calc();
	window.onresize=function(){
		calc();
		setScreenParams();
	} 
});
</script>
</head>
<body>
<div id="wrapper">
    <div id="main">
        <table cellpadding="4" border="1">
        	<tr>
            	<th>Object</th>
            	<th>Height</th>
            	<th>Width</th>
            	<th>Ratio</th>
            </tr>
        	<tr>
            	<td>viewport</td>
            	<td id="vwHeight"></td>
            	<td id="vwWidth"></td>
            	<td id="vwRatio"></td>
            </tr>
        	<tr>
            	<td>wrapper</td>
            	<td id="wrHeight"></td>
            	<td id="wrWidth"></td>
            	<td id="wrRatio"></td>
            </tr>
        </table>
    </div>
</div>
</body>
</html>