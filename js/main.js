//方向控制量
var step=0;
//显示角色
function showRoles(){
	var score=document.getElementById("myScore");
	var grade=document.getElementById("myGrade");
	if(roles.block.length==0){
		roles.blockFactory.product(random);
	}
	roles.bg.show(pen,bg_index);
	roles.next.show(pen);
	roles.next.drawNext(pen,roles.blockFactory.block[random]);
//	roles.block.store();
	roles.tub.show(pen);
	if(roles.block.length>0)
		roles.block[0].show(pen);
	if(step<(16-game_speed*roles.block[0].speedUp)){//控制下落间隔
		step++;
	}else{
		if(roles.block.length>0)
			roles.block[0].fall();
		step=0;
	}
	//等级难度设置
	if(hardStep<3000){//大概两秒分钟刷新一次
		hardStep++;
	}else{
		game_speed++;
		hardStep=0;
	}
	score.innerHTML=user_score;
	grade.innerHTML=game_speed;
}
//键盘按下
function keyDown(keyCode){
//	case 40:
//			if(roles.block.length>0&&roles.block[0].row>=0)roles.block[0].fall();
}
//键盘抬起 
function keyUp(keyCode){
	switch(keyCode){
		case 39:
			if(roles.block.length>0&&roles.block[0].row>=0)roles.block[0].right();break;
		case 37:
			if(roles.block.length>0&&roles.block[0].row>=0)roles.block[0].left();break;
		case 32:
			if(roles.block.length>0&&roles.block[0].row>=0)roles.block[0].turn();break;
		case 40:
			if(roles.block.length>0&&roles.block[0].row>=0)roles.block[0].speedUp=14/game_speed;
	}
}
