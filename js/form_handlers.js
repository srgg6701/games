/**
 * Comment
 */
function removeFlag(flag) {
    $(flag).removeClass('delete')
           .removeClass('ok');
    $('.'+Scene.active_screen.Form.warningFlagMess,flag).remove();
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
/** 
 * imitate a placeholder's behavior
 */
function handlePlaceHolder(Event,psholder){
	var input,placeholder;
	// the target is the pseudoplaceholder
	if(psholder){ 
		input = $(Event).next()[0]; // div - pseudoplaceholder 
		placeholder = Event;
		input.focus(); // this is srange, but this is necessary
	}else{ // the target is the input itself
		input = Event.target; // input itself
		placeholder = $(input).prev()[0];
		switch(Event.type){
			case 'keypress':
				$(placeholder).hide();
				break;
			case 'keyup': case 'blur':
				if(!$(input).val())
					$(placeholder).show();
				break;
		}
	} //console.dir(placeholder); console.dir(input); 
}
/**
 * Set validity icon
 * @return boolean
 */
function setValidityIcon(Event,form) {
    var input=(form)? Event:Event.target; //console.dir(input);
    
    if(!form&&!input.value) return false;
    
    var inputObj = Scene.active_screen.Form[input.id];
    
    if(!inputObj||!inputObj.pattern) return true;
    
    var reg = new RegExp(inputObj.pattern);
    var inputValidity = reg.test(input.value);
    //input.validity.valid; //
    //console.log('inputValidity = '+inputValidity);
    //Event.preventDefault(); // remove browser's invalidity message
    var dNext = $(input).next(); //console.dir(dNext); 
    var warningFlagMessName = Scene.active_screen.Form.warningFlagMess;
    //var invalids = Scene.active_screen.Form.invalids;
    var handleFlag = function(isValid){
        //console.log('handleFlag');
        var flagClassName;
        $('div.'+warningFlagMessName,dNext).remove();
        //if(input.value){
            if(isValid) {
                flagClassName='ok';
                //console.log('valid');
            }else{
                //console.log('not valid');
                var flagMessage = $('<div/>',{
                    class:warningFlagMessName
                }).html('<div>x</div>'+inputObj.message)
                  .css({
                      width: inputObj.message.length*4.2+30+'px'
                  });
                flagClassName='delete';
                $(dNext).append(flagMessage);
            }
            $(dNext).addClass(flagClassName);
        //}
    };
    if($(dNext).hasClass('flag')) { //console.log('validity: %c'+input.validity.valid, 'color:brown');
        //console.log('has flag');
        // handle flags:
        removeFlag(dNext);
        /*  if the current field is *re-type password* and the value
            is not the same like the password value */
        if( input.id==Scene.active_screen.Form.retype_password.name
            && $(input).val()!=$('#password').val()
          ){    
            handleFlag();
            return false;
        }          
        handleFlag(inputValidity);
        return inputValidity;
    }else console.log('%cno flag','color:red');
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