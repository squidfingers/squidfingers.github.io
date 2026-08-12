window.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Add `js-enabled` class to body
  // CSS classes can use this to apply styles only if JavaScript is enabled
  document.body.classList.add("js-enabled");

  // Add `in-view--start` to all elements with the `in-view` class, and `in-view--end` once they scroll into view
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

  // Animmate the footer as it is being reealed
  const footer = document.querySelector(".main-footer");
  if (!prefersReducedMotion && footer) {
    const footerReveal = () => {
      const distanceFromBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      const progress = 1 - Math.min(Math.max(distanceFromBottom / footer.offsetHeight, 0), 1);
      footer.style.setProperty("--footer-reveal", progress);
    };
    window.addEventListener("scroll", footerReveal, { passive: true });
    window.addEventListener("resize", footerReveal);
    footerReveal();
  }
});
window.addEventListener("scroll", () => {
  // Add class to body once window has scrolled enough to trigger header to collapse
  if (window.scrollY > 64) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});
