// ================================
// Elements
// ================================

const playArea = document.getElementById("playArea");
const scoreText = document.getElementById("score");
const giftBtn = document.getElementById("giftBtn");
const giftBox = document.getElementById("giftBox");
const restartBtn = document.getElementById("restart");
const game = document.getElementById("game");
const bgMusic = document.getElementById("bgMusic");
const playMusicBtn = document.getElementById("playMusicBtn");

// ================================
// Variables
// ================================

let score = 0;
let gameOver = false;

// ================================
// Music
// ================================

function startMusic() {

    if (!bgMusic) return;

    bgMusic.volume = 0.4;

    bgMusic.play().catch(() => {});

}

document.body.addEventListener("pointerdown", startMusic, {
    once: true
});

// Manual Play Button

if (playMusicBtn) {

    playMusicBtn.addEventListener("click", async () => {

        try {

            bgMusic.volume = 0.4;

            await bgMusic.play();

            playMusicBtn.innerHTML = "🎵 Music Playing";

            playMusicBtn.disabled = true;

        }

        catch (err) {

            console.log(err);

        }

    });

}

// ================================
// Heart Generator
// ================================

const heartInterval = setInterval(() => {

    if (!gameOver) {

        createHeart();

    }

}, 700);

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    const hearts = [

        "❤️",
        "💖",
        "💕",
        "💗",
        "💘"

    ];

    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

    const maxX = playArea.clientWidth - 50;

    heart.style.left = Math.random() * maxX + "px";

    heart.style.animationDuration = (3 + Math.random() * 2) + "s";

    playArea.appendChild(heart);

    function collectHeart() {

        if (gameOver) return;

        score++;

        scoreText.textContent = score;

        burst(

            heart.offsetLeft,

            heart.offsetTop

        );

        heart.remove();

        if (score >= 10) {

            gameOver = true;

            clearInterval(heartInterval);

            giftBtn.style.display = "inline-block";

            giftBtn.animate(

                [

                    {

                        transform: "scale(0.8)",

                        opacity: 0

                    },

                    {

                        transform: "scale(1.1)",

                        opacity: 1

                    },

                    {

                        transform: "scale(1)",

                        opacity: 1

                    }

                ],

                {

                    duration: 700,

                    easing: "ease-out"

                }

            );

        }

    }

    heart.addEventListener("pointerdown", collectHeart);

    setTimeout(() => {

        if (heart.parentNode) {

            heart.remove();

        }

    }, 5000);

}