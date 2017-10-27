// JavaScript Document


$(function() {
    $(window).scroll(function() {
        var s = $(this).scrollTop();
        if(s > 200){
            $('#timelimit').stop(false,false).fadeIn(300);
        }else{
            $('#timelimit').stop(false,false).fadeOut(300);
        }
    });
});