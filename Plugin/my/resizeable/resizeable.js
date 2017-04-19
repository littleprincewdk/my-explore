/**
 * Created by Wudengke on 2016/6/2.
 */
(function($){
    $.fn.extend({
        myResizeable:function(settings){
            var defaults={
                scope:5,
            };
            var settings= $.extend(defaults,settings);
            var content=this;
            var width=$(content).width(),
                height=$(content).height();
            var left=$(content).offset().left,
                top=$(content).offset().top;
            $(content).mousemove(function(e1){
                var cursor_x= e1.pageX,
                    cursor_y= e1.pageY;
                width=$(content).width();
                height=$(content).height();
                //设置光标样式
                if(cursor_x<=(width+left)&&cursor_x>=(width+left-settings.scope)){
                    if(cursor_y<=(height+top)&&cursor_y>=(height+top-settings.scope)){
                        $("body").css({cursor:"se-resize"});
                        $(content).mousedown(function(e2){
                            var width_init=$(content).width(),
                                height_init=$(content).height();
                            var cursor_x_init=e2.pageX,
                                cursor_y_init=e2.pageY;
                            $("body").mousemove(function(e3){
                                $("body").css({cursor:"se-resize"});
                                var cursor_x_final= e3.pageX,
                                    cursor_y_final= e3.pageY;
                                $(content).css({
                                    width:width_init+cursor_x_final-cursor_x_init+"px",
                                    height:height_init+cursor_y_final-cursor_y_init+"px"
                                });
                            });
                        });
                    }else{
                        $("body").css({cursor:"e-resize"});
                        $(content).mousedown(function(e2){
                            var width_init=$(content).width();
                            var cursor_x_init=e2.pageX;
                            $("body").mousemove(function(e3){
                                $("body").css({cursor:"e-resize"});
                                var cursor_x_final= e3.pageX;
                                $(content).css({
                                    width:width_init+cursor_x_final-cursor_x_init+"px"
                                });
                            });
                        });
                    }
                }else if(cursor_y<=(height+top)&&cursor_y>=(height+top-settings.scope)){
                    $("body").css({cursor:"s-resize"});
                    $(content).mousedown(function(e2){
                        var height_init=$(content).height();
                        var cursor_y_init=e2.pageY;
                        $("body").mousemove(function(e3){
                            $("body").css({cursor:"s-resize"});
                            var cursor_y_final= e3.pageY;
                            $(content).css({
                                height:height_init+cursor_y_final-cursor_y_init+"px"
                            });

                        });
                    });
                }else{
                    $("body").css({cursor:"default"});
                }
            });
            $("body").mouseup(function(){
                $(this).unbind("mousemove");
            });
        }
    });
})(jQuery)