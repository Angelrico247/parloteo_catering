// Control del menú de navegación móvil
const btnMenu = document.getElementById('btn-menu');
const menuMovil = document.getElementById('menu-movil');

btnMenu.addEventListener('click', () => {
  const isHidden = menuMovil.classList.toggle('hidden');
  btnMenu.setAttribute('aria-expanded', !isHidden);
});

// Cerrar el menú al hacer clic en un enlace
menuMovil.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuMovil.classList.add('hidden');
    btnMenu.setAttribute('aria-expanded', 'false');
  });
});

const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });