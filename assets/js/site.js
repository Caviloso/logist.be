// The phone menu: the "Menu" button opens and closes the list of sections. Without JavaScript the list simply shows.
(function () {
  var bar = document.querySelector('.bar');
  var button = bar && bar.querySelector('.menu-btn');
  if (!button) return;
  function set(open) {
    bar.classList.toggle('open', open);
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    button.textContent = open ? 'Close' : 'Menu';
  }
  button.addEventListener('click', function () { set(!bar.classList.contains('open')); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && bar.classList.contains('open')) { set(false); button.focus(); }
  });
})();
