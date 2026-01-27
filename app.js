// app.js

// Année auto footer
(function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Reveal / slide-in (IntersectionObserver)
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

// Carousel Témoignages
(function testimonialsCarousel() {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const track = root.querySelector(".tcar__track");
  const slides = Array.from(root.querySelectorAll(".tcar__slide"));
  const prevBtn = root.querySelector("[data-prev]");
  const nextBtn = root.querySelector("[data-next]");
  const dotsWrap = root.querySelector(".tcar__dots");

  if (!track || slides.length === 0) return;

  let index = 0;

  function setActive(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${-index * 100}%)`;

    // dots
    if (dotsWrap) {
      const dots = Array.from(dotsWrap.querySelectorAll("button"));
      dots.forEach((d, di) => d.classList.toggle("is-active", di === index));
    }
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

  // Swipe (mobile)
  let startX = 0;
  let dx = 0;
  let dragging = false;

  track.addEventListener("pointerdown", (e) => {
    dragging = true;
    startX = e.clientX;
    dx = 0;
    track.style.transition = "none";
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    dx = e.clientX - startX;
    const pct = (dx / track.clientWidth) * 100;
    track.style.transform = `translateX(calc(${-index * 100}% + ${pct}%))`;
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    track.style.transition = "";
    if (Math.abs(dx) > 60) {
      setActive(index + (dx < 0 ? 1 : -1));
    } else {
      setActive(index);
    }
  }

  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);

  setActive(0);
})();
