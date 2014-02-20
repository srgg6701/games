// our little Scene Universe :) starts here.
var constMess = {
    alwsymb: '\nYou can use: ',
    alwsymblsms: {
        phone: '10 numbers from 0 to 9 and spaces',
        password: 'from 6 to 20 symbols like letters, numbers from 0 to 9 and !@#$%^&*',
        zip: '5 numbers from 0 to 9',
        letters_only: 'letters only',
        letters_only2_30: 'from 2 to 30 letters',
        letters_and_numbers6_20: 'from 6 to 20 symbols like letters and numbers from 0 to 9'
    },
    gender: 'Please select a Gender',
    date_mess: 'Please select a full Birthday date'
};
// User account, Money, Demo
var Levels = {
    // the frontier. 
    // Outside it the outer hostile world lies.
    // All we want to know and do existst only within the wrapperContainer 
    // it will take an id "wrapper" further
    wrapperContainer: null,
    /* for the Scene.arrangeWindow() - if we need a correction */
    correction_param: false,
    correction_value: 0,
    targetFrame: null,
    setCorrection: function(obj) {
        this.targetFrame = obj;
        //this.correction_value=$('section.menu',obj).outerWidth();
        this.correction_value = $('section.menu', this.targetFrame).outerWidth();
    },
    defaultBgImage: 'bg_bench.jpg',
    // define sections which should be loaded by default after switching level
    defaultSections:{
        game: '', // not in use
        money:{
            deposit: 'deposit_visa',
            withdrawal: 'withdraw_visa'
        }
    },
    Menus:{
        activeMenuClassName:'activeMenu',
        money:{
            dataAttr:'data-block'
        }
    },
    setBgImage: function(bgImg) {
        if (bgImg) {
            if (bgImg === true)
                bgImg = this.defaultBgImage;
            $(this.wrapperContainer).css({
                backgroundColor: 'transparent',
                background: 'url(images/' + this.defaultBgImage + ')'
            });
        } else {
            $(this.wrapperContainer).css({
                background: 'transparent',
                backgroundColor: 'white'
            });
        }
    }
};
var Scene = {
    container_id: 'wrapper',
    //
    shade_id: 'global_shade',
    // user's blocks class name
    user_container_class: 'user_profile',
    user_container_id_default: 'my_profile_login',
    // loaded User Profile screen
    active_screen: {
        screen_id: false,
        Form: {
            flag_id_ok: 'ok',
            flag_id_error: 'delete',
            name: 'user-form',
            default_data: 'data-default_value',
            warning: null,
            warningFlagMess: 'warningFlagMess',
            pass_diff: false,
            mess_diff: "Please fill out this field",
            /*  NOTE: if the actual field hasn't the placeholder attribute, its 
             text is assigned in the data-load[2] parameter within the parent 
             element which uploads it from an appropriate template */
            address: {
                id: 'address',
                hint: 'Your address.' + constMess.alwsymb + constMess.alwsymblsms.letters_and_numbers6_20,
                message: constMess.alwsymb + constMess.alwsymblsms.letters_and_numbers6_20,
                pattern: "^[\-a-zA-ZéêèëàâùûôöîïçÉÊÈËÀÂÙÛÔÖÎÏÇ0-9]+$",
                len: [2, 60]
            },
            agreement: {
                id: 'terms_and_conditions',
                message: 'Please check the box to continue'
            },
            birthday: {
                id: 'birthday',
                message: 'Please select a full Birthday date'
            },
            city: {
                id: 'city',
                //hint:'Your city.'+constMess.alwsymb+constMess.alwsymblsms.letters_only2_30,
                message: constMess.alwsymb + constMess.alwsymblsms.letters_only2_30,
                pattern: "^[a-zA-ZéêèëàâùûôöîïçÉÊÈËÀÂÙÛÔÖÎÏÇ]+$",
                len: [2, 30]
            },
            country: {
                id: 'country',
                //hint:'Your country.'+constMess.alwsymb+constMess.alwsymblsms.letters_only2_30,
                message: constMess.alwsymb + constMess.alwsymblsms.letters_only2_30,
                pattern: "^[a-zA-ZéêèëàâùûôöîïçÉÊÈËÀÂÙÛÔÖÎÏÇ]+$"
            },
            current_password: {
                id: 'current_password',
                //hint:'Your current password.'+constMess.alwsymb+constMess.alwsymblsms.password,                
                message: constMess.alwsymb + constMess.alwsymblsms.password
            },
            day: {
                id: 'day',
                //hint:'Day of your birth',
                message: constMess.date_mess
            },
            email: {
                id: 'email',
                //hint:'Your email',
                message: 'Input your email in appropriate format please',
                pattern: "^[0-9a-zA-Z]{4,20}@[0-9a-zA-Z]+[\.]{1}[a-zA-Z]{2,}$"
            },
            first_name: {
                id: 'first_name',
                //hint:'Your first name.'+constMess.alwsymb+constMess.alwsymblsms.letters_only2_30,
                message: constMess.alwsymb + constMess.alwsymblsms.letters_only2_30,
                pattern: "^[a-zA-ZéêèëàâùûôöîïçÉÊÈËÀÂÙÛÔÖÎÏÇ]+$",
                len: [2, 30]
            },
            gender: {// * radios *
                id: 'gender', // not in use as id literally because is radio type, but is necessary here
                message: constMess.gender
            },
            home_phone: {
                id: 'home_phone',
                //hint:'Your home phone (optional).'+constMess.alwsymb+constMess.alwsymblsms.phone,
                message: constMess.alwsymb + constMess.alwsymblsms.phone,
                pattern: "^[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*$",
                len: [10, 40],
                optional: true
            },
            last_name: {
                id: 'last_name',
                //hint:'Your last name.'+constMess.alwsymb+constMess.alwsymblsms.letters_only2_30,
                message: constMess.alwsymb + constMess.alwsymblsms.letters_only2_30,
                pattern: "^[a-zA-ZéêèëàâùûôöîïçÉÊÈËÀÂÙÛÔÖÎÏÇ]+$",
                len: [2, 30]
            },
            mobile_phone: {
                id: 'mobile_phone',
                //hint:'Your mobile phone.'+constMess.alwsymb+constMess.alwsymblsms.phone,
                message: constMess.alwsymb + constMess.alwsymblsms.phone,
                pattern: "^[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*$",
                len: [10, 40]
            },
            month: {
                id: 'month',
                //hint:'Month of your birth',
                message: constMess.date_mess
            },
            new_password: {
                id: 'new_password',
                //hint:'Your new password.'+constMess.alwsymb+constMess.alwsymblsms.password,                
                message: constMess.alwsymb + constMess.alwsymblsms.password,
                pattern: "^[\!@#\$%\^&\*a-zA-ZéêèëàâùûôöîïçÉÊÈËÀÂÙÛÔÖÎÏÇ0-9]+$",
                len: [6, 20]
            },
            password: {
                id: 'password',
                //hint:'Your password.'+constMess.alwsymb+constMess.alwsymblsms.password,                
                message: constMess.alwsymb + constMess.alwsymblsms.password,
                pattern: "^[\!@#\$%\^&\*a-zA-ZéêèëàâùûôöîïçÉÊÈËÀÂÙÛÔÖÎÏÇ0-9]+$",
                len: [6, 20]
            },
            retype_password: {
                id: 'retype_password',
                message: 'The passwords are different',
                //hint:'Re-type password',
                pattern: "^[\!@#\$%\^&\*a-zA-ZéêèëàâùûôöîïçÉÊÈËÀÂÙÛÔÖÎÏÇ0-9]+$",
                len: [6, 20]
            },
            username_or_email: {
                id: 'username_or_email',
                //hint:'Your username or your email',
                message: 'Your username or e-mail is wrong'
            },
            username: {
                id: 'username',
                //hint:'Your username.'+constMess.alwsymb+constMess.alwsymblsms.letters_and_numbers6_20,
                message: constMess.alwsymb + constMess.alwsymblsms.letters_and_numbers6_20,
                pattern: "^[a-zA-ZéêèëàâùûôöîïçÉÊÈËÀÂÙÛÔÖÎÏÇ0-9]+$",
                len: [6, 20]
            },
            year: {
                id: 'year',
                hint: 'Year of your birth',
                message: constMess.date_mess
            },
            zip_code: {
                id: 'zip_code',
                hint: 'Your zip code.' + constMess.alwsymb + constMess.alwsymblsms.zip,
                message: constMess.alwsymb + constMess.alwsymblsms.zip,
                pattern: "^[0-9]+$",
                len: [5],
                optional: true
            },
            //-----------------------------------------
            card_type: {// * radios *
                id: 'card_type', // not in use as id literally because is radio type, but is necessary here
                //hint:'',
                message: 'Point out the Card Type'
            },
            money_amount: {
                id: 'money_amount',
                message: constMess.alwsymb + 'numbers only',
                pattern: "^[0-9]+$",
                len: [3, 6]
            },
            money_bank_name: {
                id: 'money_bank_name',
                //hint:'',
                message: 'Point out the Bank Name',
                pattern: "[\w]+",
                len: [2, ]
            },
            money_bank_address: {
                id: 'money_bank_address',
                //hint:'',
                message: 'Point out the Bank Address',
                pattern: "^[\-a-zA-ZéêèëàâùûôöîïçÉÊÈËÀÂÙÛÔÖÎÏÇ0-9]+$",
                len: [2, 60]
            },
            money_bank_bic_code: {
                id: 'money_bank_bic_code',
                //hint:'',
                message: 'Point out the Bank Swift/BIC Code',
                pattern: "[\w]",
                len: [2, 30]
            },
            money_bank_sort_code: {
                id: 'money_bank_sort_code',
                //hint:'',
                message: 'Point out the Bank Sort Code',
                pattern: "[\w]",
                len: [2, 30]
            },
            money_bank_iban_no: {
                id: 'money_bank_iban_no',
                //hint:'',
                message: 'Point out the Bank IBAN No.',
                pattern: "[\w]",
                len: [2, 30]
            },
            money_card_holder: {// hidden
                id: 'money_card_holder',
                //hint:'',
                message: 'Fill out the Card Holder/Owner form',
                pattern: "[\w]",
                len: [1]
            },
            money_card_number: {
                id: 'money_card_number',
                //hint:
                message: constMess.alwsymb + '16 numbers and spaces',
                //'Point out the Card Number',
                pattern: "^[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*[0-9]{1}[\s]*$",
                len: [16, 80]
            },
            money_cvv: {
                id: 'money_cvv',
                //hint:'',
                message: constMess.alwsymb + '3 numbers',
                pattern: "^[0-9]+$",
                len: [3]
            },
            money_email: {
                id: 'money_email',
                //hint:'',
                message: 'Point out the Email',
                pattern: "^[0-9a-zA-Z]{4,20}@[0-9a-zA-Z]+[\.]{1}[a-zA-Z]{2,}$"
            },
            money_month: {
                id: 'money_month',
                //hint:'',
                message: 'Point out the Month',
                pattern: "^[0-9]+$",
                len: [1, 2]
            },
            money_voucher_number: {
                id: 'money_voucher_number',
                //hint:'',
                message: 'Point out the Voucher Number',
                pattern: "^[0-9]+$",
                len: [3, 20],
            },
            money_voucher_value: {
                id: 'money_voucher_value',
                //hint:'',
                message: 'Point out the Voucher Value',
                pattern: "^[0-9]+$",
                len: [3, 20],
            },
            money_year: {
                id: 'money_year',
                //hint:'',
                message: 'Point out the Year',
                pattern: "^[0-9]+$",
                len: [4]
            },
            /** 
             * set pseudoplaceholder
             * Warning! We CANNOT extract the value of input within the function,
             *  so we MUST pass it here 
             */
            setPseudoPlaceHolder: function(input, defaultValue) { // HTML-element, not jQuery obj        
                if (input.type == 'text' ||
                        input.type == 'password' ||
                        input.type == 'email' ||
                        input.type == 'tel') {
                    var pseudoPlaceholder = $('<div/>', {
                        class: 'placeholder'
                    }).css({
                        'left': parseInt($(input).css('margin-left')) + 9 + 'px'
                    }); //console.log('input.value after deleting: '+input.value);
                    // add pseudoplaceholder to the block
                    $(input).parent().prepend(pseudoPlaceholder);
                    // assign actions onEvent to the pseudoplaceholder
                    $(pseudoPlaceholder).on('click selectstart', function(event) {
                        handlePlaceHolder(this, true);
                        $(this).next().trigger('click');
                        if (event.type == 'selectstart')
                            return false;
                    }).html(defaultValue);
                    var inputs = $(input).parents('form').eq(0)
                            .find('input:not(:checkbox):not(:radio):not(:hidden):not(:image):not(:reset):not(:submit)');
                    if ($(inputs).index(input) == 0)
                        input.focus();
                }
                return true;
            },
            /**
             * Handle field - pseudoplaceholder, flag
             * NOTICE: Elem here is a jQuery object (i.e. HTML-element is Elem[0]) 
             */
            setElementContent: function(Elem,
                    /*  sets as input's default value 
                     and the placeholder's text;  
                     gets this from: 
                     - data-load[2] attribute for UserProfile level 
                     - the value of  data-default_value for Money level*/
                    defaultValue ) {
                var parentForm = this; //console.log('Elem start'); console.dir(Elem);
                //var parentFormElement = parentForm[Elem[0].id]; //console.log('parentForm['+Elem[0].id+']');console.dir(parentForm[Elem[0].id]);
                /*  Set pseudoplaceholder */
                if (arguments[2])
                    console.dir(Elem);
                this.setPseudoPlaceHolder(Elem[0], defaultValue);
                //
                var ddv = this.default_data; //test: if(parentForm[Elem[0].id] && parentForm[Elem[0].id].message) console.log('input.message = '+parentForm[Elem[0].id].message); 
                //console.dir(Elem[0]);
                $(Elem).attr(ddv, defaultValue)// for js.js
                        .on('blur', function(event) { //console.log('on blur'); //console.log('on blur, name = '+this.name+', value = '+defaultValue);
                            /*
                             * remove validation flag
                             */
                            parentForm.removeFlagOnDefaultValue(this, defaultValue);
                            setValidityIcon(event);
                        })
                        .on('click keyup input',
                                function(event) { //console.log('input');
                                    // oninput
                                    if (event.type != 'click') {
                                        setValidityIcon(event);
                                    }
                                    // onclick, onkeyup
                                    // imitate a placeholder's behavior
                                    handlePlaceHolder(event);
                                })
                        .on('keypress blur', function(event) {
                            // imitate a placeholder's behavior
                            handlePlaceHolder(event);
                        });
            },
            /**
             * remove validation flag
             */
            removeFlagOnDefaultValue: function(obj, defaultValue) { //console.log('removeFlagOnDefaultValue, obj.value: '+obj.value+', defaultValue = '+defaultValue);
                /* if the field has no value, set value by default and rremove flags
                 */ //console.log('removeFlagOnDefaultValue, value = '+$(obj).val());
                // if element has default value, remove flags
                var nxt = $(obj).next('.flag');
                if ($(obj).val() == defaultValue || !$(obj).val()) { //console.log('defaultValue: '+defaultValue);
                    if ($(nxt).size())
                        removeFlag(nxt);
                }
            },
            /*
             * set custom validaty message to the deeply included element 
             * (which is being extracted from template)
             * NOTE: element here is a HTML-object unlike of setElementContent()
             */
            attachCustomValidity: function(element) {
                var sceneElem, parentForm = this;
                // data-default_value is used for date fields (selects)
                var defaultValue = element.getAttribute('data-default_value');
                if (this.setPseudoPlaceHolder(element, defaultValue))
                    element.value = '';
                if (sceneElem = Scene.active_screen.Form[element.id]) {
                    //console.log('sceneElem is found..., element.id = '+element.id+', message should be '+sceneElem.message);
                    $(element).on('blur', function(event) { //console.log('blur, element: '); console.dir(element);
                        parentForm.removeFlagOnDefaultValue(this, defaultValue);
                        setValidityIcon(event);
                    })
                            .on('blur click keypress keyup input', function(event) {
                                // imitate a placeholder's behaviorselectstart
                                handlePlaceHolder(event);
                            })
                            .on('keyup input', function(event) {
                                setValidityIcon(event);
                            });
                }
            },
            /**
             * Handle invisible due to design purposes checkbox
             */
            checkInvisibleBox: function(chbox) { // label[data-box]
                $(chbox).parent('label')[(chbox.checked == true) ? 'addClass' : 'removeClass']('checked');
            }
        }
    },
    // get the certain user's block, 
    // append it to the main wrapper window and make it visible
    appendUserBlock: function(entity_id, data_load_name) {
        /*  The attribute data_load_name by default is 'data-load'.
         It defines a HTML-elements' block which must 
         be loaded into the template from the subtemplate.
         For example, see the template contents/my_profile_form.html
         which gets elements from the subtemplate 
         contents/components/input or contents/components/person.
         It may look like this:
         <span data-load="input|address|type here your address"> 
         ...where:
         * 'input' is a file name (input.html) in the directory '/contents'
         * 'address' is an element id in this file
         * 'type here your address' is an this element's value
         */
        if (data_load_name !== false)
            var data_load = (data_load_name) ? data_load_name : 'data-load';
        var real_money_account = 'my_profile_real_money_account';
        if (entity_id.indexOf(real_money_account) != -1) {
            // because this is a container for both my_profile_real_money_account1 and my_profile_real_money_account2
            //alert('real_money_account: '+real_money_account);
            var incomingEntityId = entity_id;
            entity_id = real_money_account;
        } //console.group('%cmanageMyProfile()','font-weight:bold;');		
        $('.' + Scene.user_container_class).remove();
        // see files in the dir /contents/
        var file_contents = 'contents/' + entity_id + '.html';
        /*  console.log('file_contents: %c'+file_contents,'color:blue;');
         console.log('entity_id: %c'+entity_id,'color:goldenrod;');
         console.log('class: %c'+Scene.user_container_class,'font-weight:bold;');*/
        var userBlock = null;
        // create a block for the loaded file 
        if (!(userBlock = document.getElementById(entity_id))) {
            //console.log('!userBlock, build it now!')
            var userBlock = $('<div/>', {
                id: entity_id,
                class: Scene.user_container_class
            });
        }
        // store id of active screen. Need to be identified while enter account
        this.active_screen.screen_id = entity_id; //console.log('screen_id = '+this.active_screen.screen_id);
        // append the block to the wrapper
        this.obscureWindow();
        $('#' + Scene.shade_id).before(userBlock); //console.log('%cshade block: ', 'background-color:#333; color:white'); console.dir($('#'+Scene.shade_id));
        // load the file from /contents/ dir
        $(userBlock).load(file_contents, function() {
            //console.log('userBlock is loaded. file_contents: '+file_contents);
            /*console.groupCollapsed('%cuserBlock:', 'color:blue');console.log($(userBlock).html());console.groupEnd();
             drop passwords diff mark */
            Scene.active_screen.Form.pass_diff = false;
            /*  Warning!
             Don't mix the files:
             *   my_profile_real_money_account.html - commont contentainer 
             for both steps 1 and 2
             *   my_profile_real_money_account1.html - step 1 content
             *   my_profile_real_money_account2.html - step 2 content */
            if (entity_id == real_money_account) { //console.log('file to load: contents/'+incomingEntityId+'.html');
                // load the my_profile_real_money_account1 or my_profile_real_money_account2 content
                $('#account_real_money_inner_content')
                        .load('contents/' + incomingEntityId + '.html', function() {
                            // handle blocks within the template which has been uploaded
                            Scene.handleBlocks(data_load);
                            var btn_text, step_class;
                            // step1
                            if (incomingEntityId == real_money_account + '1') {
                                btn_text = 'NEXT';
                                step_class = 'step1';
                            } else { // step2
                                btn_text = 'REGISTER NOW!';
                                step_class = 'step2';
                                $('#steps >div:first-child').addClass('step_passive');
                                $('#steps >div:last-child').removeClass('step_passive');
                                //console.dir($('#steps >div:first-child'),$('#steps >div:last-child'));
                            }
                            $('.user_profile').addClass(step_class);
                            $('#btn_real_money_account')
                                    .text(btn_text)
                                    .addClass(step_class);
                        });
            } else { // handle blocks within the template which has been uploaded
                //console.log('call handleBlocks()');
                Scene.handleBlocks(data_load);
            }
            // assign styles for the loaded content
            $('#' + entity_id).css({
                // Don't change this order!:
                left: Scene.arrangeWindow(entity_id, 'outerWidth'),
                top: Scene.arrangeWindow(entity_id, 'outerHeight')
                        /*  because if we need a correction (see arrangeWindow())
                         it may cause of its fail.   */
            }).fadeIn(300);
        }); //console.dir('userBlock: '+userBlock);
        //console.groupEnd();
    },
    // get data from Cashier section
    appendUserMoneyBlock: function(entity_id) {
        // all contents already deleted
        var loaded_component_class_name = 'loaded_component';
        $('.' + loaded_component_class_name).remove();
        var userMoneyBlock = null;
        this.active_screen.screen_id = entity_id;
        if (!(userMoneyBlock = document.getElementById(entity_id))) {
            userMoneyBlock = $('<div/>', {
                id: entity_id,
                class: loaded_component_class_name
            });
        }
        // append the block to the wrapper
        $('.pay_way').after(userMoneyBlock); //console.dir(userMoneyBlock);
        // [deposit|withdraw]_[file_name].html
        $(userMoneyBlock).load('contents/' + entity_id + '.html', function() {
            //console.log('The '+entity_id+' is loading...');
            Scene.handleBlocks('data-load', true);
        });
        $('section.content [type="submit"]').css('visibility', 'visible').show();
    },
    // calculate actual positions (top and left) of the target user's block
    arrangeWindow: function(entity_id, func) {
        /* func: outerHeight, outerWidth */
        var currentOffset;
        var wrapperOffset = $(Levels.wrapperContainer)[func]();
        // target block width/height
        var blockOffset = $('#' + entity_id)[func]();
        if (Levels.correction_param) { // #money_client_card_holder
            //200 + parseFloat(container)-element.width/2
            var centralArea = $('section.content', Levels.targetFrame);
            var centralAreaPaddingRight = parseFloat($(centralArea).css('padding-right'));
            // central area width minus padding-right
            var centralAreaViewPort = $(centralArea).outerWidth() - centralAreaPaddingRight;
            currentOffset = Levels.correction_value + // left menu panel width
                    (centralAreaViewPort - blockOffset) / 2;
            //wrapperOffset+=Levels.correction_value/2;
            Levels.correction_param = false;
            //console.log('func = '+func+', correction_value (' + typeof(Levels.correction_value)+')= ' + Levels.correction_value+', wrapperOffset = '+wrapperOffset + ', entity_id'+entity_id);
            //console.dir($('#'+entity_id));
        } else {
            currentOffset = (wrapperOffset - blockOffset) / 2;
        }
        /*console.group('%carrangeWindow()','font-weight:bold');
         console.log('function: '+func);
         console.log('entity_id: '+entity_id);
         console.log('wrapperContainer.'+func+' = '+wrapperOffset);
         console.log(entity_id+'.'+func+' = '+blockOffset);
         console.log('currentOffset: ('+wrapperOffset+'-'+blockOffset+')/2 = %c'+currentOffset,'color:violet');
         console.groupEnd();*/
        return currentOffset + 'px';
    },
    // just close the current screen
    closeUserScreen: function() {
        if (this.active_screen.screen_id == this.user_container_id_default) {//'my_profile_login'
            if (confirm("Do you really wish to leave The Game?"))
                window.self.close();
        } else { //console.dir(User);
            // hide user screen:
            $('.' + this.user_container_class + ':visible').fadeOut(300);
            var shade = $('#' + this.shade_id);
            // if User is already logged in, just drop the shadow
            if (User.logged) {
                // remove shade
                if ($(shade).is(':visible'))
                    $(shade).fadeOut(300, this.remove);
            } else { // ...otherwise - show him the authorization form
                this.appendUserBlock(this.user_container_id_default);
            }
        }
    },
    // Enter into account. All the user's data currently is stored in the User object
    enterAccount: function() { // account_type: 'demo' or 'money'
        //console.log('screen_id = '+this.active_screen.screen_id+', account_type = '+User.account_type);
        // remove screen
        $('#' + this.active_screen.screen_id).remove();
        // wash shadow away
        this.removeShading(); //console.log('account type: '+User.account_type);
        // arrange User Account depending of its type
        $('#btn_bottom_switcher')
                .addClass(User.account_type)
                .text((User.account_type == 'demo') ? "Switch to Money Player" : "Make a deposit");
        $('#user-coin').addClass((User.account_type == 'demo') ? 'silver' : 'gold');
        User.logged = true;
        // TODO: remove on production:
        $('#test_inner_submenu').fadeIn('400');
    },
    // go through elements which must load their inner elements from templates
    handleBlocks: function(data_load, level_money) { //console.log('entity_id = '+entity_id);
        /*  loading User Profile screen's elements.
         For example:
         <span data-load="input|username|username"></span>
         <span data-load="input|email|email address"></span>
         <span data-load="input|password|password"></span>
         etc... =>
         
         load content for every element with data-load attribute
         <input type="text" id="username" name="username" />
         <input type="text" id="email" name="email" />
         <input type="text" id="password" name="password" />
         */
        //
        if (data_load) { // if we didn't get it, we don't need any subtemplates
            // upload template files in loop
            /*  * for UserProfile level 
             - my_profile_[...].html
             * for Money level:
             - deposit_[...].html
             - withdraw_[...].html
             NOTE:   up to this point the suptemplate containing the menu - 
             deposit.html OR withdrawal.html already is loaded
             */
            $('[' + data_load + ']').each(function(index, element) {
                var defaultValue, element_id;
                var commonPath = 'contents/components/';
                //console.log('element: '); console.dir(element);
                /*  get file_name to load a certain element's content, 
                 element id, 
                 element value */
                var data2load = $(element).attr(data_load).split('|');
                // Money level
                if (level_money) {
                    commonPath += '/money';
                    element_id = '#section_' + data2load[0];
                } else { // User profile level
                    element_id = '#' + data2load[1];
                    commonPath += data2load[0];
                    defaultValue = data2load[2];
                }
                /*  upload components from the current template:
                 * for UserProfile level:
                 - input.html
                 - blocks.html
                 - person.html
                 * for Money level:
                 - money.html
                 */
                $(element).load(commonPath + '.html ' + element_id,
                        function() {
                            //
                            if (level_money) { //console.dir(element); //console.dir(this);console.dir($(element_id));
                                //console.log('data-reqs inside:');
                                /*  WARNING!
                                 Don't mix the attribute *data-req* here which is equal to "req"
                                 with such an attribute which is equal to the filed's NAME. 
                                 There is a crucial difference here! */
                                $('[data-req="req"], [data-placeholder]', this).each(function(index, block) { //console.log('text: '+$(block).parent().text());console.dir(block);
                                    // if optional, but need to set a placeholder 
                                    var contentBlock = block;
                                    // if is required, get the next block which contains the target field
                                    if($(block).attr('data-req')) 
                                        contentBlock = $(block).parent().next();
                                    var targets = $('input', contentBlock); // also may be radio
                                    if (!$(targets).size())
                                        targets = $('select', contentBlock);
                                    //console.groupCollapsed('%c'+$(block).parent().text(),'color:blue'); 
                                    //console.dir(targets);
                                    $(targets).each(function(i, field) { //console.log('element id: '+$(field)[0].id);
                                        defaultValue = $(field).attr('data-default_value') || '';
                                        Scene.handleInputField(element, defaultValue, $(field), true);
                                    }); //console.groupEnd();
                                });
                            } else
                                Scene.handleInputField(this, defaultValue, element_id);
                        });
            });
        }
    },
    /* handle field and pass it next to the placeholder's handler*/
    handleInputField: function(span,
            defaultValue,
            element,
            req
            ) {
        var Elem, elementTagName;
        if (typeof (element) != 'object')
            Elem = $(element); //console.dir(Elem);
        else
            Elem = element; //console.dir(Elem);
        // get element's tag
        elementTagName = $(Elem)[0].tagName.toLowerCase();
        // ...and type
        var elementType = $(Elem).attr('type'); //console.log('entity_id = '+entity_id+', data2load[1] = '+data2load[1]);
        // let's check everything!  
        if ((defaultValue || req) &&
                (elementType ||
                        /*  Warning! The label may not have defaultValue,
                         so after that condition it checks again */
                        elementTagName == 'label'
                        )
                ) {
            switch (elementType) {
                case 'submit':
                case 'text':
                case 'password':
                case 'email':
                case 'number':
                case 'search':
                case 'tel': //console.dir(Elem);
                    Scene.active_screen.Form.setElementContent(Elem, defaultValue);
                    // add the block for *flag*
                    var d_flag;
                    if (d_flag = $(span).attr('data-flag')) {
                        var dFlag = $('<div/>', {
                            class: "flag " + d_flag
                        });
                        $(Elem).after(dFlag);
                    }
                    break;

                case 'radio':
                    if (req)
                        Scene.active_screen.Form.attachCustomValidity($(Elem)[0]);
                    break;

                default: // checkbox, radio, label
                    $(Elem).after(defaultValue);
            }
        } else {
            $(':checkbox', Elem).each(function(i1, checkBox) {
                Scene.active_screen.Form.attachCustomValidity(checkBox);
            });
            $(':radio', Elem).each(function(i2, radioButton) {
                Scene.active_screen.Form.attachCustomValidity(radioButton);
            });
            // load the script to handle dd/month/YYYY cells
            if (element == '#birthday') { //console.log('%cbirthday', 'color:green');                                        
                $.getScript('js/birthday_handler.js');
                for (var i = 0, dts = ['day', 'month', 'year']; i < dts.length; i++) {
                    var dateInput = $('#' + dts[i], Elem)[0];
                    Scene.active_screen.Form.attachCustomValidity(dateInput);
                }
            }
        }
    },
    // cover the page with shadow
    obscureWindow: function() {
        //console.log('obscureWindow');
        if (!document.getElementById(this.shade_id))
            $(Levels.wrapperContainer)
                    .prepend('<div id="' + this.shade_id + '" class="shade cover"></div>');
    },
    // remove shade from page
    removeShading: function() {
        $('#' + this.shade_id).remove();
    },
    icons:{
        games:{
            top:   [
                    ['A1_donkey_beams','Cool Farmers'],
                    ['A2_astronaut_beams','Space discovery'],
                    ['A3_fair_carnival_beams','Foire du carnaval'],
                    ['A4_elvis_beams','Disco!']
                ],
            middle:[
                    // xtra icons
                    ['B5_funcky_noel_beams','Funky Noel'], //4
                    ['B6_copa_beams','Football Cup'],        //5
                    ['B7_money_beams','Joli Pactole!'],       //6
                    // common icons
                    ['B1_dolphin_beams','Aqua Fun'],
                    ['B2_racing_tour_beams','F1 Racing Tour'],
                    ['B3_birthday_beams','Happy Birthday!'],
                    ['B4_palms_beams','Bora Bora'],
                    // xtra icons
                    ['B8_female_beams','Miss Caniche'],      //7
                    ['B9_halloween_beams','Halloween Party'],   //8
                    ['B10_horse_beams','Turf & Cash!']
                ],     //9
            bottom:[
                    ['C1_parrot_beams','Tropicash'],
                    ['C2_casino_beams','Monaco Royale'],
                    ['C3_chocolat_beams','Choco Crush'],
                    ['C4_egypt_beams','Cleopatra']
                ]
        },
        startIndex:{
            top:null,
            middle:null,
            bottom:null
        },
        setDefaultGamesNames:function(){
            //var gamesBoxes=$('.scene_game_box');
            for(var rowName in Scene.icons.startIndex){
                var gameName = Scene.icons.games[rowName];
                var startIndex = (Math.round(gameName.length-4))/2; //3
                $('.scene_game_box.'+rowName)
                    .each(function(index,element){
                        Scene.icons.setDefaultGameNameText(element,gameName[startIndex+index][1]);
                });
            }
        },
        setDefaultGameNameText:function(element,text){
            //console.log('text = '+text); console.dir($(element).next().find('div.btn'));
            $(element).next().find('div.btn')
                .text(text);
        }
    }
};
var User = {
    logged: false,
    account_type: false,
    mainData: {
        username: null,
        email: null,
        password: null
    },
    xtraData: {
        gender: null,
        day: null,
        month: null,
        year: null,
        address: null,
        zip_code: null,
        city: null,
        country: null,
        mobile_phone: null,
        home_phone: null
    },
    emptyData: function() {
        this.account_type = false;
        for (var field_name in this.mainData)
            this.mainData[field_name] = null;
        for (var field_name in this.xtraData)
            this.xtraData[field_name] = null;
    }
};
var menus = {
    activeMenuId: '',
    touchable: false,
    submenus: {
        instant_games_submenu: {
            '#1': 'Las Vegas Party',
            '#2': 'Cool Farmer',
            '#3': 'Bingo Slot Machine',
            '#4': 'Whatever Scene',
            '#5': 'Scene to Win',
            '#6': 'Win A Scene Now',
            '#7': 'Mr. Poker',
            '#8': 'Meet the Dealer',
            '#9': 'Las Vegas Party',
            '#10': 'Cool Farmer',
            '#11': 'Bingo Slot Machine',
            '#12': 'Whatever Scene',
            '#13': 'Scene to Win',
            '#14': 'Win A Scene Now',
            '#15': 'Mr. Poker',
            '#16': 'Meet the Dealer'
        },
        scratch_games_submenu: {
            '#1': 'Las Vegas Party',
            '#2': 'Cool Farmer',
            '#3': 'Bingo Slot Machine',
            '#4': 'Whatever Scene',
            '#5': 'Scene to Win',
            '#6': 'Win A Scene Now',
            '#7': 'Mr. Poker',
            '#8': 'Meet the Dealer',
            '#9': 'Las Vegas Party',
            '#10': 'Cool Farmer',
            '#11': 'Bingo Slot Machine',
            '#12': 'Whatever Scene',
            '#13': 'Scene to Win',
            '#14': 'Win A Scene Now',
            '#15': 'Mr. Poker',
            '#16': 'Meet the Dealer'
        },
        slots_machine_submenu: {
            '#1': 'Las Vegas Party',
            '#2': 'Cool Farmer',
            '#3': 'Bingo Slot Machine',
            '#4': 'Whatever Scene',
            '#5': 'Scene to Win',
            '#6': 'Win A Scene Now',
            '#7': 'Mr. Poker',
            '#8': 'Meet the Dealer',
            '#9': 'Las Vegas Party',
            '#10': 'Cool Farmer',
            '#11': 'Bingo Slot Machine',
            '#12': 'Whatever Scene',
            '#13': 'Scene to Win',
            '#14': 'Win A Scene Now',
            '#15': 'Mr. Poker',
            '#16': 'Meet the Dealer'
        }
    },
    dur: 100,
    // the initializer to show menu
    pointer: 'data-container_id',
    pointer_active: false,
    parent_menu_class: 'parent',
    // container id that has a menu
    // we get it when mouse enters in the pointer
    menu_container_id: false,
    // the same container id that has a menu
    // but here we get it when mouse enters in the <menu> wrapper
    menu_active_container_id: false,
    // top menu container
    menu_container_class: 'menu_container',
    // if less than 9 itmes
    menu_short_class: 'short',
    // class name for submenu container
    submenu_container_class: 'submenu_container',
    //
    submenu_containers: {},
    // all about scrolling
    scroll: {
        //
        eventInit: null,
        // offset
        offset: 0,
        // opposite pointer
        oppositePointer: null,
        // parent for pointer
        pointer_parent_class: {
            up: 'scroll up',
            //up_title:'No more items above',
            //opacity_class_up:'opacity08',
            down: 'scroll down',
            //down_title:'No more items bellow',
            //opacity_class_down:'opacity08'
        },
        activeObjx: {
            scrollLimit: {},
            menuTopMargin: {},
            singleItemHeight: {},
            menuHeight: {},
            menu: {},
            pointerParentBox: {}
        },
        getPointerOrder: function(direction, reverse) {
            var cDir = (reverse) ? 'up' : 'down';
            return (direction == cDir) ? 'next' : 'prev';
        },
        // calculate and store all menu objects tied with scrolling
        setObjects: function(submenuContainer) { // jQuery (not JS!) object
            //console.dir(submenuContainer);
            var submenu_container_id = $(submenuContainer).attr('id');
            //menus.scroll.oppositePointer=$(submenuContainer)[menus.scroll.getPointerOrder(direction)]();
            if (!menus.submenu_containers[submenu_container_id]) {
                menus.submenu_containers[submenu_container_id] = submenuContainer;
                // (sub)menu object
                var submenu = $('>menu', submenuContainer);
                // (sub)menu height
                var menuHeight = parseFloat($(submenu).height());
                // set data
                // (sub)menu object
                menus.scroll.activeObjx.menu[submenu_container_id]
                        = submenu;
                // (sub)menu height
                menus.scroll.activeObjx.menuHeight[submenu_container_id]
                        = parseFloat($(submenu).height());
                // single (sub)menu inner item (li) height
                menus.scroll.activeObjx.singleItemHeight[submenu_container_id]
                        = menuHeight / $('li', submenu).size();
                // scrollLimit
                menus.scroll.activeObjx.scrollLimit[submenu_container_id]
                        = parseFloat($(submenuContainer).innerHeight() - menuHeight);
                // don't set pointerParentBox yet!
            }
            //
            menus.scroll.activeObjx.menuTopMargin[submenu_container_id]
                    = parseFloat($(menus.scroll.activeObjx.menu[submenu_container_id]).css('margin-top'));
            //console.log('menus.scroll.activeObjx.menuTopMargin[submenu_container_id] = %c'+menus.scroll.activeObjx.menuTopMargin[submenu_container_id],'background-color:lightskyblue');
            /*  console.dir(submenuContainer);
             console.dir(menus.submenu_containers[submenu_container_id]); */
        },
        // class for the pointer for scrolling (up/down)
        pointer_class: 'menu_pointer',
        //pointer_opacity_class:'opacity02',
        tPos: {
            startPos: 0,
            endPos: 0,
            startTime: 0
        }
    },
    // this block appears if the submenu aims the scroll
    menu_wrapper_class: 'menu_wrapper',
    showMenu: function(dur, menu_manager) {
        //console.group('%cshowMenu()','font-weight:bold');
        if (dur === true)
            dur = this.dur;
        var container_id = $(menu_manager).attr(this.pointer);
        this.menu_container_id = '#' + container_id;
        $(this.menu_container_id).show(dur);
        /*  console.log('show menu_container_id: %c'+menus.menu_container_id,'color:green');
         console.groupEnd(); */
    },
    hideMenu: function() {
        /*  console.group('%chideMenu()','font-weight:bold');
         console.log('before Timeout:\nlast_container_id = %c'+menus.menu_container_id,'color:blue'); */
        var last_container_id = menus.menu_container_id;
        var last_pointer_state = menus.pointer_active;
        setTimeout(function() {
            /*console.log(
             'after Timeout:\nmenu_active_container_id = '+menus.menu_active_container_id+
             '\nto hide: menu_container_id = '+menus.menu_container_id+
             '\nlast_container_id = %c'+last_container_id,'color:orange');*/
            // if we got a new menu active, hide previous one:
            if (last_container_id
                    && menus.menu_container_id
                    && last_container_id != menus.menu_container_id
                    ) {
                //console.log('hide %clast_container_id','font-weight:bold, color:blue');
                $(last_container_id).hide(menus.dur);
            } else if (!menus.menu_active_container_id && !last_pointer_state) { // hide current
                //console.log('hide %cmenu_container_id','font-weight:bold,color:brown');
                $(menus.menu_container_id).hide(menus.dur);
            }
        }, 300); //console.groupEnd();
    }
};