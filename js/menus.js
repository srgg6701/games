//
$(function(){
    
    //	First level menus ------------------------------------------
    // set target menu and show it
    $('['+menus.pointer+']').on('mouseenter',function(){
        // str 90
        //console.log('%cstr 90: pointer.%cmouseenter %s','font-weight:bold','color:blue','pointer ACTIVE');
        menus.pointer_active=true;
        menus.showMenu(true,this); 
    }).on('mouseleave', function(){ // get target menu and hide it
        // str 94
        //console.log('%cstr 94: pointer.%cmouseleave %s','font-weight:bold','color:orange','pointer actve FALSE');
        menus.pointer_active=false;
        menus.hideMenu();
    });
    // set menu mark as active
    $('.'+menus.menu_container_class) // .menu_container
        .on('mouseenter', function(){
            // str 101
            /*  console.log('%cstr 101','font-weight:bold');
                console.log('menu_active_container_id = %c'+menus.menu_active_container_id,'color:violet'); */
            menus.menu_active_container_id=this.id;
    }); 
	/*	Submenus ---------------------------------------------------
        hide submenu
        when mouse leave menu in drops its mark as active; however, remember 
        that we can simultaneously enter to the menu on next/previous level.
        In that moment we set menu_active_container_id again! See code above. */
	$('.'+menus.menu_container_class+' > menu').on('mouseleave', function(){		
		// str 111
		/*  console.log('%cstr 111','font-weight:bold')
            console.log('menu_active_container_id = %cfalse','color:red'); */
		menus.menu_active_container_id=false;
		menus.hideMenu();
	});
	// show submenu
	$('li:has(menu)').on('mouseenter', function(){
		// str 119
		/*  console.log('%cstr 119','font-weight:bold');		
            console.log('show '+menus.menu_wrapper_class); */
		if($(this).parent('menu').attr('data-slow-children'))
			$('menu',this).show(200,function(){
				$('.'+menus.menu_wrapper_class,this).show(200)
			});
		else{
			$('menu',this).show(0);
			$('.'+menus.menu_wrapper_class,this).show(0);
		}
        
	}).on('mouseleave', function(){ // hide submenu
		// str 130d
		/*  console.group('%cstr 130','font-weight:bold');
                console.log('hide '+menus.menu_wrapper_class);
                console.log('hide menu');
            console.groupEnd(); */		
		$('.'+menus.menu_wrapper_class,this).hide();
		$('menu',this).hide(200);
	});
    // build submenus 
    $('.'+menus.parent_menu_class + ' menu')// menu.parent menu          
        .each(function(){
        //console.log('%ceach menu','color:brown');
        var submenu_id = this.id;
        var subMenuHtml = '';
        var cnt = 1;
        for(var link in menus.submenus[submenu_id]){
            if(typeof(menus.submenus[submenu_id][link])=='string'){
                subMenuHtml+='<li><a href="'+link+'">' + cnt + '. ' +
                menus.submenus[submenu_id][link] + '</a></li>';
                cnt++;
            }
        }
        // add html to the submenu:
        $(this).html(subMenuHtml);
        // if we get more than 9 menu points, add wrappers to get scroll
        if(cnt>9){
            /*  check the html structure in index.html
                it should look like this:
            <div class="menu_wrapper">
                <div>
                    <div class="menu_pointer special"></div>
                </div>
                <div class="submenu_container">
                    <menu id="instant_games_submenu">
                        <li>
                            <a href="link">Text</a>
                        </li>
                    </menu>
                </div>
                <div>
                    <div class="menu_pointer special"></div>
                </div>
            </div> */ 
            // add outer wrapper to set scrolling
            var menuWrapper = $('<div/>',{
                class: menus.menu_wrapper_class
            }).html('\n');
            
            var pntr='\n<div class="'+menus.scroll.pointer_class+' special"></div>\n';
            // add scroll pointers:
            // top
            var menuPointerBox = $('<div/>',{
                class: menus.scroll.pointer_parent_class.up,
                click:function(){ //console.log('clicked up!');
                    callScrollMenuItems(this,'down');
                }
            }).html(pntr);
            // bottom
            var menuPointerBoxBottom = $('<div/>',{
                class: menus.scroll.pointer_parent_class.down, 
                       //+ ' ' + menus.scroll.pointer_parent_class.opacity_class_down, //'opacity08'
                //title: menus.scroll.pointer_parent_class.down_title,
                click:function(){ //console.log('clicked down!');
                    /*  'this' is the pointer here because this function
                        will be called later by clicking this POINTER    */
                    callScrollMenuItems(this,'up'); 
                }
            }).html(pntr);
            // make the bottom pointer transparent
            $('.'+menus.scroll.pointer_class, // .menu_pointer
                    menuPointerBoxBottom)   // in .scroll down opacity08
                //.addClass(menus.scroll.pointer_opacity_class); //'opacity02'
            menus.activeMenuId = this.id+'_wrapper';
            // add inner sumbmenu wrapper
            var scId = this.id+'_wrapper';
            var submenuContainer = $('<div/>',{
                class: menus.submenu_container_class,
                id: scId,
                click:function(){
                    console.log('Hello, I am the link! You just clicked me!');
                }
            }).html('\n');                        
            
            // movee all contents in the place
            $(this).prev('.'+menus.scroll.pointer_class).after(menuWrapper);
            // build submenu wrapper
            $(menuWrapper).append(menuPointerBox)
                            .append(submenuContainer)
                          .append(menuPointerBoxBottom);
            $(submenuContainer).append(this);
        }else
            $(this).addClass(menus.menu_short_class);        		
    });
    
    $('menu.'+menus.parent_menu_class+' > li').on('click',function(){
        // submenu_container_class = submenu_container
        menus.activeMenuId = $('menu',this).attr('id');
        //console.log('activeMenuId = '+menus.activeMenuId);
    });/**/
    //Enable swiping...
    $('.'+menus.submenu_container_class) // .submenu_container
        .on({            
            // get start finger position
            'touchstart':function(){
                var tcTime = new Date();
                menus.scroll.tPos.startTime = tcTime.getTime();
                $(window).bind('touchstart', function(jQueryEvent) {
                    jQueryEvent.preventDefault();
                    menus.scroll.tPos.startPos = window.event.touches[0].pageY; //console.log('menus.scroll.tPos.startPos = '+tPos.startPos);
                });
            },
            // move it!
            'touchmove':function(){
                menus.touchable=true;
                $(window).unbind('touchstart');
                $(window).bind('touchmove', function(jQueryEvent) {
                    jQueryEvent.preventDefault();
                    menus.scroll.tPos.endPos = window.event.touches[0].pageY; //console.log('tPos.endPos = '+menus.scroll.tPos.endPos);
                });
            },
            // get end finger position and calculate a difference
            'touchend':function(event){
                var tcTime = new Date();
                var deltaTime = tcTime.getTime()-menus.scroll.tPos.startTime;
                menus.scroll.offset = menus.scroll.tPos.startPos-menus.scroll.tPos.endPos;
                var direction = (menus.scroll.offset>0)? 'up':'down';
                $(window).unbind('touchmove');
                if(event.target.tagName=='LI'||event.target.tagName=='A'){
                    var submenuWrapper = $(event.target).parents('.'+menus.submenu_container_class).eq(0);
                    //console.log('direction: '+direction+' deltaTime: '+deltaTime);
                    /*console.log('show event target:'); console.dir(event.target);
                    console.log('show parents:'); console.dir(submenuWrapper);
                    console.log('order: '+menus.scroll.getPointerOrder(direction,true));
                    
                    console.log('actual pointer box:');
                    console.dir($(submenuWrapper)[menus.scroll.getPointerOrder(direction,true)]());*/
                    scrollMenuItems($(submenuWrapper),direction,false);
                }else console.log('no way: '+event.target.tagName);
            }
        });
});

