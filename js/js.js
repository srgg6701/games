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
            switch_to_prev_screen();
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