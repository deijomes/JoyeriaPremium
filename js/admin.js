const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navMenu = document.getElementById('nav-menu');
const iconFavorito = document.getElementById('icons');
const navItems = document.querySelectorAll('.nav__item');
const user_toggle =  document.querySelector('.user-toggle');
const dropdown =  document.querySelector('.dropdown-menu');


const slide = document.querySelectorAll('.list-item');
const dost = document.querySelector('.dost-container');



user_toggle.addEventListener('click', () => {
    dropdown.classList.toggle('show');
  });


navToggle.addEventListener('click',  () => {
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




iconFavorito.addEventListener('click', () => {
  navMenu.classList.add('active');
});


document.addEventListener("DOMContentLoaded", () => {
  const icon = document.getElementById("icons");

  icon.addEventListener("click", () => {
    icon.classList.toggle("active");
  });
});


