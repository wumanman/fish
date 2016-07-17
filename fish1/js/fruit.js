/**
 * Created by Administrator on 2016/7/6.
 */
//果实类
var fruitObjct=function () {

    this.x=[];
    this.y=[];

    this.alive=[];//bool;e
    this.len=[];
    this.spd=[];
    this.fruitType=[];

    this.orange=new Image();
    this.blue=new Image();


};

fruitObjct.prototype.num=30;
fruitObjct.prototype.init=function () {
  for(var i=0;i<this.num;i++){
      this.alive[i]=false;
      this.x[i]=0;
      this.y[i]=0;
      this.fruitType[i]=0; //果实类型
      this.len[i] = 0;	//果实绘制尺寸
      this.spd[i]=Math.random()*0.017+0.003;//[0,03,0,02)

      // this.spd[i] = Math.random() * 0.01 + 0.005; //果实漂浮速度
      this.born(i);

  }
    this.blue.src="img/blue.png";
    this.orange.src="img/fruit.png";
};

fruitObjct.prototype.draw=function () {

    for(var i=0;i<this.num;i++){
        //draw
        //find an ane,grow,fly up
        // ctx2.drawImage(this.orange,this.x[i]-this.orange.width*0.5,this.y[i]-this.orange.height*0.5);



        if(this.alive[i]){

            if(this.fruitType[i]=="blue"){
                var pic=this.blue;
            }
            else{
                var pic=this.orange;
            }
            if(this.len[i]<14){
                this.len[i]+=this.spd[i]*deltaTime;
            }
            else{
                this.y[i]-=this.spd[i]*7*deltaTime;
            }

            ctx2.drawImage(pic,this.x[i]-this.len[i]*0.5,this.y[i]-this.len[i]*0.5,this.len[i],this.len[i]);

            if(this.y[i]<10){
                this.alive[i]=false;
            }

        }
    }


};


fruitObjct.prototype.born=function (i) {

    var aneId=Math.floor(Math.random()*ane.num);
    this.x[i]=ane.headx[aneId];
    this.y[i]=ane.heady[aneId];
    this.len[i]=0;
    this.alive[i]=true;
    var ran=Math.random();

    if(ran<0.2){
        this.fruitType[i]="blue";

    }
    else{
        this.fruitType[i]="orange";
    }



};
fruitObjct.prototype.dead=function(i){
    this.alive[i]=false;

};



function fruitMonitor() {
    var num=0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]) num++;
    }
    if(num<15){
        //sendFruit;
        sendFruit();
        return;
    }

}
function sendFruit() {
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;

        }
    }

}