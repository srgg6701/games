<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>Las Vegas</title>
<link rel="stylesheet" type="text/css" href="stylesheets/test0.css">
<style>
<?	if(isset($_GET['bg'])):?>
#wrapper{
	background:url(images/bg_full_white.jpg);
	<?	if($_GET['bg']):
	?>
	opacity:<?=$_GET['bg']?>;
	<?	endif;
	?>
}
<?	endif;
	?>
</style>
</head>
<body>
<div id="wrapper">
    
    <div id="top_bar">
    </div>
        
        <div id="current_time">
            17:06 GMT - Friday 07 Sept, 2013
        </div>
    	
        <div id="logo">
        </div>
        
        <!--<div id="winings">
        </div>-->

            <div id="total">
            	Total Winings
            </div>

            <!--<div id="win_numb">
            </div>-->

            	<div id="win_numb_1">999</div>
            	<div id="win_numb_2">999</div>
            	<div id="win_numb_3">999</div>

    
    <div id="welcome_back"></div>
	
    <!--<div id="left_block">
    </div>-->

        <div id="left_top_box"></div>
        
        <!--<div id="left_bottom_box">
        </div>-->
        	
            <div id="left_bottom_box_1">Resent Winners</div>
        	<div id="left_bottom_box_2">Slot Machine</div>
        	<div id="left_bottom_box_3">Bingo</div>
        	<div id="left_bottom_box_4">Scratch to win</div>
        	<div id="left_bottom_box_5">Rotate it</div>

    <!--<div id="scene">
    </div>-->

    	<!--<div>
        </div>-->
    		
            <!-- ! Buttons	-->
        
        	<div id="scene_btn_top_1"></div>
				<div>Cool Farmers</div>
        	<div id="scene_btn_top_2"></div>
				<div>Las Vegas Party</div>
        	<div id="scene_btn_top_3"></div>
				<div>Cool Farmers</div>
        	<div id="scene_btn_top_4"></div>						
            	<div>Las Vegas Party</div>
        
        <!--<div>
        </div>-->

        	<div id="scene_btn_middle_1"></div>
				<div>Cool Farmers</div>
        	<div id="scene_btn_middle_2"></div>
				<div>Las Vegas Party</div>
        	<div id="scene_btn_middle_3"></div>
				<div>Cool Farmers</div>
        	<div id="scene_btn_middle_4"></div>
				<div>Las Vegas Party</div>

    	<!--<div>
        </div>-->

        	<div id="scene_btn_bottom_1"></div>
				<div>Cool Farmers</div>
        	<div id="scene_btn_bottom_2"></div>
				<div>Las Vegas Party</div>
        	<div id="scene_btn_bottom_3"></div>
				<div>Cool Farmers</div>
        	<div id="scene_btn_bottom_4"></div>
				<div>Las Vegas Party</div>

    <!--<div id="right_block">
    </div>-->
    	
        <div id="right_block_promotions"></div>
        <div id="right_block_live_support"></div>
    
    <!--<div id="bottom_menu">
    </div>-->

    	<!-- background -->
        <div id="bottom_top_left"></div>
    	<!-- background -->
        <div id="bottom_menu_left_side"></div>
    	
        	<div id="my_balance">My <b>Balance</b>
            	<!--<a href="#"></a>-->
            </div>
            
            <!--<div id="currency">
            </div>-->
            	
                <div id="currency_sum">
                	3.52 &euro;
                </div>
        
    	<!-- background -->
        <div id="bottom_menu_right_side">
        </div>

	        <div id="bottom_menu_item_profile">Profile</div>
	        <div id="bottom_menu_item_cashier">Cashier</div>
	        <div id="bottom_menu_item_games">Games</div>
	        <div id="bottom_menu_item_chat">Live Chat</div>
	        <div id="bottom_menu_item_logout">Logout</div>
</div>
</body>
</html>