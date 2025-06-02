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

const productos = [];

document.querySelector(".btn-agregar").addEventListener("click", function (e) {
  e.preventDefault(); // Prevenir el envío del formulario
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

// Cierra el modal si se hace clic fuera del contenido
window.onclick = function (event) {
  const modal = document.getElementById('modalProducto');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}



