<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>Las Vegas</title>
<style>

div,span{
	box-shadow: 0 0 0 1px #F00;
	box-sizing:border-box;	
}
div{
	position:absolute;
}
#wrapper {
	background:url(images/bg_full_white.jpg);
	width:1027px;
	height:768px
}
#top_bar{
	height:90px;
	width:100%;
}
	#logo{
		left:15px;
		top:8px;
	
		height: 30px;
		width: 38%;
	}
	#winings{
		left:430px;
		top:8px;
		height: 67px;
		width: 235px;
	}
		#total,
		[id^="win_numb"]{
			/*position:relative;*/
			text-align:center;
			/*width:100%;*/
		}
		[id^="win_numb"]{
			/*display:inline-block;*/
			height: 50px;
			/*position:relative;
			margin-right:2px;*/
			text-align:center;
			width: 72px;
		}
	#current_time{
		height: 26px;
		/*right: 5px;*/
		top:14px;
		width: 217px;
	}
#welcome_back{
	height:40px;
	left:10px;
	top: 64px;
	width:188px;
}				

	#left_top_box,#left_bottom_box{
		/*position:relative;*/
		width:180px;
	}
	[id^="left_bottom_box_"]{
		height:50px;
		border-bottom: solid 1px #333;
		color: red;
		padding: 8px 13px;
		/*position:static;*/
	}

#right_block{
	height: 350px;
	right: 12px;
	top: 66px;
	width: 134px;
}
	[id^="right_block_"]{
		height: 171px;
		/*position:relative;*/
		width:136px;
	}
	
[id^="scene_btn_"]{
	height:138px;
}
	[id^="scene_btn_top_"] 
		+div{
		/*кнопка: высота, ширина*/
		height: 25px;
		width: 123px;
	}
	[id^="scene_btn_top_"]{
		top:123px;	
	}	
		[id^="scene_btn_top"] +div{
			/*кнопка, position*/
		}
	[id^="scene_btn_middle_"]{
		top: 324px;	
	}	
		[id^="scene_btn_middle_"] +div{
			/*кнопка, position*/
		}
	[id^="scene_btn_bottom_"]{
		top:528px;	
	}
		[id^="scene_btn_bottom_"] +div{
			/*кнопка, position*/
		}

#bottom_menu{
	left:0;
	bottom:0;
	height:82px;
	width:100%;
}
	
	#my_balance,
	/*#currency,*/
	#currency_sum{
		/*display:inline-block;*/
		line-height:50px;
		/*position:static;*/
	}
	#my_balance{
		margin-left:12px;
	}
	/*
	#currency{
		text-align:center;
		width: 112px;
	}*/
	#currency_sum{
		background-color:#0F0E32;
		color:white;
		line-height:28px;
	}
	#top_left{
		height:31px;
		width:80px;
	}
	
	#bottom_menu_left_side,
	#bottom_menu_right_side{
		bottom:0;
		/*display:inline-block;*/
	}
	#bottom_menu_left_side{
		height: 50px;
		/*margin-right: 6px;*/
		width:201px;
	}
	#bottom_menu_right_side{
		height: 47px;
		text-align:right;
		padding: 18px 0;
		width:819px;
	}	
	[id^="bottom_menu_item_"]{
		/*margin-left: 19px;*/
		color:white;
		padding:4px;	
	}
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
        
        <div id="winings">
        </div>

            <div id="total">
            	Total Winings
            </div>

            <div id="win_numb">
            </div>

            	<div id="win_numb_1">999</div>
            	<div id="win_numb_2">999</div>
            	<div id="win_numb_3">999</div>

    
    <div id="welcome_back"></div>
	
    <!--<div id="left_block">
    </div>-->

        <div id="left_top_box"></div>
        
        <div id="left_bottom_box">
        </div>
        	
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
    
    <div id="bottom_menu">
    </div>

    	<!-- background -->
        <div id="top_left"></div>
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