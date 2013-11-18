<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>Las Vegas</title>
<link id="css_screen" media="screen" rel="stylesheet" type="text/css" href="stylesheets/screen.css">
<script src="js/jquery-1.9.1.js"></script>
<script src="js/js.js"></script>
<script src="js/debug.js"></script>
<style>
body{
	font: normal 100%;
}
#screen_wrapper {
    display: inline-block;
    position: relative;
	width:100%;		
}
@media (min-aspect-ratio: 8/6){ 
	#screen_wrapper{
		height:100%;		
	}
}
/*
@media (max-aspect-ratio: 8/6){ 
	#screen_wrapper{
		width:100%;		
	}
}*/

#screen_wrapper:after {
    padding-top: 133.33%; /*ratio*/
	font-size:2em;
    display: block;
    content: '';
}
#screen {
    position: absolute;
	font-size:1em;
    top: 0; bottom: 0; right: 0; left: 0; 
}
#inner_screen{
	background:#CCFF99;
	font-size:2em;
	position: absolute;
	top:20%; bottom: 20%; right: 20%; left: 20%;
}
</style>
</head>
<body>
<div id="screen_wrapper">
    <div id="screen">
    	<div id="inner_screen">
        	Hello. I'm inside!
        </div>
    </div>
</div>
</body>
</html>