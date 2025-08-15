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
