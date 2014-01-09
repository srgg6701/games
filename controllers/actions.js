/**
 * Change it, Dude!
 */
function changePassword(form){
    form.submit();
    //Scene.enterAccount();
    return false;
}
/* switch to another screen*/
function goAnotherScreen(screen_id){
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
    $('[data-level]').hide(); //console.log('manageLevels: '+level+', '+sublevel);
    var tLevel = $('[data-level="'+level+'"]');
    $(tLevel).fadeIn(200);
    var bgImg;
    if(level=='game') bgImg = true;
    else{
        $('[data-level="money"]').html(' ');
        $(tLevel).load('contents/sublevels/'+sublevel+'.html',function(){
            //console.log('load: contents/sublevels/'+sublevel+'.html');
            $('[data-block]').click(function(){
                $('.pay_way').text($(this).text());
                $(Scene.user_container_class).hide(100);
                /*console.group('%cmanageWithdraw()','font-weight:bold');
                    console.log('file_name: %c'+$(obj).attr('data-block'),'color:blue');
                console.groupEnd();*/
                // see data-block above as links attribute
                Scene.appendUserMoneyBlock($(this).attr('data-block'));
                Levels.setCorrection($('[data-level="money"]'));
            });
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