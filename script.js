gsap.from('.head', {duration:1.2, x:'-100%',opacity:'0', ease:'bounce', delay:0.2 })


// --rotateSpeed: 10s;
// --bounceSpeed: 1.2s;
const body= document.querySelector('body')

setTimeout(setVariables, 5600)

function setVariables(){
body.style.setProperty("--rotateSpeed", "10s");
body.style.setProperty("--bounceSpeed", "1.2s");
}

gsap.from('.floor', {duration:0.8,opacity:'0', ease:'elastic', delay:1.2, stagger:1.2})
gsap.from('.cube', {duration:1, y:'-100%',opacity:'0', ease:'bounce', delay:1.7, stagger:1.2 })
gsap.from('.ball', {duration:1,opacity:'0', ease:'bounce', delay:5 })





