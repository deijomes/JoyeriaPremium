const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navMenu = document.getElementById('nav-menu');
const iconFavorito = document.getElementById('icons');
const navItems = document.querySelectorAll('.nav__item');
const user_toggle = document.querySelector('.user-toggle');
const dropdown = document.querySelector('.dropdown-menu');



const slide = document.querySelectorAll('.list-item');
const dost = document.querySelector('.dost-container');



user_toggle.addEventListener('click', () => {
  dropdown.classList.toggle('show');
});


navToggle.addEventListener('click', () => {
  navMenu.classList.add('visible');
});


navClose.addEventListener('click', () => {
  navMenu.classList.remove('visible');
});

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navMenu.classList.remove('visible');
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const user = document.querySelector('.user-badge');
  const usuarioData = localStorage.getItem("usuario-logueado");
  const role = document.getElementById('producto');
  const car = document.getElementById('carrito');
  const badge = document.getElementById('cart-badge');
  const home = document.getElementById('home')



  if (usuarioData && user) {
    const usuario = JSON.parse(usuarioData);

    if (usuario.role === 'user') {

      role.style.display = 'none'

    } else {
      car.style.display = 'none'
      badge.style.display = 'none'
      home.style.display = 'none'


    }

    if (usuario.usuario) {
      const nombre = usuario.usuario.trim();


      const iniciales = nombre
        .split(" ")
        .map(p => p.charAt(0).toUpperCase())
        .join("")
        .substring(0, 2);

      user.textContent = iniciales;
    } else {
      console.warn("El objeto 'usuario-logueado' no tiene la propiedad 'usuario'");
      user.textContent = "--";
    }
  } else {
    console.warn("No hay usuario logueado en localStorage o no existe el div con id 'userBadge'");
  }


});


iconFavorito.addEventListener('click', () => {
  navMenu.classList.add('active');
});


document.addEventListener("DOMContentLoaded", () => {
  const icon = document.getElementById("icons");

  icon.addEventListener("click", () => {
    icon.classList.toggle("active");
  });
});

