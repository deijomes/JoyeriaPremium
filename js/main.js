
console.log("✅ El archivo .js se ha cargado correctamente");
// Seleccionar los elementos del DOM
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navMenu = document.getElementById('nav-menu');
const iconFavorito = document.getElementById('icons');
const navItems = document.querySelectorAll('.nav__item');


const slide = document.querySelectorAll('.list-item');
const dost = document.querySelector('.dost-container');




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




iconFavorito.addEventListener('click', () => {
  navMenu.classList.add('active');
});


document.addEventListener("DOMContentLoaded", () => {
  const icon = document.getElementById("icons");

  icon.addEventListener("click", () => {
    icon.classList.toggle("active");
  });
});



const cardList = document.querySelector('.card-list');
let itemWidth = document.querySelector('.list-item')?.offsetWidth || 300;
let scrollPosition = 0;


function updateItemWidth() {
  itemWidth = document.querySelector('.list-item')?.offsetWidth || 300;
}

// Función para mover a la siguiente tarjeta
function nextSlide() {
  scrollPosition = Math.min(
    cardList.scrollWidth - cardList.clientWidth,
    scrollPosition + itemWidth
  );
  cardList.scrollTo({ left: scrollPosition, behavior: 'smooth' });
}

// Función para mover a la tarjeta anterior
function prevSlide() {
  scrollPosition = Math.max(0, scrollPosition - itemWidth);
  cardList.scrollTo({ left: scrollPosition, behavior: 'smooth' });
}

// -------------------------
// Soporte para touch (móvil)
// -------------------------
let touchStartX = 0;
let touchEndX = 0;

cardList.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

cardList.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe(touchStartX, touchEndX);
});

// -------------------------
// Soporte para mouse (escritorio)
// -------------------------
let isDragging = false;
let startX;
let endX;

cardList.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
});

cardList.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  endX = e.clientX;
  handleSwipe(startX, endX);
});

// Función común para detectar dirección de deslizamiento
function handleSwipe(start, end) {
  const diff = start - end;
  const threshold = 50;

  if (diff > threshold) {
    nextSlide();
  } else if (diff < -threshold) {
    prevSlide();
  }
}

// -------------------------
// Recalcular la posición de scroll cuando se modifiquen los elementos
// -------------------------
function resetScrollPosition() {
  scrollPosition = 0;
  cardList.scrollTo({ left: scrollPosition, behavior: 'smooth' });
}

// -------------------------
// Uso de MutationObserver para observar cambios en el DOM
// -------------------------
const observer = new MutationObserver(() => {
  updateItemWidth(); // Recalcular el ancho de los elementos después de cualquier cambio
});

observer.observe(cardList, {
  childList: true,  // Detectar cuando se agregan o eliminan elementos
  subtree: true,    // Detectar cambios en todos los elementos dentro de cardList
});

// -------------------------
// Funciones para agregar y eliminar tarjetas (simulando el cambio dinámico)
// -------------------------
function addNewCard() {
  const newCard = document.createElement('li');
  newCard.classList.add('list-item');
  newCard.innerHTML = `
    <div class="card-image">
      <img src="/img/joyeria-oro-tienda-.avif" alt="Nueva Pulsera">
      <span class="material-symbols-outlined">favorite</span>
      <span class="badge">Pulsera</span>
    </div>
    <div class="card-body">
      <h2 class="card-title">Pulsera nueva</h2>
      <p class="card-price">
        <span class="current-price">$320.000</span>
        <span class="old-price">$380.000</span>
      </p>
      <button class="card-btn">Comprar ahora</button>
    </div>
  `;
  cardList.appendChild(newCard);
  resetScrollPosition(); // Reajustar la posición del scroll
}

function removeFirstCard() {
  const firstCard = cardList.querySelector('.list-item');
  if (firstCard) {
    firstCard.remove();
    resetScrollPosition(); // Reajustar la posición del scroll
  }
}

// -------------------------
// Simulación de cambios dinámicos
// -------------------------
setTimeout(() => {
  addNewCard();  // Agregar una nueva tarjeta después de 2 segundos
}, 2000);

setTimeout(() => {
  removeFirstCard();  // Eliminar la primera tarjeta después de 4 segundos
}, 4000);

document.getElementById("year").textContent = new Date().getFullYear();

function scrollHandler() {
  const nav = document.getElementById('navbar');
  const img = document.getElementById('logo-img');
  if (window.scrollY > 150) {
    nav.classList.add('fixed');
    img.classList.add('fixed');
  } else {
    nav.classList.remove('fixed');
    img.classList.remove('fixed');
  }
}

// 💡 Paso 2: Añade el evento scroll con la función nombrada
window.addEventListener('scroll', scrollHandler);








/*--------------------------------------------------------------Inicio sesion ---------------  */
async function cargarVista(ruta) {
  const contenedor = document.getElementById('contenido');


  contenedor.classList.add('fade-out');

  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    const res = await fetch(ruta);
    if (!res.ok) throw new Error('No se pudo cargar la vista');

    const html = await res.text();
    contenedor.innerHTML = html;

    const script = document.createElement('script');
    script.src = 'js/admin.js';
    script.type = 'text/javascript';
    script.defer = true;
    document.body.appendChild(script);

    contenedor.classList.remove('fade-out');
    contenedor.classList.add('fade-in');

    setTimeout(() => {
      contenedor.classList.remove('fade-in');
    }, 300);

  } catch (error) {
    contenedor.innerHTML = `<p style="color: red;">Error al cargar el contenido: ${error.message}</p>`;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const boton = document.getElementById('Inicio-Sesion');
  if (boton) {
    boton.addEventListener('click', (e) => {
      e.preventDefault();
      cargarVista('admin/loguin/loguin.html');
    });
  }
});

function cargarVista(url) {
  window.location.href = url; 
}


document.getElementById().addEventListener('click', () => {
  cargarVista('admin/admin.html');

  const imgBg = document.querySelector('.header__background');
  const header = document.querySelector('.header');
  const capa = document.querySelector('.header__capa');
  const info = document.querySelector('.nav__informacion');
  const item_home = document.getElementById('home');
  const item_Ctgoria = document.getElementById('categoria');
  const item_Dscuento = document.getElementById('descuento');
  const item_productos = document.getElementById('producto');
  const navList = document.querySelector(".nav__list");
  const inicioSesion = document.getElementById('Inicio-Sesion');
  const badge = document.querySelector('.user-badge');


  imgBg.style.display = 'none';
  capa.style.display = 'none';
  info.style.display = 'none';
  header.style.height = 'auto';
  item_Ctgoria.style.display = 'none';
  item_Dscuento.style.display = 'none';
  item_home.style.display = 'none';
  item_productos.style.display = 'none';
  inicioSesion.parentElement.remove();

  badge.style.display = 'inline-block'

  const nav = document.querySelector('.container');
  const img = document.getElementById('logo-img');


  nav.classList.add('fixed');
  img.classList.add('fixed');

  window.removeEventListener('scroll', scrollHandler);


  const liInicio = document.createElement("li");
  liInicio.classList.add("nav__item");
  liInicio.innerHTML = '<a href="index.html" class="nav__link">Home</a>';

  navList.insertBefore(liInicio, navList.children[4]);
  liInicio.style.cursor = "pointer";

});

const userToggle = document.querySelector('.user-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

userToggle.addEventListener('click', function (e) {
  e.preventDefault();
  dropdownMenu.classList.toggle('show');
});

// Cerrar el menú si haces clic fuera
document.addEventListener('click', function (e) {
  if (!e.target.closest('.nav__item--perfil')) {
    dropdownMenu.classList.remove('show');
  }
});





