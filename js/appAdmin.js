const routes = {
  '/home': 'home/home.html',
  '/product': 'admin/home.html'
};

const mainContent = document.getElementById('main-content');

async function loadPage(path) {
  const response = await fetch(routes[path] || routes['/home']);
  const html = await response.text();
  mainContent.innerHTML = html;

 
}


function router() {
  const path = location.hash.slice(1) || '/home';
  loadPage(path);
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);


const productos = [];


mainContent.addEventListener('click', function(e) {
  if (e.target.matches('.btn-agregar')) {
    e.preventDefault();
    console.log("Botón clic detectado");

    const nombreProducto = document.getElementById("nombreProducto").value;
    const codigoProducto = document.getElementById("codigoProducto").value;
    const precioDeCompra = parseFloat(document.getElementById("precioDeCompra").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);

    const nuevoProducto = {
      nombreProducto,
      codigoProducto,
      precioDeCompra,
      cantidad
    };

    productos.push(nuevoProducto);
    console.log("Producto agregado:", nuevoProducto);
    console.log("Lista de productos:", productos);

    actualizarTabla();
    document.getElementById("productoForm").reset();
  }
});

function actualizarTabla() {
  const tbody = document.querySelector("#tablaProductos tbody");
  if (!tbody) return; // Evita error si aún no existe la tabla

  tbody.innerHTML = "";

  productos.forEach(p => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${p.nombreProducto}</td>
        <td>${p.codigoProducto}</td>
        <td>${p.precioDeCompra.toFixed(2)}</td>
        <td>${p.cantidad}</td>
      `;

    tbody.appendChild(fila);
  });
}

function abrirModal() {
  document.getElementById('modalProducto').style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modalProducto').style.display = 'none';
}

window.onclick = function (event) {
  const modal = document.getElementById('modalProducto');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// 🔸 Lista de productos
const producto = [
  {
    id: 1,
    nombre: "Producto A",
    codigo: "COD123",
    categoria: null,
    descripcion: null,
    precioDeVenta: 0,
    stock: 5,
    imagenProductos: []
  },
  {
    id: 2,
    nombre: "Producto B",
    codigo: "COD456",
    categoria: "oro",
    descripcion: "pulsera baño en oro",
    precioDeVenta: 500000,
    stock: 3,
    imagenProductos: []
  },
  {
    id: 3,
    nombre: "Producto c",
    codigo: "COD123",
    categoria: null,
    descripcion: null,
    precioDeVenta: 10000,
    stock: 5,
    imagenProductos: []
  },
  {
    id: 4,
    nombre: "Producto d",
    codigo: "COD456",
    categoria: "oro",
    descripcion: "pulsera baño en oro",
    precioDeVenta: 500000,
    stock: 3,
    imagenProductos: []
  }
];

// 🔸 Carrito desde localStorage
let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

// 🔸 Actualiza badge en el carrito
function actualizarBadgeCarrito() {
  const numerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = numerito;
    badge.style.display = numerito > 0 ? 'inline' : 'none';
  }
}

// 🔸 Formatea precios con separadores de miles
function formatPrecio(precio) {
  return precio.toLocaleString('es-CO', { minimumFractionDigits: 0 });
}

// 🔸 Renderiza productos en una sección
function cargarProductosEnSeccion(producto, contenedor) {
  contenedor.innerHTML = '';
  producto.forEach(producto => {
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
          <span class="old-price">$${formatPrecio(producto.precioDeVenta * 1.2)}</span>
        </p>
        <button class="card-btn">Comprar ahora</button>
      </div>
    `;

    contenedor.appendChild(li);
  });
}

// 🔸 Delegación de evento para íconos "agregar"
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('agregar')) {
    const idBoton = Number(e.target.id);
    const productoAgregado = producto.find(p => p.id === idBoton);

    if (!productoAgregado) return;

    const index = productosEnCarrito.findIndex(p => p.id === idBoton);

    if (index !== -1) {
      productosEnCarrito[index].cantidad++;
    } else {
      productosEnCarrito.push({ ...productoAgregado, cantidad: 1 });
    }

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    actualizarBadgeCarrito();
  }
});

// 🔸 Observador para renderizar productos cuando aparecen las secciones
const observer = new MutationObserver(() => {
  const seccion = document.querySelector('.section__productos');
  const seccionDescuentos = document.querySelector('.section__descuentos');

  if (seccion && !seccion.dataset.loaded) {
    seccion.dataset.loaded = "true";
    cargarProductosEnSeccion(producto, seccion);
  }

  if (seccionDescuentos && !seccionDescuentos.dataset.loaded) {
    seccionDescuentos.dataset.loaded = "true";
    cargarProductosEnSeccion(producto, seccionDescuentos);
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// 🔸 Al iniciar: actualizar badge
actualizarBadgeCarrito();
