// do it!
$(function(){  
    // load authorization form by default
    //
    // load teporary menu
    // TODO: remove on production
	$('#test_inner_submenu').load('test_menu.html');
    
    /* Events */	 
    /**
     * Show My Profile window
	 * How it works.
	 	see dd_menu.xlsx
	 */	
    $('[data-level-default]').on('click',function(){
        manageLevels('game');
        manageMyProfile(true);
        return false;	
    });
    // actions by default:
    // show wrapper
    document.getElementById(Scene.container_id).style.display='block';
    // show user login form
    $('div[data-level-default]').trigger('click'); 
    
    /* check passwords' coincedence before sending form's data */
    $('body')
        .on('submit', '#'+Scene.active_screen.Form.name, function(){
        //console.dir(event.target);
        if(Scene.active_screen.Form.pass_diff) return false;
        // handle screens:
        var activeScreen;
        if(activeScreen=checkActiveScreen('my_profile_open_demo_account')){
            makeConnection('controllers/user');
            registerUser('demo');
        }else if(activeScreen=checkActiveScreen('my_profile_login')){
            makeConnection('controllers/user');
            loginUser();
        }
        // we don't want the page being reloaded yet
        return false;
    })  //
        .on('blur','#'+Scene.active_screen.Form.retype_password_id, function(event){
            var pass2 = event.target; console.log('%cblur', 'color:brown;');console.dir(pass2); 
            var pass1Val=getPass1Value(pass2); //console.log('pass1Val = '+pass1Val);
            var pass2Val=pass2.value;
            if(pass1Val&&pass2Val&&(pass1Val!=pass2Val)){
                Scene.active_screen.Form.pass_diff = true; //console.log('Scene.active_screen.Form.pass_diff');
                pass2.setCustomValidity(Scene.active_screen.Form.messages.pass_are_diff);
            }else{ 
                pass2.setCustomValidity("");     
                Scene.active_screen.Form.pass_diff = false;
            }
    })  //
        .on('keypress','#'+Scene.active_screen.Form.retype_password_id, function(event){
            console.log('%ckeypress', 'color:brown;');console.dir(event.target); 
            if(Scene.active_screen.Form.pass_diff){
                event.target.setCustomValidity("");
                //console.dir(event.target);
            }
    })  
    /* Manage inner pyctos*/
        //
        .on('click','.go_left',function(){
            console.log('go left is clicked!');
    })
        // close screen
        .on('click','.close',function(){
            Scene.hideMyProfile();
    })
        // reach hidden checkbox trough his label:
        .on('click','label[data-box]',function(event){
                console.log('%cclick', 'color:brown;');console.dir(event.target);
                Scene.active_screen.checkInvisibleBox(event.target);
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
/**
 * Comment
 */
function checkActiveScreen(screen_id) {
    return document.getElementById(screen_id);
}
/**
 * Get the first password field value
 */
function getPass1Value(input) {
    var Form = $(input).parents('form').eq(0); //console.dir(Form);
    var input_val = $('#password', Form).val()||$('#new_password', Form).val();
    //console.log('input_val = '+input_val);
    return input_val;
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
 *  Load appropriate user profile screen
 */
function manageMyProfile(show,e){
	//console.log('%cmanageMyProfile()','background-color:yellow; padding:4px 6px;')
	if(show){
		Scene.showUserProfile();
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
 * Make a dynamic connection to the certain js-file
 */
function makeConnection(path) {
    var new_connection =$('<script/>',{
       src:path+'.js' 
    }); // console.dir(new_connection);
    $('head').append(new_connection);
}