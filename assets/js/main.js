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
  const animationTargets = document.querySelectorAll(".view");
  if (animationTargets) {
    animationTargets.forEach(t => {
      let observer = new IntersectionObserver(e => {
        e.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            observer.unobserve(e.target);
          }
        });
      });
      observer.observe(t);
    });
  }
});
