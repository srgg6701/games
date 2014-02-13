$(function(){
    // assign the options box name
    var select_pointer_class = 'select_pointer';
    // handle Money level objects
    // set events' identifiers
    var euroMoney = '#section_quick_deposit input[type="button"]';
    $('body')
        // click on the "radiobutton"
        .on('click', 'label:has(.radio-skin)', function(event){
            var rClassName = 'checked_box';
            var rDotClassSkinName = '.radio-skin';
            $(rDotClassSkinName,'label').removeClass(rClassName);
            $(rDotClassSkinName,event.currentTarget).addClass(rClassName); //console.dir(radioDiv);
    })  
        // click on the "select's pointer"
        .on('click', '.'+select_pointer_class, function(event){
            // set the class name (see levels.scss) for the "options box (list)"
            var opt_box_class = 'opt_box';
            // get the real select
            var sel = $(event.currentTarget).parent('span').find('select');
            // remove all "options" within the select's wrapper
            $('.'+select_pointer_class+' .'+opt_box_class).remove();
			var flag = $(event.currentTarget).prev();
			removeFlag(flag);
			
			var opts = $('<div/>',{
                class: opt_box_class
            });
            // add "options"
            $(event.currentTarget).append(opts);
            // fill options box
            $('option',sel).each(function(index, element) {
                $(opts).append('<div>'+$(element).text()+'</div>');
            });
            // imitate select's behavior
            $(opts).slideDown(100);
            // select the real value of select by clicking on the pseudo-option
            $('>div',opts).on('click', function(){
                var sel_text = $(this).text();
                $(sel).find('option').filter(function(index){
                    return $(this).text()==sel_text;       
                }).prop("selected", "selected");
                // hide "options"
                $(opts).slideUp(100,function(){
                    // remove options box from DOM
                    $(this).remove();
                });
            });
    })
        // button with euros: 10, 25 ... 200
        .on('click',euroMoney, function(event){
            $(euroMoney).removeClass();
            $(event.currentTarget).addClass('button_gray_hover');
    })
        // back to LOBBY link on the Withdrawal Methods section
        .on('click','#back_to_lobby', function(){
            manageLevels('game');
    })
        // upload document
        .on('click','#upload_docs', function(event){ 
            // block which is visible by default
            var doc_uploader_box=event.currentTarget; 
            // file upload field
            var doc_upload_input=$('#form_upload_doc input[type="file"]');
            console.dir(doc_upload_input);
            // the second block which appears after user pointed out the file to upload
            var doc_upload_confirm_box='#upload_now'; 
            // the file name container to show for the User
            var file_name_block='#uploaded_file_name';
            // if User has choosen the file to upload
            $(doc_upload_input).trigger('click');
            // ask user to confirm uploading
            $(doc_upload_input).on('change', function(){
                var file_name,max_len=40;
                if(file_name=this.value){
                    if(file_name.length>max_len)
                        file_name='... '+file_name.substr(file_name.length-max_len);
                    $(file_name_block).html(file_name); //console.dir($(doc_uploader_box));
                    $(doc_uploader_box).animate({ opacity: 0 }, 200, function(){
                        $(doc_upload_confirm_box).fadeIn(200);
                    });
                }                   
            });
            
            var dropStateToDefault = function(){
                $(doc_upload_confirm_box).fadeOut(200, function(){
                    $(doc_upload_input).val('');
                    $(file_name_block).html('');
                    $(doc_uploader_box).animate({ opacity: 1 }, 200);
                });                
            };
            // cancel uploading
            $('#cancel_uploading').on('click',dropStateToDefault);
            
            var upload = function(){
                // just in the test mode
                setTimeout(
                    function(){
                        dropStateToDefault();
                        alert('Your file has been uploaded!');
                    } ,1000);
            };
            
            $('#btn_upload_now').on('click',function(){
                upload();
            });
    });
    // hide "options" by clicking outside of options box
    $(document).on('click',function(event){
        var ev = event.target; //console.dir(event);
        // if the event fired outside
        if(ev.className!=select_pointer_class && ev.className!='unicode_pointer') 
            $('.'+select_pointer_class+' div').remove();
    })

});