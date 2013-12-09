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
    $(menus.menu_container_class) // .menu_container
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
	$(menus.menu_container_class+' > menu').on('mouseleave', function(){		
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
    $('menu.parent menu').each(function(){
        //console.log('%ceach menu','color:brown');
        var submenu_id = this.id;
        var subMenuHtml = '';
        var cnt = 1;
        for(var link in menus.submenus[submenu_id]){
            if(typeof(menus.submenus[submenu_id][link])=='string'){
                subMenuHtml+='<li><a href="'+link+'">' +
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
            
            var pntr='\n<div class="menu_pointer special"></div>\n';
            // add scroll pointers:
            // top
            var menuPointerSpecial = $('<div/>',{
                class:'scroll up',
                click:function(){
                    //console.log('clicked up!');
                    scrollMenuItems(this,'up');
                }
            }).html(pntr);
            // bottom
            var menuPointerSpecialBottom = $('<div/>',{
                class:'scroll down',
                click:function(){
                    //console.log('clicked down!');
                    scrollMenuItems(this,'down');
                }
            }).html(pntr);
            // add inner sumbmenu wrapper
            var submenuContainer = $('<div/>',{
                class:'submenu_container'
            }).html('\n');
            // movee all contents in the place
            $(this).prev('.menu_pointer').after(menuWrapper);
            // build submenu wrapper
            $(menuWrapper).append(menuPointerSpecial)
                            .append(submenuContainer)
                          .append(menuPointerSpecialBottom);
            $(submenuContainer).append(this);
        }else
            $(this).addClass('short');
    });
});