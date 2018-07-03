/*
 * 主函数体
 */
var pen;
var random=Math.floor(Math.random()*6+1);//随机数
var operation=true;
var end;
var user_score=0;
var game_speed=1;
var hardStep=0;//难度计数
var bg_index=0;
window.onload=function(){
	//获取画布及画笔
	var canvas=document.getElementById("canvas");
	canvas.width=490;
	canvas.height=700;
	pen = canvas.getContext("2d");
	document.onkeydown=function(e){
		var currKey=0,e=e||event;
		keyCode=e.keyCode||e.which||e.charCode;
		keyDown(keyCode);
	};
	document.onkeyup=function(e){
		var currKey=0,e=e||event;
		keyCode=e.keyCode||e.which||e.charCode;
		keyUp(keyCode);
	};
	var pause=document.getElementsByClassName("img_pause")[0];
	var play=document.getElementsByClassName("img_play")[0];
	var refresh=document.getElementsByClassName("img_refresh")[0];
	pause.onclick=function(){
		pause.style.display="none";
		play.style.display="block";
		clearTimeout(end);
	}
	play.onclick=function(){
		pause.style.display="block";
		play.style.display="none";
		playGame();
	}
	refresh.onclick=function(){
		window.location.href="";
	}
	var last=document.getElementsByClassName("img_last")[0];
	var next=document.getElementsByClassName("img_next")[0];
	var bg=document.getElementById("bgPicture");
	last.onclick=function(){
		bg_index--;
		if(bg_index<0)bg_index=5;
		switch(bg_index){
			case 0:bg.src="img/bg0.jpg";break;
			case 1:bg.src="img/bg1.jpg";break;
			case 2:bg.src="img/bg2.jpg";break;
			case 3:bg.src="img/bg3.jpg";break;
			case 4:bg.src="img/bg4.jpg";break;
			case 5:bg.src="img/bg5.jpg";
		}
//		roles.bg.show(pen,bg_index);
	}
	next.onclick=function(){
		bg_index++;
		if(bg_index>5)bg_index=0;
		switch(bg_index){
			case 0:bg.src="img/bg0.jpg";break;
			case 1:bg.src="img/bg1.jpg";break;
			case 2:bg.src="img/bg2.jpg";break;
			case 3:bg.src="img/bg3.jpg";break;
			case 4:bg.src="img/bg4.jpg";break;
			case 5:bg.src="img/bg5.jpg";
		}
	}
	//启动游戏
	playGame();
}
function playGame(){
	//展示角色
	showRoles();
	//动画控制
	end=setTimeout("playGame()",40);
	//结束
	if(!operation){
		alert("GAME OVER!\nYOUR SCORE: "+user_score);
		clearTimeout(end);
		var r=confirm("TRY AGAIN?");
		if(r){
			window.location.href="";//网页重载
		}else window.close();
	}
}



