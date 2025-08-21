(function () {
  const container = document.getElementById('love-container');

  function spawnHeart(x, y) {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = '❤'; // bisa ganti ke 💖

    // random props
    const size = 14 + Math.random() * 22;
    const dur = (2.2 + Math.random() * 2.2).toFixed(2) + 's';
    const hue = Math.floor(340 + Math.random() * 40) % 360;
    const drift = (Math.random() * 160 - 80).toFixed(0) + 'px';
    const rot = (Math.random() * 120 - 60).toFixed(0) + 'deg';

    const startX = (typeof x === 'number') ? x : Math.random() * window.innerWidth;
    const startY = (typeof y === 'number') ? y : (window.innerHeight - 10);

    h.style.left = startX + 'px';
    h.style.top = startY + 'px';
    h.style.setProperty('--size', size + 'px');
    h.style.setProperty('--dur', dur);
    h.style.setProperty('--drift', drift);
    h.style.setProperty('--rot', rot);
    h.style.color = `hsl(${hue} 80% 60%)`;

    container.appendChild(h);

    const ttl = parseFloat(dur) * 1000 + 200;
    setTimeout(() => h.remove(), ttl);
  }

  // otomatis muncul
  let autoTimer = null;
  function startAutoHearts(density = 600) {
    stopAutoHearts();
    autoTimer = setInterval(() => spawnHeart(), density);
  }
  function stopAutoHearts() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  // klik burst
  function burst(e) {
    const count = 6 + Math.floor(Math.random() * 5);
    const baseX = (e.touches?.[0]?.clientX ?? e.clientX ?? window.innerWidth / 2);
    const baseY = (e.touches?.[0]?.clientY ?? e.clientY ?? window.innerHeight / 2);

    for (let i = 0; i < count; i++) {
      const jitterX = baseX + (Math.random() * 60 - 30);
      const jitterY = baseY + (Math.random() * 30 - 15);
      spawnHeart(jitterX, jitterY);
    }
  }

  window.addEventListener('click', burst);
  window.addEventListener('touchstart', burst, { passive: true });

  // auto jalan
  startAutoHearts(400);

  window.__hearts = { spawnHeart, startAutoHearts, stopAutoHearts };
})();


onload = () =>{
        document.body.classList.remove("container");

};

