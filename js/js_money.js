$(function(){
    // handle pseudocheckboxes
    $('body').on('click', 'label:has(.radio-skin)', function(event){
        var rClassName = 'checked_box';
        var rDotClassSkinName = '.radio-skin';
        $(rDotClassSkinName,'label').removeClass(rClassName);
        $(rDotClassSkinName,event.currentTarget).addClass(rClassName); //console.dir(radioDiv);
    });
});