function callScrollMenuItems(pointerBox,direction){
    scrollMenuItems($(pointerBox)[menus.scroll.getPointerOrder(direction)]('div'), direction, pointerBox);
}

function scrollMenuItems(submenuContainer,direction,pointerBox){
    // pass as an argument next or previos block of pointerBox. It will be the submenu container
    menus.scroll.setObjects(submenuContainer,direction); //console.dir(submenuContainer);
    var submenu_container_id = $(submenuContainer).attr('id');
    // get pointer box if didn't pass in
    if(!pointerBox){ 
        pointerBox=$(submenuContainer)[menus.scroll.getPointerOrder(direction,true)]();
        menus.scroll.eventInit = 'touch';
    }else
        menus.scroll.eventInit = 'click';
      /*console.log('submenuContainer:');
      console.dir(submenuContainer);
      console.log('pointerBox:');
      console.dir(pointerBox); */
    // store current pointer box:
    menus.scroll.activeObjx.pointerParentBox[submenu_container_id]=pointerBox;
    /*  menus.scroll.activeObjx.menuTopMargin[submenu_container_id] set above 
        within menus.scroll.setObjects() */
    var submenuTopMargin = menus.scroll.activeObjx.menuTopMargin[submenu_container_id];
    var submenuSingleItemHeight = menus.scroll.activeObjx.singleItemHeight[submenu_container_id];
    var submenuScrollLimit = menus.scroll.activeObjx.scrollLimit[submenu_container_id];
    /*console.groupCollapsed('%cscrollMenuItems()%c, check conditions','font-weight:bold','font-weight:normal;color:blue');
        console.log('direction = '+direction);
        console.log('submenuTopMargin = '+submenuTopMargin);
            if(direction=='up'){
                console.log('- (submenuSingleItemHeight / 4) = | '+(submenuSingleItemHeight / 4));
                console.log('> (?)\nsubmenuScrollLimit = '+submenuScrollLimit);
            }else{
                console.log('< (?)');
                console.log('- (submenuSingleItemHeight / 3) = | '+(submenuSingleItemHeight / 3));
            }
        console.dir(menus.scroll.activeObjx);
    console.groupEnd();*/        
    // check conditions (is there space to scroll?): 
    if( ( direction=='up'   && ( (submenuTopMargin - submenuSingleItemHeight / 4) > submenuScrollLimit ) )
            ||  
        ( direction=='down' && ( submenuTopMargin < -(submenuSingleItemHeight / 4) ) )
      ) {   
        doScroll(direction,submenu_container_id);//,singleItemHeight,menuTopMargin,menu,par
    }else{ // set pointer box passive
        $(menus.scroll.activeObjx.pointerParentBox[submenu_container_id])
            //.addClass(menus.scroll.pointer_parent_class['opacity_class_'+direction]) // opacity08
                //.attr('title',menus.scroll.pointer_parent_class[direction+'_title']); // No more items from down
        // set the pointer passive:
        //managePointerClass('addClass',submenu_container_id,pointerBox);
    } 
}

