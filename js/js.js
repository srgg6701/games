// do it!
$(function(){  
    // load authorization form by default
    //
    // load teporary menu
    // TODO: remove on production
    //$('#test_inner_submenu').css('opacity',0.4);
	//$('#test_inner_submenu').load('test_menu.html');
    
    // actions by default:
    // show wrapper
    document.getElementById(Scene.container_id).style.display='block';
    // show user login form
    manageLevels('game');
    Scene.appendUserBlock(Scene.user_container_id_default);
    // The form in the active screen
    var screenForm = Scene.active_screen.Form,
        customValMess;
    /* Events */	 
    /**
     * Show My Profile data
	 */	
    $('[data-screen]').on('click',function(){
        var data_screen = $(this).attr('data-screen');
        if(data_screen=='profile')
            Scene.appendUserBlock((User.account_type=='demo')? 'my_profile_data':'my_profile_form');
        else if(data_screen=='logout')
            logoutUser();
    });    
    /* check passwords' coincedence before sending form's data */
    $('body')
        .on('submit', '#'+screenForm.name, function(){
        //console.log('%csubmit form','color:blue');
        //
        if(screenForm.pass_diff) return false;
        // handle screens:
        makeConnection('controllers/user'); //console.log('Scene.active_screen.screen_id = '+Scene.active_screen.screen_id);
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
    })  
        /* Manage inner pyctos*/
        // if we click pointer to the left
        .on('click','.go_left',function(){ // console.log('go left is clicked!');
            switch_to_prev_screen();
    })  // close screen
        .on('click','.close',function(){
            Scene.closeUserScreen();
    })  // reach hidden checkbox trough his label:
        .on('click','label[data-box]',function(event){
                //console.log('%cclick', 'color:brown;');console.dir(event.currentTarget);
                // currentTarget is label, target is checkbox
                Scene.active_screen.Form.checkInvisibleBox(event.target); // 
    })  // click gender radios
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
			Scene.closeUserScreen();
    });
});