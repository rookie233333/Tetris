//角色命名空间
var roles={};

roles.bg={
	show:function(pen,img_index){
//		pen.globalAlpha=0.1;
//		pen.fillStyle= "#EBEBEB";
		switch(img_index){
			case 0:
				pen.fillStyle="#EBEBEB";
				pen.fillRect(0,0,490,700);//绘制矩形
				break;
			case 1:
				drawImageFrame(pen,"img/bg1.jpg",700,50,600,1100,0,0,490,700);break;
			case 2:
				drawImageFrame(pen,"img/bg2.jpg",700,50,600,1100,0,0,490,700);break;
			case 3:
				drawImageFrame(pen,"img/bg3.jpg",700,50,600,1100,0,0,490,700);break;
			case 4:
				drawImageFrame(pen,"img/bg4.jpg",700,50,600,1100,0,0,490,700);break;
			case 5:
				drawImageFrame(pen,"img/bg5.jpg",700,50,600,1100,0,0,490,700);
		}
//		drawImageFrame(pen,"img/sky_mountain.jpg",700,50,600,1100,0,0,490,700);
	}
};
roles.tub={//10*20
	grid:[
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	],
	show:function(pen){
		for(var i=0;i<this.grid.length;i++){
			for(var j=0;j<this.grid[i].length;j++){
				pen.strokeStyle="white";
				pen.strokeRect(j*35,i*35,35,35);//绘制矩形框
				if(this.grid[i][j]==1){
					pen.fillStyle="#E86A82";
					pen.fillRect(j*35,i*35,33,33);//绘制矩形
				}
			}
		}
	}
};

function Block(box){
	this.box=box;
	this.row=-box.length;//行
	this.col=4;//列
	this.speedUp=1;
	this.Lock=true;
};
Block.prototype.show=function(pen){
	for(var i=0;i<this.box.length;i++){
			for(var j=0;j<this.box[i].length;j++){
				if(this.box[i][j]==1){
					pen.fillStyle="#E86A82";
					pen.fillRect((j+this.col)*35,(i+this.row)*35,33,33);//绘制矩形
				}
			}
		}		
}
Block.prototype.fall=function(){
	if(this.row<roles.tub.grid.length-this.box.length && touchDown(this.box,this.row,this.col,this.box.length,this.box[0].length)){
		this.row++;		
	}else{
		if(this.Lock){
			if(roles.block.length>0){
				if(roles.over.check2(this.row)){
					roles.block[0].store();
				}else operation=false;
			}
				
			roles.block.remove(this);
			roles.bingo.check();
			this.Lock=false;
		}
	}
//	if(this.row<8)this.row++;
}
Block.prototype.left=function(){
	if(this.col>0 && touchLeft(this.box,this.row,this.col,this.box.length,this.box[0].length))
		this.col--;
}
Block.prototype.right=function(){
	if(this.col<roles.tub.grid[0].length-this.box[0].length && touchRight(this.box,this.row,this.col,this.box.length,this.box[0].length))
		this.col++;
}
Block.prototype.turn=function(){//turn算法是以数组[0][0]为圆心旋转，所以旋转时候要考虑右、下特殊情况
	var b=new Array(this.box[0].length);
	var myindex=true;
	if(this.box[0].length>2 && this.box[0].length-1>roles.tub.grid.length-this.row-1
		||this.box[0].length>2&&!touchDown(this.box,this.row+this.box[0].length-1,this.col,this.box.length,this.box[0].length)){//下
			return;
	}else if(this.box.length==4 && 3>roles.tub.grid[0].length-this.col-1
		||!touchRight(this.box,this.row,this.col+2,this.box.length,this.box[0].length)&&this.box.length==4
		||!touchRight(this.box,this.row,this.col+1,this.box.length,this.box[0].length)&&this.box.length==4){
			return;
	}else{
		for(var i=0;i<b.length;i++){
			b[i]=new Array(this.box.length);
		}
		for(var i=0;i<this.box.length;i++){
			for(var j=0;j<this.box[i].length;j++){
				b[j][this.box.length-i-1]=this.box[i][j];
			}
		}
		if(this.row==roles.tub.grid.length-this.box.length){//保证不溢出
			this.row=roles.tub.grid.length-b.length;
		}
//		if(this.col==roles.tub.grid[0].length-this.box[0].length)//右边靠墙
//			this.col=roles.tub.grid[0].length-b[0].length;
		if(!touchDown(this.box,this.row,this.col,this.box.length,this.box[0].length))//下有方块
			this.row+=this.box.length-b.length;
//		if(!touchRight(this.box,this.row,this.col,this.box.length,this.box[0].length))//右有方块
//			this.col+=this.box[0].length-b[0].length;
//		if(this.box[0].length==1){//条形方块特殊情况
//			if(this.col==roles.tub.grid[0].length-this.box[0].length-1 || this.col==roles.tub.grid[0].length-this.box[0].length-2)//右面相隔一个和两个单位情况
//				this.col=roles.tub.grid[0].length-b[0].length;
//			if(!touchRight(this.box,this.row,this.col+1,this.box.length,this.box[0].length) || !touchRight(this.box,this.row,this.col+2,this.box.length,this.box[0].length)){
//				this.col+=this.box[0].length-b[0].length;
//				console.log(this.col);
//				if(this.col<0)myindex=false;
//			}
//		}
		this.box=b;
	}
	
//	else this.box=this.box;
}
Block.prototype.store=function(){
	for(var i=this.row,m=0;i<this.row+this.box.length,m<this.box.length;i++,m++){
		for(var j=this.col,n=0;j<this.col+this.box[0].length,n<this.box[0].length;j++,n++){
			if(this.box[m][n]==1)
				roles.tub.grid[i][j]=this.box[m][n];
		}
	}	
}
roles.block=new Array();

