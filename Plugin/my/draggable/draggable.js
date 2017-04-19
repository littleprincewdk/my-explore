/**
 * Created by Wudengke on 2016/6/1.
 */
(function($){
    $.fn.extend({
        myDraggable:function(settings){
            var initWidth=parseInt($(this).width());
            var initHeight=parseInt($(this).height());
            var parentLeft=$(this).parent().offset().left;
            var parentTop=$(this).parent().offset().top;
            var parentWidth=$(this).parent().width(),
                parentHeight=$(this).parent().height();
            var defaults={
                minWidth:initWidth,
                minHeight:initHeight,
                maxWidth:initWidth*2,
                maxHeight:initHeight*2,
                increment:0.1,           //每次滚动增量
                isBuffer:false,          //是否启用移动缓冲效果
            };
            var settings= $.extend(defaults,settings);
            var content=this;
            $(content).mousewheel(function(event, delta, deltaX, deltaY){
                var width=parseInt($(this).width());
                var height=parseInt($(this).height());
                var left=parseInt($(this).css("left"));
                var top=parseInt($(this).css("top"));
                var left_start=$(content).position().left;
                var top_start=$(content).position().top;
                var mouse_content=event.pageX-left_start-parentLeft;
                if(delta>0&&width<settings.maxWidth&&height<settings.maxHeight){
                    var wIncrement=width*settings.increment*delta;
                    var hIncrement=height*settings.increment*delta;
                    var leftIncrement=wIncrement*mouse_content/width;
                    var topIncrement=hIncrement*mouse_content/width;
                    width=(wIncrement+parseInt(width))+"px";
                    height=(hIncrement+parseInt(height))+"px";
                }else if(delta<0&&width>settings.minWidth&&height>settings.minHeight) {
                    var wIncrement = parseInt(width) / (1 + settings.increment) - width;
                    var hIncrement = parseInt(height) / (1 + settings.increment) - height;
                    var leftIncrement = wIncrement * mouse_content / width;
                    var topIncrement = hIncrement * mouse_content / width;
                    width = parseInt(width) / (1 + settings.increment) + "px";
                    height = parseInt(height) / (1 + settings.increment) + "px";
                }
                $(content).css({
                    width:width,
                    height:height,
                    left:left_start-leftIncrement+"px",
                    top:top_start-topIncrement+"px",
                });
            });
            $(content).css({position:"absolute",cursor:"move"});
            var left_init=$(content).position().left;
            var top_init=$(content).position().top;
            $(content).mousedown(function(e1){
                e1.preventDefault();//!!!!!!!
                var width=parseInt($(this).width()),
                    height=parseInt($(this).height());
                var left_start=$(content).position().left,
                    top_start=$(content).position().top;
                left_init=$(content).position().left;
                top_init=$(content).position().top;
                var x_start=e1.pageX,y_start=e1.pageY;
                $(content).mousemove(function(e2){
                    var x_end= e2.pageX,y_end= e2.pageY;
                    if((left_start+(x_end-x_start))<0&&(width+left_start-parentWidth+(x_end-x_start))>0){
                        $(content).css({left:left_start+(x_end-x_start)+"px"});
                    }
                    if((top_start+(y_end-y_start))<0&&(height+top_start-parentHeight+(y_end-y_start))>0){
                        $(content).css({top:top_start+(y_end-y_start)+"px"});
                    }
                });
            });
            $("body").mouseup(function(){
                $(content).unbind("mousemove");
                if(settings.isBuffer){
                    var left_final=$(content).position().left;
                    var top_final =$(content).position().top;
                    var move_x=left_final-left_init;
                    var move_y=top_final-top_init;
                    var buffer_x=move_x*0.3;
                    var buffer_y=move_y*0.3;
                    if((left_final+buffer_x)<0&&(top_final+buffer_y)<0){
                        $(content).animate({
                            left:"+="+buffer_x+"px",
                            top :"+="+buffer_y+"px"
                        })
                    }
                }
            });
        }
    });
})(jQuery)