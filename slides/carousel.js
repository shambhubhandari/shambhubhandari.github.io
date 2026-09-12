(function () {
  var titles = [
    "High-Throughput DFT Screening & ML",
    "AI for Earth Observation",
    "Ab Initio Molecular Dynamics — Earth's Core",
    "Quantum Transport Simulations",
    "Electronic Structure & Phonon Properties",
    "Agentic AI Framework Design",
    "End-to-End ML Engineering Pipeline"
  ];

  var n = (typeof SLIDE_COUNT !== 'undefined') ? SLIDE_COUNT : 7, cur = 1, active = "a", delay = 6000, timer, isPaused = false;

  function show(i) {
    cur = ((i - 1 + n) % n) + 1;
    var ns = active === "a" ? "b" : "a";
    var slideImg = document.getElementById("slide-" + ns);
    if (slideImg) {
      slideImg.src = "../slides/pngs/slide-" + cur + ".png";
      slideImg.alt = titles[cur - 1] + " — Slide " + cur;
      slideImg.style.opacity = "1";
    }
    var prevImg = document.getElementById("slide-" + active);
    if (prevImg) prevImg.style.opacity = "0";
    active = ns;
    var el = document.getElementById("slide-title");
    if (el) {
      el.textContent = titles[cur - 1];
      el.style.animation = "none";
      void el.offsetHeight;
      el.style.animation = "title-in 0.5s ease forwards";
    }
    var counter = document.getElementById("slide-counter");
    if (counter) counter.textContent = cur + " / " + n;
  }

  function next() { show(cur + 1); }
  function prev() { show(cur - 1); }
  function restart() {
    clearInterval(timer);
    if (!isPaused) {
      timer = setInterval(next, delay);
    }
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, delay);
  }

  startTimer();

  var nextBtn = document.getElementById("slide-next");
  if (nextBtn) nextBtn.addEventListener("click", function (e) { e.stopPropagation(); next(); restart(); });
  
  var prevBtn = document.getElementById("slide-prev");
  if (prevBtn) prevBtn.addEventListener("click", function (e) { e.stopPropagation(); prev(); restart(); });

  var pauseBtn = document.getElementById("slide-pause");
  if (pauseBtn) {
    pauseBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      isPaused = !isPaused;
      if (isPaused) {
        clearInterval(timer);
        pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        pauseBtn.setAttribute("aria-label", "Play slideshow");
      } else {
        startTimer();
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        pauseBtn.setAttribute("aria-label", "Pause slideshow");
      }
    });
  }

  var wrap = document.getElementById("slides-wrap");
  if (wrap) {
    wrap.addEventListener("mouseenter", function () { clearInterval(timer); });
    wrap.addEventListener("mouseleave", function () { if (!isPaused) startTimer(); });
  }
})();
