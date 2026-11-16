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

// The highlighter: each <mark class="hl"> is swept in once, the first time it scrolls into view. Without JavaScript, or
// with reduced motion, the marks simply show (see site.css).
(function () {
  var marks = document.querySelectorAll('mark.hl');
  if (!marks.length) return;
  function on(m) { m.classList.add('on'); }
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still || !('IntersectionObserver' in window)) { Array.prototype.forEach.call(marks, on); return; }
  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      seen.unobserve(e.target);
      setTimeout(on, 300, e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  Array.prototype.forEach.call(marks, function (m) { seen.observe(m); });
})();
