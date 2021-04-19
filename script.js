let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 7 * box,
    y: 7 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let color="#C9FFA9"

function changeColor(){
    color = Math.floor(Math.random() * 7);
    switch(color){
        case 0: color="#C9FFA9"; break;
        case 1: color="#0047FD"; break;
        case 2: color="#b9a8f0"; break;
        case 3: color="#92F22A"; break;
        case 4: color="#FD5B03"; break;
        case 5: color="#1D2247"; break;
        case 6: color="#5659C9"; break;
    }
    return color
}

function createBG(){
    let grad = context.createLinearGradient(0,0,0,400)
    grad.addColorStop(0,"#cef2e6")
    grad.addColorStop(1,"#7BB0A6");
    context.fillStyle= grad
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake(){
    for (let i = 0; i < snake.length; i++){
        context.fillStyle = "#FF0D90";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(color){
    context.fillStyle = color;
    context.fillRect(food.x, food.y, 28, 28);
}


function startGame(){
    let buttons = document.getElementsByName('radios')
    buttons[0].blur();
    buttons[1].blur();
    buttons[2].blur();
    document.querySelector('body').focus();

    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
    for (i = 1; i < snake.length; i++){
        if(snake[0].x == snake [i].x && snake[0].y == snake [i].y){
            clearInterval(game);
            alert('Game Over!')
            document.location.reload(true);
        }
    }
    createBG();
    createSnake();
    drawFood(color)
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    switch (direction){
        case "right": snakeX += box; break;
        case "left": snakeX -= box; break;
        case "up": snakeY -= box; break;
        case "down": snakeY += box; break;
    }

    if (snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        changeColor();
        
        let div = document.getElementById('pontos');
        div.innerHTML=`Pontos: ${i}`
        }
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

document.addEventListener('keydown', update);

function changeSpeed(speed){
    clearInterval(game);
    game = setInterval(startGame, speed);
}

let game = setInterval(startGame, 250);


