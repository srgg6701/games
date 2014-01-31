$(function(){
	var inputs=$('#birthday input');
	/*
     * Show pseudo drop-down menu 
     */
    $(inputs).on('click', function(){
		//console.log('affected on input');//focus
		this.disabled=true;
		$(inputs).next().css('display','none');
		$(this).blur().next('.select').css({
			display:'block'
		});
		
		if(this.id=="year") 
            addBirthdayContent($('[data-type="year"] .select >div'));
		
	}).on('blur', function(){
		this.disabled=false;
	});
	$('.select').on('mouseleave click', function(){
		$(this).css({
			display:'none'
		});
	});
	$('body').on('click','.select>div>div',function(event){
		//console.log('clicked text: '+$(this).text());
        var cDate = event.currentTarget;
        var dateBlock = $(cDate).parents('[data-type]').eq(0);
		var input = $('#'+$(dateBlock).attr('data-type'));
        $('.placeholder',dateBlock).remove();
        console.dir(dateBlock);
        console.log('cDate text = '+$(cDate).text()+', input: ');
        console.dir(input);		
        // put date into the input
        $(input).val($(cDate).text());

	});
});
function setDateValue(obj){
	$(obj).parents('[data-type]').eq(0)
			.find('input:first-child')
				.val($(this).text());
}
// generate years
function addBirthdayContent(yContainer){
	var years='';
    // TODO: make clear the age of the adulthood
	for(var year=1900, y=new Date(), cY=parseInt(y.getFullYear())-18; // if user is adult only
			year<=cY; 
			year++){
		years=$('<div/>',{
			onclick:function(){
				console.log('clicked!');
				setDateValue(this);
			}
		}).text(year);
		$(yContainer).append(years);
	}
}
