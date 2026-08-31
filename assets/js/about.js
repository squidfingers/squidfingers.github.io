(() => {
"use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Set about photo cover progress as CSS variable
  // `--about-progress` is 0 while the sticky photo is fully visible, and 1 once `.prose` has scrolled up to fully cover it
  function updateAboutProgress(){
    const about = document.querySelector(".about");
    if (prefersReducedMotion || !about) return;
    const figure = about.querySelector("figure");
    const prose = about.querySelector(".prose");
    if (!figure || !prose) return;
    const figureRect = figure.getBoundingClientRect();
    const proseRect = prose.getBoundingClientRect();
    const covered = figureRect.bottom - proseRect.top;
    const progress = Math.min(Math.max(covered / figureRect.height, 0), 1);
    about.style.setProperty("--about-progress", progress);
  }

  window.addEventListener("DOMContentLoaded", updateAboutProgress);
  window.addEventListener("resize", updateAboutProgress, { passive: true });
  window.addEventListener("scroll", updateAboutProgress, { passive: true });

})();
