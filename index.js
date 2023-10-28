const gameBoard = document.querySelector("#gameBoard");
const bestscore= document.getElementById("bestscore");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#score");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let currentscore;
let highscore=0;
let running =false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize*4,y:0},{x:unitSize*3,y:0},{x:unitSize*2,y:0},{x:unitSize,y:0},{x:0,y:0}
]

window.addEventListener("keydown",changeDirection);
resetBtn.addEventListener("click",resetGame);

gameStart();
drawFood();
function gameStart(){
    running=true;
    scoreText.textContent=score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(function(){
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        },100)
    }
    else{
        displayGameover();
    }
};
function clearBoard(){
    ctx.fillStyle=boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function createFood(){
    function randomFood(min,max){
        const randNum = Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize;
        return randNum;
    }
    foodX=randomFood(0,gameWidth-unitSize);
    foodY = randomFood(0, gameHeight - unitSize);
};

function drawFood(){
    ctx.fillStyle=foodColor;
    ctx.fillRect(foodX,foodY,unitSize,unitSize);
    
};
function moveSnake(){
    const head={x:snake[0].x + xVelocity, y:snake[0].y + yVelocity};
    snake.unshift(head);
    if(snake[0].x==foodX && snake[0].y==foodY){
        score+=1;
        scoreText.textContent=score;
        currentscore = score;
        createFood();       
    }
    else{
        snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle=snakeColor;
    ctx.strokeStyle=snakeBorder;
    snake.forEach(snakePart=>{
        ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
        ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);
    })
};
function changeDirection(event){
    const keyPressed=event.keyCode;
    const left = 37;
    const up = 38;
    const right=39;
    const down = 40;
    const goingup=(yVelocity==-unitSize);
    const goingdown=(yVelocity==unitSize);
    const goingright=(xVelocity==unitSize);
    const goingleft=(xVelocity==-unitSize);

    switch(true){
        case(keyPressed==left && !goingright):
        xVelocity=-unitSize;
        yVelocity=0;
        break;
        case(keyPressed==up && !goingdown):
        xVelocity=0;
        yVelocity=-unitSize;
        break;
        case(keyPressed==right && !goingleft):
        xVelocity=unitSize;
        yVelocity=0;
        break;
        case(keyPressed==down && !goingup):
        xVelocity=0;
        yVelocity=unitSize;
        break;
    }
}
function checkGameOver(){
    switch(true){
        case(snake[0].x<0 || snake[0].x>=gameWidth || snake[0].y<0 || snake[0].y>=gameHeight):
        running=false;
        best();
        break;
    }
    for(let i=1;i<snake.length;i++){
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y){
            running=false;
            best();
            break;
        }
    }
};
function resetGame(){
    score=0;
    xVelocity=unitSize;
    yVelocity=0;
    snake = [
        {x:unitSize*4,y:0},{x:unitSize*3,y:0},{x:unitSize*2,y:0},{x:unitSize,y:0},{x:0,y:0}
    ]
    gameStart();
    
}
function displayGameover(){
    ctx.font="50px MV Boli";
    ctx.fillStyle ="black";
    ctx.fillText("GAME OVER!", gameWidth/4,gameHeight/2);
    running=false;
};
function best(){
    if (currentscore>=highscore){
        highscore=currentscore;

    }
    if (running==false){
        bestscore.innerHTML=`Best Score : ${highscore}`;
        bestscore.style.display="block";
    }
};


