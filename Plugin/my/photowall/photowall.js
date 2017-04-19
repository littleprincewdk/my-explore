/**
 * Created by Wudengke on 2016/7/4.
 */
function g(selector){
    return selector.substring(0, 1) == '.' ? document.getElementsByClassName(selector.substring(1)) : document.getElementById(selector.substring(1));
}
function range() {
    var range = {
        x: [],
        y: []
    };
    //获取最外围容器的宽度和高度
    var wrap = {
        width: g('#wrap').clientWidth,
        height: g('#wrap').clientHeight
    };
    //获取每一张海报的宽度和高度，因为海报的大小都是一样的，所以取第一张
    var photo = {
        width: g('.photo')[0].clientWidth,
        height: g('.photo')[0].clientHeight
    };
    //按照自己想要显示的区域进行计算，左右区域的高度 (top) 范围是一样的
    range.x = [0 - photo.width / 4, wrap.width - photo.width * 3 / 4];
    range.y = [0 - photo.height / 4, wrap.height - photo.height / 2];

    return range;
}
function random(range){
    var min = Math.min(range[0], range[1]);
    var max = Math.max(range[0], range[1]);
    var diff = max - min;
    /*
     *例如 [1, 20]，则 diff = 19 --> 0 <= Math.round(Math.random() * diff) <= 19
     *然后再加上最小值，即可随机生成 1 ~ 20 之间的任意数，如果使用 Math.floor() 则
     *生成 1 ~ 19 之间的任意数，使用 Math.ceil() 则生成 2 ~ 20 之间的任意数
     */
    var number = Math.round(Math.random() * diff) + min;
    return number;
}
function rsort(){
    var photos=g(".photo");
    for(var i=0;i<photos.length;i++){
        photos[i].style.left=random(range().x)+"px";
        photos[i].style.top=random(range().y)+"px";
        photos[i].style.transform = photos[i].style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1.0)';
    }
}
function addPhotos(data){
    var _wrap = '';
    for(var i = 0; i < data.length; i++){//for in 循环中的循环计数器是字符串，而不是数字它包含当前属性的名称或当前数组元素的索引
        _wrap += "<div class='photo'>" +
            "<img src='Plugin/my/photowall/images/"+data[i].img+"'>" +
            "</div>"
    }
    g('#wrap').innerHTML = _wrap;

    rsort();
}
addPhotos(data);