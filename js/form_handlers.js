/**
 * Comment
 */
function removeFlag(flag) {
    $(flag).removeClass('delete').removeClass('ok');
}
/*
 * some fields allow only one space in place, for example - tel
 * @returns bool
 */
function removeDoubleSpaces(input){
	var str=input.value;
	if(input.type=="tel"||input.id.indexOf("_phone")!=-1) {
		//console.log("double spaces are found...");
		input.value=str.replace(/\s{2}/g," "); 
	}
    return true;
}
/*
 * Set invalid icon
 * @return boolean
 */
function setValidityIcon(input,defaultValue) {
    var dNext =$(input).next(); 
    //console.groupCollapsed('%csetValidityIcon','font-weight: bold');
        //var nDate = new Date();
        //var nTime = nDate.getHours()+' : '+nDate.getMinutes()+' : '+nDate.getSeconds();
        //console.log('time: '+nTime);
        //console.log('%cinput','text-decoration:underline'); 
        //console.dir(input);/**/
    if($(dNext).hasClass('flag')) { //console.log('validity: %c'+input.validity.valid, 'color:brown');
        //console.log('flag is set');
        // set default flag
        removeFlag(dNext);
        var objInForm = Scene.active_screen.Form[input.id];
        $(input).removeAttr('title');                 
        var fieldMess = objInForm.message;
        if( input.id==Scene.active_screen.Form.retype_password.name
            && $(input).val()!=$('#password').val()
          ){    //console.log('re-type_password.value = '+input.value+', password.value = '+$('#password').val());
            $(dNext).addClass('delete').attr('title',fieldMess);
            return false;
        }        
        var title,pMisMatch,vStat=input.validity;
        //var exclProp = 'customError';
        for(var pr in vStat){
            //console.log(pr+' : '+vStat[pr]);
            //if(pr=='valid') console.log('%c'+vStat[pr], 'background-color:violet');
            if( ( pr!='valid' && pr!='customError' && vStat[pr]==true )
                  || ( pr=='patternMismatch'&&!$(input).attr('required') )
              ){
                //console.log('WITHIN CONDITION'); console.log('req? - '+$(input).attr('required'));
                if(!$(input).attr('required')){ //console.log('%c! required', 'color:blue');
                    // remove pattern
                    if(!$(input).val()||$(input).val()==defaultValue){
                        $(input).removeAttr('pattern'); //console.log('remove pattern');
                    }else{ // set pattern
                        $(input).attr('pattern', objInForm.pattern); 
                        pMisMatch=input.validity.patternMismatch;
                        console.log('patternMismatch: '+input.validity.patternMismatch);
                    }   //console.log('objInForm.pattern = '+objInForm.pattern); console.dir(input);                    
                }
                                       
                if(input.required||pMisMatch){
                    if(!(title=fieldMess))
                        title="Please, fill out this field in the correct format";
                    $(dNext).addClass('delete').attr('title',title); //console.log('input.title = '+fieldMess);
                    //console.log('inputect validity (Error): '+input.checkValidity()); console.dir(input.validity); //console.groupEnd();
                    return false;
                }
            } //console.log(pr+': '+vStat[pr]);
        }
        if(!input.required) input.setCustomValidity("");
        //console.log('inputect validity (OK): '+input.checkValidity()); console.dir(input.validity); //console.groupEnd();
        $(dNext).addClass('ok').removeAttr('title');
        return true;
    }
}
/**
 * returnы false
 */
function showErrorMess(data_type,error_text) {
    var dtType, divFlag = $('.flag.'+data_type);
    //console.log('data-flag = %c'+data_type, 'color:orange'); //console.dir(divFlag);
    if($(divFlag).size()){ 
        $(divFlag).addClass('delete');
        dtType = 'data-flag';
    }else dtType = 'data-warning'; // is set for inputs on Login form, because thre are no containers for flags (no validity)
    
    var warning = $('<div/>',{
        id:'formWarning',
        class:'sys_warning',
        title:'Click to close'
    }).text(error_text);
    var inpContainer = $('['+dtType+'="'+data_type+'"]'); //console.dir(inpContainer);
    $(inpContainer).prepend(warning);
    $(warning).next().on('focus',function(){
        $(warning).fadeOut(4000, function(){
            $(this).remove();
        });
    });
    $('#formWarning').on('click',function(){$(this).remove()});
    return false;
}