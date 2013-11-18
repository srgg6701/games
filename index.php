<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<!--<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />-->
<title>Las Vegas</title>
<link id="css_screen" media="screen" rel="stylesheet" type="text/css" href="stylesheets/screen.css">
<script src="js/jquery-1.9.1.js"></script>
<script src="js/debug.js"></script>
<script src="js/js.js"></script>
<style>

#wrapper *{
	
}
table td{
	font-size:32px;
	padding:4px;
}
</style>
</head>
<body>
<div id="wrapper">
    <div id="main">
    <?	//if(isset($_GET['debug'])):
	?>
        <table id="tblCalculations">
        	<tr>
            	<th id="obj">Object</th>
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
        	  <td colspan="4"><img src="sources/pix/538147_344255319014147_1976125150_n.jpg" width="480" height="360"></td>
       	  </tr>
        </table>
        <table>
          <tr>
            <td>game Width</td>
            <td>maxContainerWidth</td>
            <td>screen.width</td>
            <td>scale</td>
            <td>sizes</td>
          </tr>
          <tr>
            <td id="container"></td>
            <td id="max"></td>
            <td id="screen"></td>
            <td id="scale"></td>
            <td id="sizes"></td>
          </tr>
        </table>

    <?	//endif;
	?>
    <h1>Hello!</h1>
    </div>
</div>
</body>
</html>