// JavaScript Document
/* WMSoftware / games */
function getUrlParams(){
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
    args = {},
    items = qs.length ? qs.split("&") : [],
    item = null,
    name = null,
    value = null,
    i = 0,
    len = items.length;
    for (i=0; i < len; i++){
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
                args[name] = value;
        }
    }
    return args;
}
/*  in order to test images positions set param bg to the url like this:
    http://localhost/WMSoftware/games/game.html?bg=100 
    bg.value/100 defines test background image opacity, so
    bg = 100 means that substrate's opacity is 1.
    The image src see bellow: */
$(function(){
    var bgSrc = 'sources/debug_bg/bg_full_white_transp.jpg';
    var bg=getUrlParams();
    if(bg){ //console.dir(bg);
        if (bg.bg){
            if(bg.bg!=='0'){
                var bgs=bg.bg.split(",");
                //$('#css_screen').after('<link media="screen" href="stylesheets/debug.css" rel="stylesheet" type="text/css">');
                var op1=parseFloat(bgs[0]/100),
                        op2=parseFloat(bgs[1]/100);

                var wrapper = $('#wrapper');

                $('>*',wrapper).css({
                        'opacity':op2
                });

                var substrate = $('<div/>',{
                        class:'bg'
                }).css({
                        background:'url('+bgSrc+')',
                        backgroundSize:'cover',
                        position:'absulute',
                        top:0,
                        right:0,
                        bottom:0,
                        left:0,
                        opacity:op1
                });

                $(wrapper).prepend(substrate).css({
                        'background':'none'
                });
            }
            var msrH=$('<div/>').css({
                background:'yellow',
                position:'absolute',
                left:0,
                right:0,
                height:'1px',
                zIndex:3
            });
            var msrV=$('<div/>').css({
                background:'orange',
                position:'absolute',
                top:0,
                bottom:0,
                width:'1px',
                zIndex:3
            });

            $('body').prepend(msrH)
                         .prepend(msrV)
                .mousemove(function(e){
                        $(msrH).css({
                                top:e.pageY-4
                        });
                        $(msrV).css({
                                left:e.pageX-4
                        });
                        document.title='top: '+e.pageY+', left: '+e.pageX;
                });
        }
    }
});