//产生block
function BlockFactory(){
	this.block=new Array();
	this.block[0]=[[0,0,1],
				   [1,1,1]];
	this.block[1]=[[1,0,0],
				   [1,1,1]];
	this.block[2]=[[0,1,0],
				   [1,1,1]];
	this.block[3]=[[1,1,0],
				   [0,1,1]];
	this.block[4]=[[0,1,1],
				   [1,1,0]];
	this.block[5]=[[1,1],
				   [1,1]];
	this.block[6]=[[1],
				   [1],
				   [1],
				   [1]];
}
BlockFactory.prototype.product=function(r){
	if(!roles.over.check1(3,this.block[r][0].length))operation=false;
	roles.block[roles.block.length]=new Block(this.block[r]);
	random=Math.floor(Math.random()*6+1);
}
roles.blockFactory=new BlockFactory();
 
//满十下移
function Bingo(){
	
}
Bingo.prototype.check=function(){
	var myLine=20;//行高
	var line=document.getElementById("myLine");
	for(var i=0;i<roles.tub.grid.length;i++){
		var sign=0,line_sign=0;
		for(var j=0;j<roles.tub.grid[i].length;j++){
			if(roles.tub.grid[i][j]==0){
				break;
			}else{
				sign++;
			}
		}
		for(var j=0;j<roles.tub.grid[i].length;j++){
			if(roles.tub.grid[i][j]==1){
				break;
			}else{
				line_sign++;
			}
		}
		if(sign==roles.tub.grid[i].length){
			user_score+=2*game_speed;
			for(var m=i;m>0;m--){
				for(var n=0;n<roles.tub.grid[i].length;n++){
					roles.tub.grid[m][n]=roles.tub.grid[m-1][n];
				}
			}
		}
		if(line_sign==roles.tub.grid[i].length)myLine--;
	}
	line.innerHTML=myLine;//设置行高
}
roles.bingo=new Bingo();

//游戏结束判断
function Over(){
	
}
Over.prototype.check1=function(col,width){
	for(var i=col;i<col+width;i++){
		if(roles.tub.grid[0][i]==1)
			return false;
	}
	return true;
}
Over.prototype.check2=function(row){
	if(row<0)return false;
	else return true;
}
roles.over=new Over();
//下一个block
function Next(){

}
Next.prototype.show=function(pen){
	for(var i=10;i<14;i++)
		for(var j=2;j<6;j++){
			pen.strokeStyle="#FDFDFD";
			pen.strokeRect(i*35,j*35,35,35);//绘制矩形框
		}
}
Next.prototype.drawNext=function(pen,box){
	for(var i=0;i<box.length;i++){
			for(var j=0;j<box[i].length;j++){
				if(box[i][j]==1){
					pen.fillStyle="#E86A82";
					pen.fillRect((j+11)*35,(i+2)*35,33,33);//绘制矩形
				}
			}
		}	
}
roles.next=new Next();


