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
function manageRadios(lbl){
	//
	$(lbl).on('click',function(){
		console.log('label is clicked');
		var checkedRadioClass='checked';
		var radio = $('input:radio',this);
		console.dir(radio);
		$('input:radio[name="'+$(radio).attr('name')+'"]')
			.parent('label').removeClass(checkedRadioClass);
		$(this).addClass(checkedRadioClass);
	});
}
/*
 * Handle "remember me" checkbox
 */
function manage_remember(chBox){
	if(chBox.checked==true)
		$(chBox).parent().addClass('checked');
	else
		$(chBox).parent().removeClass('checked');
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
 
function closeWindow(block_name) {
    
}*/