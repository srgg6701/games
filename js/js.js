// do it!
$(function(){  

	$('#test_inner_submenu').load('test_menu.html');
	/**
	 * How it works.
	 	see dd_menu.xlsx, amigo!
	 */
	/* Events */	
    // Show My Profile window
    $('[data-level-default]').click( function(){
        manageLevels('game');
        manageMyProfile(true);
        return false;	
    });		
    // Switch to the Deposit/Withdrawal windows
    $('[data-level-go]').click(function(){
        manageLevels('money',$(this).attr('data-level-go'));
    });
    // esc
    $(document).keyup(function(e) {
        manageMyProfile(false,e);
    });
});

/*	Functions */
function scrollMenuItems(obj,direction){
	var itemsBlock=$(obj)[(direction=='up')? 'next':'prev']('div');
	var menu = $('>menu',itemsBlock);
	var topMargin=parseFloat($(menu).css('margin-top'));
	var menuHeight=parseFloat($(menu).height());
	var singleItemHeight=menuHeight/$('li',menu).size();
	var scrollLimit=parseFloat($(itemsBlock).innerHeight()-menuHeight);
	console.group('%cscrollMenuItems','font-weight:bold');
	if(direction=='up') { // 640-590=50 //scrollLimit 
		// -313.313 : -301.312555px : margin-top: -315.31256103515625 
		// 0 + 14	>		-301
		if(topMargin-singleItemHeight/4>scrollLimit)  
			$(menu).css('margin-top',topMargin-singleItemHeight/3+'px');
	}else if(direction=='down'){
		if(topMargin<-(singleItemHeight/3)) // 43
			$(menu).css('margin-top',topMargin+singleItemHeight/3+'px');
	}
	/*  console.log('menu height: '+menuHeight);
        console.log('singleItemHeight: '+singleItemHeight);
        console.log('scrollLimit: %c'+scrollLimit,'color:violet');
        console.log('margin-top: %c'+topMargin,'color:green');
        console.groupEnd(); */
}

function manageMyProfile(show,e){
	//console.log('%cmanageMyProfile()','background-color:yellow; padding:4px 6px;')
	if(show){
		Game.showMyProfile();
	}else{
		if($('#'+Game.shade_id).length&&e.keyCode == 27){
			//console.log('esc was pushed');
			Game.hideMyProfile();	
		}
	}
}

/**
 * switch levels
 */
function manageLevels(level,sublevel) {
    $('[data-level]').hide();
    var tLevel = $('[data-level="'+level+'"]');
    $(tLevel).fadeIn(200);
    var bgImg;
    if(level=='game') bgImg = true;
    else{
        $('[data-level="money"]').html(' ');
        $(tLevel).load('contents/sublevels/'+sublevel+'.html');
        //console.log('load: '+'contents/sublevels/'+sublevel+'.html');
        bgImg = false;
    }
    Levels.setBgImage(bgImg);
    //console.log('switch the level '+level);
}
/**
 * Open block
 */
function openWindow(block_name) { // money_client_card_holder
    console.log('openWindow');
    Game.obscureWindow(); // set shadow
    /*  correct window position - calculate it with correction by the given left 
        menu panel width */
    Levels.correction_param=true;
    Game.appendUserBlock(block_name,false);
    return false;
}
/**
 * Comment
 */
function closeWindow(block_name) {
    
}