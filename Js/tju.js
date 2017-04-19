/**
 * Created by Wudengke on 2016/5/24.
 */
$(document).ready(function(){
    $(".footer").slideDown(2000);
    //滚动到顶部
    $("#upToTop").click(function(){
        $.scrollTo(0,500);
    });
    $(document).scroll(function(){
        if($(document).scrollTop()>200)
        {
            $("#upToTop").fadeIn("slow");
        }else{
            $("#upToTop").fadeOut("slow");
        }
    });
    $(".more").click(function(){
        $(".more+ul").animate({left:"-150px"},1000)
    });
    $(".menu-pull").click(function(){
        //$(".main-right-nav").animate({left:"100px",width:"75%"})
    });
	function browserRedirect() {//检测设备是PC还是iPhone
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                return "iphone";
            } else {
                return "pc";
            }
        }
        if(browserRedirect()=="pc"){
			$(".myPanel-body").addClass("in");
		}
});


