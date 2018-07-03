//通用函数定义
Array.prototype.remove = function(obj) {    
    for (var i = 0; i < this.length; i++) {    
        if (this[i] === obj) {    
            this.splice(i, 1);    
            break;    
        }    
    }    
} 

function drawImage(pen,url,x,y){
	var img=new Image();
	img.src=url;
	//img.onload=function(){
		pen.drawImage(img,x,y);
	//}
}

function drawFlipImage(pen,url,x,y){
		var img=new Image();
		img.src=url;
		//img.onload=function(){
			pen.save();
			pen.rotate(180*Math.PI/180);
			pen.drawImage(img,-x-img.width, -y-img.height);
			pen.restore();
		//}	
}

function drawImageFrame(pen,url,sx,sy,sw,sh,dx,dy,dw,dh){
		var img=new Image();
		img.src=url;
		//img.onload=function(){
			pen.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);
		//}	
}
//碰撞检测
function touchDown(box,row,col,height,width){
	if(roles.block[0].row>=0){
		for(var m=height-1,n=row+height;m>-1,n>row;m--,n--){
			for(var i=col,j=0;i<col+width,j<width;i++,j++){
				if(box[m][j]==1 && roles.tub.grid[n][i]==1)
					return false;
			}
		}
	}
	return true;
}
function touchLeft(box,row,col,height,width){
	for(var j=0;j<width;j++ )
		for(var i=0;i<height;i++){
			if(box[i][j]==1 && roles.tub.grid[row+i][col-1+j]==1){
					return false;
			}
		}
	return true;
}
function touchRight(box,row,col,height,width){
	for(var i=width-1;i>-1;i--)
		for(var j=0;j<height;j++){
			console.log("debug1");
			if(box[j][i]==1 && roles.tub.grid[row+j][col+i+1]==1){
				console.log("debug2");
				return false;
			}
			
		}
	return true;
}
//计时器
function TimerTicker(second){
	this.step=0;
	this.max=Math.floor(second*1000/40);
};
TimerTicker.prototype.isOver=function(){
	if(this.step<this.max){
		this.step++;
		return false;
	}else{
		return true;
	}
};
TimerTicker.prototype.reset=function(){
	this.step=0;
};
