const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Set header height as CSS variable
const setHeaderHeight = () => {
  const header = document.querySelector(".main-header");
  if (header) document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
};

// Add `in-view--start` to all elements with the `in-view` class, and `in-view--end` once they scroll into view
const inView = () => {
  if (prefersReducedMotion) return;
  document.querySelectorAll(".in-view").forEach(target => {
    target.classList.add("in-view--start");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view--end");
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(target);
  });
};

// Animate the footer as it is revealed at the bottom of the page
const footerReveal = () => {
  const footer = document.querySelector(".main-footer");
  if (prefersReducedMotion || !footer) return;
  const distanceFromBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
  const progress = 1 - Math.min(Math.max(distanceFromBottom / footer.offsetHeight, 0), 1);
  footer.style.setProperty("--footer-reveal", progress);
};

// Add `scrolled` class to body once the window has scrolled enough to trigger the header to collapse
const updateScrolled = () => {
  document.body.classList.toggle("scrolled", window.scrollY > 64);
};

window.addEventListener("DOMContentLoaded", () => {
  // Apply class to body. Other components can use `js-enabled` to apply styles only if JavaScript is enabled.
  document.body.classList.add("js-enabled");
  setHeaderHeight();
  inView();
  footerReveal();
  updateScrolled();
});

window.addEventListener("resize", () => {
  setHeaderHeight();
  footerReveal();
});

window.addEventListener("scroll", () => {
  footerReveal();
  updateScrolled();
}, { passive: true });
