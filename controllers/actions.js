/**
 * Change it, Dude!
 */
function changePassword(form){
    //form.submit();
    //Scene.enterAccount();
    if(!form) {
        var current_password=$('#'+Scene.active_screen.Form.current_password.name);
        if(!$(current_password).val()){
            createInvalidityMess(Scene.active_screen.Form.current_password.name,$(current_password).next(),'Please, input your current password')
            return false;
        }
    }
    alert('Go ahead and change your password, dude!');    
}
/* switch to another screen*/
function goAnotherScreen(screen_id){ //alert('goAnotherScreen(), screen_id = '+screen_id);
	Scene.appendUserBlock(screen_id);
} 
/**
 * TODO: Btw, where is the screen to see results of changes?
 */
function saveProfileChanges(form){
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
            screen_prev_id='my_profile_login';
            break;            
        case 'my_profile_change_password_form':
            screen_prev_id='my_profile_login';
            break;
    }
    Scene.appendUserBlock(screen_prev_id);
}
/**
 * Hide all User screens. Go play!
 */
function switchToPlay(){
    Scene.enterAccount();
    return false;
}
/**
 * switch levels
 */
function manageLevels(level,sublevel) {
    $('[data-level]').hide(); console.log('manageLevels: '+level+', '+sublevel);
    var tLevel = $('[data-level="'+level+'"]');
    $(tLevel).fadeIn(200);
    var bgImg;
    //debugger;
    if(level=='game') {
        bgImg = true;
        $('[data-level="money"]').hide('');
        if($(tLevel).is(':hidden'))
            $(tLevel).fadeIn(300);
    }else{
        $('[data-level="money"]').html(''); // because will load content
        $(tLevel).load('contents/sublevels/'+sublevel+'.html',function(){
            //console.log('load: contents/sublevels/'+sublevel+'.html');
            $('[data-block]').click(function(){
                $('.pay_way').text($(this).text());
                $('section.content',tLevel).attr('data-level-content',$(this).attr('data-block'));
                 $(Scene.user_container_class).hide(100);
                /*console.group('%cmanageWithdraw()','font-weight:bold');
                    console.log('file_name: %c'+$(obj).attr('data-block'),'color:blue');
                console.groupEnd();*/
                // see data-block above as links attribute
                Scene.appendUserMoneyBlock($(this).attr('data-block'));
                Levels.setCorrection($('[data-level="money"]'));
            });
            
            // TEST MODE:
            var test = true;
            if(test){
                var bgpic;
                $('[data-block]').on('click',function(){
                    switch ($(this).attr('data-block')) {
                        case 'deposit_visa':case 'deposit_visas':case 'deposit_all_cards':
                            bgpic='credit_card';
                            break;
                        case 'deposit_skrill':
                            bgpic='skrill';
                            break;
                        case 'deposit_neteller':
                            bgpic='Neteller';
                            break;
                        case 'deposit_entropay':
                            bgpic='';
                            break;
                        case 'deposit_ukash':
                            bgpic='ukash';
                            break;
                        case 'deposit_paysafecard':
                            bgpic='Paysafe';
                            break;
                    }
                    $('#bg_substrate').css({
                        background:'url(sources/substrates/AccountMoney/'+bgpic+'.png)'     
                    });
                    console.log('bgpic = '+bgpic); 
                /*
                */
                });
                
                var bgImg = $('<div/>',{
                    id:'bg_substrate'
                }).css({
                    opacity: 0.6,
                    position:'absolute',
                    top:0,
                    right:0,
                    bottom:0,
                    left:0
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
    var new_connection =$('<script/>',{
       src:path+'.js' 
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
    Levels.correction_param=true;
    Scene.appendUserBlock(block_name,false);
    return false;
}