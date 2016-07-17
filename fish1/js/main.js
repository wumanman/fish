/**
 * Created by Administrator on 2016/7/5.
 */

var can1;
var can2;
var ctx1;
var ctx2;
var canWidth;
var canHeight;
var lastTime;//上一针时间
var deltaTime;
var mx,my;
var babyTail=[];//鱼尾巴
var babyEye=[];
var babyBody=[];

//
var momTail=[];
var momEye=[];
var momBodyOra=[];
var momBodyBlue=[];
var data;
var wave;
var halo;




var bgPic=new Image();

document.body.onload=game;
//入口
function game() {
    init();
    lastTime=Date.now();
    deltaTime=0;
    gameloop();


}
function init() {
    //获取canvas context
    can1=document.getElementById("canvas1");//fishes,dust.UI.circle
    ctx1=can1.getContext('2d');
    can2=document.getElementById("canvas2");//background ane fruits
    ctx2=can2.getContext('2d');
    bgPic.src="img/background.jpg";
    // bgPic.src="background.jpg";

    canHeight=can1.height;
    canWidth=can1.width;
    can1.addEventListener('mousemove',onMousemove,false);
   // can1.addEventListener("mousemove", onMousemove,false);
    //
    ane=new aneObj();
    ane.init();
    fruit=new fruitObjct();
    fruit.init();
    mom=new momObj();
    mom.init();
    baby=new babyObj();
    baby.init();

    mx=canWidth*0.5;
    my=canHeight*0.5;

    for (var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "img/babyTail" + i + ".png";
    }
    for(var i=0;i<2;i++){
        babyEye[i]=new Image();
        babyEye[i].src="img/babyEye"+i+".png";
    }
     for(var i=0;i<20;i++){
         babyBody[i]=new Image();
         babyBody[i].src="img/babyFade"+i+".png";
     }
    for(var i=0;i<8;i++){
        momTail[i]=new Image();
        momTail[i].src="img/bigTail"+i+".png";

    }
    for(var i=0;i<2;i++){
        momEye[i]=new Image();
        momEye[i].src="img/bigEye"+i+".png";
    }
    data=new dataObj();
    for(var i=0;i<8;i++){
        momBodyOra[i]=new Image();
        momBodyBlue[i]=new Image();
        momBodyOra[i].src="img/bigSwim"+i+".png";
        momBodyBlue[i].src="img/bigSwimBlue"+i+".png";
    }
    ctx1.font="30px Verdana";
    ctx1.textAlign="center";

    wave=new waveObj();
    wave.init();
    halo=new haloObj();
    halo.init();

}

function gameloop() {

  requestAnimFrame(gameloop);  //setInterval setTimeOut ,frame per second
    // console.log("loop");
    var now=Date.now();
    deltaTime=now-lastTime;
    lastTime=now;
    if(deltaTime>40) deltaTime=40;
    // console.log(deltaTime);
    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    baby.draw();
    momfruitCollision();
    momBabyCollision();
    data.draw();
    wave.draw();//大鱼吃果实特效
    halo.draw();

}
function onMousemove(e) {
    if(!data.gameOver){
        if(e.offsetX||e.offsetY){
            mx=e.offsetX==undefined?e.offsetX:e.layerX;
            my=e.offsetY==undefined?e.offsetY:e.layerY;
            // console.log(mx);
        }
    }



}