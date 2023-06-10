//board
let blockSize;
let rows ;
let cols ;
let board;
let context;
let score = 0;
let scores1;
let scores;
let bestscoretext;
let speed = 2650;
let bestscore = parseInt(localStorage.getItem("score"));
let w = window.innerWidth;
let gover = document.getElementById('gameover');

if(bestscore === NaN || bestscore === null){
    localStorage.setItem('score',  `${score}`);
}

//console.log("bestscore: " + bestscore)
if(w > 768 ){
    blockSize = 25;
    rows = 20;
    cols = 20;
}
if(w < 768 ){
    blockSize = 20;
    rows = 16;
    cols = 16;
}

scores = document.getElementById('score');
scores1 = document.getElementById('score1');
scores.innerText = score < 10 ? "0" + score  : "" + score ;
scores1.innerText = score < 10 ? "0" + score  : "" + score ;
bestscoretext = document.getElementById('bestscore');
bestscoretext.innerText = parseInt(bestscore) < 10 ? "0" + parseInt(bestscore)  : "" + parseInt(bestscore) ;

//snake head 
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let velocityX = 0;
let velocityY = 0;

//snake tail
let snakeTail = [];

//food head 
let foodX ;
let foodY ;

// game Over
let gameOver = false;

//buttons
let upbtn = document.getElementById('up');
let downbtn = document.getElementById('down');
let leftbtn = document.getElementById('left');
let rightbtn = document.getElementById('right');

upbtn.addEventListener('click', function(e){
    e.preventDefault();
    if( velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
})
downbtn.addEventListener('click', function(e){
    e.preventDefault();
    if( velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
});
leftbtn.addEventListener('click', function(e){
    e.preventDefault();
    if( velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
});
rightbtn.addEventListener('click', function(e){
    e.preventDefault();
    if( velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
});



window.onload = function () {
   
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d');

    placeFood();
    document.addEventListener('keyup', changeDirection);
    setInterval(update, speed/10);
    
};

function update() {

    if (gameOver) {

        if(bestscore < score){
            localStorage.setItem('score',  `${score}`);
            bestscore = parseInt(localStorage.getItem("score"))
            bestscoretext.innerText = parseInt(bestscore) < 10 ? "0" + parseInt(bestscore)  : "" + parseInt(bestscore) ;
        }
        
        return ;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle= "crimson";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY){
        score+=5
        scores.innerText = score < 10 ? "0" + score :"" +score ;
        scores1.innerText = score < 10 ? "0" + score :"" +score ;
        snakeTail.push([foodX, foodY]);
        placeFood();
        //console.log({score});
    }

    for(let i = snakeTail.length - 1; i > 0; i--){
        snakeTail[i] = snakeTail[i - 1];    
    }
    if(snakeTail.length){
        snakeTail[0] = [snakeX, snakeY]
    }

    context.fillStyle= "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for(let i = 0; i < snakeTail.length; i++){
        context.fillRect(snakeTail[i][0], snakeTail[i][1], blockSize, blockSize);    
    }
    
    if(snakeX < 0 || snakeY < 0 || snakeX > cols * blockSize || snakeY > rows * blockSize){
        gameOver = true;
        gover.classList.remove("play");
        gover.setAttribute("class", "gameover");
       // console.log("the game is over")
    }
    for(let i = 0; i < snakeTail.length; i++){
        if(snakeX == snakeTail[i][0] && snakeY == snakeTail[i][1]){
            gameOver = true;
            gover.classList.remove("play");
            gover.setAttribute("class", "gameover");
            ///console.log("the game is over");
        }
    }
}
//move the snake 
function changeDirection(e){
    if(e.code == 'ArrowUp' && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
   else if(e.code == 'ArrowDown' && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == 'ArrowLeft'&& velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}
//change ramdom place food
function placeFood (){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

