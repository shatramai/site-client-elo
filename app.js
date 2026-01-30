// app.js

// ===============================
// Année auto footer
// ===============================
(function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// ===============================
// Reveal / slide-in (IntersectionObserver)
// ===============================
(function revealOnScroll() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.18 }
  );

  els.forEach((el) => io.observe(el));
})();

// ===============================
// Carousel Témoignages (FIX mobile + FIX décalage)
// ===============================
// ===============================
// Carousel Témoignages (ROBUSTE)
// ===============================
(function testimonialsCarousel() {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const viewport = root.querySelector(".tcar__viewport");
  const track = root.querySelector(".tcar__track");
  const slides = Array.from(root.querySelectorAll(".tcar__slide"));
  const prevBtn = root.querySelector("[data-prev]");
  const nextBtn = root.querySelector("[data-next]");
  const dotsWrap = root.querySelector(".tcar__dots");

  if (!viewport || !track || slides.length === 0) return;

  let index = 0;
  let slideW = 0;

  function measure() {
    slideW = viewport.getBoundingClientRect().width || 0;

    // ✅ important : le track doit faire N * largeur viewport
    track.style.width = `${slides.length * slideW}px`;

    // ✅ et chaque slide doit faire exactement slideW
    slides.forEach((s) => {
      s.style.width = `${slideW}px`;
      s.style.flex = `0 0 ${slideW}px`;
    });
  }

  function applyTransform(px, animate = true) {
    track.style.transition = animate ? "transform .45s ease" : "none";
    track.style.transform = `translate3d(${px}px,0,0)`;
  }

  function updateDots() {
    if (!dotsWrap) return;
    const dots = Array.from(dotsWrap.querySelectorAll("button"));
    dots.forEach((d, di) => d.classList.toggle("is-active", di === index));
  }

  function setActive(i, animate = true) {
    index = (i + slides.length) % slides.length;
    measure();
    applyTransform(-index * slideW, animate);
    updateDots();
  }

  // Build dots
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Aller au témoignage ${i + 1}`);
      b.addEventListener("click", () => setActive(i));
      dotsWrap.appendChild(b);
    });
  }

  prevBtn?.addEventListener("click", () => setActive(index - 1));
  nextBtn?.addEventListener("click", () => setActive(index + 1));

  window.addEventListener("resize", () => setActive(index, false));

  // Swipe
  let startX = 0;
  let dx = 0;
  let dragging = false;

  track.addEventListener("pointerdown", (e) => {
    dragging = true;
    startX = e.clientX;
    dx = 0;

    measure();
    track.style.transition = "none";
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    dx = e.clientX - startX;
    applyTransform(-index * slideW + dx, false);
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;

    const threshold = Math.min(80, slideW * 0.2);
    if (Math.abs(dx) > threshold) {
      setActive(index + (dx < 0 ? 1 : -1), true);
    } else {
      setActive(index, true);
    }
  }

  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);

  // init
  measure();
  setActive(0, false);
})();

