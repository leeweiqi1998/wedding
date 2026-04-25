// Mark the current page's nav link as active.
(function () {
  const path = location.pathname.replace(/\/$/, '/').split('/').pop() || 'index.html';
  const file = path === '' ? 'index.html' : path;
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === file || (file === 'index.html' && href === './') || (file === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
