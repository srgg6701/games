// JavaScript Document
$(function(){  
	var d=document;
	var gameContainer=d.getElementById('wrapper');	
	// определяет реальное соотношение между максимальным и текущим размером окна, напр. 813/1024. При этом расчёт производится на основании соотношений сторон экрана.
	// Если оно более 1024/768 (параметры фоновой картинки для блока),
	// его высота устанавливается в 100% и измеряется реальная ширина,
	// иначе, наоборот, выставляется максимальная ширина и измеряется высота.
	// текущий масштаб:
	var scale;
	var setScreenParams = function(){
		var scaleRatio;
		// wide, height = 100%
		if((d.body.clientWidth/
			d.body.clientHeight)>=1.33333333333333){ // 
			scaleRatio=screen.height/768;
			scale=screen.height/d.body.offsetHeight;
		}else{	
			scaleRatio=screen.width/1024;
			scale=screen.width/d.body.offsetWidth;
		}
		
		Scale=1/scale*scaleRatio;
		
		if(scale!==1) {
			$(gameContainer).css({
				transform:'scale('+Scale+','+Scale+')',
				marginLeft:function(){
					return (d.body.offsetWidth-1024*Scale)/2+'px';
				}
			});
		}
		if(navigator.userAgent.indexOf('MSIE')!==-1){
			var xLeft=(d.body.offsetWidth-gameContainer.offsetWidth)/2;
			gameContainer.style.marginLeft=xLeft+'px';
			var hDiff=d.body.offsetHeight-768;
			if(hDiff) gameContainer.style.top=hDiff/2+'px';
		} 
	}
	setScreenParams();
	window.onresize=function(){
		if(screen.width>=800) setScreenParams();
	} 
	/**
	 * How it works.
	 	see dd_menu.xlsx
	 */
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
	// set target menu and show it
	$('['+menus.pointer+']').mouseenter(function(){
		// str 90
		//console.log('%cstr 90: pointer.%cmouseenter %s','font-weight:bold','color:blue','pointer ACTIVE');
		menus.pointer_active=true;
		menus.showMenu(true,this); 
	}).mouseleave(function(){ // get target menu and hide it
		// str 94
		//console.log('%cstr 94: pointer.%cmouseleave %s','font-weight:bold','color:orange','pointer actve FALSE');
		menus.pointer_active=false;
		menus.hideMenu();
	});
	// set menu mark as active
	$(menus.menu_container_class) // .menu_container
		.mouseenter(function(){
			// str 101
			//console.log('%cstr 101','font-weight:bold');
			//console.log('menu_active_container_id = %c'+menus.menu_active_container_id,'color:violet');
			menus.menu_active_container_id=this.id;
	});
	// hide submenu
	// when mouse leave menu in drops its mark as active; however, remember 
	// that we can simultaneously enter to the menu on next/previous level.
	// In that moment we set menu_active_container_id again! See code above.
	$(menus.menu_container_class+' > menu').mouseleave(function(){		
		// str 111
		//console.log('%cstr 111','font-weight:bold')
		//console.log('menu_active_container_id = %cfalse','color:red');
		menus.menu_active_container_id=false;
		menus.hideMenu();
	});
	// show submenu
	$('li:has(menu)').mouseenter(function(){
		// str 119
		//console.log('%cstr 119','font-weight:bold');		
		//console.log('show '+menus.menu_wrapper_class);
		if($(this).parent('menu').attr('data-slow-children'))
			$('menu',this).show(200,function(){
				$(menus.menu_wrapper_class,this).show(200)
			});
		else{
			$('menu',this).show(0);
			$(menus.menu_wrapper_class,this).show(0);
		}
	}).mouseleave(function(){ // hide submenu
		// str 130
		//console.group('%cstr 130','font-weight:bold');
			//console.log('hide '+menus.menu_wrapper_class);
			//console.log('hide menu');
		//console.groupEnd();		
		$(menus.menu_wrapper_class,this).hide();
		$('menu',this).hide(200);
	});
	// scroll
	$('div'+menus.menu_wrapper_class+' >div:first-child').click(function(){
		scrollMenuItems(this,'up');
	});
	$('div'+menus.menu_wrapper_class+' >div:last-child').click(function(){
		scrollMenuItems(this,'down');
	});
});
function scrollMenuItems(obj,direction){
	var itemsBlock=$(obj)[(direction=='up')? 'next':'prev']('div');
	var menu = $('>menu',itemsBlock);
	var topMargin=parseFloat($(menu).css('margin-top'));
	var menuHeight=parseFloat($(menu).height());
	var singleItemHeight=menuHeight/$('li',menu).size();
	var scrollLimit=parseFloat($(itemsBlock).innerHeight()-menuHeight);
	console.group('%cscrollMenuItems','font-weight:bold');
	if(direction=='up') {// 640-590=50 //scrollLimit 
		// -313.313 : -301.312555px : margin-top: -315.31256103515625 
		// 0 + 14	>		-301
		if(topMargin-singleItemHeight/4>scrollLimit)  
			$(menu).css('margin-top',topMargin-singleItemHeight/3+'px');
	}else if(direction=='down'){
		if(topMargin<-(singleItemHeight/3)) // 43
			$(menu).css('margin-top',topMargin+singleItemHeight/3+'px');
	}
	//console.log('menu height: '+menuHeight);
	//console.log('singleItemHeight: '+singleItemHeight);
	//console.log('scrollLimit: %c'+scrollLimit,'color:violet');
	//console.log('margin-top: %c'+topMargin,'color:green');
	//console.groupEnd();
}