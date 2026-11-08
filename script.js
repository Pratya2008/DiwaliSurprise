
const startBtn = document.getElementById("startBtn");
const secretBtn = document.getElementById("secretBtn");
const secretMessage = document.getElementById("secretMessage");
const messageSection = document.getElementById("message");

// START SURPRISE
startBtn.addEventListener("click", () => {

    startBtn.innerHTML = "Your Diya Is Lit ✨";
    startBtn.disabled = true;

    startFireworks();

    messageSection.scrollIntoView({
        behavior: "smooth"
    });

});

// SECRET MESSAGE
secretBtn.addEventListener("click", () => {

    secretMessage.classList.add("show");

    secretBtn.innerHTML = "A Little Secret Revealed ❤️";
    secretBtn.disabled = true;

    startFireworks();

    setTimeout(() => {
        secretMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 200);

});


// FIREWORKS ANIMATION
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let particles = [];
let animationRunning = false;

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// CREATE FIREWORK
function createFirework(x, y) {

    const colors = [
        "#ffd700",
        "#ffae42",
        "#ff6b35",
        "#fff0a5",
        "#f5b7b1"
    ];

    const color = colors[
        Math.floor(Math.random() * colors.length)
    ];

    for (let i = 0; i < 55; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: color,
            size: Math.random() * 2.5 + 1,
            gravity: 0.035
        });

    }

}


// ANIMATION LOOP
function animateFireworks() {

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((p) => {

        p.x += p.vx;
        p.y += p.vy;

        p.vy += p.gravity;

        p.alpha -= 0.012;

        ctx.globalAlpha = Math.max(0, p.alpha);

        ctx.fillStyle = p.color;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

    ctx.globalAlpha = 1;

    particles = particles.filter(p => p.alpha > 0);

    if (particles.length > 0) {

        requestAnimationFrame(animateFireworks);

    } else {

        animationRunning = false;

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    }

}


// START FIREWORKS
function startFireworks() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    createFirework(
        width * 0.25,
        height * 0.25
    );

    createFirework(
        width * 0.75,
        height * 0.30
    );

    createFirework(
        width * 0.50,
        height * 0.20
    );

    if (!animationRunning) {
        animationRunning = true;
        animateFireworks();
    }

}
