document.getElementById("btnCheckout").addEventListener("click", function () {
  const token = localStorage.getItem("token");

  if (!token) {

    window.location.href = "pages/loguin.html";
  } else {
    // Si hay token, continuar al checkout
    window.location.href = "/checkout.html"; // Cambia por tu ruta real
  }
});

document.getElementById("btnContinue").addEventListener("click", function () {
  const token = localStorage.getItem("token");

  if (!token) {

    window.location.href = "index.html";
  } else {
    // Si hay token, continuar al checkout
    window.location.href = "/checkout.html"; // Cambia por tu ruta real
  }
});




const productosEnCarro = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
console.log(productosEnCarro);


const carritoVacio = document.querySelector('.cart-empty');
const carritoAcciones = document.querySelector('.cart-container_productos');
const contendorItem = document.querySelector('.card-items_container');
const botonCatalogo = document.querySelector('.btn-ir-catalogo');

if (botonCatalogo) {
  botonCatalogo.addEventListener('click', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario-logueado'));

    if (usuario) {
      // Está logueado
      window.location.href = 'indexAdmin.html';
    } else {
      // No está logueado
      window.location.href = 'index.html';
    }
  });
}

function cargarProdcutosCarrito() {
  contendorItem.innerHTML = "";

  if (productosEnCarro.length > 0) {
    carritoVacio.style.display = 'none';

    productosEnCarro.forEach(producto => {
      const imgSrc = producto.imagenProductos && producto.imagenProductos.length > 0
         ? producto.imagenProductos[0].foto
      : 'img/NO IMAGEN.avif';

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
      <img src="${imgSrc}" alt="${producto.nombre}" class="product-img" />
      <div class="product-details">
        <div class="product-name">${producto.nombre}</div>
        <div class="product-brand">${producto.descripcion}</div>
        <div class="product-price">
         
         <div class="product-quantity">Cantidad: ${producto.cantidad}</div>

          <span class="new-price">$${producto.precioDeVenta * producto.cantidad}</span>
        </div>
        <div class="product-stock">Últimas unidades: ${producto.stock}</div>
      </div>
      <button class="remove-btn" title="Eliminar" id="${producto.id}">
        <span class="material-symbols-outlined">delete</span>
      </button>
    `;

      contendorItem.append(div);
    });

  } else {
    carritoVacio.style.display = 'block';
    carritoAcciones.style.display = 'none';
  }

  actualizareliminar()
}

cargarProdcutosCarrito();

function actualizareliminar() {
  const botonesEliminar = document.querySelectorAll('.remove-btn');
  console.log(botonesEliminar);

  botonesEliminar.forEach(boton => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  const idBoton = Number(e.currentTarget.id);

  const index = productosEnCarro.findIndex(product => product.id === idBoton);
  productosEnCarro.splice(index, 1)
  console.log(productosEnCarro);
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarro));
  cargarProdcutosCarrito()
  renderResumenCompra()

}




function renderResumenCompra() {
  const productosEnCarro = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

  let cantidadTotal = 0;
  let totalUnitario = 0;

  productosEnCarro.forEach(producto => {
    cantidadTotal += producto.cantidad;
    totalUnitario += producto.precioDeVenta * producto.cantidad;
  });

  const totalFormateado = `$${totalUnitario.toLocaleString('es-CO', { minimumFractionDigits: 0 })}`;

  const resumenHTML = `
    <div class="cart-summary-card">
      <h2>Resumen de compra</h2>

      <div class="summary-item">
        <span>Total unitario:</span>
        <span>${totalFormateado}</span>
      </div>

      <div class="summary-item">
        <span>Cantidad total:</span>
        <span>${cantidadTotal}</span>
      </div>

      <div class="summary-item" style="font-weight:bold; font-size:1.2rem;">
        <span>Total a pagar:</span>
        <span>${totalFormateado}</span>
      </div>

      <button class="btn-checkout" id="btnCheckout">Procesar pago</button>
      <button class="btn-continue" id="btnContinue">Continuar comprando</button>
    </div>
  `;

  const contenedorResumen = document.getElementById('resumen-contenedor');
  if (contenedorResumen) {
    contenedorResumen.innerHTML = resumenHTML;
  }
}
renderResumenCompra()