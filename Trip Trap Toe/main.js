let player1= document.querySelector('[data-player1]');
let player2= document.querySelector('[data-player2]');
const first= document.querySelector('[data-first]');
const second= document.querySelector('[data-second]');
let chance= document.querySelector('[data-chance]');
const popupText=document.querySelector('[data-popup]');
const popup2Text=document.querySelector('[data-popup2]');
const cont= document.querySelector('.container');
const tossBtn= document.querySelector('.toss-btn');
const coin=document.querySelector('.coin');
const popup=document.querySelector('.popup');
const popup2=document.querySelector('.popup2');
const head=document.querySelector('.head');
let winner, player1_, player2_, temp,p1='', p2='';

tossBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(player1.value!='' && player2.value!='')
    {
      coin.classList.add('coin-toss');
      coin.addEventListener("animationend", ()=>{
      popupText.innerHTML=toss();
      popup.style.transform='translate(-50%, -50%) scale(1)';
      popup.style.opacity='1';
      popup.classList.add('pointer');
      head.classList.add('blur');
      cont.classList.add('blur');
 
    })
   } 
    else{
      popup2Text.innerHTML='Input names before starting the game !';
      popup2.style.transform='translate(-50%, -50%) scale(1)';
      popup2.style.opacity='1';
      popup2.classList.add('pointer');
      head.classList.add('blur');
      cont.classList.add('blur');
    }
})

document.addEventListener('scroll',(e)=>{
  let section= location.href;
  const l= section.length- 3;

  if((section.slice(l, ))=='two'){
    popup.style.transform='scale(0)'; 
    popup.style.opacity='0';
    head.classList.remove('blur');
    cont.classList.remove('blur');
    one.style.display='none';
  }
  else if((section.slice(l, ))=='one')
    two.style.display='hidden';
  })

function toss(){
  player1_= player1.value;
  player2_=player2.value;
  let random=Math.floor( Math.random()*2);
  winner= random? player1_: player2_;
  return winner;
}


//Section-2

const cells=document.querySelectorAll('[data-cell]')
const finalmsg=document.querySelector('.final-msg')
const title=document.querySelector('.title')
const innerText=document.querySelector('[data-text]')


const winningCombinations=[[0,1,2], [1,2,3], [4,5,6], [5,6,7], [8,9,10],[9,10,11],[12,13,14], [13,14,15],
                          [0,4,8],[1,5,9],[2,6,10],[3,7,11],[4,8,12],[5,9,13], [6,10,14],[7,11,15],
                          [0,5,10],[5,10,15],[1,6,11],[3,6,9],[6,9,12],[2,5,8],[4,6,14],[5,10,15],
                          [7,10,13],[6,9,12],[4,9,14]
                        ]
let player_2=false


startGame()



function startGame(){

  player_2=false

cells.forEach(cell => {
  cell.classList.remove('x')
  finalmsg.classList.remove('show')
  cell.removeEventListener('click', handleClick)
cell.addEventListener('click', handleClick, {once:true})
})
}


function handleClick(e){
  const cell=e.target;
  const current= player_2? player1_ : player2_
  player_2=!player_2
  chance.innerText=`${current}'s turn`
  placeMark(cell)
  if(checkWin()){
    innerText.innerHTML= `${current} won!!`
    finalmsg.classList.add('show')

  }
}
function placeMark(cell){
  cell.classList.add('x')

}

function checkWin(){
  return winningCombinations.some(combination=>{
    return combination.every(index=>{
      return cells[index].classList.contains('x')
    })
  })
}

//Getting the players
first.addEventListener('click', e=>{
  if(winner === player2_){
      swap()
  }
  playerChance()
})

second.addEventListener('click', e=>{
  if(winner === player1_){
      swap()
  }
  
  playerChance()
  console.log('y')
})


function swap(){
  const temp =player1_;
  player1_=player2_;
  player2_=temp;
 
}

function playerChance(){
  chance.innerText=`${player1_}'s turn`
}