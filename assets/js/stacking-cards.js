function throttleAnimation(callback) {
  let ticking = false;
  return () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      callback();
      ticking = false;
    });
  };
}

function setupCards(nodeList) {
  const cards = Array.from(nodeList);
  if (cards.length < 2) {
    return;
  }
  const updateCardProgress = () => {
    for (let i = 0; i < cards.length - 1; i++) {
      const card = cards[i];
      const nextCard = cards[i + 1];
      const cardRect = card.getBoundingClientRect();
      const nextRect = nextCard.getBoundingClientRect();
      const range = cardRect.bottom - cardRect.top;
      const progress = range > 0 ? Math.min(Math.max((cardRect.bottom - nextRect.top) / range, 0), 1) : 0;
      card.style.setProperty("--progress", progress);
    }
  };
  const requestCardUpdate = throttleAnimation(updateCardProgress);
  window.addEventListener("scroll", requestCardUpdate, { passive: true });
  window.addEventListener("resize", requestCardUpdate, { passive: true });
  updateCardProgress();
}

window.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
  setupCards(document.querySelectorAll(".project-item"));
});
