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
// ================================
// Sparkle Burst
// ================================

function burst(x, y) {

    const effects = ["✨", "⭐", "🌸", "💖", "💫", "💕"];

    for (let i = 0; i < 18; i++) {

        const p = document.createElement("div");

        p.innerHTML = effects[Math.floor(Math.random() * effects.length)];

        p.style.position = "absolute";
        p.style.left = x + "px";
        p.style.top = y + "px";
        p.style.fontSize = "24px";
        p.style.pointerEvents = "none";
        p.style.zIndex = "999";

        playArea.appendChild(p);

        const dx = (Math.random() - 0.5) * 250;
        const dy = (Math.random() - 0.5) * 250;

        p.animate(
            [
                {
                    transform: "translate(0,0) scale(1)",
                    opacity: 1
                },
                {
                    transform: `translate(${dx}px,${dy}px) scale(2)`,
                    opacity: 0
                }
            ],
            {
                duration: 900,
                easing: "ease-out"
            }
        );

        setTimeout(() => p.remove(), 900);
    }
}
// ================================
// Gift Button
// ================================

giftBtn.addEventListener("click", () => {

    startMusic();

    game.style.display = "none";

   giftBox.style.display = "flex";

giftBox.scrollTop = 0;

window.scrollTo({
    top: 0,
    behavior: "instant"
});

    giftBox.scrollTop = 0;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ================================
// Restart
// ================================

restartBtn.addEventListener("click", () => {

    location.reload();

});

// ================================
// Floating Petals
// ================================

function createPetal() {

    const petal = document.createElement("div");

    petal.innerHTML = "🌸";

    petal.style.position = "fixed";
    petal.style.left = Math.random() * window.innerWidth + "px";
    petal.style.top = "-40px";
    petal.style.fontSize = (20 + Math.random() * 20) + "px";
    petal.style.pointerEvents = "none";
    petal.style.zIndex = "1";

    document.body.appendChild(petal);

    const duration = 6000 + Math.random() * 3000;

    petal.animate(

        [

            {

                transform: "translate(0,0) rotate(0deg)",

                opacity: 1

            },

            {

                transform: `translate(${(Math.random() - 0.5) * 250}px,${window.innerHeight + 150}px) rotate(720deg)`,

                opacity: 0

            }

        ],

        {

            duration: duration,

            easing: "linear"

        }

    );

    setTimeout(() => {

        petal.remove();

    }, duration);

}

setInterval(createPetal, 900);

// ================================
// Window Resize
// ================================

window.addEventListener("resize", () => {

    if (score >= 10) {

        giftBtn.style.display = "inline-block";

    }

});

// ================================
// Disable Text Selection
// ================================

document.addEventListener("selectstart", (e) => {

    e.preventDefault();

});

// ================================
// Welcome Animation
// ================================

window.addEventListener("load", () => {

    game.animate(

        [

            {

                opacity: 0,

                transform: "scale(.95)"

            },

            {

                opacity: 1,

                transform: "scale(1)"

            }

        ],

        {

            duration: 1000,

            easing: "ease-out"

        }

    );

});


// ================================
// Console
// ================================

console.log("❤️ Good Morning Beautiful ❤️");
console.log("Made with love by Rohit.");
