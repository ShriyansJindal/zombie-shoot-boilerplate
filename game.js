// Iteration 1: Declare variables required for this game
let game_body = document.getElementById("game-body")
let seconds = document.getElementById("timer").textContent
let lives = document.getElementById("lives")
let zombieID= 0;
let img = [
    'zombie-1.png',
    'zombie-2.png',
    'zombie-3.png',
    'zombie-4.png',
    'zombie-5.png',
    'zombie-6.png',
]
// Iteration 1.2: Add shotgun sound

let shotgun = new Audio("assets/shotgun.wav")
shotgun.volume = 0.2;

game_body.onclick = ()=>{
    shotgun.pause()
    shotgun.currentTime = 0
    shotgun.play()
}
// Iteration 1.3: Add background sound
let bgsound = new Audio("assets/bgm.mp3")
bgsound.play()
bgsound.loop = true;

// Iteration 1.4: Add lives
var maxLives = 4;
var noOflives =4;
// Iteration 2: Write a function to make a zombie
function makeZombie(){
    let randomImage = img[getRandomInt(0,img.length)];
    game_body.innerHTML+=`<img src ="assets/${randomImage}" class = 'zombie-image' id ='zombie${zombieID}'>`
    let zombie = document.getElementById("zombie"+zombieID)
    zombie.style.transform = `translateX(${getRandomInt(20,70)}vw)`
    zombie.style.animationDuration = `${getRandomInt(2,6)}s`
    zombie.onclick=()=>{
        zombieDestroy(zombie)
    }
}

// Iteration 3: Write a function to check if the player missed a zombie

function checkCollisionn(zombie){
    console.log(zombie.getBoundingClientRect())
    if(zombie.getBoundingClientRect().top<=0){
        noOflives--;
        return true
    }
    return false

}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed

function zombieDestroy(zombie){
    zombie.style.display = 'none'
    zombieID++
    makeZombie()
}

// Iteration 5: Creating timer
var timer = setInterval(()=>{
    seconds--
    document.getElementById("timer").textContent = seconds;
    let zombie = document.getElementById("zombie"+zombieID);
    if(checkCollisionn(zombie)==true){
        zombieDestroy(zombie)
        if(noOflives==0){
            location.href = 'game-over.html'
        }
    }
    if(seconds==0){
        location.href = 'win.html'
        
    }
},1000)

// Iteration 6: Write a code to start the game by calling the first zombie

makeZombie()

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min,max){
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random()*(max-min))+min
}
