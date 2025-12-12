// Scroll reveal setup
const faders = document.querySelectorAll('.fade-on-scroll');
const options = { threshold: 0.2 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, options);

faders.forEach(el => observer.observe(el));
