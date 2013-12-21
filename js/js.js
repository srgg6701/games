// do it!
$(function(){  
    // load teporary menu
    // TODO: remove on production
	$('#test_inner_submenu').load('test_menu.html');
	
    /* Events */	
     
    /**
     * Show My Profile window
	 * How it works.
	 	see dd_menu.xlsx
	 */	
    $('[data-level-default]').click( function(){
        manageLevels('game');
        manageMyProfile(true);
        return false;	
    });
    /*
    $('#'+Scene.active_screen).on(event_type,element_id,function(event){
        console.group('%cCalled elements:', 'font-weight:bold');
            console.log('event_type = '+event_type);
            console.log('event_id = '+event_id);
            console.dir(event.target);
        console.groupEnd();
    });*/
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
/**
 * switch levels
 */
function manageLevels(level,sublevel) {
    $('[data-level]').hide(); //console.log('manageLevels: '+level+', '+sublevel);
    var tLevel = $('[data-level="'+level+'"]');
    $(tLevel).fadeIn(200);
    var bgImg;
    if(level=='game') bgImg = true;
    else{
        $('[data-level="money"]').html(' ');
        $(tLevel).load('contents/sublevels/'+sublevel+'.html',function(){
            //console.log('load: contents/sublevels/'+sublevel+'.html');
            $('[data-block]').click(function(){
                $('.pay_way').text($(this).text());
                $(Scene.user_container_class).hide(100);
                /*console.group('%cmanageWithdraw()','font-weight:bold');
                    console.log('file_name: %c'+$(obj).attr('data-block'),'color:blue');
                console.groupEnd();*/
                // see data-block above as links attribute
                Scene.appendUserMoneyBlock($(this).attr('data-block'));
                Levels.setCorrection($('[data-level="money"]'));
            });
        });
        bgImg = false;
    }
    Levels.setBgImage(bgImg);
    //console.log('switch the level '+level);
}
/*
 *
 */
function manageMyProfile(show,e){
	//console.log('%cmanageMyProfile()','background-color:yellow; padding:4px 6px;')
	if(show){
		Scene.showMyProfile();
	}else{
		if($('#'+Scene.shade_id).length&&e.keyCode == 27){
			//console.log('esc was pushed');
			Scene.hideMyProfile();	
		}
	}
}
/**
 * Open block
 */
function openWindow(block_name) { // money_client_card_holder
    console.log('openWindow');
    Scene.obscureWindow(); // set shadow
    /*  correct window position - calculate it with correction by the given left 
        menu panel width */
    Levels.correction_param=true;
    Scene.appendUserBlock(block_name,false);
    return false;
}
/**
 * Validate field inputs on blur event
*/ 
/*
function validateInput(input) {
    console.log(input.value);
    console.dir(input);
}*/
/**
 * Validate password fields
 */
/*function validatePass(passInputs) {
    console.dir(passInputs);
    return false;
}*/