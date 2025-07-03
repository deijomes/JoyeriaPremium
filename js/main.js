

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
function resetScrollPosition() {
  scrollPosition = 0;
  cardList.scrollTo({ left: scrollPosition, behavior: 'smooth' });
}


// -------------------------
const observer = new MutationObserver(() => {
  updateItemWidth(); // Recalcular el ancho de los elementos después de cualquier cambio
});

observer.observe(cardList, {
  childList: true,  // Detectar cuando se agregan o eliminan elementos
  subtree: true,    // Detectar cambios en todos los elementos dentro de cardList
});

// -------------------------------------------------------------------------------------------------------------------------------


let productos = [];
async function obtenerProductos() {
  try {
    const response = await fetch('https://localhost:7287/api/producto');
    if (!response.ok) {
      throw new Error('Error en la respuesta: ' + response.status);
    }
    const data = await response.json();
    console.log('Productos:', data);
     productos = data;
    cargarProductosEnSeccion(data);
    renderProductos(productos);
  } catch (error) {
    console.error('Error al consumir la API:', error);
  }
}

obtenerProductos();



const cardLis = document.getElementById('cardList');
const badgeNumero = document.getElementById('cart-badge');


function formatPrecio(precio) {
  return precio.toLocaleString('es-CO', { minimumFractionDigits: 0 });
}

function cargarProductosEnSeccion(productos) {
  const seccion = document.querySelector('.section__productos');

  // Limpiar contenido previo
  seccion.innerHTML = '';

  productos.forEach(producto => {
    const li = document.createElement('li');
    li.classList.add('list-item');

    const imgSrc = producto.imagenProductos.length > 0
      ? producto.imagenProductos[0]
      : '/img/joyeria-oro-tienda-.avif';

    li.innerHTML = `
      <div class="card-image">
        <img src="${imgSrc}" alt="${producto.descripcion ?? producto.nombre}">
      
         <span class="material-icons cart-icon agregar" id="${producto.id}">
                shopping_cart
              </span>
        <span class="badge">${producto.nombre ?? '----'}</span>
      </div>
      <div class="card-body">
        <h2 class="card-title">${producto.descripcion ?? ''}</h2>
        <p class="card-price">
          <span class="current-price">$${formatPrecio(producto.precioDeVenta)}</span>
         
        </p>
        <button class="card-btn">Comprar ahora</button>
      </div>
    `;

    seccion.appendChild(li);
    agregarCarrito();
  });
}

// Llamas a la función para cargar los productos





function renderProductos(productos) {
  cardLis.innerHTML = ''; // limpiar lista

  productos.forEach(producto => {
    const newCard = document.createElement('li');
    newCard.classList.add('list-item');
    // Imagen predeterminada si no hay
    const imgSrc = producto.imagenProductos.length > 0
      ? producto.imagenProductos[0]
      : '/img/joyeria-oro-tienda-.avif';

    newCard.innerHTML = `
      <div class="card-image">
        <img src="${imgSrc}" alt="${producto.nombre}">
         <span class="material-icons cart-icon agregar" id="${producto.id}">
                shopping_cart
              </span>
       
        <span class="badge">${producto.nombre ?? '----'}</span>
      </div>
      <div class="card-body">
        <h2 class="card-title">${producto.descripcion}</h2>
        <p class="card-price">
          <span class="current-price">$${formatPrecio(producto.precioDeVenta)}</span>
          ${producto.precioDeVenta > 0
        ? `<span class="old-price">$${formatPrecio(producto.precioDeVenta * 1.2)}</span>`
        : ''}
        </p>
        <button class="card-btn">Comprar ahora</button>
      </div>
    `;

    cardLis.appendChild(newCard);
  });

  resetScrollPosition();
  agregarCarrito();
}



function resetScrollPosition() {
  cardList.scrollTop = 0;
}

/*---------------------------------------------------------logica carrito--------------------------------------------*/
function agregarCarrito() {
  const botonAgregar = document.querySelectorAll('.agregar');
  console.log(botonAgregar);
  botonAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}
let productosEnCarrito;
const productosEnCarritoLs = JSON.parse(localStorage.getItem("productos-en-carrito"))
if (productosEnCarritoLs) {
  productosEnCarrito = productosEnCarritoLs;
  actualizarBabgeCarrito();
} else {
  productosEnCarrito = [];
}


function agregarAlCarrito(e) {
  const idBoton = Number(e.target.id);
  const productoAgregado = productos.find(product => product.id === idBoton);

  if (productosEnCarrito.some(product => product.id === idBoton)) {
    const index = productosEnCarrito.findIndex(product => product.id === idBoton);
    productosEnCarrito[index].cantidad++;

  } else {
    productoAgregado.cantidad = 1
    productosEnCarrito.push(productoAgregado)
  }

  actualizarBabgeCarrito();

  
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

function actualizarBabgeCarrito() {
  const numerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  badgeNumero.innerHTML = numerito;

  if (numerito > 0) {
    badgeNumero.style.display = 'inline';
  } else {
    badgeNumero.style.display = 'none';
  }
}




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

window.addEventListener('scroll', scrollHandler);








/*--------------------------------------------------------------Inicio sesion ---------------  */


document.getElementById('Inicio-Sesion').addEventListener('click', function (event) {
  event.preventDefault();
  window.location.href = 'pages/loguin.html'

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



function vistaHome(ruta) {
  fetch(ruta)
    .then(response => response.text())
    .then(html => {
      const main = document.querySelector('main');
      if (main) {
        main.innerHTML = html;
      }
    })
    .catch(error => {
      console.error("Error al cargar la vista:", error);
    });
}

// 👇 Resto del código donde usas cargarVista()
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'btn') {
    // ... código para validar login

    // 👇 Ejemplo de uso
    vistaHome('admin/admin.html');
  }

  // O si tienes un botón "Home" dinámico
  if (e.target && e.target.id === 'link-home') {
    e.preventDefault();
    cargarVista('home/home.html');
  }
});




