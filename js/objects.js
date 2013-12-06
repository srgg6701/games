// our little Game Universe :) starts here.
var Levels = {
    // the frontier. 
	// Outside it the outer hostile world lies.
	// All we want to know and do existst only within the wrapperContainer 
	// it will take an id "wrapper" further
	wrapperContainer:null,
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
var Game={
	shade_id:'global_shade',
	// user's blocks class name
	user_container_class:'user_profile',
	// user's blocks
	myProfile:{
		data:{
			// 'my_profile_data'
		},
		form:{
			// 'my_profile_form'
		},
		pass:{
			// 'my_profile_change_password_form'
		},
		login:{
			// 'my_profile_login'
		},
		demo:{
			// 'my_profile_open_demo_account'
		},
		real_money_account:{
			// 'my_profile_real_money_account'
			//	 'my_profile_real_money_account1'
			//	 'my_profile_real_money_account2'
		}
	},/**/
	// get the certain user's block, 
	// append it to the main wrapper window and make it visible
	appendUserBlock:function(entity_id){
		if(entity_id.indexOf('my_profile_real_money_account')!=-1){
			// because this is a container for both my_profile_real_money_account1 and my_profile_real_money_account2
			var incomingEntityId=entity_id;
			entity_id='my_profile_real_money_account';
		} //console.group('%cmanageMyProfile()','font-weight:bold;');		
		$('.'+Game.user_container_class).remove();
		// see files in the dir /contents/
		var file_contents='contents/'+entity_id+'.html';
        /*
			//console.log('file_contents: %c'+file_contents,'color:blue;');
			//console.log('entity_id: %c'+entity_id,'color:goldenrod;');
			//console.log('class: %c'+Game.user_container_class,'font-weight:bold;');*/
		// create a block for the loaded file
		var userBlock=$('<div/>',{
			id:entity_id,
			class:Game.user_container_class
		});
		// append the block to the wrapper
		$('#'+Game.shade_id).before(userBlock);
		// load the file from /contents/ dir
		$(userBlock).load(file_contents,function(){
			// Be ready to load all contents!
			var commonPath='contents/components/';
			
			// go through elements which must load elements from templates
			var handleBlocks=function(){
				$('[data-load]').each( function(index, element) {
					// get file_name to load a certain element's content, 
					// element id, 
					// element value
					var data2load=$(element).attr('data-load').split('|');
					// load file and its element by id
					// input.html or person.html
					// #element_id
					var element_jid='#'+data2load[1];
					// for example: load contents/components/input.html #mobile_phone
					$(element).load(commonPath+data2load[0]+'.html '+element_jid, 
						function(){
							if(data2load[2]){
								switch($(element_jid).attr('type')){
									case 'submit':
									case 'text':
									case 'password':
									case 'email':
									case 'number':
									case 'search':
									case 'tel':
										$(element_jid).val(data2load[2]);
									break;
									case 'checkbox':
									case 'radio':
										$(element_jid).after(data2load[2]);
									break;
									// not in use yet:
									case 'button':
										$(element_jid).append(data2load[2]);
									break;
								}
							}
					});
				});
			};
			/*
			// Warning!
					// Don't mix the files:
					// * my_profile_real_money_account.html - commont content for both steps 1 and 2
					// * my_profile_real_money_account1.html - step 1 content
					// * my_profile_real_money_account2.html - step 2 content */
			if(entity_id=='my_profile_real_money_account'){
				//console.log('file to load: contents/'+incomingEntityId+'.html');
				// load the my_profile_real_money_account1 or my_profile_real_money_account2 content
				$('#account_real_money_inner_content').load('contents/'+incomingEntityId+'.html', function(){
					handleBlocks();
					var btn_text=(incomingEntityId=='my_profile_real_money_account1')? 
						'NEXT' : 'REGISTER NOW!';
					$('#btn_real_money_account').text(btn_text);
				});
			}else
				handleBlocks();
			// assign styles for the loaded content
			$('#'+entity_id).css({
				top: Game.arrangeWindow(entity_id,'outerHeight'),
				left: Game.arrangeWindow(entity_id,'outerWidth')
			}).fadeIn(300);
		});
		//console.dir('userBlock: '+userBlock);
		//console.groupEnd();
	},
    appendUserMoneyBlock:function(entity_id){
        // all contents already deleted
        var loaded_component_class_name='loaded_component';
        $('.'+loaded_component_class_name).remove();
        var userBlock=$('<div/>',{
			id:entity_id,
            class:loaded_component_class_name
		});
		// append the block to the wrapper
		$('.pay_way').after(userBlock);
        console.dir(userBlock);
        $(userBlock).load('contents/'+entity_id+'.html',function(){
            $('[data-load]').each( function(index, element){
                var component_id = $(element).attr('data-load');
                console.dir('component_id = '+component_id,element);  
                $(element).load('contents/components/money.html #section_'+component_id);
            });
        });
        $('section.content [type="submit"]').css('visibility','visible').show();
    },
	// calculate actual positions (top and left) of the target user's block
	arrangeWindow:function(entity_id,func){
		var wrapperOffset=$(Levels.wrapperContainer)[func]();
		var blockOffset=$('#'+entity_id)[func]();
		var currentOffset=(wrapperOffset-blockOffset)/2;
		/*console.group('%carrangeWindow()','font-weight:bold');
			console.log('function: '+func);
			console.log('entity_id: '+entity_id);
			console.log('wrapperContainer.'+func+' = '+wrapperOffset);
			console.log(entity_id+'.'+func+' = '+blockOffset);
			console.log('currentOffset: ('+wrapperOffset+'-'+blockOffset+')/2 = %c'+currentOffset,'color:violet');
		console.groupEnd();*/
		
		return currentOffset+'px';
	},
	// the initial appearance of users' blocks
	showMyProfile:function(){
		// in test mode: -------------------------------
		$('#test_inner_submenu').fadeIn(500);
		// end test mode: -------------------------------
		$(Levels.wrapperContainer).prepend('<div id="'+this.shade_id+'" class="shade cover"></div>');	
		// show current user block
		//console.log('%cshowMyProfile()','background-color:orange; padding:4px 6px;')
		this.appendUserBlock('my_profile_form');
		return false;
	},
	hideMyProfile:function(){
		//console.log('hideMyProfile()');
		$('#'+this.shade_id).fadeOut(300,function (){$(this).remove()});
		$('.'+this.user_container_class+':visible').fadeOut(300);
		// in test mode: -------------------------------
		$('#test_inner_submenu').fadeOut(500);
		// end test mode: ------------------------------
		return false;
	},
	goLeft:function(){
	
	}
};
var menus={
	dur:100,
	// the initializer to show menu
	pointer:'data-container_id',
	pointer_active:false,
	// container id that has a menu
	// we get it when mouse enters in the pointer
	menu_container_id: false,
	// the same container id that has a menu
	// but here we get it when mouse enters in the <menu> wrapper
	menu_active_container_id:false,
	// top menu container
	menu_container_class:'.menu_container',
	// this block appears if the submenu aims the scroll
	menu_wrapper_class:'.menu_wrapper',
	showMenu:function(dur,menu_manager){
		//console.group('%cshowMenu()','font-weight:bold');
		if(dur===true) dur=this.dur;
		var container_id=$(menu_manager).attr(this.pointer);
		this.menu_container_id='#'+container_id;
		$(this.menu_container_id).show(dur);
		//console.log('show menu_container_id: %c'+menus.menu_container_id,'color:green');
		//console.groupEnd();
	},
	hideMenu:function(){
		//console.group('%chideMenu()','font-weight:bold');
		//console.log('before Timeout:\nlast_container_id = %c'+menus.menu_container_id,'color:blue');
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

