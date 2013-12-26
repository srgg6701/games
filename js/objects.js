// our little Scene Universe :) starts here.
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
        //user_form:null,
        Form:{
            name:'user-form',
            pass_diff:false,
            retype_password_id:'retype_password',
            messages:{
                pass_are_diff:'The passwords are different'
            }
        },/**
         * Handle invisible due to design purposes checkbox
         */
        checkInvisibleBox: function(chbox) { // label[data-box]
            $(chbox).parent('label')[(chbox.checked==true)? 'addClass':'removeClass']('checked');      
        },        
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
        this.active_screen.screen_id=entity_id; console.log('screen_id = '+this.active_screen.screen_id);
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
                    //
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
                                            $(Elem).val(data2load[2]);
                                        break;
                                        case 'checkbox':
                                        case 'radio':

                                        break;
                                        // not in use yet:
                                        case 'button':
                                            $(Elem).append(data2load[2]);
                                        break;
                                        default:
                                            // checkbox, radio, label
                                            $(Elem).after(data2load[2]);
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
	// the initial appearance of users' blocks
	showUserProfile:function(){
		// show current user block
		//console.log('%cshowUserProfile()','background-color:orange; padding:4px 6px;')
		// in test mode: -------------------------------
		$('#test_inner_submenu').fadeIn(500);
		// end test mode: -------------------------------
        // build screen
        this.appendUserBlock(this.user_container_id_default);
	},
    // Enter into account. All the user's data currently is stored in the User object
    enterAccount:function(){ // 'demo' or 'money'
        console.log('screen_id = '+this.active_screen.screen_id);
        // remove screen
        $('#'+this.active_screen.screen_id).remove();
        // wash shadow away
        this.removeShading();
    },
	hideMyProfile:function(){
        if(window.opener) {
            if(confirm("Do you really wish to leave The Game?"))
                window.self.close();
        }else
            $('.'+this.user_container_class+':visible').fadeOut(300);        
		//console.log('hideMyProfile()');
		/*$('#'+this.shade_id).fadeOut(300,function (){$(this).remove()});
		$('.'+this.user_container_class+':visible').fadeOut(300);
		// in test mode: -------------------------------
		$('#test_inner_submenu').fadeOut(500);
		// end test mode: ------------------------------
		return false;*/
	},
	goLeft:function(){
	
	}
};
var User = {
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

