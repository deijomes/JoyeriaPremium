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

if (productosEnCarro.length > 0) {
  carritoVacio.style.display = 'none';
  

  productosEnCarro.forEach(producto => {
    const imgSrc = producto.imagenProductos && producto.imagenProductos.length > 0
      ? producto.imagenProductos[0]
      : '/img/joyeria-oro-tienda-.avif';

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

