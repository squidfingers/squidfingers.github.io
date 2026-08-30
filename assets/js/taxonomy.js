(() => {
  "use strict";

  function sortTaxonomy(mode) {
    const list = document.querySelector(".tag-list");
    const items = Array.from(list.children);
    items.sort((a, b) => {
      if (mode === 'alpha') {
        return a.dataset.name.localeCompare(b.dataset.name);
      }
      return Number(b.dataset.count) - Number(a.dataset.count);
    });
    items.forEach(item => list.appendChild(item));
  }
  window.addEventListener('DOMContentLoaded', () => {
    const radios = document.querySelectorAll('input[name="taxonomy-sort"]')
    radios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        sortTaxonomy(e.target.value);
      });
    });
  });

})();
