(() => {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d', { alpha: true });

  let stars = [];
  let width, height, dpr;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initStars();
  }

  function initStars() {
    const starCount = Math.round((width * height) / 2500);
    stars = new Array(starCount).fill(0).map(() => {
      const size = Math.random() < 0.9 ? Math.random() * 1.2 + 0.3 : Math.random() * 2 + 1.2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: size,
        baseA: Math.random() * 0.6 + 0.2,
        tw: Math.random() * 0.6 + 0.2,
        sp: Math.random() * 2 + 0.5,
        phase: Math.random() * Math.PI * 2
      };
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const haze = ctx.createRadialGradient(width*0.5, height*0.6, 0, width*0.5, height*0.6, Math.max(width, height)*0.9);
    haze.addColorStop(0, 'rgba(120, 60, 200, 0.04)');
    haze.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = haze;
    ctx.fillRect(0, 0, width, height);

    stars.forEach(s => {
      s.phase += 0.015 * s.sp;
      const alpha = s.baseA + Math.sin(s.phase) * s.tw * 0.5;

      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();

      ctx.globalAlpha = Math.max(0, Math.min(0.25, alpha * 0.25));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200, 180, 255, 0.6)';
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  draw();
})();
