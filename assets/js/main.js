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
