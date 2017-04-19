/**
 * Created by Wudengke on 2016/5/25.
 */
(function($){
    $.fn.extend({
        ImgViewer: function(settings){
            var defaults={
                speed:1000,                 //滚动速度
                autoScroll:0,               //是否自动播放
                interval:5000,              //自动播放间隔时间
                initImg:1,                  //初始图片
                navigator:false,            //是否启用导航图片
                navigatorBtn:false,         //是否启用导航按钮
                navigatorStyle:"smallImg",  //导航样式（smallImg,circle）
                triggerScroll:0,                  //自定义触发滚动
            };

            var settings= $.extend(defaults,settings);
            var wrapWidth=$(".imgViewer-wrap").width();//wrap宽度
            var currentImg=parseInt(settings.initImg);//当前图片
            var imgNum=$(".imgViewer li").length;//图片个数
            var navigator=".imgViewer-nav-"+settings.navigatorStyle+" li";
            var init=function(){
                //浏览器窗口大小调整时重置windowWidth
                $(window).resize(function(){
                    wrapWidth=$(".imgViewer-warp").width();
                });
                //移动到初始图片
                $(".imgViewer").animate({left:"-="+(parseInt(settings.initImg)-1)*parseInt(wrapWidth)+"px"},0);
                //突出显示初始导航图片或circle
                $(navigator).eq(parseInt(settings.initImg)-1).addClass("outImg");

                //是否启用导航图片
                if(settings.navigator){
                    if(settings.navigatorStyle=="smallImg"){
                        var navigator="<div class='imgViewer-nav-smallImg'><ul></ul></div>";
                        $(".imgViewer").after(navigator);
                        $(".imgViewer li").each(function(){
                            $(".imgViewer-nav-smallImg ul").append($(this).clone());
                        });
                        $(".imgViewer-nav-smallImg ul li img").each(function(){
                            $(this).wrap("<a href='#'></a>");
                        });
                        $(".imgViewer-nav-smallImg ul li div").each(function(){
                            $(this).wrap("<a href='#'></a>");
                        });
                    }else if(settings.navigatorStyle=="circle"){
                        var navigator="<div class='imgViewer-nav-circle'><ul></ul></div>";
                        $(".imgViewer").after(navigator);
                        $(".imgViewer li").each(function(){
                            $(".imgViewer-nav-circle ul").append("<li><a href='#'></a></li>");
                        });
                    }
                }
                //自定义触发滚动
                if(settings.triggerScroll){
                    settings.triggerScroll();
                }
                //设置imgViewer和imgViewer li宽度
                var imgViewerWidth=imgNum+"00%";
                var imgViewer_liWidth=100/imgNum+"%";
                $(".imgViewer").css("width",imgViewerWidth);
                $(".imgViewer li").css("width",imgViewer_liWidth);
                $(".imgViewer li img").show();
                $(".imgViewer li div").show();
                //是否启用导航按钮
                if(settings.navigatorBtn){
                    var navigatorBtn="<div class='imgViewer-nextImg btn'><i class='fa fa-angle-right'></i></div> " +
                        "<div class='imgViewer-prevImg btn'><i class='fa fa-angle-left'></i></div>";
                    $(".imgViewer").after(navigatorBtn);
                }
                //是否自动播放
                if(settings.autoScroll){
                    //!!!!!!!setInterval中不能直接用animate
                    setInterval(function(){scrollToNextImg()},settings.interval);
                }
            };
            var eventListener=function(){
                //上一图片，下一图片按钮点击事件监听
                $(".imgViewer-nextImg").click(function(){//下一图片
                    scrollToNextImg();
                });
                $(".imgViewer-prevImg").click(function(){//上一图片
                    scrollToPrevImg();
                });
                //点击导航图片或circle滚动到相应图片或circle
                $(navigator).each(function(){
                    $(this).click(function(){
                        var targetImg=$(navigator).index(this)+1;
                        scrollToTargetImg(targetImg);
                    });
                });
            };
            //突出显示图片
            var outImg=function(targetImg){
                $(navigator).eq(currentImg-1).removeClass("outImg");
                $(navigator).eq(targetImg-1).addClass("outImg");
                currentImg=targetImg;
            };
            //向下一个图片滚动
            var scrollToNextImg=function(){
                if(currentImg==imgNum){
                    $(".imgViewer").animate({left:"+="+(imgNum-1)*parseInt(wrapWidth)+"px"},settings.speed);
                    outImg(1);
                }else{
                    $(".imgViewer").animate({left:"-="+wrapWidth},settings.speed);
                    outImg(currentImg+1);
                }
            };
            //向上一个图片滚动
            var scrollToPrevImg=function(){
                if(currentImg==1){
                    $(".imgViewer").animate({left:"-="+(imgNum-1)*parseInt(wrapWidth)+"px"},settings.speed);
                    outImg(imgNum);
                }else {
                    $(".imgViewer").animate({left: "+=" + wrapWidth}, settings.speed);
                    outImg(currentImg-1);
                }
            };
            //滚动到指定图片
            var scrollToTargetImg=function(targetImg){
                var distance=(targetImg-currentImg)*parseInt(wrapWidth)+"px";
                $(".imgViewer").animate({left: "-=" + distance}, settings.speed);
                outImg(targetImg);
            };

            init();
            eventListener();

            return this.each(function(){

            });
        }
    });

})(jQuery);


