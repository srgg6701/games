// do it!
$(function(){  

	$('#test_inner_submenu').load('test_menu.html');
	/**
	 * How it works.
	 	see dd_menu.xlsx, amigo!
	 */
	/* Events */
	//	First level menus ------------------------------------------
		// set target menu and show it
		$('['+menus.pointer+']').mouseenter(function(){
			// str 90
			//console.log('%cstr 90: pointer.%cmouseenter %s','font-weight:bold','color:blue','pointer ACTIVE');
			menus.pointer_active=true;
			menus.showMenu(true,this); 
		}).mouseleave(function(){ // get target menu and hide it
			// str 94
			//console.log('%cstr 94: pointer.%cmouseleave %s','font-weight:bold','color:orange','pointer actve FALSE');
			menus.pointer_active=false;
			menus.hideMenu();
		});
		// set menu mark as active
		$(menus.menu_container_class) // .menu_container
			.mouseenter(function(){
				// str 101
				//console.log('%cstr 101','font-weight:bold');
				//console.log('menu_active_container_id = %c'+menus.menu_active_container_id,'color:violet');
				menus.menu_active_container_id=this.id;
		});
		
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
		
		// Cancel window by clicking
		/*$('.close').click(function(){
			console.log('go close now!');
			Game.hideMyProfile();
		});*/
		
		$(document).keyup(function(e) {
			manageMyProfile(false,e);
		});

	//	Submenus ---------------------------------------------------
	// hide submenu
	// when mouse leave menu in drops its mark as active; however, remember 
	// that we can simultaneously enter to the menu on next/previous level.
	// In that moment we set menu_active_container_id again! See code above.
	$(menus.menu_container_class+' > menu').mouseleave(function(){		
		// str 111
		//console.log('%cstr 111','font-weight:bold')
		//console.log('menu_active_container_id = %cfalse','color:red');
		menus.menu_active_container_id=false;
		menus.hideMenu();
	});
	// show submenu
	$('li:has(menu)').mouseenter(function(){
		// str 119
		//console.log('%cstr 119','font-weight:bold');		
		//console.log('show '+menus.menu_wrapper_class);
		if($(this).parent('menu').attr('data-slow-children'))
			$('menu',this).show(200,function(){
				$(menus.menu_wrapper_class,this).show(200)
			});
		else{
			$('menu',this).show(0);
			$(menus.menu_wrapper_class,this).show(0);
		}
	}).mouseleave(function(){ // hide submenu
		// str 130
		//console.group('%cstr 130','font-weight:bold');
			//console.log('hide '+menus.menu_wrapper_class);
			//console.log('hide menu');
		//console.groupEnd();		
		$(menus.menu_wrapper_class,this).hide();
		$('menu',this).hide(200);
	});
	// scroll submenu
	// first scroll arrow
	$('div'+menus.menu_wrapper_class+' >div:first-child').click(function(){
		scrollMenuItems(this,'up');
	});
	// second scroll arrow
	$('div'+menus.menu_wrapper_class+' >div:last-child').click(function(){
		scrollMenuItems(this,'down');
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
	//console.log('menu height: '+menuHeight);
	//console.log('singleItemHeight: '+singleItemHeight);
	//console.log('scrollLimit: %c'+scrollLimit,'color:violet');
	//console.log('margin-top: %c'+topMargin,'color:green');
	//console.groupEnd();
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