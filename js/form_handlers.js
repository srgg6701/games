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
    //
    var dNext = $(input).next(); //console.dir(dNext); 
    // get the Input object from the Form object
    var inputObj = Scene.active_screen.Form[input.id];
    /*  if the function was called not while the form submitting
        and the input doesn't contain any value */
    if(!form&&!input.value) {
        removeFlag(dNext);
        return (inputObj.optional)? true:false;
    }
    // if everything is totally optional, just return true
    if( !inputObj || !inputObj.pattern ) return true;
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
        /*  Notice that if the input value is not required and doesn't contains 
            any we already have finished this implementation (see above). 
            So: - Input value is required OR it CONTAINS smove value    */
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
    var warningFlagMessName = Scene.active_screen.Form.warningFlagMess;
    //var invalids = Scene.active_screen.Form.invalids;
    var handleFlag = function(validationResult){
        //console.log('handleFlag');
        var flagClassName=false;
        $('div.'+warningFlagMessName,dNext).remove();
        //
        if(validationResult) {
            flagClassName='ok'; //console.log('valid');
        }else if(inputObj.name!="email"||Event.type=='blur'){
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
        return inputValidity;
    }//else console.log('%cno flag','color:red');
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