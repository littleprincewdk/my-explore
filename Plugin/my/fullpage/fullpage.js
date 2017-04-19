/**
 * Created by Wudengke on 2016/7/31.
 */
(function($){
    $.fn.extend({
        fullpage: function(settings){
            var defaults={
                speed:700,                 //滚动速度

            };
            var settings= $.extend(defaults,settings);

            var window_height=$(window).height();
            var num=$(".my-fullpage>.my-section").size();
            $(".my-fullpage").css("height",window_height);
            var cur=1;
            var init=function(){


            };
            var eventListener=function(){
                $('.my-section').mousewheel(function(event, delta, deltaX, deltaY) {
                    if(delta<0){
                        if(cur==num){
                            $(".my-fullpage").animate({top:0},settings.speed);
                            cur=1;
                        }else{
                            $(".my-fullpage").animate({top:"-="+window_height+"px"},settings.speed);
                            cur++;
                        }
                    }else{
                        if(cur==1){
                            $(".my-fullpage").animate({top:-(num-1)*window_height+"px"},settings.speed);
                            cur=num;
                        }else{
                            $(".my-fullpage").animate({top:"+="+window_height+"px"},settings.speed);
                            cur--;
                        }

                    }

                });
            };

            init();
            eventListener();

            return this.each(function(){

            });
        }
    });

})(jQuery);
