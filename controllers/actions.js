/**
 * Change it, Dude!
 */
function changePassword(form) {
    //form.submit();
    //Scene.enterAccount();
    if (!form) {
        var current_password = $('#' + Scene.active_screen.Form.current_password.id);
        if (!$(current_password).val()) {
            createInvalidityMess(Scene.active_screen.Form.current_password.id, $(current_password).next(), 'Please, input your current password')
            return false;
        }
    }
    alert('Go ahead and change your password, dude!');
}
/* switch to another screen*/
function goAnotherScreen(screen_id) { //alert('goAnotherScreen(), screen_id = '+screen_id);
    Scene.appendUserBlock(screen_id);
}
/**
 * TODO: Btw, where is the screen to see results of changes?
 */
function saveProfileChanges(form) {
    form.submit();
    //Scene.enterAccount();
    return false;
}
/**
 * Comment
 */
function switch_to_prev_screen() {
    var screen_prev_id;
    switch (Scene.active_screen.screen_id) {
        case 'my_profile_open_demo_account':
        case 'my_profile_real_money_account':
            screen_prev_id = 'my_profile_login';
            break;
        case 'my_profile_change_password_form':
            screen_prev_id = 'my_profile_login';
            break;
    }
    Scene.appendUserBlock(screen_prev_id);
}
/**
 * Hide all User screens. Go play!
 */
function switchToPlay() {
    Scene.enterAccount();
    return false;
}
/**
 * Load an appropriate section by clicking the left menu or by default
 * Assign active menu's appearance
 */
function loadMoneySection(level,tLevel,activeMenu){
    $('.pay_way').text($(activeMenu).attr('data-header') || $(activeMenu).text());
    // remove active class from all menus for sure
    $('['+Levels.Menus[level].dataAttr+']').removeClass(Levels.Menus.activeMenuClassName);
    // set as active current menu 
    $(activeMenu).addClass(Levels.Menus.activeMenuClassName);
    // the clicked menu's attribute
    var clickedMenuDataBlockAttr=$(activeMenu).attr(Levels.Menus[level].dataAttr);
    $('section.content', tLevel).attr('data-level-content', clickedMenuDataBlockAttr);
    $(Scene.user_container_class).hide(100);
    /*console.group('%cmanageWithdraw()','font-weight:bold');
     console.log('file_name: %c'+$(obj).attr('data-block'),'color:blue');
     console.groupEnd();*/
    // see data-block above as links attribute
    Scene.appendUserMoneyBlock(clickedMenuDataBlockAttr);
    Levels.setCorrection($('[data-level="'+level+'"]'));
}

/**
 * switch levels
 */
function manageLevels(  level,
                        sublevel,       // deposit[.html], withdrawal[.html]
                        default_section // if initial loading is happened
                     ) {
    var dataLevel = 'data-level';
    $('['+dataLevel+']').hide(); //console.log('manageLevels: '+level+', '+sublevel);
    var tLevel = $('['+dataLevel+'="' + level + '"]');
    var levelGame = 'game', 
        levelMoney = 'money';
    var lMoney = '['+dataLevel+'="'+levelMoney+'"]';
    $(tLevel).fadeIn(200);
    var bgImg;
    //debugger;
    if (level == levelGame) {
        bgImg = true;
        $(lMoney).hide('');
        if ($(tLevel).is(':hidden'))
            $(tLevel).fadeIn(300);
    } else {
        var dataBlock = Levels.Menus[level].dataAttr;
        $(lMoney).html(''); // because will load content
        $(tLevel).load('contents/sublevels/' + sublevel + '.html', function() {
            //console.log('load: contents/sublevels/'+sublevel+'.html');
            $('['+dataBlock+']').on('click', function() {
                loadMoneySection(level,tLevel,this);
            });
            // load default section:
            if(default_section){ 
                /*  ATTENTION! 
                    Don't call here loadMoneySection() directly, use -trigger-.
                    Otherwise there are problems with CSS-synchronization!   */
                $('['+dataBlock+'="'+Levels.defaultSections[levelMoney][sublevel]+'"]')
                    .trigger('click');
            }
            // load common components
            var common_component_path = 'contents/components/'+levelMoney+'.html';
            var innerElemAttrName = 'data-common'; //console.log('elements size: '+$('['+innerElemAttrName+']', this).size());
            $('[' + innerElemAttrName + ']', this)
                .each(function(index, element) {
                    $(element)
                        .load(common_component_path + ' #' + $(element).attr(innerElemAttrName),
                            function() {
                                $('#common_content', tLevel).append(element); //console.dir(element);
                            });
                });/**/
            // TEST MODE to see temporary substrates:
            var test = false;
            if (test) {
                var bgpic;
                $('['+dataBlock+']').on('click', function() {
                    switch ($(this).attr(dataBlock)) {
                        case 'deposit_visa':
                        case 'deposit_visas':
                        case 'deposit_all_cards':
                            bgpic = 'credit_card';
                            break;
                        case 'deposit_skrill':
                            bgpic = 'skrill';
                            break;
                        case 'deposit_neteller':
                            bgpic = 'Neteller';
                            break;
                        case 'deposit_entropay':
                            bgpic = '';
                            break;
                        case 'deposit_ukash':
                            bgpic = 'ukash';
                            break;
                        case 'deposit_paysafecard':
                            bgpic = 'Paysafe';
                            break;
                        case 'withdraw_bank':
                            bgpic = 'bank';
                            break;
                        case 'withdraw_visa':
                            bgpic = 'visa2';
                            break;
                        case 'withdraw_skrill':
                            bgpic = 'skrill2';
                            break;
                    }
                    if (bgpic)
                        $('#bg_substrate').css({
                            background: 'url(sources/substrates/AccountMoney/' + bgpic + '.png)'
                        }); //console.log('bgpic = '+bgpic); 
                });

                var bgImg = $('<div/>', {
                    id: 'bg_substrate'
                }).css({
                    opacity: 0.6,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                });
                $(this).prepend(bgImg);
            }
        });
        bgImg = false;
    }
    Levels.setBgImage(bgImg);
    //console.log('switch the level '+level);
}
/**
 * Make a dynamic connection to the certain js-file
 */
function makeConnection(path) {
    var new_connection = $('<script/>', {
        src: path + '.js'
    }); // console.dir(new_connection);
    $('head').append(new_connection);
}
/**
 * Open block
 */
function openWindow(block_name) { // money_client_card_holder
    console.log('openWindow');
    Scene.obscureWindow(); // set shadow
    /*  correct window position - calculate it with correction by the given left 
     menu panel width */
    Levels.correction_param = true;
    Scene.appendUserBlock(block_name, false);
    return false;
}