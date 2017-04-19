/**
 * Created by Wudengke on 2016/7/1.
 */
$(function(){
    function HanoiTower(n,towerL,towerC,towerR)
    {
        if(n==1){
            moveOrder.push({"from":towerL,"to":towerR});
        }else{
            HanoiTower(n-1,towerL,towerR,towerC);
            HanoiTower(1,towerL,towerC,towerR);
            HanoiTower(n-1,towerC,towerL,towerR);
        }
    }
    function move(i,moveOrder,speed){
        if(i<moveOrder.length){
            var length=moveOrder[i].to.disk.length;
            var bottom=65+length*20;
            var top=moveOrder[i].from.disk.pop();
            var left=moveOrder[i].to.left-$(top).width()/2+10;
            moveOrder[i].to.disk.push(top);

            var progress=$(".progress-body").html();
            var str="<br>from <span class='towerlocation'>"+moveOrder[i].from.name+"</span> to <span class='towerlocation'>"+moveOrder[i].to.name+"</span>";
            progress+=str;
            $(".progress-body").html(progress);
            $(".progress-body").scrollTop($(".progress-body").height());

            $(".progress-footer").text(i+1+"/"+moveOrder.length);

            $(top).animate({"bottom":"500px"},speed);//disk上移
            $(top).animate({"left":left+"px"},speed);//disk平移
            $(top).animate({"bottom":bottom+"px"},speed,function(){
                i++;
                move(i,moveOrder,speed);
            });//disk下移
        }else{
            $(".end").fadeIn(500);
            $(".end").fadeOut(500);
        }
    }
    var leftDisk=new Array();
    var centerDisk=new Array();
    var rightDisk=new Array();
    var moveOrder=new Array();
    var order=0;
    var speed=1000;
    $("#start").click(function(){
        order=$("#order").val();
        speed=$("#speed").val();console.log(speed)

        leftDisk=new Array();
        centerDisk=new Array();
        rightDisk=new Array();
        moveOrder=new Array();
        $(".progress-body").html("");
        $(".disk").remove();

        for(var i=0;i<order;i++){//创建disk
            //var disk="<div style='width:100px;height:10px;border:solid black 1px;'></div>";
            var width=200-30*i;
            var bottom=65+i*20;
            var left=260-width/2;
            var disk=$("<div class='disk'></div>").css({
                "width":width+"px",
                "height":"20px",
                "border":"solid white 1px",
                "background-color":"black",
                "position":"absolute",
                "left":left+"px",
                "bottom":500+"px",

            });
            leftDisk.push(disk);//disk入栈
            $(".tower").append(disk);
            $(disk).animate({"bottom":bottom+"px"},1000);
        }

        $(".start").fadeIn(500)
        setTimeout(function(){
            $(".start").fadeOut(500);
            var leftTower={"name":"left","disk":leftDisk,"left":250};
            var centerTower={"name":"center","disk":centerDisk,"left":650};
            var rightTower={"name":"right","disk":rightDisk,"left":1050};
            HanoiTower(order,leftTower,centerTower,rightTower);
            move(0,moveOrder,speed);
        },1000);

    })
})
