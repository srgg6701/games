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
	/* */	
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
		#total,#win_numb{
			position:relative;
			text-align:center;
			width:100%;
		}
		#win_numb
			>div{
			display:inline-block;
			height: 50px;
			position:relative;
			margin-right:2px;
			text-align:center;
			width: 72px;
		}
	#current_time{
		height: 26px;
		right: 5px;
		top:14px;
		width: 217px;
	}
#welcome_back{
	height:40px;
	left:10px;
	top: 64px;
	width:188px;
}				

#left_block{
	height:540px;	
	left: 10px;	
	top: 124px;
	width: 180px;
}
	#top_box,#bottom_box{
		position:relative;
		width:100%;
	}
	#top_box{
		height: 270px;
		margin-bottom: 12px;
	}
	#bottom_box{
		height: 260px;
	}
	#bottom_box
		div{
		height:50px;
		border-bottom: solid 1px #333;
		color: red;
		padding: 8px 13px;
		position:static;
	}

#right_block{
	height: 350px;
	right: 12px;
	top: 66px;
	width: 134px;
}
	#promotions,
	#live_support{
		height: 171px;
		position:relative;
		width:100%;
	}
	#promotions{
		margin-bottom: 10px;
	}
	
#scene
	>div{
	height:138px;
	left:255px;
	width: 576px;
}
	#scene
		>div:nth-child(1){
		top:123px;	
	}	
	#scene
		>div:nth-child(2){
		top: 324px;	
	}	
	#scene
		>div:nth-child(3){
		top:528px;	
	}
	
	#scene
		>div
			>div{
		height:137px;
		display: inline-block;
		padding-top: 113px; /* прижать к низу кнопку */
		width: 118px;
	}	
	
	#scene
		>div
			>div:nth-child(1){
		left:0;
	}	
	
	#scene
		>div
			>div:nth-child(2){
		left:150px;
	
		width: 123px;
}	
	
	#scene
		>div
			>div:nth-child(3){
		left:304px;
	}	
	
	#scene
		>div
			>div:nth-child(4){
		left:453px;
		width: 123px;
	}	

#scene button{
	display:block;
	height: 25px;
	margin: auto;
}
	

#bottom_menu{
	left:0;
	bottom:0;
	height:82px;
	width:100%;
}
	#top_left,
	#bottom_menu_left_side{
		position:relative;
	}
	
	#my_balance,
	#currency,
	#currency_sum{
		display:inline-block;
		line-height:50px;
		position:static;
	}
	#my_balance{
		margin-left:12px;
	}
	
	#currency{
		text-align:center;
		width: 112px;
	}
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
		display:inline-block;
	}
	#bottom_menu_left_side{
		height: 50px;
		margin-right: 6px;
		width:201px;
	}
	#bottom_menu_right_side{
		height: 47px;
		text-align:right;
		padding: 18px 0;
		width:819px;
	}	
	#bottom_menu_right_side
		>span{
		margin-left: 19px;
		padding:4px;	
	}
	#bottom_menu_right_side
		>span
			a{
		color:white;
		text-decoration:none;
	}
</style>

</head>
<body>
<div id="wrapper">
    <div id="top_bar">
    	<div id="logo">
        </div>
        <div id="winings">
            <div id="total">
            	Total Winings
            </div>
            <div id="win_numb">
            	<div>999</div>
            	<div>999</div>
            	<div>999</div>
            </div>
        </div>
        <div id="current_time">
            17:06 GMT - Friday 07 Sept, 2013
        </div>
    </div>
    <div id="welcome_back"></div>
	<div id="left_block">
        <div id="top_box"></div>
        <div id="bottom_box">
        	<div>Resent Winners</div>
        	<div>Slot Machine</div>
        	<div>Bingo</div>
        	<div>Scratch to win</div>
        	<div>Rotate it</div>
        </div>
    </div>
    <div id="scene">
    	<div>
        	<div>
            	<button>Cool Farmers</button>
            </div>
        	<div>
            	<button>Las Vegas Party</button>
            </div>
        	<div>
            	<button>Cool Farmers</button>
            </div>
        	<div>
            	<button>Las Vegas Party</button>
            </div>
        </div>
    	<div>
        	<div>
            	<button>Cool Farmers</button>
            </div>
        	<div>
            	<button>Las Vegas Party</button>
            </div>
        	<div>
            	<button>Cool Farmers</button>
            </div>
        	<div>
            	<button>Las Vegas Party</button>
            </div>
        </div>
    	<div>
        	<div>
            	<button>Cool Farmers</button>
            </div>
        	<div>
            	<button>Las Vegas Party</button>
            </div>
        	<div>
            	<button>Cool Farmers</button>
            </div>
        	<div>
            	<button>Las Vegas Party</button>
            </div>
        </div>
    </div>
    <div id="right_block">
    	<div id="promotions"></div>
        <div id="live_support"></div>
    </div>
    <div id="bottom_menu">
    	<div id="top_left"></div>
    	<div id="bottom_menu_left_side">
        	<div id="my_balance">
            	<a href="#">My <b>Balance</b></a>
            </div>
            <div id="currency">
            	<div id="currency_sum">
                	3.52 &euro;
                </div>
            </div>
        </div>
    	<div id="bottom_menu_right_side">
	        <span id="bottom_menu_profile"><a href="#">Profile</a></span>
	        <span id="bottom_menu_cashier"><a href="#">Cashier</a></span>
	        <span id="bottom_menu_games"><a href="#">Games</a></span>
	        <span id="bottom_menu_chat"><a href="#">Live Chat</a></span>
	        <span id="bottom_menu_logout"><a href="#">Logout</a></span>
        </div>
    </div>
</div>
</body>
</html>