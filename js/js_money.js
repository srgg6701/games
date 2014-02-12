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
    })  // click on the "select's pointer"
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
        .on('click',euroMoney, function(event){
            $(euroMoney).removeClass();
            $(event.currentTarget).addClass('button_gray_hover');
        });
    // hide "options" by clicking outside of options box
    $(document).on('click',function(event){
        var ev = event.target; //console.dir(event);
        // if the event fired outside
        if(ev.className!=select_pointer_class && ev.className!='unicode_pointer') 
            $('.'+select_pointer_class+' div').remove();
    })

});