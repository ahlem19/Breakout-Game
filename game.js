//select canvas element
const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");

//add border to canvas
cvs.style.border = "1px solid #0ff";

//make line thik when drawing to canvas
ctx.lineWidth=3;

//game variable and constant
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS=8;

let LIFE=3; //player has 3 lives
let leftArrow=false;
let rigthArrow=false;



//create the paddle
const paddle = {
    x : cvs.width/2 - PADDLE_WIDTH/2,
    y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
    dx :5
}

//create the ball
const ball={
    x: cvs.width/2,
    y: paddle.y -BALL_RADIUS,
    radius: BALL_RADIUS,
    speed: 4,
    dx: 3,
    dy: -3

}

//control the paddle
document.addEventListener("keydown",function(event){
    if (event.keyCode==37){
        leftArrow=true;
    }else if(event.keyCode==39){
        rigthArrow=true;
    }

});

document.addEventListener("keyup",function(event){
    if (event.keyCode==37){
        leftArrow=false;
    }else if(event.keyCode==39){
        rigthArrow=false;
    }

});

//move paddle
function movePaddle(){
    if (rigthArrow && paddle.x+paddle.width <cvs.width){
        paddle.x+=paddle.dx;
    } else if (leftArrow && paddle.x>0){
        paddle.x-=paddle.dx;
    }
}

//move the ball
function moveBall(){
    ball.x +=ball.dx;
    ball.y +=ball.dy;
}

//draw paddle

function drawPaddle(){
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    ctx.strokeStyle = "#ffcd05";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

//draw the ball
function drawBall(){

   ctx.beginPath();

   ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2); 
   ctx.fillStyle="#ffcd05";
   ctx.fill();

   ctx.strokeStyle = "#2e3548";
   ctx.stroke();

   ctx.closePath();
}




//ball and wall collision detection
function ballwallcollision(){
    if (ball.x+ball.radius>cvs.width || ball.x-ball.radius<0){
        ball.dx= -ball.dx;
    }
    if (ball.y-ball.radius <0){
        ball.dy= -ball.dy;
    }
    if (ball.y +ball.radius>cvs.height){
        LIFE--; //lose life
        resetBall();
    }
}

//reset the ball
function resetBall(){
    ball.x= cvs.width/2;
    ball.y= paddle.y -BALL_RADIUS;
    ball.dx= 3*(Math.random()*2-1);
    ball.dy= -3;
}



//draw function
function draw(){
    ctx.drawImage(BG_IMG,0,0);
    drawPaddle();
    drawBall();

}

//update game function
function update(){
    movePaddle();
    moveBall();
    ballwallcollision();

}

//game loop 
function loop(){
    draw();
    
    update();

    requestAnimationFrame(loop);
}
loop();
