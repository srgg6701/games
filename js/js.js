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
    // The form in the active screen
    var screenForm = Scene.active_screen.Form,
        targetInput,
        customValMess;
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
        .on('submit', '#'+screenForm.name, function(event){
        console.log('%csubmit form','color:blue');
        /*$('input', event.currentTarget).each(function(){
            console.log('current input: '); console.dir(this);
            if( this.getAttribute(screenForm.default_data)
                && !this.required
              ) this.value="";
        });*/
        //console.dir(event.currentTarget);
        if(screenForm.pass_diff) return false;
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
        
    })  // set custom validation messge
        .on('invalid','input', function(event){
            console.log('invalid: '); console.dir(event.currentTarget);
            if(screenForm[event.currentTarget.name]){
                customValMess=screenForm[event.currentTarget.name].message;
                event.currentTarget.setCustomValidity(customValMess);
            }
    })  //
        .on('blur', 'input', function(event){
            var targetInput = event.currentTarget;
            console.log('blur: '); console.dir(targetInput);
            if(targetInput.name==screenForm.retype_password.name){
                var pass1Val=getPass1Value(targetInput); //console.log('pass1Val = '+pass1Val);
                var pass2Val=targetInput.value;
                if(pass1Val&&pass2Val&&(pass1Val!=pass2Val)){
                    screenForm.pass_diff = true; //console.log('screenForm.pass_diff');
                    customValMess=screenForm.retype_password.message;
                }else{
                    customValMess="";
                    screenForm.pass_diff = false;
                }
            }else{
                customValMess="";
            }
            if(targetInput.value==targetInput.getAttribute(screenForm.default_data)){
                console.log('default attribute is fired');
                if(!screenForm[targetInput.name])
                    customValMess=screenForm.mess_diff;
                else customValMess=screenForm[targetInput.name].message;
            }
            targetInput.setCustomValidity(customValMess);
    })  //
        .on('keypress','input', function(event){
            switch(event.currentTarget.name){
                case screenForm.retype_password:
                    //console.log('%ckeypress', 'color:brown;');console.dir(event.currentTarget); 
                    if(screenForm.pass_diff){
                        event.currentTarget.setCustomValidity("");//console.dir(event.currentTarget);
                    }
                break;
            }
    })  /* Manage inner pyctos*/
        //
        .on('click','.go_left',function(){
            console.log('go left is clicked!');
            switch_to_prev_screen();
    })  // close screen
        .on('click','.close',function(){
            Scene.hideMyProfile();
    })  // reach hidden checkbox trough his label:
        .on('click','label[data-box]',function(event){
                //console.log('%cclick', 'color:brown;');console.dir(event.currentTarget);
                // currentTarget is label, target is checkbox
                Scene.active_screen.checkInvisibleBox(event.target); // 
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
			Scene.hideMyProfile();	
        //manageMyProfile(false,e);
    });
});