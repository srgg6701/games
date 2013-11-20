<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
<title>Las Vegas</title>
<script src="js/jquery-1.9.1.js"></script>
<script src="js/debug.js"></script>
<?	if(isset($_GET['test'])):?>
<link media="screen" rel="stylesheet" type="text/css" href="stylesheets/test0.css">
<?	else:
	?>
<link id="css_screen" media="screen" rel="stylesheet" type="text/css" href="stylesheets/screen.css">
<script src="js/js.js"></script>
<?	endif;
?>
<style>
<?	if(isset($_GET['bg'])):
		$pic=($_GET['bg']==1)? 'bg_bench':'bg_full_white';?>
#wrapper{
	background:url(images/<?=$pic?>.jpg);
	<?	if($_GET['bg']):
	?>
	opacity:<?=$_GET['bg']?>;
	<?	endif;
	?>
}
<?	endif;
	?>
#wrapper{
	font-size:100%;
}
</style>
</head>
<body>
<div id="wrapper">
	
    <!--<div id="top_bar">
    </div>
        
    <div id="current_time"><b>17:06</b> GMT - Friday 07 Sept, 2013</div>-->
    	
    <div id="logo">Brand<span>.com</span></div>
<?	$show=false;
	if($show){
?>        
    <div id="total">Total Winings</div>

  	<div class="win_numb" id="win_numb_1"> </div>
  	<div id="hell666_1" class="h666"> </div>
  	<div class="win_numb" id="win_numb_2"> </div>
  	<div id="hell666_2" class="h666"> </div>
  	<div class="win_numb" id="win_numb_3"> </div>
  	<div id="hell666_3" class="h666"></div>
    
    <div id="welcome_back">Welcome back, 
        <div class="user_name">Jhon Doe! <img src="images/pointer_down.png" width="11" height="5"></div>
  	</div>
	
    <div class="float_panel" id="left_top_box"></div>

    <div id="free"></div>
    <div id="take_it">Take it, it's Yours!</div>
    <div id="seven"></div>
    <div id="get_it_now">Get it now!</div>
    <div id="no_deposit_required">No deposit required</div>
        
    <div class="float_panel" id="left_bottom_palette"></div>
    
    <div class="left_bottom_box" id="left_bottom_box_1">Resent Winners</div>
    <div class="left_bottom_box" id="left_bottom_box_2">Slot Machine
    	<div>Nikki S
    		<div>500 &euro;</div>
        </div>
    </div>
    
    <div class="left_bottom_box" id="left_bottom_box_3">Bingo
        <div>Green G
            <div>500 &euro;</div>
        </div>
    </div>
        
    <div class="left_bottom_box" id="left_bottom_box_4">Scratch to win
        <div>Whatever M
            <div>500 &euro;</div>
        </div>
    </div>
    
    <div class="left_bottom_box" id="left_bottom_box_5">Rotate it
        <div>Some Big Name
            <div>500 &euro;</div>
        </div>
    </div>
        
    <!-- Pointers -->
    <div class="pointer_left top" id="left"></div>
    <div class="pointer_left middle" id="left"></div>
    <div class="pointer_left bottom" id="left"></div>
    <div class="pointer_right top" id="left"></div>
    <div class="pointer_right middle" id="left"></div>
    <div class="pointer_right bottom" id="left"></div>
        
    <!-- Buttons -->
    <div class="scene_bingo top left" id="scene_bingo_top_1"></div>
    <div><div>Cool Farmers</div></div>
    <div class="scene_bingo top center_left" id="scene_bingo_top_2"></div>
    <div><div>Las Vegas Party</div></div>
    <div class="scene_bingo top center_right" id="scene_bingo_top_3"></div>
    <div><div>Cool Farmers</div></div>
    <div class="scene_bingo top right" id="scene_bingo_top_4"></div>						
    <div><div>Las Vegas Party</div></div>

    <div class="scene_bingo middle left" id="scene_bingo_middle_1"></div>
    <div><div>Cool Farmers</div></div>
    <div class="scene_bingo middle center_left" id="scene_bingo_middle_2"></div>
    <div><div>Las Vegas Party</div></div>
    <div class="scene_bingo middle center_right" id="scene_bingo_middle_3"></div>
    <div><div>Cool Farmers</div></div>
    <div class="scene_bingo middle right" id="scene_bingo_middle_4"></div>
    <div><div>Las Vegas Party</div></div>

    <div class="scene_bingo bottom left" id="scene_bingo_bottom_1"></div>
    <div><div>Cool Farmers</div></div>
    <div class="scene_bingo bottom center_left" id="scene_bingo_bottom_2"></div>
    <div><div>Las Vegas Party</div></div>
    <div class="scene_bingo bottom center_right" id="scene_bingo_bottom_3"></div>
    <div><div>Cool Farmers</div></div>
    <div class="scene_bingo bottom right" id="scene_bingo_bottom_4"></div>
    <div><div>Las Vegas Party</div></div>

    <div class="right_block" id="right_block_promotions"></div>
        
    <div class="right_panel" id="right_promotion">
        <div class="small_header">
            <div class="subsrtrate">&nbsp;</div>
            <div class="subheader">Promotions</div>
        </div>
        <div class="panel_content">
            <p>
                <b>100% Welcome Bonus</b>
            </p>
            <p>
                You measure your-
                self by the people
                who measure themselves.
            </p>
        </div>
    </div>       
    
    <div class="right_block" id="right_block_live_support"></div>

    <div class="right_panel" id="right_live_support">
        <div class="small_header">
            <div class="subsrtrate">&nbsp;</div>
            <div class="subheader">Live support</div>
        </div>
        <div class="panel_content">
            <p>
                <img class="block" src="images/girl.jpg" width="105" height="66">
            </p>
            <p>
              You measure the people.
            </p>
        </div>
    </div>       
    
<!-- background -->
    <div id="bottom_top_left"></div>
    <!-- background -->
    <div id="bottom_menu_left_side"></div>
    
        <div id="my_balance">My <b>Balance</b></div>
        
            <div id="currency_sum">3.52 &euro;</div>
    
    <!-- background -->
    <div id="bottom_menu_right_side">
        <div id="make_a_deposite">
            Make a Deposite
        </div>
    </div>
        
    <div class="bottom_menu_item"  id="bottom_menu_item_profile">Profile</div>
    <div class="bottom_menu_item"  id="bottom_menu_item_cashier">Cashier</div>
    <div class="bottom_menu_item"  id="bottom_menu_item_games">Games</div>
    <div class="bottom_menu_item"  id="bottom_menu_item_chat">Live Chat</div>
    <div class="bottom_menu_item"  id="bottom_menu_item_logout">Logout</div>
<?	}
?>
</div>
</body>
</html>