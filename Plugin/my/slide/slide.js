/**
 * Created by Wudengke on 2016/5/26.
 */
(function(){
    $.fn.extend({
        //animate函数自动将元素设置为overflow:hidden,所以不用设置
        slideHOpen:function(speed,callback){
            var width=$(this).width();
            $(this).width(0);
            $(this).animate({width:width},speed);
            callback?callback():false;
            return $;
        },
        slideHClose:function(speed,callback){
            $(this).animate({width:0},speed,function(){$(this).css("display","none");});
            callback?callback():false;
            return $;
        },
        slideVOpen:function(speed,callback){
            var height=$(this).height();
            $(this).height(0);
            $(this).animate({height:height},speed);
            callback?callback():false;
            return $;
        },
        slideVClose:function(speed,callback){
            $(this).animate({height:0},speed,function(){$(this).css("display","none");});
            callback?callback():false;
            return $;
        },
        /*slideBottomOpen:function(speed,callback){
            $(this).children().css({
                position:"absolute",
                bottom:0
            });
            var height=$(this).height();
            $(this).css({height:0,position:"relative"});
            $(this).animate({height:height},speed,function(){$(this).children().css({
                position:"static"
                });
            });
            callback?callback():false;
            return $;
        },
        slideBottomClose:function(speed,callback){
            $(this).children().css({
                position:"absolute",
                bottom:0
            });
            $(this).css({position:"relative"});
            $(this).animate({height:0},speed,function(){
                $(this).css("display","none");
            });
            callback?callback():false;
            return $;
        },*/
        slideHDrawerOpen:function(speed,callback){
            $(this).children().css({float:"right"});
            var width=$(this).width();
            $(this).width(0);
            $(this).animate({width:width},speed,function(){$(this).children().css("float","none");});
            callback?callback():false;
            return $;
        },
        slideHDrawerClose:function(speed,callback){
            $(this).children().css({float:"right"});
            var width=$(this).width();
            $(this).animate({width:0},speed,function(){
                $(this).children().css("float","none");
                $(this).css("display","none");
            });
            callback?callback():false;
            return $;
        },
        slideHVOpen:function(speed1,speed2,callback){
            var width=$(this).width();
            var height=$(this).height();
            $(this).width(0);
            $(this).height(0);
            if(speed1>=speed2){
                $(this).animate({width:width},{duration:speed1,queue:false})
                       .animate({height:height},{duration:speed2,queue:false});
            }else{
                $(this).animate({height:height},{duration:speed2,queue:false})
                       .animate({width:width},{duration:speed1,queue:false});
            }

            callback?callback():false;
            return $;
        },
        slideHVClose:function(speed1,speed2,callback){
            $(this).animate({width:0},{
                    duration:speed1,
                    queue:false,
                    complete:function() {
                        $(this).css("display", "none");
                    }
            })
                .animate({height:0},{
                    duration:speed1,
                    queue:false,
                    complete:function(){
                        $(this).css("display","none");
                    }
                });
            callback?callback():false;
            return $;
        },
    });
})(jQuery);