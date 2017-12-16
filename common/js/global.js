// JavaScript Document

function htmlsize(){
	var ww;
	var maxw=640;
	var minw=320;
	if($(window).width()>maxw){ww=maxw;}
	else if($(window).width()<minw){ww=minw;}
	else{
		ww=$(window).width();
	}
	$("html").css({fontSize:(ww/maxw)*100});
}
htmlsize();
$(window).resize(htmlsize);

//全局js
$(function(){
//start

setTimeout(function(){
	$(".serv_dialog").animate({opacity:"show"},500);
},60000);
$(".serv_dialog .a1").click(function(){
	setTimeout(function(){
		$(".serv_dialog").animate({opacity:"show"},500);
	},60000);
	$(".serv_dialog").fadeOut(300);
});

//滚动条
/*$("html").niceScroll({
	cursorcolor:"#111",
	cursorborder:"none",
	cursorwidth:"8px",
	scrollspeed:80,
	background:"#aaa",
	cursoropacitymin:0,
	cursoropacitymax:0.7,
	enablekeyboard:false,
	zindex:2
});*/

if($(window).width()>=1440){
	$("#main").css({height:$("body").height()-(82+parseInt($(".footer").css("padding-top"))*2)});
}
else{
	$("#main").css({height:$("body").height()-parseInt($("body").css("padding-top"))});
}
$(window).resize(function(){
	if($(window).width()>=1440){
		$("#main").css({height:$("body").height()-(82+parseInt($(".footer").css("padding-top"))*2)});
	}
	else{
		$("#main").css({height:$("body").height()-parseInt($("body").css("padding-top"))});
	}
});


$(".gotop").click(function(){
	$("html").animate({scrollTop:0},400+$(window).scrollTop()*0.3);
	if(navigator.appVersion.match("WebKit")){
		$("body").animate({scrollTop:0},400+$(window).scrollTop()*0.3);
	}
	else{
		$("html").animate({scrollTop:0},400+$(window).scrollTop()*0.3);
	}
});
$(window).scroll(function(){
	if($(window).scrollTop()>100){$(".gotop").fadeIn();}
	else{$(".gotop").fadeOut();}
});


$(".menu").click(function(event){
	$(this).toggleClass("act");
	$(".header .r").toggleClass("act");
	$(".nav_main").toggleClass("show");
	event.stopPropagation();
});
$(".nav_main").click(function(event){
	event.stopPropagation();
});
$(window).click(function(){
	$(".menu").removeClass("act");
	$(".header .r").removeClass("act");
	$(".nav_main").removeClass("show");
});

$(".nav_float").css({marginTop:$(".nav_float").height()*-0.5});




//placeholder
if('placeholder' in document.createElement('input')==false){
	$("input,textarea").each(function(index, element) {
        if($(this).attr("placeholder")!=undefined){
			if($(this).attr("type")!="password"){
				$(this).val($(this).attr("placeholder"));
				$(this).attr("onFocus","if(this.value=='"+$(this).attr("placeholder")+"')this.value=''");
				$(this).attr("onBlur","if(this.value=='')this.value='"+$(this).attr("placeholder")+"'");
			}
		}
    });
}
$(".passwd").each(function(index, element) {
	var t=$(this);
	if('placeholder' in document.createElement('input')==false){
		$(this).find(".b").focus(function(){
			$(this).hide();
			t.find(".a").focus();
		});
		$(this).find(".a").focus(function(){
			t.find(".b").hide();
		});
		$(this).find(".a").blur(function(){
			if($(this).val()==""){
				t.find(".b").show();
			}
		});
	}
	else{
		t.find(".a").attr("placeholder",t.find(".b").attr("placeholder"));
		t.find(".b").remove();
	}
});


//end
});

function winload(){
	$("body").addClass("loaded");
}