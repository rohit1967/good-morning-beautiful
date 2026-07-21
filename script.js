const playArea = document.getElementById("playArea");
const scoreText = document.getElementById("score");
const giftBtn = document.getElementById("giftBtn");
const giftBox = document.getElementById("giftBox");
const restartBtn = document.getElementById("restart");
const game = document.getElementById("game");

let score = 0;
let gameOver = false;

// Start Game
const gameLoop = setInterval(() => {
    if (!gameOver) {
        createHeart();
    }
}, 700);

// Create Heart
function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    const hearts = ["❤️","💖","💗","💕","💘"];

    heart.innerHTML = hearts[Math.floor(Math.random()*hearts.length)];

    const maxX = playArea.clientWidth - 50;

    heart.style.left = Math.random() * maxX + "px";

    heart.style.animationDuration = (3 + Math.random()*2) + "s";

    playArea.appendChild(heart);

    heart.onclick = () => {

        if(gameOver) return;

        score++;

        scoreText.textContent = score;

        burst(heart.offsetLeft,heart.offsetTop);

        heart.remove();

        if(score>=10){

            gameOver=true;

            giftBtn.style.display="inline-block";

        }

    };

    setTimeout(()=>{

        if(heart.parentNode){

            heart.remove();

        }

    },5000);

}

// Sparkle Effect

function burst(x,y){

    const icons=["✨","⭐","💖","🌸","💫"];

    for(let i=0;i<15;i++){

        const p=document.createElement("div");

        p.innerHTML=icons[Math.floor(Math.random()*icons.length)];

        p.style.position="absolute";
        p.style.left=x+"px";
        p.style.top=y+"px";
        p.style.fontSize="24px";
        p.style.pointerEvents="none";
        p.style.zIndex="999";

        playArea.appendChild(p);

        const dx=(Math.random()-0.5)*220;
        const dy=(Math.random()-0.5)*220;

        p.animate(
        [
            {
                transform:"translate(0,0) scale(1)",
                opacity:1
            },
            {
                transform:`translate(${dx}px,${dy}px) scale(2)`,
                opacity:0
            }
        ],
        {
            duration:800,
            easing:"ease-out"
        });

        setTimeout(()=>{

            p.remove();

        },800);

    }

}

// Gift Button

giftBtn.onclick = () => {

    game.style.display="none";

    giftBox.style.display="flex";

};

// Restart

restartBtn.onclick = () => {

    location.reload();

};