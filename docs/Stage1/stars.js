const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const STAR_COUNT = 400;
let stars = [];

function initStars(){
    for(let i = 0; i < STAR_COUNT; i++){
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            twinkle: Math.random() * 0.02 + 0.005
        });
    }
}

initStars();

function drawStars(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let s of stars){
        if(Math.random() > 0.5){
            s.alpha += s.twinkle;
        }
        else{
            s.alpha -= s.twinkle;
        }
        s.alpha = Math.max(0.1, Math.min(1, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255,' + s.alpha + ')';
        ctx.fill();
    }
    requestAnimationFrame(drawStars);
}
drawStars();