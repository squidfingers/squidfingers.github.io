const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Add `in-view--start` to all elements with the `in-view` class, and `in-view--end` once they scroll into view
function setupInView(){
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
    });//, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    observer.observe(target);
  });
}

// Add `loaded--start` to all images with the `loaded` class, and `loaded--end` once the image has finished loading
function setupImageLoad(){
  if (prefersReducedMotion) return;
  document.querySelectorAll("img.loaded").forEach(img => {
    img.classList.add("loaded--start");
    if (img.complete) {
      img.classList.add("loaded--end");
    } else {
      img.addEventListener("load", () => img.classList.add("loaded--end"), { once: true });
    }
  });
}

// Set header height as CSS variable
function updateHeaderHeight(){
  const header = document.querySelector(".main-header");
  if (header) document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
}

// Set footer scroll progress as CSS variable
// `--footer-progress` is 0 when the footer is at the start of being in view, and 1 when the page has been scrolled to the bottom
function updateFooterReveal(){
  const footer = document.querySelector(".main-footer");
  if (prefersReducedMotion || !footer) return;
  const distanceFromBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
  const progress = 1 - Math.min(Math.max(distanceFromBottom / footer.offsetHeight, 0), 1);
  footer.style.setProperty("--footer-progress", progress);
}

// Add `scrolled` class to body once the window has scrolled enough to trigger the header to collapse
function updateScrolled(){
  document.body.classList.toggle("scrolled", window.scrollY > 64);
}

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-enabled");
  setupInView();
  setupImageLoad();
  updateHeaderHeight();
  updateFooterReveal();
  updateScrolled();
});

window.addEventListener("resize", () => {
  updateHeaderHeight();
  updateFooterReveal();
}, { passive: true });

window.addEventListener("scroll", () => {
  updateFooterReveal();
  updateScrolled();
}, { passive: true });
