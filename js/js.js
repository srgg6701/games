// do it!
$(function(){  
    
        var showTestMenu = function(){
            $('#test_inner_submenu').load('test_menu.html')
                .on('mouseenter', function(){
                      $(this).fadeTo(300,1);
              }).on('mouseleave', function(){
                      $(this).fadeTo(300,0.2);
              });
        };

        setTimeout(function(){
            $('#username_or_email').val('srgg01');
            $('#password').val('11111');    
            if(detectBrowser()=='Firefox') {
                showTestMenu();
                $('#test_inner_submenu').css('display','block');
            }
        },2000);
	 
        if(detectBrowser()!='Firefox') showTestMenu();
        
    // load authorization form by default
    // actions by default:
    // show wrapper
    document.getElementById(Scene.container_id).style.display='block';
    // show user login form
    manageLevels('game');
    Scene.appendUserBlock(Scene.user_container_id_default);
    // The form in the active screen
    var screenForm = Scene.active_screen.Form;
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
        .on('submit', '#'+screenForm.name, function(event){
            console.log('Submitting %cForm:','background-color:#eaebec;'); console.dir($('input',event.currentTarget));
        /*var reg;*/
        var invalid = false;
        $('input:not(:hidden)',event.currentTarget).each(function(index,element){
            console.groupCollapsed('%c'+element.id,'font-weight:bold'); 
            if(!setValidityIcon(element,true)) { //console.log('invalid');
                invalid = true; console.log('%cinvalid', 'background-color:lightyellow'); //console.dir(element);
                return false; // just goes out of the loop, does not cancel submitting 
            }   console.groupEnd();
        });
        if(invalid) { //console.log('%csubmit form: invalid','color:red');
            return false;
        }
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
            case 'my_profile_change_password_form':
                return changePassword();
                break;
        }   
        //console.log('submitting...'); 
        //console.log('Scene.active_screen.screen_id = '+Scene.active_screen.screen_id);          
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
    })  //
        .on('mouseover mousedown mouseout mouseup', '.btn_yellow', function(event){
            //console.log('Event: '+event.type); console.dir(event.currentTarget);
            var setSize = function(btn){ 
                var W,H;
                var currentWidth = parseInt(document.defaultView.getComputedStyle(btn,'').width);
                var currentHeight = parseInt(document.defaultView.getComputedStyle(btn,'').height);
                var dataW = 'data-width';
                var dataH = 'data-heignt';
                if(event.type=='mouseover'){
                    var dprms;
                    if(!(dprms=btn.getAttribute(dataW))){
                        btn.setAttribute(dataW,currentWidth);
                    }
                    if(!(dprms=btn.getAttribute(dataH))){
                        btn.setAttribute(dataH,currentHeight);
                    }
                }else{
                    if(event.type=='mousedown'){
                        W = currentWidth * 0.94453125;
                        H = currentHeight * 0.9577464788732394;
                    }else{
                        W = btn.getAttribute(dataW);//ratioW = 1.05872622;
                        H = btn.getAttribute(dataH);//ratioH = 1.044117647;
                    }
                    btn.style.width=W+'px';
                    btn.style.height=H+'px';   
                }
                //console.dir(btn);
            };
            var imgNum = 1;
            switch (event.type){
                case 'mouseout':
                    imgNum = 1;
                    break;
                case 'mouseover':
                    imgNum = 2;
                    break;
                case 'mousedown': //case 'click':
                    imgNum = 3;
                    break;
                case 'mouseup':
                    break;
            }
            if(event.type!='mouseout') setSize(event.currentTarget);
            event.currentTarget.style.backgroundImage="url(images/yellowButton"+imgNum+".svg)";
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