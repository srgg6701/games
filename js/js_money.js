$(function(){
    var select_pointer_class = 'select_pointer';
    // handle pseudocheckboxes
    $('body')
        // click on the "radiobutton"
        .on('click', 'label:has(.radio-skin)', function(event){
            var rClassName = 'checked_box';
            var rDotClassSkinName = '.radio-skin';
            $(rDotClassSkinName,'label').removeClass(rClassName);
            $(rDotClassSkinName,event.currentTarget).addClass(rClassName); //console.dir(radioDiv);
    })  // click on the "select's pointer"
        .on('click', '.'+select_pointer_class, function(event){
        var obt_box = 'opt_box';
    	var sel = $(event.currentTarget).prev();
		var opts = $('.'+obt_box,event.currentTarget);
		var hideOptions = function(){
			$(opts).slideUp(100,function(){
				$(this).remove();
			});
		};
		if(!$(opts).size()){
			opts = $('<div/>',{
					class: obt_box
				});
			$(event.currentTarget).append(opts);
			$('option',sel).each(function(index, element) {
				$(opts).append('<div>'+$(element).text()+'</div>');
			});
			$(opts).slideDown(100);
			$('>div',opts).on('click', function(){
				var sel_text = $(this).text();
				$(sel).find('option').filter(function(index){
					return $(this).text()==sel_text;       
				}).prop("selected", "selected");
				hideOptions();
			});
		}else
			hideOptions();
    });
    $(document).on('click',function(event){
        var ev = event.target; //console.dir(event);
        if( ev.className!=select_pointer_class
            && ev.className!='unicode_pointer') 
            $('.'+select_pointer_class+' div').remove();
    })

});