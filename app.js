// Active link highlighting
(function(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('a[data-nav]').forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });
})();

// Mobile menu toggle
(function(){
  const btn = document.querySelector("[data-mobile-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  if(!btn || !menu) return;

  btn.addEventListener("click", () => {
    const hidden = menu.hasAttribute("hidden");
    if(hidden) menu.removeAttribute("hidden");
    else menu.setAttribute("hidden", "");
  });
})();

// Slider (hero)
(function(){
  const root = document.querySelector("[data-slider]");
  if(!root) return;

  const slides = Array.from(root.querySelectorAll(".slide"));
  const dots = Array.from(root.querySelectorAll(".dot"));
  const prev = root.querySelector("[data-prev]");
  const next = root.querySelector("[data-next]");

  let i = 0;
  function render(){
    slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
    dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
  }
  function go(n){
    i = (n + slides.length) % slides.length;
    render();
  }

  dots.forEach((d, idx) => d.addEventListener("click", () => go(idx)));
  prev && prev.addEventListener("click", () => go(i - 1));
  next && next.addEventListener("click", () => go(i + 1));

  render();
  setInterval(() => go(i + 1), 5500);
})();

// Testimonials carousel
(function(){
  const root = document.querySelector("[data-testimonials]");
  if(!root) return;

  const quotes = Array.from(root.querySelectorAll(".quote"));
  const prev = root.querySelector("[data-tprev]");
  const next = root.querySelector("[data-tnext]");
  let i = 0;

  function render(){
    quotes.forEach((q, idx) => q.classList.toggle("active", idx === i));
  }
  function go(n){
    i = (n + quotes.length) % quotes.length;
    render();
  }
  prev && prev.addEventListener("click", () => go(i - 1));
  next && next.addEventListener("click", () => go(i + 1));

  render();
})();

// Accordion
(function(){
  document.querySelectorAll("[data-accordion] .item > button").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".item");
      item.classList.toggle("open");
    });
  });
})();

