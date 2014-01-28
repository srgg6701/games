/*
 * Set flag
 * @returns flagMessage div
 */
function createInvalidityMess(input_id,dNext,error_text){
    //console.log('input_id = '+input_id);
    var flagMessage = $('<div/>',{
        class:Scene.active_screen.Form.warningFlagMess
    }).html('<div>x</div>'+error_text)
      .css({
          width: error_text.length*4.2+30+'px'
      });
    $(dNext).append(flagMessage);
    $('#'+input_id).on('click', function(){
        $(flagMessage).remove();
    });
    return flagMessage;
};
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
			case 'keypress': case 'input':
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
 * Comment
 */
function removeFlag(flag) {
    $(flag).removeClass(Scene.active_screen.Form.flag_id_error)
           .removeClass(Scene.active_screen.Form.flag_id_ok);
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
 * Set validity icon
 * @return boolean
 */
function setValidityIcon(Event,form) { 
    var input=(form)? Event:Event.target; 
    //console.log('setValidityIcon'); console.dir(input);
    // skip warnings on the login form
    if($(input).parent('span[data-skip="warnings"]').eq(0).size()){
        //console.log('setValidityIcon');
        return (input.value)? true:false;
    }
    var dNext = $(input).next(); //console.dir(dNext); 
    // get the Input object from the Form object
    var inputObj=null; 
    if(!(inputObj=Scene.active_screen.Form[input.id])) return true; 
    //console.dir(inputObj);
    // checkboxes, radios
    if(form && input.getAttribute('data-req')){
        dNext=$(input).parent('label');
        if(!$('[name="'+input.name+'"]:checked').size()) {
            //console.log('inputObj: '); console.dir(inputObj);
            var flagMessage = createInvalidityMess(input.id,dNext,inputObj.message);
            $(flagMessage).css('left','0');
            setTimeout(function(){
                $(flagMessage).fadeOut(3000,function(){
                    $(flagMessage).remove();
                });
            },2000); //return flagMessage;
            return false;
        } 
    } //console.dir(inputObj);
    /*  if the function was called not while the form submitting
        and the input doesn't contain any value */
    if(!form&&!input.value) {
        removeFlag(dNext);
        return (inputObj.optional)? true:false;
    }
    // if everything is totally optional, just return true
    if(!inputObj||!inputObj.pattern) return true;
    //console.log('inputValidity = '+inputValidity+', inputObj.pattern = '+inputObj.pattern);
    /*  What to validate:
        Event   validity    length
        ------------------------------------
        keyup   check       bigger than max
        input   check       bigger than max
        blur    check       bigger than max, less than min  */
    var reg = new RegExp(inputObj.pattern);
    /*  check characters' validiti for any cases 
        (this doesn't include lenght's validity yet) */
    var inputValidity = reg.test(input.value); //console.log('inputValidity = '+inputValidity+'\npattern = '+reg);
    /*  if validation is passed and the appropriate event occured,
        validate input's length    */
    if(inputValidity && inputObj.len){
        /*      */
        var minLength,maxLength;
        if(inputObj.len[1]) { //console.log('len[1] = '+inputObj.len[1]);
            minLength = inputObj.len[0];
            maxLength = inputObj.len[1];
        }else{  //console.log('no len[1]');
            maxLength = minLength = inputObj.len[0];
        }   //console.log('input.length = '+input.value.length+', minLength = '+minLength+', maxLength = '+maxLength);
        // validate lengths
        /*  the value's length is bigger than the allowed max allowed value
            it is not allowed anyway */
        if(input.value.length > maxLength) inputValidity = false;
        // if user inputed amything, check it:
        else if( input.value.length && input.value.length < minLength){ // too short length
            if(Event.type=='blur'||form) inputValidity = false; // set flag next           
            /*  if it happens not while form submitting AND not by the blur event - 
                remove flag and finish execution... */
            else{ 
                removeFlag(dNext);
                return true;
            }
        }
    }
    //var invalids = Scene.active_screen.Form.invalids;
    var handleFlag = function(validationResult){
        //console.log('handleFlag');
        var flagClassName=false;
        $('div.'+Scene.active_screen.Form.warningFlagMess,dNext).remove();
        //
        if(validationResult) {
            flagClassName=Scene.active_screen.Form.flag_id_ok; //console.log('valid');
        }else if(inputObj.name!="email"||Event.type=='blur'){
            createInvalidityMess(input.id,dNext,inputObj.message);
            flagClassName=Scene.active_screen.Form.flag_id_error;
        }
        if(flagClassName) $(dNext).addClass(flagClassName);
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
        //console.log('inputValidity = '+inputValidity);
        return inputValidity;
    }//else console.log('%cno flag','color:red');
    return true;
}
/**
 * returnы false
 */
function showErrorMess(data_type,error_text,input_id) {
    if(input_id){   
        // var input = document.getElementById(input_id);
        var dNext = $('#'+input_id).next();
        //var flagMessage = 
        createInvalidityMess(input_id,dNext,error_text);
        $(dNext).addClass(Scene.active_screen.Form.flag_id_error);
        $('#'+input_id).on('keyup',function(){removeFlag(dNext);});
        // console.dir(flagMessage);
        return false;
    }
    var dtType, divFlag = $('.flag.'+data_type);
    //console.log('data-flag = %c'+data_type, 'color:orange'); //console.dir(divFlag);
    if($(divFlag).size()){ 
        $(divFlag).addClass(Scene.active_screen.Form.flag_id_error);
        dtType = 'data-flag';
    }else dtType = 'data-warning'; // is set for inputs on Login form, because thre are no containers for flags (no validity)
   
    Scene.active_screen.Form.warning = $('<div/>',{
        id:'formWarning',
        class:'sys_warning',
        title:'Click to close'
    }).text(error_text);
    
    var inpContainer = $('['+dtType+'="'+data_type+'"]'); //console.dir(inpContainer);
    $(inpContainer).prepend(Scene.active_screen.Form.warning);
    $(Scene.active_screen.Form.warning).on('click',function(){$(this).remove();});
    return false;
}