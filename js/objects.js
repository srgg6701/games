// our little Scene Universe :) starts here.
var constMess = {
    alwsymb:'\nYou can use: ',
    alwsymblsms:{
        phone:'10 numbers from 0 to 9 and spaces',
        password:'from 6 to 20 symbols like letters, numbers from 0 to 9 and !@#$%^&*',
        zip:'5 numbers from 0 to 9',
        letters_only:'letters only',
        letters_only2_30:'from 2 to 30 letters',
        letters_and_numbers6_20:'from 6 to 20 symbols like letters and numbers from 0 to 9'
    },
    gender:'Please select a Gender',
    date_mess:'Please select a full Birthday date'
};
//
var Levels = {
    // the frontier. 
	// Outside it the outer hostile world lies.
	// All we want to know and do existst only within the wrapperContainer 
	// it will take an id "wrapper" further
	wrapperContainer:null,
    /* for the Scene.arrangeWindow() - if we need a correction */
    correction_param:false,
    correction_value:0,
    targetFrame:null,
    setCorrection:function(obj){
        this.targetFrame=obj;
        //this.correction_value=$('section.menu',obj).outerWidth();
        this.correction_value=$('section.menu',this.targetFrame).outerWidth();
    },
    defaultBgImage:'bg_bench.jpg',
    setBgImage:function(bgImg){
        if(bgImg){
            if(bgImg===true)
                bgImg=this.defaultBgImage;
                $(this.wrapperContainer).css({
                    backgroundColor:'transparent',
                    background:'url(images/'+this.defaultBgImage+')'
                });
        }else{ 
            $(this.wrapperContainer).css({
                background:'transparent',
                backgroundColor:'white' 
            });
        }
    }
};
var Scene={
    container_id:'wrapper',
    //
	shade_id:'global_shade',
	// user's blocks class name
	user_container_class:'user_profile',
    user_container_id_default:'my_profile_login',
    // loaded User Profile screen
    active_screen:{
        screen_id:false,
        Form:{
            name:'user-form',
            default_data:'data-default_value',
            pass_diff:false,
            mess_diff:"Please fill out this field",
            address:{
                name:'address',
                hint:'Your address.'+constMess.alwsymb+constMess.alwsymblsms.letters_and_numbers6_20,
                message:constMess.alwsymb+constMess.alwsymblsms.letters_and_numbers6_20
            },
            agreement:{
                name:'terms_and_conditions',
                message:'Please check the box to continue'
            },
            birthday:{
                name:'birthday',
                message:'Please select a full Birthday date'
            },
            city:{
                name:'city',
                hint:'Your city.'+constMess.alwsymb+constMess.alwsymblsms.letters_only2_30,
                message:constMess.alwsymb+constMess.alwsymblsms.letters_only2_30
            },
            country:{
                name:'country',
                hint:'Your country.'+constMess.alwsymb+constMess.alwsymblsms.letters_only2_30,
                message:constMess.alwsymb+constMess.alwsymblsms.letters_only2_30
            },
            day:{
                name:'day',
                hint:'Day of your birth',
                message:constMess.date_mess
            },
            email:{
                name:'email',
                hint:'Your email'
            },
            first_name:{
                name:'first_name',
                hint:'Your first name.'+constMess.alwsymb+constMess.alwsymblsms.letters_only2_30,
                message:constMess.alwsymb+constMess.alwsymblsms.letters_only2_30
            },
            home_phone:{
                name:'home_phone',
                hint:'Your home phone (optional).'+constMess.alwsymb+constMess.alwsymblsms.phone,
                message:constMess.alwsymb+constMess.alwsymblsms.phone
            },
            last_name:{
                name:'last_name',
                hint:'Your last name.'+constMess.alwsymb+constMess.alwsymblsms.letters_only2_30,
                message:constMess.alwsymb+constMess.alwsymblsms.letters_only2_30
            },
            mobile_phone:{
                name:'mobile_phone',
                hint:'Your mobile phone.'+constMess.alwsymb+constMess.alwsymblsms.phone,
                message:constMess.alwsymb+constMess.alwsymblsms.phone
            },
            month:{
                name:'month',
                hint:'Month of your birth',
                message:constMess.date_mess //this.date_mess
            },
            password:{
                name:'password',
                hint:'Your password.'+constMess.alwsymb+constMess.alwsymblsms.password,                
                message:constMess.alwsymb+constMess.alwsymblsms.password
            },
            radio_male:{
                name:'radio_male',
                message: constMess.gender
            },
            radio_female:{
                name:'radio_female',
                message: constMess.gender
            },
            //inputs names
            retype_password:{
                name:'retype_password',
                message:'The passwords are different',
                hint:'Re-type password'
            },
            username_or_email:{
                name:'username_or_email',
                hint:'Your username or your email'
            },
            username:{
                name:'username',
                hint:'Your username.'+constMess.alwsymb+constMess.alwsymblsms.letters_and_numbers6_20,
                message:constMess.alwsymb+constMess.alwsymblsms.letters_and_numbers6_20
            },
            year:{
                name:'year',
                hint:'Year of your birth',
                message:constMess.date_mess
            },
            zip_code:{
                name:'zip_code',
                hint:'Your zip code.'+constMess.alwsymb+constMess.alwsymblsms.zip,
                message:constMess.alwsymb+constMess.alwsymblsms.zip
            },
            setElementContent:function(Elem, defaultValue){
                var parentForm = this; //console.log('Elem start'); console.dir(Elem);
                var parentFormElement = parentForm[Elem[0].id]; //console.log('parentForm['+Elem[0].id+']');console.dir(parentForm[Elem[0].id]);
                //Elem[0].onchange=function(){console.log('%cchanged','color:orange')};
                var ddv = this.default_data;
                //test: if(parentForm[Elem[0].id] && parentForm[Elem[0].id].message) console.log('input.message = '+parentForm[Elem[0].id].message); 
                //console.dir(Elem[0]);
                $(Elem).attr(ddv, defaultValue)// for js.js
                    .val(defaultValue)
                    .on('blur', function(){ //console.log('on blur'); //console.log('on blur, name = '+this.name+', value = '+defaultValue);
                        // assign pseudo-placeholder
                        if(this.required){
                            parentForm.handleValue(this,defaultValue);
                            //
                            if(this.name==parentForm.retype_password.name){
                                var Form = $(this).parents('#user-form');
                                var pass1Val=$('#password', Form).val()||$('#new_password', Form).val();
                                var pass2Val=this.value;
                                if(pass1Val&&pass2Val&&(pass1Val!=pass2Val)){
                                    parentForm.pass_diff = true; //console.log('parentForm.pass_diff');
                                    this.setCustomValidity(parentForm.retype_password.message);
                                }else{
                                    parentForm.pass_diff = false;
                                    this.setCustomValidity("");
                                }
                            }else{
                                this.setCustomValidity("");
                            }
                        }
                })
                  .on('invalid', function(){ //console.log('parentFormElement: ');console.dir(parentFormElement);
                    if(parentFormElement.message){
                        //console.log('this invalid: ');console.dir(this);
                        this.setCustomValidity(parentFormElement.message);
                    }   
                }) 
                  .on('click keyup',                    
                    function(event){
                        if(this.id.indexOf("password")!=-1){
                            $(this).attr('type',
                                (this.value==defaultValue||!this.value)? 
                                    'text':'password');                                    
                            if(this.name='retype_password')
                                if(parentForm.pass_diff)
                                    this.setCustomValidity("");//console.dir(event.currentTarget);

                        }
                        if(this.required&&event.type=='keyup')
                            setValidityIcon(event.target);                                                       
                })
                  .on('mouseover', function(){ //console.log('mouseover, this.value = '+this.value);
                    parentForm.fieldsHandlers.mouseOver(this,parentForm);
                })
                  .parents('#'+parentForm.name).on('submit', function(){ //console.log('Elem[0]: '); console.dir(Elem[0]); console.log('Elem[0].value = '+Elem[0].value+', defaultValue = '+defaultValue);
                    return parentForm.fieldsHandlers.submitForm(Elem[0],defaultValue);                    
                })
                  .on('keypress', function(event){ 
                    // if the field has a default value then remove it
                    parentForm.dropElementDefaultValue(event.target, defaultValue);
                }); //console.log('Elem finish'); console.dir(Elem);
            },
            /*
             * handle fields 
             */
            fieldsHandlers:{
                mouseOver:function(obj,parentForm){ //console.log('mouseOver')
                    if(!obj.value){ 
                            if(parentForm[obj.id]){ //console.log('obj.id = '+obj.id); //console.dir(parentForm);
                                obj.title = (parentForm[obj.id].hint)? 
                                    parentForm[obj.id].hint : parentForm[obj.id].message; 
                            }
                        }else obj.title = "";
                },
                submitForm:function(element,defaultValue){
                    if(element.value==defaultValue
                       && element.type!='checkbox' 
                       && element.type!='radio'
                      ){ console.log('The default element value is detected...');
                        element.value="";
                        if(element.required){
                            element.setCustomValidity(Scene.active_screen.Form.mess_diff);
                            return false;
                        }else return true;
                    } return true;
                }
            },
            /**
             * set default value, OK icon...
             * */
            handleValue:function(obj,defaultValue){ //console.log('handleValue, obj.value: '+obj.value+', defaultValue = '+defaultValue);
                if(!obj.value) obj.value=defaultValue;
                //else if(obj.validity.valid==true) setValidityIcon(obj,defaultValue,true);
            },
            /*
            * set custom validaty message to the deeply included element 
            * (which is being extracted from template)
            */
            attachCustomValidaty:function(element){ 
                var sceneElem,parentForm=this;
                var defaultValue = element.value;
                if(element.required){ //console.log('required: '); console.dir(element);
                    if(sceneElem=Scene.active_screen.Form[element.id]){
                        //console.log('sceneElem is found..., element.id = '+element.id+', message should be '+sceneElem.message);
                        $(element).on('blur',function(){ //console.log('blur, element: '); console.dir(element);
                            parentForm.handleValue(this,defaultValue);
                            /*  as the element may be a radiobutton, make sure to drop
                                custom validity from ALL ones having such a name    */
                            $("[name='"+this.name+"']").each(function(){ //console.log(this);                                                              
                                this.setCustomValidity(""); //console.log('drop custom validity');
                            });
                        })
                          .on('invalid',function(){ //console.log('invalid, set custom validity: '+sceneElem.message);   
                            element.setCustomValidity(sceneElem.message); 
                            //setValidityIcon(this,defaultValue);
                        })
                          .on('keyup',function(){
                            if(this.value) setValidityIcon(this)
                        })
                          .on('mouseover', function(){ //console.log('mouseover, this.value = '+this.value);
                            parentForm.fieldsHandlers.mouseOver(this,parentForm);
                        })
                          .parents('#'+parentForm.name).on('submit', function(){ //console.log('Elem[0]: '); console.dir(Elem[0]); console.log('Elem[0].value = '+Elem[0].value+', defaultValue = '+defaultValue);
                            return parentForm.fieldsHandlers.submitForm(element,defaultValue);                    
                        })
                          .on('keypress', function(){
                            parentForm.dropElementDefaultValue(this, defaultValue);
                        });                                                  
                    }
                }
            },        
            /**
             * Handle invisible due to design purposes checkbox
             */
            checkInvisibleBox: function(chbox) { // label[data-box]
                $(chbox).parent('label')[(chbox.checked==true)? 'addClass':'removeClass']('checked');      
            },
            /*  clear the field (non-check/radio box) on key press 
                if there is a pseudoplaceholder text    */
            dropElementDefaultValue:function(obj,defaultValue){
                //console.log('pressed, defaultValue = '+defaultValue); console.dir(obj);
                if( obj.value==defaultValue
                    && ( obj.type=="text"       || 
                         obj.type=="password"   ||
                         obj.type=='email'      ||
                         obj.type=='number'     ||
                         obj.type=='search'     ||
                         obj.type=='tel'        
                       )
                  ) obj.value = "";
            } 
        }      
    },
	// get the certain user's block, 
	// append it to the main wrapper window and make it visible
	appendUserBlock:function(entity_id, data_load_name){
        /*  The attribute data_load_name by default is 'data-load'.
            It defines a HTML-elements' block which must 
            be loaded into the template from the subtemplate.
            For example, see the template contents/my_profile_form.html
            which gets elements from the subtemplate 
            contents/components/input or contents/components/person.
            It may look like this:
            <span data-load="input|address|type here your address"> 
            ...where:
                * 'input' is a file name (input.html) in the directory '/contents'
                * 'address' is an element id in this file
                * 'type here your address' is an this element's value
        */
        if(data_load_name!==false)
            var data_load = (data_load_name) ? data_load_name:'data-load';
        var real_money_account = 'my_profile_real_money_account';
		if(entity_id.indexOf(real_money_account)!=-1){
			// because this is a container for both my_profile_real_money_account1 and my_profile_real_money_account2
			var incomingEntityId=entity_id;
			entity_id=real_money_account;
		} //console.group('%cmanageMyProfile()','font-weight:bold;');		
		$('.'+Scene.user_container_class).remove();
		// see files in the dir /contents/
		var file_contents='contents/'+entity_id+'.html';
        /*  console.log('file_contents: %c'+file_contents,'color:blue;');
			console.log('entity_id: %c'+entity_id,'color:goldenrod;');
			console.log('class: %c'+Scene.user_container_class,'font-weight:bold;');*/
        var userBlock=null,Labels;
		// create a block for the loaded file 
		if(!(userBlock=document.getElementById(entity_id))){
            //console.log('!userBlock, build it now!')
            var userBlock=$('<div/>',{
                id:entity_id,
                class:Scene.user_container_class
            });
        }
        // store id of active screen. Need to be identified while enter account
        this.active_screen.screen_id=entity_id; //console.log('screen_id = '+this.active_screen.screen_id);
        // append the block to the wrapper
        this.obscureWindow();
		$('#'+Scene.shade_id).before(userBlock);
        //console.log('%cshade block: ', 'background-color:#333; color:white'); console.dir($('#'+Scene.shade_id));
		// load the file from /contents/ dir
		$(userBlock).load(file_contents,function(){ 
            /*  console.log('userBlock is loaded. file_contents: '+file_contents);
                console.groupCollapsed('%cuserBlock:', 'color:blue');console.log($(userBlock).html());console.groupEnd();
                drop passwords diff mark */
            Scene.active_screen.Form.pass_diff=false;                    
			// Be ready to load all contents!
			var commonPath='contents/components/';			
			// go through elements which must load elements from templates
			var handleBlocks=function(){
                /*  loading User Profile screen's elements.
                    For example:
                        <span data-load="input|username|username"></span>
                        <span data-load="input|email|email address"></span>
                        <span data-load="input|password|password"></span>
                        etc... =>
                            
                    load content for every element with data-load attribute
                    <input type="text" id="username" name="username" required="required" />
                    <input type="text" id="email" name="email" required="required" />
                    <input type="text" id="password" name="password" required="required" />
                */
                if(data_load){ // if we didn't get it, we don't need any subtemplates
                    $('['+data_load+']').each( function(index, element) {
                        //console.log('element: '); console.dir(element);
                        /*  get file_name to load a certain element's content, 
                            element id, 
                            element value */
                        var data2load=$(element).attr(data_load).split('|');
                        /*  load file and its element by id
                            input.html or person.html
                            #element_id */
                        var element_jid='#'+data2load[1];
                        // for example: load contents/components/input.html #mobile_phone
                        $(element).load(commonPath+data2load[0]+'.html '+element_jid, 
                            function(){
                                var Elem = $(element_jid); //console.dir(Elem);
                                var elementType = $(Elem).attr('type');                             
                                //console.log('entity_id = '+entity_id+', data2load[1] = '+data2load[1]);
                                if(entity_id=="my_profile_login"&&data2load[1]=="password") 
                                    $(Elem).removeAttr('pattern');
                                // only if the 3th param exists (that means it is a single (not compound) element)
								if( data2load[2] && 
                                    ( elementType || 
                                    /*  Warning! The label may not have data2load[2],
                                        so after that condition it checks again
                                    */
                                      $(Elem)[0].tagName.toLowerCase()=='label' 
                                    ) 
                                  ){
                                    switch(elementType){
                                        case 'submit':
                                        case 'text':
                                        case 'password':
                                        case 'email':
                                        case 'number':
                                        case 'search':
                                        case 'tel':
                                            Scene.active_screen.Form.setElementContent(Elem, data2load[2]); 
                                            // add the block for *flag*
                                            var d_flag;
                                            if(d_flag=$(this).attr('data-flag')) {
                                                var dFlag = $('<div/>',{
                                                    class:"flag "+d_flag
                                                });
                                                $(Elem).after(dFlag);
                                            }
                                        break;
                                        /*
                                        case 'checkbox':
                                        case 'radio':
                                            break;  */
                                        case 'button':
                                            $(Elem).append(data2load[2]);
                                        break;
                                        default: // checkbox, radio, label
                                            $(Elem).after(data2load[2]);
                                    }                           
                                }else{                                    
                                    $(':checkbox',Elem).each(function(i,element){Scene.active_screen.Form.attachCustomValidaty(element)});
                                    $(':radio',Elem).each(function(i,element){Scene.active_screen.Form.attachCustomValidaty(element)});
                                    // load the script to handle dd/month/YYYY cells
                                    if(element_jid=='#birthday'){
                                        //console.log('%cbirthday', 'color:green');                                        
                                        $.getScript('js/birthday_handler.js');
                                        for(var i =0, dts=['day','month','year'];i<dts.length;i++){
                                            var element = $('#'+dts[i],Elem)[0];
                                            Scene.active_screen.Form.attachCustomValidaty(element);
                                        }
                                    }
                                }                                   
                        });
                    });                    
                }
			};
			/*  Warning!
					Don't mix the files:
					*   my_profile_real_money_account.html - commont contentainer 
                        for both steps 1 and 2
					*   my_profile_real_money_account1.html - step 1 content
					*   my_profile_real_money_account2.html - step 2 content */
			if(entity_id==real_money_account){
				//console.log('file to load: contents/'+incomingEntityId+'.html');
				// load the my_profile_real_money_account1 or my_profile_real_money_account2 content
				$('#account_real_money_inner_content').load('contents/'+incomingEntityId+'.html', function(){
					handleBlocks();
					var btn_text;
					// step1
					if(incomingEntityId==real_money_account+'1'){
						btn_text='NEXT';
						btn_class='step1';
					}else{ // step2
						btn_text='REGISTER NOW!';
						btn_class='step2';
						$('#steps >div:first-child').addClass('step_passive');
						$('#steps >div:last-child').removeClass('step_passive');
						//console.dir($('#steps >div:first-child'),$('#steps >div:last-child'));
					}
					$('#btn_real_money_account')
						.text(btn_text).addClass(btn_class);
				});
			}else
				handleBlocks();
            // Scene.active_screen=entity_id;            
			// assign styles for the loaded content
			$('#'+entity_id).css({
                // Don't change this order!:
				left: Scene.arrangeWindow(entity_id,'outerWidth'),
                top: Scene.arrangeWindow(entity_id,'outerHeight')
                /*  because if we need a correction (see arrangeWindow())
                    it may cause of its fail.   */
			}).fadeIn(300);              
		});
		//console.dir('userBlock: '+userBlock);
		//console.groupEnd();
	},
    // get data from Cashier section
    appendUserMoneyBlock:function(entity_id){
        // all contents already deleted
        var loaded_component_class_name='loaded_component';
        $('.'+loaded_component_class_name).remove();
        var userBlock=null;
        if(!(userBlock=document.getElementById(entity_id))){
            userBlock=$('<div/>',{
                id:entity_id,
                class:loaded_component_class_name
            });
        }
		// append the block to the wrapper
		$('.pay_way').after(userBlock);
        //console.dir(userBlock);
        $(userBlock).load('contents/'+entity_id+'.html',function(){
            //console.log('The '+entity_id+' is loading...');
            $('[data-load]').each( function(index, element){
                var component_id = $(element).attr('data-load');
                //console.dir('150: component_id = '+component_id,element);  
                $(element).load('contents/components/money.html #section_'+component_id);
            });
        });
        $('section.content [type="submit"]').css('visibility','visible').show();
    },
	// calculate actual positions (top and left) of the target user's block
	arrangeWindow:function(entity_id,func){
        /* func: outerHeight, outerWidth */
        var currentOffset;
        var wrapperOffset=$(Levels.wrapperContainer)[func]();
        // target block width/height
        var blockOffset=$('#'+entity_id)[func]();
        if(Levels.correction_param){ // #money_client_card_holder
            //200 + parseFloat(container)-element.width/2
            var centralArea = $('section.content',Levels.targetFrame);
            var centralAreaPaddingRight = parseFloat($(centralArea).css('padding-right'));
            // central area width minus padding-right
            var centralAreaViewPort = $(centralArea).outerWidth()-centralAreaPaddingRight;
            currentOffset=Levels.correction_value + // left menu panel width
                    (centralAreaViewPort-blockOffset)/2; 
            //wrapperOffset+=Levels.correction_value/2;
            Levels.correction_param=false;
            console.log('func = '+func+', correction_value (' +
                    typeof(Levels.correction_value)+')= ' +
                    Levels.correction_value+', wrapperOffset = '+wrapperOffset +
                    ', entity_id'+entity_id);
            console.dir($('#'+entity_id));
        }else{
            currentOffset=(wrapperOffset-blockOffset)/2;
        }
		/*console.group('%carrangeWindow()','font-weight:bold');
			console.log('function: '+func);
			console.log('entity_id: '+entity_id);
			console.log('wrapperContainer.'+func+' = '+wrapperOffset);
			console.log(entity_id+'.'+func+' = '+blockOffset);
			console.log('currentOffset: ('+wrapperOffset+'-'+blockOffset+')/2 = %c'+currentOffset,'color:violet');
		console.groupEnd();*/		
		return currentOffset+'px';
	},
    // cover the page with shadow
    obscureWindow:function(){
        //console.log('obscureWindow');
        if(!document.getElementById(this.shade_id))
            $(Levels.wrapperContainer)
                .prepend('<div id="'+this.shade_id+'" class="shade cover"></div>');
        //console.dir($('#'+this.shade_id));
    },
    // remove shade from page
    removeShading:function(){
        $('#'+this.shade_id).remove();
    },
	// Enter into account. All the user's data currently is stored in the User object
    enterAccount:function(){ // account_type: 'demo' or 'money'
        //console.log('screen_id = '+this.active_screen.screen_id+', account_type = '+User.account_type);
        // remove screen
        $('#'+this.active_screen.screen_id).remove();
        // wash shadow away
        this.removeShading(); //console.log('account type: '+User.account_type);
        // arrange User Account depending of its type
        $('#btn_bottom_switcher')
                .addClass(User.account_type)
                .text((User.account_type=='demo')? "Switch to Money Player":"Make a deposit");
        $('#user-coin').addClass((User.account_type=='demo')? 'silver':'gold');
        User.logged=true;
        // TODO: remove on production:
        $('#test_inner_submenu').fadeIn('400');
    },
    // 
	closeUserScreen:function(){
        if(this.active_screen.screen_id==this.user_container_id_default){//'my_profile_login'
            if(confirm("Do you really wish to leave The Game?"))
                window.self.close();
        }else{ //console.dir(User);
            // hide user screen:
            $('.'+this.user_container_class+':visible').fadeOut(300);
            var shade = $('#'+this.shade_id);
            // if User is already logged in, just drop the shadow
            if(User.logged){
                // remove shade
                if($(shade).is(':visible'))
                    $(shade).fadeOut(300,this.remove);
            }else{ // ...otherwise - show him the authorization form
                this.appendUserBlock(this.user_container_id_default);
            }
        }
        //console.log('closeUserScreen()');
		/*$('#'+this.shade_id).fadeOut(300,function (){$(this).remove()});
		$('.'+this.user_container_class+':visible').fadeOut(300);
		// in test mode: -------------------------------
		$('#test_inner_submenu').fadeOut(500);
		// end test mode: ------------------------------
		return false;*/
	}
};
var User = {
    logged:false,
    account_type:false,
    mainData:{
        username:       null,
        email:          null,
        password:       null
    },
    xtraData:{
        gender:         null,
        day:            null,
        month:          null,
        year:           null,
        address:        null,
        zip_code:       null,
        city:           null,
        country:        null,
        mobile_phone:   null,
        home_phone:     null
    },
    emptyData:function(){
        this.account_type=false;
        for(var field_name in this.mainData)
            this.mainData[field_name]=null;
        for(var field_name in this.xtraData)
            this.xtraData[field_name]=null;
    }
};
var menus={
    activeMenuId:'',
    touchable:false,
    submenus:{
        instant_games_submenu:{
            '#1':'Las Vegas Party',
            '#2':'Cool Farmer',
            '#3':'Bingo Slot Machine',
            '#4':'Whatever Scene',
            '#5':'Scene to Win',
            '#6':'Win A Scene Now',
            '#7':'Mr. Poker',
            '#8':'Meet the Dealer',
            '#9':'Las Vegas Party',
            '#10':'Cool Farmer',
            '#11':'Bingo Slot Machine',
            '#12':'Whatever Scene',
            '#13':'Scene to Win',
            '#14':'Win A Scene Now',
            '#15':'Mr. Poker',
            '#16':'Meet the Dealer'
        },
        scratch_games_submenu:{
            '#1':'Las Vegas Party',
            '#2':'Cool Farmer',
            '#3':'Bingo Slot Machine',
            '#4':'Whatever Scene',
            '#5':'Scene to Win',
            '#6':'Win A Scene Now',
            '#7':'Mr. Poker',
            '#8':'Meet the Dealer',
            '#9':'Las Vegas Party',
            '#10':'Cool Farmer',
            '#11':'Bingo Slot Machine',
            '#12':'Whatever Scene',
            '#13':'Scene to Win',
            '#14':'Win A Scene Now',
            '#15':'Mr. Poker',
            '#16':'Meet the Dealer'
        },
        slots_machine_submenu:{
            '#1':'Las Vegas Party',
            '#2':'Cool Farmer',
            '#3':'Bingo Slot Machine',
            '#4':'Whatever Scene',
            '#5':'Scene to Win',
            '#6':'Win A Scene Now',
            '#7':'Mr. Poker',
            '#8':'Meet the Dealer',
            '#9':'Las Vegas Party',
            '#10':'Cool Farmer',
            '#11':'Bingo Slot Machine',
            '#12':'Whatever Scene',
            '#13':'Scene to Win',
            '#14':'Win A Scene Now',
            '#15':'Mr. Poker',
            '#16':'Meet the Dealer'
        }
    },
	dur:100,
	// the initializer to show menu
	pointer:'data-container_id',
	pointer_active:false,
    parent_menu_class:'parent',
	// container id that has a menu
	// we get it when mouse enters in the pointer
	menu_container_id: false,
	// the same container id that has a menu
	// but here we get it when mouse enters in the <menu> wrapper
	menu_active_container_id:false,
	// top menu container
	menu_container_class:'menu_container',
    // if less than 9 itmes
    menu_short_class:'short',
    // class name for submenu container
    submenu_container_class:'submenu_container',
    //
    submenu_containers:{},
    // all about scrolling
    scroll:{
        //
        eventInit:null,
        // offset
        offset:0,
        // opposite pointer
        oppositePointer:null,
        // parent for pointer
        pointer_parent_class:{
            up:'scroll up',
            //up_title:'No more items above',
            //opacity_class_up:'opacity08',
            down:'scroll down',
            //down_title:'No more items bellow',
            //opacity_class_down:'opacity08'
        },
        activeObjx:{
            scrollLimit:        {},
            menuTopMargin:      {},
            singleItemHeight:   {},
            menuHeight:         {},
            menu:               {},
            pointerParentBox:   {}
        },
        getPointerOrder:function(direction,reverse){
            var cDir = (reverse)? 'up':'down';
            return (direction==cDir)? 'next':'prev';
        },
        // calculate and store all menu objects tied with scrolling
        setObjects: function(submenuContainer,direction) { // jQuery (not JS!) object
            //console.dir(submenuContainer);
            var submenu_container_id = $(submenuContainer).attr('id');
            //menus.scroll.oppositePointer=$(submenuContainer)[menus.scroll.getPointerOrder(direction)]();
            if(!menus.submenu_containers[submenu_container_id]){
                menus.submenu_containers[submenu_container_id]=submenuContainer;
                // (sub)menu object
                var submenu = $('>menu',submenuContainer);
                // (sub)menu height
                var menuHeight=parseFloat($(submenu).height());
                // set data
                // (sub)menu object
                menus.scroll.activeObjx.menu[submenu_container_id]
                    = submenu;
                // (sub)menu height
                menus.scroll.activeObjx.menuHeight[submenu_container_id]
                    = parseFloat($(submenu).height());
                // single (sub)menu inner item (li) height
                menus.scroll.activeObjx.singleItemHeight[submenu_container_id]
                    = menuHeight/$('li',submenu).size();
                // scrollLimit
                menus.scroll.activeObjx.scrollLimit[submenu_container_id]
                    = parseFloat($(submenuContainer).innerHeight()-menuHeight);
                // don't set pointerParentBox yet!
            }
            //
            menus.scroll.activeObjx.menuTopMargin[submenu_container_id]
                = parseFloat($(menus.scroll.activeObjx.menu[submenu_container_id]).css('margin-top'));
            //console.log('menus.scroll.activeObjx.menuTopMargin[submenu_container_id] = %c'+menus.scroll.activeObjx.menuTopMargin[submenu_container_id],'background-color:lightskyblue');
            /*  console.dir(submenuContainer);
                console.dir(menus.submenu_containers[submenu_container_id]); */
        },
        // class for the pointer for scrolling (up/down)
        pointer_class:'menu_pointer',
        //pointer_opacity_class:'opacity02',
        tPos:{
            startPos:0,
            endPos:0,
            startTime:0
        }
    },
    // this block appears if the submenu aims the scroll
	menu_wrapper_class:'menu_wrapper',
	showMenu:function(dur,menu_manager){
		//console.group('%cshowMenu()','font-weight:bold');
		if(dur===true) dur=this.dur;
		var container_id=$(menu_manager).attr(this.pointer);
		this.menu_container_id='#'+container_id;
		$(this.menu_container_id).show(dur);
		/*  console.log('show menu_container_id: %c'+menus.menu_container_id,'color:green');
            console.groupEnd(); */
	},
	hideMenu:function(){
		/*  console.group('%chideMenu()','font-weight:bold');
            console.log('before Timeout:\nlast_container_id = %c'+menus.menu_container_id,'color:blue'); */
		var last_container_id=menus.menu_container_id;
		var last_pointer_state=menus.pointer_active;
		setTimeout( function(){
			/*console.log(
'after Timeout:\nmenu_active_container_id = '+menus.menu_active_container_id+
'\nto hide: menu_container_id = '+menus.menu_container_id+
'\nlast_container_id = %c'+last_container_id,'color:orange');*/
			// if we got a new menu active, hide previous one:
			if( last_container_id
				&& menus.menu_container_id
				&& last_container_id != menus.menu_container_id
			  ){
				//console.log('hide %clast_container_id','font-weight:bold, color:blue');
				$(last_container_id).hide(menus.dur);
			}else if(!menus.menu_active_container_id && !last_pointer_state){ // hide current
				//console.log('hide %cmenu_container_id','font-weight:bold,color:brown');
				$(menus.menu_container_id).hide(menus.dur);
			}
		},300);
		//console.groupEnd();
	}
};