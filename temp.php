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
 position:relative;
}
#wrapper {
 	position: absolute;
}
#main {
	position: absolute;
	top: 0; bottom: 0; right: 0; left: 0; /*fill parent*/
	background-color: rgb(0, 162, 232);
	font-family: 'Arial', Helvetica, Sans-Serif;
	color: white;
}
/*
@media (min-aspect-ratio: 8/6){ 
	#wrapper {
		height: 100%;
		width:inherit;
	}
}
@media (max-aspect-ratio: 8/6){ 
	#wrapper {
		height: inherit;
		width: 100%;
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
		return document.body.clientWidth/document.body.clientHeight;
	};
	var setScreenParams = function(){
		/*var ratio=currentRatio();
		if(ratio>=1.33){ // wide, height = 100%
			$(wrapper).css({
				height:'100%',
				width:$(wrapper)
			});
			wrapper.offsetWidth=wrapper.offsetHeight/6*8+'px';
		}else{	// narrow, width = 100%
			wrapper.style.width='100%';
			wrapper.offsetHeight=wrapper.offsetWidth/8*6+'px';		
		}*/
		
		console.log('wrapper.height: '+wrapper.offsetHeight+', wrapper.widht: '+wrapper.offsetWidth)
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
	calc();
	this.onresize=function(){
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