document.addEventListener('DOMContentLoaded', function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('.dot'));
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const slideshow = document.querySelector('.slideshow');
  let idx = 0;
  let timer = null;

  function show(i) {
    slides.forEach((s, k) => s.classList.toggle('active', k === i));
    dots.forEach((d, k) => d.classList.toggle('active', k === i));
    idx = i;
  }

  function nextSlide() { show((idx + 1) % slides.length); }
  function prevSlide() { show((idx - 1 + slides.length) % slides.length); }

  next.addEventListener('click', () => { nextSlide(); resetTimer(); });
  prev.addEventListener('click', () => { prevSlide(); resetTimer(); });

  dots.forEach(d => d.addEventListener('click', (e) => {
    const i = Number(e.currentTarget.dataset.index);
    show(i); resetTimer();
  }));

  function startTimer() {
    timer = setInterval(nextSlide, 4000);
  }
  function stopTimer() { clearInterval(timer); timer = null; }
  function resetTimer() { stopTimer(); startTimer(); }

  slideshow.addEventListener('mouseenter', stopTimer);
  slideshow.addEventListener('mouseleave', startTimer);

  // basic touch/swipe support
  let touchStartX = 0;
  slideshow.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; stopTimer(); }, {passive:true});
  slideshow.addEventListener('touchend', (e) => {
    const dx = (e.changedTouches[0].clientX - touchStartX);
    if (Math.abs(dx) > 40) { if (dx < 0) nextSlide(); else prevSlide(); }
    resetTimer();
  }, {passive:true});

  // init
  show(0);
  startTimer();
});
