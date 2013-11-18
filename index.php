<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>Las Vegas</title>
<link id="css_screen" media="screen" rel="stylesheet" type="text/css" href="stylesheets/screen.css">
<script src="js/jquery-1.9.1.js"></script>
<script src="js/debug.js"></script>
<script src="js/js.js"></script>
</head>
<body>
<div id="wrapper">
    <div id="main">
    <?	if(isset($_GET['debug'])):
	?>
        <table id="tblCalculations">
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
    <?	endif;
	?>
    </div>
</div>
</body>
</html>