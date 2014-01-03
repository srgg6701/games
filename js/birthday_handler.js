$(function(){
	var inputs=$('#birthday input');
	$(inputs).on('click', function(){
		console.log('affected on input');//focus
		this.disabled=true;
		$(inputs).next().css('display','none');
		$(this).blur().next('.select').css({
			display:'block'
		});
		
		if(this.id=="year") addBirthdayContent($('[data-type="year"] .select >div'));
		
	}).on('blur', function(){
		this.disabled=false;
	});
	$('.select').on('mouseleave', function(){
		$(this).css({
			display:'none'
		});
	});
	$('body').on('click','.select>div>div',function(){
		//console.log('clicked text: '+$(this).text());
		$(this).parents('[data-type]').eq(0)
			.find('input:first-child')
				.val($(this).text());
		//console.dir(this);
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
	for(var year=1900, y=new Date(), cY=parseInt(y.getFullYear())-18; 
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
