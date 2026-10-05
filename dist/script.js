const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) links.classList.remove('open');
  });
}
const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());
