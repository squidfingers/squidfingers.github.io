window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-enabled");
});
window.addEventListener("scroll", () => {
  if (window.scrollY > 64) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});
window.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(".in-view");
  if (!prefersReducedMotion && targets) {
    targets.forEach(t => {
      t.classList.add("in-view--start");
      let observer = new IntersectionObserver(e => {
        e.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view--end");
            observer.unobserve(e.target);
          }
        });
      });
      observer.observe(t);
    });
  }
});
