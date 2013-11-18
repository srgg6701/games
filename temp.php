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
 font-size: 100% normal;
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
td{
	color:black;
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
 $(window).bind('resize', function(){
        resizeMe();
  }).trigger('resize');
});
function  resizeMe(){
	var preferredHeight = 768;  

var displayHeight = $(window).height();
var percentage = displayHeight / preferredHeight;
var newFontSize = Math.floor(fontsize * percentage) - 1;
$("body").css("font-size", newFontSize);
}
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