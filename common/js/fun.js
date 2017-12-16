//初始化标题
function settit(e){
	$(e).addClass("showtit");
	var text=$(e).text();
	text=text.replace(/ /g,"^");
	var arr=text.split("");
	var html="";
	for(var i=0;i<arr.length;i++){
		html+="<i style='transition-delay:0."+GetRandomNum(1,7)+"s;-webkit-transition-delay:0."+GetRandomNum(1,7)+"s'>"+arr[i]+"</i>";
	}
	html=html.replace(/\^/g,"&nbsp;");
	html=html.replace("> <",">&nbsp;<");
	$(e).html(html);	
}

//初始化文字
function settxt(e){
	$(e).addClass("showtxt");
	var text=$(e).text();
	text=text.replace(/ /g,"^");
	var html="";
	var l=0;
	text=text.replace(" ","^");
	while(l<text.length){
		var x=GetRandomNum(2,5);
		var y=GetRandomNum(2,20)*0.1;
		html+="<i><b style='transition-delay:"+y+"s;-webkit-transition-delay:"+y+"s'>"+text.substr(l,x)+"</b></i>";
		l+=x;
	}
	html=html.replace(/\^/g,"&nbsp;");
	html=html.replace("> <",">&nbsp;<");
	$(e).html(html);
	$(e).find("i").each(function(index, element) {
		$(this).width($(this).width());
	});
	$(e).find("b").addClass("h");
}
//激活标题或文字
function showtt(e,delay){
	setTimeout(function(){
		$(e).addClass("act");
	},delay);
}
//移除标题或文字激活
function hidett(e){
	$(e).find(".act").removeClass("act");
}

//css判断
function supportCss3(style) {
	var prefix = ['webkit', 'Moz', 'ms', 'o'],
	i,
	humpString = [],
	htmlStyle = document.documentElement.style,
	_toHumb = function(string) {
		return string.replace(/-(\w)/g,
		function($0, $1) {
			return $1.toUpperCase();
		});
	};
	for (i in prefix) humpString.push(_toHumb(prefix[i] + '-' + style));
	humpString.push(_toHumb(style));
	for (i in humpString) if (humpString[i] in htmlStyle) return true;
	return false;
}

function ckall(e,t){
	if($(e).attr("checked")){
		$(t).find("input").attr("checked",true);
		$(t).addClass("act");
	}
	else{
		$(t).find("input").attr("checked",false);
		$(t).removeClass("act");
	}
}

//响应试
var sto_css;
function cCss(maxw,minw,cla){
	var ww=$(window).width();
	if(ww>=minw && ww<=maxw){
		$("html").addClass(cla);
	}
	else{
		$("html").removeClass(cla);
	}
	$(window).resize(function(){
		clearTimeout(sto_css);
		sto_css=setTimeout(function(){
			cCss(maxw,minw,cla);
		},500);
	});
}

//滚动触发
function scrollact(e,fix){
	if(!fix){fix=0;}
	if($(window).scrollTop()>=$(e).offset().top-fix){
		return true;
	}
	if($(window).scrollTop()+$(window).height()>=$(e).offset().top+$(e).height()-fix){
		return true;
	}
}

//弹出层
function showlayer(e){
	$(e).css({marginTop:$(e).outerHeight()*-0.5});
	$(e).show();
	$(".shadow").fadeIn(300);
}
function hidelayer(e){
	$(e).hide();
	$(".shadow").fadeOut(300);
}

//自动调整底部,配合相应class
function autofoot(){
	var wh=$(window).height();
	var dh=$(document.body).height();
	if($("#footer").attr("class")=="footb"){
		dh=$(document.body).height()+$("#footer").height();
	}
	if(wh>dh){
		$("#footer").addClass("footb");
	}
	else{
		$("#footer").removeClass("footb");
	}
}

//根据dom的w和h属性配合type进行尺寸及定位的计算
function autodiv(e,type){
	$(e).each(function(index, element) {
		if(type=="h"){
            $(this).width("100%");
			$(this).height($(this).width()/$(this).attr("w")*$(this).attr("h"));
        }
		if(type=="v"){
			$(this).height("100%");
			$(this).width($(this).height()/$(this).attr("h")*$(this).attr("w"));
		}
		if(type=="c"){
			$(this).width($(this).parent().width()/$(this).parent().attr("w")*$(this).attr("w"));
			$(this).height($(this).parent().height()/$(this).parent().attr("h")*$(this).attr("h"));
			$(this).css("left",$(this).parent().width()/$(this).parent().attr("w")*$(this).attr("l"));
			$(this).css("top",$(this).parent().height()/$(this).parent().attr("h")*$(this).attr("t"));
		}
	});
}


//建立下拉列表功能
function selector(e){
	$(e).each(function(){
		s=$(this);
		s.click(function(){
			s.find("ul").show();
		});
		s.mouseleave(function(){
			s.find("ul").hide();
		});
		s.find("li").click(function(){
			s.find("input").val($(this).text());
			s.find("ul").hide();
		});
	});
}

//新tab切换
function tabdiv(tab,div,event,speed){
	speed=isNaN(speed)?0:speed;
	$(div).each(function(index, element) {
        $(this).attr("idx",index);
    });
	$(tab).each(function(index, element) {
        $(this).bind(event,function(){
			$(tab).removeClass("now");
			$(this).addClass("now");
			$(div+"[idx='"+index+"']").fadeIn(speed);
			$(div+"[idx!='"+index+"']").stop(true,true).hide();
		});
    });
}


