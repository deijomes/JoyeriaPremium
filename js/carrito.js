document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnCheckout").addEventListener("click", async function () {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuario-logueado"));
    const productosEnCarro = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    // Validaciones mínimas
    if (!usuarioLogueado?.userID) {
      alert("⚠️ Debes iniciar sesión para realizar compras.");
      window.location.href = "/pages/loguin.html";
      return;
    }

    if (productosEnCarro.length === 0) {
      alert("🛒 Debes agregar productos al carrito.");
      return;
    }

    // Construir el cuerpo del JSON
    const body = {
      usuarioId: usuarioLogueado.userID,
      productos: productosEnCarro.map(p => ({
        ProductoId: p.ProductoId || p.id,
        Cantidad: p.Cantidad || p.cantidad
      }))
    };

    console.log("📦 JSON a enviar:", body);

    try {
      const response = await fetch("https://jpremium-h6gahdceh0fgbscx.canadacentral-01.azurewebsites.net/api/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Respuesta del backend (venta):", data);

      alert("💳 Redirigiendo al pago con PayPal...");

      // Usar los datos de la venta para crear la orden de pago
      const amount = data.amount;
      const ventaId = data.ventaId;

      const ordenResponse = await fetch("https://jpremium-h6gahdceh0fgbscx.canadacentral-01.azurewebsites.net/api/pagos/crear-orden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: amount,
          ventaId: ventaId,
          returnUrl: "http://127.0.0.1:5500/indexAdmin.html",
          cancelUrl: "http://127.0.0.1:5500/indexAdmin.html"
        })
      });

      const ordenData = await ordenResponse.json();
      console.log("✅ Orden de pago creada:", ordenData);

      if (ordenData.status === "CREATED") {
        const approveLink = ordenData.links.find(link => link.rel === "approve");
        if (approveLink?.href) {
         
          window.location.href = approveLink.href;
        } else {
          alert("⚠️ No se encontró el enlace de aprobación de PayPal.");
        }
      } else {
        alert("❌ La orden de PayPal no se creó correctamente.");
      }

    } catch (error) {
      console.error("❌ Error al enviar la compra:", error.message);
      alert("❌ Ocurrió un error al procesar tu compra.");
    }
  });
});


const productosEnCarro = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

const carritoVacio = document.querySelector('.cart-empty');
const carritoAcciones = document.querySelector('.cart-container_productos');
const contendorItem = document.querySelector('.card-items_container');
const botonCatalogo = document.querySelector('.btn-ir-catalogo');
const botonComprar = document.querySelector('.btnContinue');

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

document.addEventListener("DOMContentLoaded", () => {
  const botonContinue = document.getElementById("btnContinue");

  if (botonContinue) {
    botonContinue.addEventListener("click", () => {
      const usuario = JSON.parse(localStorage.getItem("usuario-logueado"));

      if (usuario) {
        // Redirigir si está logueado
        window.location.href = "indexAdmin.html";
      } else {
        // Redirigir si NO está logueado
        window.location.href = "index.html";
      }
    });
  }
});

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