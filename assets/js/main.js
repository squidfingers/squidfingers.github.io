window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-enabled");
});
window.addEventListener("scroll", () => {
  if (window.scrollY > 64) {
    document.body.classList.add("js-scrolled");
  } else {
    document.body.classList.remove("js-scrolled");
  }
});
window.addEventListener("DOMContentLoaded", () => {
  const animationTargets = document.querySelectorAll(".animate-on-view");
  if (animationTargets) {
    animationTargets.forEach(t => {
      let observer = new IntersectionObserver(e => {
        e.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("js-start-animation-on-view");
            observer.unobserve(e.target);
          }
        });
      });
      observer.observe(t);
    });
  }
});
