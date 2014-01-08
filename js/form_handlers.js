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
function setValidityIcon(obj) {
    var dNext =$(obj).next(); 
    /*console.groupCollapsed('%csetValidityIcon','font-weight: bold');
        console.log('%cobj','text-decoration:underline'); 
        console.dir(obj);
        console.log('object validity: '+obj.checkValidity());
        console.log('%cobj.next','text-decoration:underline'); 
        console.dir($(obj).next());
    console.groupEnd();*/
    if($(dNext).hasClass('flag')) { //console.log('flag has %cfound', 'color:brown');
        // set default flag
        $(dNext).removeClass('delete').removeClass('ok');
        $(obj).removeAttr('title');                 
        var fieldMess = Scene.active_screen.Form[obj.id].message;
        if( obj.id==Scene.active_screen.Form.retype_password.name
            && obj.value!=$('#password').val()
          ){    //console.log('re-type_password.value = '+obj.value+', password.value = '+$('#password').val());
            $(dNext).addClass('delete').attr('title',fieldMess);
            return false;
        }        
        var title,vStat=obj.validity;
        var exclProp = 'customError';
        for(var pr in vStat){
            //if(pr=='valid') console.log('%c'+vStat[pr], 'background-color:violet');
            if(pr!='valid'&&pr!=exclProp&&vStat[pr]==true){
                if(!(title=fieldMess))
                    title="Please, fill out this field in the correct format";
                $(dNext).addClass('delete').attr('title',title);
                //console.log('obj.title = '+fieldMess);
                return false;
            } //console.log(pr+': '+vStat[pr]);
        }
        $(dNext).addClass('ok').removeAttr('title');
        return true;
    }
}
/**
 * returnы false
 */
function showErrorMess(data_type,error_text) {
    var divFlag = $('.flag.'+data_type);
    //console.log('data-flag = %c'+data_type, 'color:orange'); //console.dir(divFlag);
    $(divFlag).addClass('delete');
    var warning = $('<div/>',{
        id:'formWarning'
    }).css({
        'color': '#F00',
        'font-style': 'normal',
        'font-size': '14px',
        'font-family': 'AvenirMedium',
        'position': 'absolute',
        'left': '100%',
        'margin-left': '-10px',
        'text-align': 'left',
        'width': '140px'
    }).text(error_text);
    var inp = $(divFlag).prev();
    $(inp).before(warning);
    $(inp).on('focus', function(){
        $(warning).fadeOut(4000);
    });
    return false;
}