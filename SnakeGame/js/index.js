// Game Constants & Variables
let lastInput={x:13,y:15}
const popup=document.querySelector('.popup');
const popupRules=document.querySelector('.popup-rules');
const restart=document.querySelector('.restart');
const popupScore=document.querySelector('.popup h2');
const body=document.querySelector('.body');
const playBtn=document.querySelector('button.btn');
const restartBtn=document.querySelector('.restart');
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.wav');
const gameOverSound = new Audio('music/helloDgameover.mp3');

let d=false;
const speedArr=[15,19,24,28,32];
let speed = 14;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

setTimeout(showPopupRules, 1500);


function showPopupRules(){
    body.style.filter = "blur(8px)";
    body.style.pointerEvents ="none";
    popupRules.style.transform="translate(-50%, -50%) scale(1)";
    popupRules.style.opacity="1";  
  
 
};


playBtn.addEventListener('click', e=>{
    
    popupRules.style.opacity="1";  
    popupRules.style.transform="translate(-50%, -50%) scale(0)";
    popupRules.style.display="flex";
    body.style.pointerEvents ="all";
    body.style.filter = "none";
    d=true;
  
    
})

//restartBtn working...
restartBtn.addEventListener('click', e=>{

    popup.style.opacity="1";  
    popup.style.transform="translate(-50%, -50%) scale(0)";
    // popup.style.display="flex";
    body.style.pointerEvents ="all";
    body.style.filter = "none";
    gameOverSound.pause();
    gameOverSound.currentTime=0;
    snakeArr = [{x: 15, y: 15}];
    score=0;
    scoreBox.innerHTML = "Score: " + score;


})

// playBtn.addEventListener('click', e=>{
//     e.preventDefault();
//     console.log('hi');
// })


//increasing speed randomly after every 3rd increement
function randomSpeed(){
    if(score%1===0)
    {
        const randomVel= Math.ceil(Math.random()*4);
        speed=speedArr[randomVel];
        
    }
}

//show popup
function showPopup(){
    popupScore.textContent=`Your Score: ${score}`;
    body.style.filter = "blur(8px)";
    body.style.pointerEvents ="none";

    popup.style.transform="translate(-50%, -50%) scale(1)";
    popup.style.display="flex";
    popup.style.opacity="1";
    
      
   
}
// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
       
        inputDir =  {x: 0, y: 0}; 
       showPopup();
        // snakeArr = [{x: 15, y: 15}];
         
    }
    

    
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        
        randomSpeed();
        if(score>hiscoreval){
            hiscoreval = score;
           
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score:  " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    lastInput=inputDir;
    
       
    if(d)
    switch (e.key) {
        case "ArrowUp":
            if(lastInput.y==1) break;
        
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            if(lastInput.y!==0) break;
            
            inputDir.x = 0;
            inputDir.y = 1;
            break;
            

        case "ArrowLeft":
           
           if(lastInput.x!==0) break;
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            if(lastInput.x!==0) break;
            
            inputDir.x = 1;
            inputDir.y = 0;
            break;
      
    }
});