function doScroll(direction,submenu_container_id){
    //console.log('%cdoScroll()%s','color:violet;font-weight:bold',', submenu_container_id = '+submenu_container_id);
    var el_turn,opacity_direction;
    // get current submenu top margin
    var submenuTopMargin = menus.scroll.activeObjx.menuTopMargin[submenu_container_id];
    //console.groupCollapsed('%cgoScroll() test','font-weight:bold');
    var touch = (menus.scroll.eventInit=='touch')? true:false;
    var limitToScroll = menus.scroll.activeObjx.scrollLimit[submenu_container_id];
    if(touch){    
        var goOffset;
        var scrollLimit = limitToScroll;       
        /*  console.log('submenuTopMargin before: %c'+submenuTopMargin,'background-color:orange; padding:2px 4px;');        
            console.log('scrollLimit: %c'+scrollLimit,'color:green');
            console.log('Current offset due to scroll\nmenus.scroll.offset: %c'+menus.scroll.offset,'color:green'); */
    }else{
       var minOffset = menus.scroll.activeObjx.singleItemHeight[submenu_container_id]/3;
    } 
    //
    if(direction=='up') {
        el_turn = 'last';
        opacity_direction='down';
        if(touch){
            //console.log('%cTOUCHABLE!','background-color:yellow;padding:4px 6px;');
            // -300    += - (-175)    = -125
            scrollLimit+=-(submenuTopMargin);  // - += -(-)
            /*                  272    -25
                menus.scroll.offset > -scrollLimit) */
            goOffset=menus.scroll.offset;
            if(goOffset>-(scrollLimit)+40) goOffset=-(scrollLimit)+40;
            /*  console.log('Current offset limit\nscrollLimit corrected = %c'+scrollLimit,'color:lime'); 
                console.log('goOffset = %c'+goOffset,'color:orange'); */
            submenuTopMargin-=goOffset; // -50
        }else
            submenuTopMargin-=minOffset;
    }else{
        el_turn = 'first';
        opacity_direction='up';
        if(touch){
            //console.log('%cTOUCHABLE!','background-color:yellow;padding:4px 6px;');
            //    0    -  -175    = 175
            scrollLimit=-submenuTopMargin;  // - -= -
            /*              273    -25
            menus.scroll.offset > -scrollLimit*/
            goOffset=-menus.scroll.offset;
            if(goOffset>(scrollLimit+40)) goOffset=scrollLimit+40;
            /*  console.log('scrollLimit = %c'+scrollLimit,'color:lime'); 
                console.log('goOffset = %c'+goOffset,'color:orange'); */
            // -50 += -40
            submenuTopMargin+=goOffset; //50                 
        }else
            submenuTopMargin+=minOffset;
    }
    
    //console.log('submenuTopMargin after: %c'+submenuTopMargin,'color:green');
    
    // move submenu content:
    var tSubmenu = menus.scroll.activeObjx.menu[submenu_container_id];
    $(tSubmenu).css('margin-top',submenuTopMargin+'px');
    // add smooth
    if(touch){
        var smoothOffset = goOffset/3;
        (direction=='up')? 
            submenuTopMargin-=smoothOffset : submenuTopMargin+=smoothOffset;
        $(tSubmenu).animate({'margin-top':submenuTopMargin},300)
    }
    //console.log('check overlimitations.\nsubmenuTopMargin = '+submenuTopMargin+'\nlimitToScroll = '+limitToScroll);
    // correct submenu position:
    if(direction=='up'){
        if(submenuTopMargin<limitToScroll)
            $(tSubmenu).animate({'margin-top':limitToScroll},300);
    }else if(submenuTopMargin>0)
        $(tSubmenu).animate({'margin-top':0},300);
    
    /*var manage_pointers = false;
    if (manage_pointers) {
        // remove opacity class and title from pointer box
        $(menus.scroll.oppositePointer)
                .removeClass(menus.scroll.pointer_parent_class['opacity_class_'+opacity_direction])
                    .removeAttr('title');
        console.groupCollapsed('%cSet pointer box active:','font-weight:bold');
            console.log('%cPointer box:','font-weight:bold');
            console.dir(menus.scroll.activeObjx.pointerParentBox[submenu_container_id]);
            console.log('Remove className: %c'+menus.scroll.pointer_parent_class['opacity_class_'+opacity_direction],'font-weight:bold');        
        console.groupEnd();
        managePointerClass('removeClass',submenu_container_id);
        //console.groupEnd();
    }*/
}

/*function managePointerClass(func,submenu_container_id,currentPointerBox){
    console.group('%cmanagePointerClass()','font-weight:bold');
        console.log('func: %c'+func,'color:red');
        //console.log('order: %c'+order,'color:navy');
        console.log('submenu_container_id = %c'+submenu_container_id,'color:orange');
        console.log('className to remove: %c'+menus.scroll.pointer_opacity_class,'color:brown');
        console.log('%csubmenu container:','font-weight:bold');
            console.dir($(menus.submenu_containers[submenu_container_id]));
        console.log('%csubmenu container block (should be a pointer box):','font-weight:bold');
            console.dir($(menus.scroll.oppositePointer));
        console.log('%cpointer (next/prev)$(menus.submenu_containers[submenu_container_id])[order] for submenu container:','font-weight:bold');
            console.dir($('>div',$(menus.scroll.oppositePointer)));
    console.groupEnd();
    var pointerBox = (currentPointerBox)? 
            currentPointerBox : $(menus.scroll.oppositePointer);
    $('>div',pointerBox)[func](menus.scroll.pointer_opacity_class);
}*/