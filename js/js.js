// do it!
$(function(){  
    // load authorization form by default
    //
    // load teporary menu
    // TODO: remove on production
    //$('#test_inner_submenu').css('opacity',0.4);
	$('#test_inner_submenu').load('test_menu.html');
    
    // actions by default:
    // show wrapper
    document.getElementById(Scene.container_id).style.display='block';
    // show user login form
    manageLevels('game');
    Scene.appendUserBlock(Scene.user_container_id_default);
    //Scene.showUserProfile();
    
    /* Events */	 
    /**
     * Show My Profile data
	 * How it works.
	 	see dd_menu.xlsx
	 */	
    $('[data-level-default]').on('click',function(){
        Scene.appendUserBlock('my_profile_data');
    });
    
    /* check passwords' coincedence before sending form's data */
    $('body')
        .on('submit', '#'+Scene.active_screen.Form.name, function(){
        //console.dir(event.target);
        if(Scene.active_screen.Form.pass_diff) return false;
        // handle screens:
        makeConnection('controllers/user'); console.log('Scene.active_screen.screen_id = '+Scene.active_screen.screen_id);
        switch(Scene.active_screen.screen_id){
            case 'my_profile_open_demo_account':
                registerUser('demo');
                break;
            case 'my_profile_real_money_account':
                registerUser('money');
                break;
            case 'my_profile_login':
                loginUser();
                break;
        }   
        
        // remove it ONLY on REAL production stage!
        return false;
        
    })  //
        .on('blur','#'+Scene.active_screen.Form.retype_password_id, function(event){
            var pass2 = event.target; //console.log('%cblur', 'color:brown;');console.dir(pass2); 
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
            //console.log('%ckeypress', 'color:brown;');console.dir(event.target); 
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
                //console.log('%cclick', 'color:brown;');console.dir(event.target);
                Scene.active_screen.checkInvisibleBox(event.target);
    })
        // click gender radios
        .on('click','label.radio',function(event){
            var checkedRadioClass='checked';
            var radio = $('input:radio',event.currentTarget);
            //console.log('currentTarget: '); console.dir(event.currentTarget);
            //console.log('radio: '); console.dir(radio);
            $('input:radio[name="'+$(radio).attr('name')+'"]')
                .parent('label').removeClass(checkedRadioClass);
            $(event.currentTarget).addClass(checkedRadioClass);
    });

    // Switch to the Deposit/Withdrawal windows
    $('[data-level-go]').click(function(){
        manageLevels('money',$(this).attr('data-level-go'));
    });
    // esc
    $(document).keyup(function(e) {
        if($('#'+Scene.shade_id).length&&e.keyCode == 27)
			Scene.hideMyProfile();	
        //manageMyProfile(false,e);
    });
});
/*	Functions */
/**
 * Comment
 */
/*function checkActiveScreen(screen_id) {
    return document.getElementById(screen_id);
}*/
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