//数字初始化效果
function numshow(e,t){
	if(t=="")t=1;
	var stv1;
	var x=parseInt($(e).text());
	var y=0;
	if(x>=100){
		var z=parseInt(x/100),
		 t=10*t;
	}
	else{
		var z=1;
		t=150*t;
	}
	var stv1=setInterval(function(){
		y=y+z;
		$(e).text(y);
		if(y+z>=x){
			$(e).text(x);
			clearInterval(stv1);
		}
	},t);	
}

//获取日期
function getdate(e){
	var day="";
	var month="";
	var ampm="";
	var ampmhour="";
	var myweekday="";
	var year="";
	mydate=new Date();
	myweekday=mydate.getDay();
	mymonth=mydate.getMonth()+1;
	myday= mydate.getDate();
	myyear= mydate.getYear();
	year=(myyear > 200) ? myyear : 1900 + myyear;
	if(myweekday == 0)
	weekday=" 星期日 ";
	else if(myweekday == 1)
	weekday=" 星期一 ";
	else if(myweekday == 2)
	weekday=" 星期二 ";
	else if(myweekday == 3)
	weekday=" 星期三 ";
	else if(myweekday == 4)
	weekday=" 星期四 ";
	else if(myweekday == 5)
	weekday=" 星期五 ";
	else if(myweekday == 6)
	weekday=" 星期六 ";
	$(e).text(year+"年"+mymonth+"月"+myday+"日 "+weekday);
}

//设置cookie
function setCookie(c_name,value,expiredays){
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(c_name){
	if(document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=")
		if(c_start!=-1){ 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if(c_end==-1)c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end))
		}
	}
	return "";
}

//是否支持html5
function ishtml5(){
	if(typeof(Worker)!=="undefined"){
		return true;
	}
	else{
		return false;
	}	
}

//是否支持css3
function isCss3(style) {
	var prefix = ['webkit', 'Moz', 'ms', 'o'],
	i,
	humpString = [],
	htmlStyle = document.documentElement.style,
	_toHumb = function(string) {
		return string.replace(/-(\w)/g,
		function($0, $1) {
			return $1.toUpperCase();
		});
	};

	for (i in prefix) humpString.push(_toHumb(prefix[i] + '-' + style));

	humpString.push(_toHumb(style));

	for (i in humpString) if (humpString[i] in htmlStyle) return true;

	return false;
}




//获取随机数
function GetRandomNum(Min,Max){   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));
}

//初始化jquery时间插件
function loaddate(e,lang){
	if(lang=="zh"){
			$.datepicker.regional["zh-CN"] = { closeText: "关闭", prevText: "&#x3c;上月", nextText: "下月&#x3e;", currentText: "今天", monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"], dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"], weekHeader: "周", dateFormat: "yy-mm-dd", firstDay: 1, isRTL: !1, showMonthAfterYear: !0, yearSuffix: "年" }
			$.datepicker.setDefaults($.datepicker.regional["zh-CN"]);
	}
	else{
		$.datepicker.regional['en-GB'] = {
			closeText: 'Done',
			prevText: 'Prev',
			nextText: 'Next',
			currentText: 'Today',
			monthNames: ['January','February','March','April','May','June',
			'July','August','September','October','November','December'],
			monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
			weekHeader: 'Wk',
			dateFormat: 'dd/mm/yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''};
		$.datepicker.setDefaults($.datepicker.regional['en-GB']);
		$('#date').datepicker('option', $.datepicker.regional['en-GB']);
	}
}

function countDate(start,end){
	//创建Date变量：
	start = Date.parse(start.replace(/-/g,"/"));
	var date1 = new Date(start); //开始时间
	end = Date.parse(end.replace(/-/g,"/"));
	var date2=new Date(end);    //结束时间
	var date3=date2.getTime()-date1.getTime();  //时间差的毫秒数
	
	//计算出相差天数
	var days=Math.floor(date3/(24*3600*1000));
	//计算出小时数
	var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
	var hours=Math.floor(leave1/(3600*1000));
	if(hours<10 && hours>=0){hours="0"+hours;}
	if(hours<0){hours="00";}
	//计算相差分钟数
	var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
	var minutes=Math.floor(leave2/(60*1000));
	if(minutes<10 && minutes>=0){minutes="0"+minutes;}
	if(minutes<0){minutes="00";}
	//计算相差秒数
	var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
	var seconds=Math.round(leave3/1000);
	if(seconds<10 && seconds>=0){seconds="0"+seconds;}
	if(seconds<0){seconds="00";}
	
	//var now=hours+":"+minutes+":"+seconds;
	//var now="<span>"+days+"</span>天&nbsp;&nbsp;<span>"+hours+"</span>小时&nbsp;&nbsp;<span>"+minutes+"</span>分";
	return now;
}

function mjump(url){
	var ua=navigator.userAgent.toLowerCase();
	if(ua.match(/iPad/i)=="ipad" || ua.match(/iphone/i)=="iphone" || ua.match(/android/i)=="android") { 
		location=url;
	}
}

//字数判断
function limitword(e,x,fn){
	$(e).bind('propertychange input',function(){  
		if($(this).val().length<=x){
			return fn(x-$(this).val().length);
		}
		else{
			return fn(0);
		}
	});
}