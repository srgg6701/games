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
    console.log('%cremoveFlag %c, flag:','color:red;','color:black;'); console.dir(flag);
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
    if(form) console.log('Event.type: '+Event.type+'; %cform: %c'+form,'color:#ccc','font-weight:bold'); 
    else{ console.log('No form, event: %c'+Event.type,'font-weight:bold;font-style:italic;'); console.log('id: %c'+Event.target.id,' font-weight:bold; color:#999;');}
    var input=(form)? Event:Event.target; //console.log('setValidityIcon'); console.dir(input);
    // skip warnings on the login form
    if($(input).parent('span[data-skip="warnings"]').eq(0).size()){
        (input.value)? console.log('\treturn %ctrue', 'color:green;'):console.log('\treturn %cfalse','color:red;');
        return (input.value)? true:false;
    }
    var dNext = $(input).next(); //console.dir(dNext); 
    // get the Input object from the Form object
    var dataReq,inputObj=null; 
    // console.dir(inputObj);
    // checkboxes, radios, birthday fields
    if(dataReq=input.getAttribute('data-req')){
        inputObj=Scene.active_screen.Form[dataReq];
        if(form){
            var empty = false;
            // label or div[data-type]
            dNext=$(input).parents().eq(0);
            console.dir(dNext);
            if(input.type=='checkbox'||input.type=='radio'){
                console.log('checking');
                if(!$('[name="'+input.name+'"]:checked').size()){
                    empty='checking'; console.log('empty');
                }
            }else if(!input.value){
                empty='birthday'; console.log('empty: birthday');
            }
            // A checkbox or radio which must be checked but is isn't
            if(empty){             
                console.log('%cunchecked:','color:red'); console.dir(input);
                var flagMessage = createInvalidityMess(input.id,dNext,inputObj.message);
                $(dNext).append(flagMessage);
                setTimeout(function(){
                    $(flagMessage).fadeOut(3000,function(){
                        $(flagMessage).remove();
                    });
                },2000); //return flagMessage;
                console.log('\treturn %cfalse','color:red');
                return false;
            }else {
                console.log('\treturn %ctrue', 'color: green'); console.log('checked:'); console.dir(input);
                return true;
            }
        }
    }else{ // no req attribute, no in the Form object, so - is totally optional 
        if(!(inputObj=Scene.active_screen.Form[input.id])) {
            console.log('\treturn %ctrue', 'color: green');
            return true;
        }else{             
            // if everything is totally optional, just return true
            if(!inputObj.pattern) {
                console.log('\treturn %ctrue', 'color: green');
                return true;
            }else{
                /*  if the function was called not while the form submitting
                and the input doesn't contain any value */
                if(!input.value) {                
                    if(inputObj.optional){
                        removeFlag(dNext); 
                        console.log('\toptional: '+inputObj.optional+'\nreturn true');    
                        return true;
                    }else if(!form){
                        console.log('\treturn %cfalse','color:red;'); //console.dir(input); console.log('return %cfalse','color:red');
                        removeFlag(dNext); 
                        return false;
                    }
                }
            }            
        }
    }
    // the field contains some value - validate it!
    /*  What to validate:
        Event   validity    length
        ------------------------------------
        keyup   check       bigger than max
        input   check       bigger than max
        blur    check       bigger than max, less than min  */
    if(!inputObj) alert('error: no inputObj, input.id: '+input.id);
    var reg = new RegExp(inputObj.pattern);
    /*  check characters' validiti for any cases 
        (this doesn't include lenght's validity yet) */
    var inputValidity = reg.test(input.value); //console.log('inputValidity = '+inputValidity+'\npattern = '+reg);
    //if(input.id.indexOf('phone')!=-1) console.log('inputValidity = '+inputValidity+', inputObj.len = '+inputObj.len);
    /*  if validation is passed and the appropriate event occured,
        validate input's length    */
    if(inputObj.len){ //console.log('inputObj.len: '+inputObj.len);
        if(inputValidity||input.id.indexOf('phone')!=-1){ 
            /*      */  //console.log('VALID: '+input.id);
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
            else{
                var wrong_phone = false;
                /* the phones need a special checking */
                if( input.id.indexOf('phone')!=-1 
                    /*  we don't know if there were invalid charachters or just 
                        too short value*/
                    && !inputValidity){
                    // validate characters
                    // remember - up to this point inputValidity is FALSE!
                    if(/^[0-9\s]+$/.test(input.value)){ 
                        // count just digits
                        var digits = input.value.replace(/\s/g,'');
                        if(digits.length==minLength){
                            inputValidity=true; 
                        }else if(digits.length<minLength&&Event.type!='blur'){
                            console.log('calls removeFlag()');
                            removeFlag(dNext);
                            if(!form) {
                                console.log('\treturn %ctrue', 'color: green');
                                return true;
                            }
                            /*   otherwise just keep inputValidity as false  */
                        } //console.log('digits = '+digits+', inputValidity = '+inputValidity);      
                    }else {
                        console.log('wrong_phone');
                        wrong_phone = true;
                    } //console.log('inputValidity = '+inputValidity+', input.value = '+input.value);
                }
                // CONDITION matters:
                /*  if the input.value has length > minLength, 
                we skip the next block. In that case we just pass 
                further the boolean value of inputValidity */
                if( input.value.length && input.value.length < minLength ){ // too short length
                    if(Event.type=='blur'||form) inputValidity = false; // set flag next           
                    /*  if it happens not while form submitting AND not by the blur event - 
                        remove flag and finish execution... */
                    else if(!wrong_phone){ 
                        // keep the default flag
                        console.log('calls removeFlag()');
                        removeFlag(dNext);
                        // in essense does nothing - just go to the next checking iteration
                        console.log('\treturn %ctrue', 'color: green');
                        return true;                        
                    }
                }
            }
        }
    }
    //
    var handleFlag = function(validationResult){
        console.log('handleFlag');
        var flagClassName=false;        
        if(validationResult) {
            removeFlag(dNext);
            flagClassName=Scene.active_screen.Form.flag_id_ok; console.log('valid, flagClassName = '+flagClassName);
        }else{ 
            if( inputObj.name!="email" 
                || // wrong_email
                ( inputObj.name=="email"
                  && (Event.type=='blur'||form)
                ) 
                || Event.type=='blur'
              ){ 
                removeFlag(dNext);            
                createInvalidityMess(input.id,dNext,inputObj.message);
                flagClassName=Scene.active_screen.Form.flag_id_error; console.log('flagClassName = '+flagClassName);
            }
        }
        if(flagClassName) {
            console.log('add flag: '+flagClassName+', dNext: '); console.dir(dNext);
            $(dNext).addClass(flagClassName);
        }else console.log('no flagClassName');
    };
    if($(dNext).hasClass('flag')) { //console.log('validity: %c'+input.validity.valid, 'color:brown');
        // handle flags:
        //removeFlag(dNext);
        /*  if the current field is *re-type password* and the value
            is not the same like the password value */
        if(input.id==Scene.active_screen.Form.retype_password.name){
           var pass2; 
           if(!(pass2=document.getElementById('new_password')))
                  pass2 = document.getElementById('password');
           if( input.value && pass2.value
               && (input.value!=pass2.value)
             ){    
                handleFlag(); // first, remove all flags, then sets appropriate one
                console.log('\treturn %cfalse','color:red');
                return false;
            }          
        }
        handleFlag(inputValidity); // first, remove all flags, then sets appropriate one
        console.log('\treturn %c'+inputValidity,'color:violet;');
        return inputValidity;
    }
    console.log('\treturn true (end of the function)');
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
        /*$('#'+input_id).on('keyup',function(){
            console.log('calls removeFlag()');
            removeFlag(dNext);
        }); */
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