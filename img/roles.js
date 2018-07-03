//角色命名空间
var roles={};


//设计背景角色
//因为背景简单而且只有一个对象，所以使用字面量创建对象
roles.bg={
	y:0,
	show:function(pen){
		drawImage(pen,"images/bluespace.png",0,this.y-600);
		drawImage(pen,"images/bluespace.png",0,this.y);
		this.y+=2;
		if(this.y>=600){
			this.y=0;
		}
	}
};

//坦克角色
function Tank(x,y){
	this.x=x;
	this.y=y;
	this.speed=8;
	this.dir=0;
	this.life=10;
};
//方法:原型模式
Tank.prototype.show=function(pen){
	drawImage(pen,"images/tank6.gif",this.x,this.y);
	return this;
}
//参数d接收方向控制量
Tank.prototype.move=function(d){
	this.dir=d;
	if(this.x+this.dir*this.speed>=0 && this.x+this.dir*this.speed <= 750){
		this.x+=this.dir*this.speed;
	}
}
Tank.prototype.fire=function(){
	roles.shots.push(new Shot(this.x+12,this.y,-2));
	roles.shots.push(new Shot(this.x+12,this.y,0));
	roles.shots.push(new Shot(this.x+12,this.y,2));
}
//坦克角色的初始化
roles.tank=new Tank(380,520);


//炮弹角色
function Shot(x,y,offset){
	this.x=x;
	this.y=y;
	this.speed=15;
	this.offset=offset;
}
//方法
Shot.prototype.show=function(pen){
	drawImage(pen,"images/plasmashot.png",this.x,this.y);
	return this;
}
Shot.prototype.move=function(){
	this.x+=this.offset;
	this.y-=this.speed;
	if(this.y<-24){
		roles.shots.remove(this);
	}
	return this;
}
Shot.prototype.hit=function(ship){
	//计算距离 
	//得到中心坐标
	var x1=this.x+12;
	var y1=this.y+12;
	var x2=ship.x+20;
	var y2=ship.y+20;
	var d=Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
	if(d<20){
		//飞船失血
		if(ship.life>0)ship.life--;
		//炮弹消失
		roles.shots.remove(this);
		//产生爆炸
	}
}

//炮弹测试
//roles.shot=new Shot(300,500);
//炮弹数组
roles.shots=[];


//飞船角色
function Ship(x,y){
	this.x=x;
	this.y=y;
	this.speed=8;
	this.dir=1;
	this.life=10;
}
//方法
Ship.prototype.show=function(pen){
	//显示血条
	pen.fillStyle="red";//红色
	pen.fillRect(this.x,this.y-10,this.life*4,10);//绘制矩形
	drawFlipImage(pen,"images/ship_thrust.png",this.x,this.y);
	return this;
}
Ship.prototype.move=function(){
	this.x+=this.dir*this.speed;
	if(this.x>=760){
		this.dir=-1;
	}
	if(this.x<=0){
		this.dir=1;
	}
	return this;
}


//初始化
roles.ship=new Ship(400,20);
