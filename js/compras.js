


async function obtenerCompras() {
  try {
    const response = await fetch('https://localhost:7287/api/compras');
    const data = await response.json();
    console.log('✅ Compras obtenidas:', data);
    renderizarCompras(data);
  } catch (error) {
    console.error('❌ Error al obtener compras:', error);
  }
}

function renderizarCompras(compras) {
  const contenedor = document.getElementById('contenedor-compras');
  contenedor.innerHTML = ''; 
  compras.forEach(compra => {
    const fecha = new Date(compra.fechaDeCompra).toLocaleDateString('es-CO');

    let html = `
      <div class="header">
        <div>
          <strong>Pedido N° ${compra.id}</strong><br>
          Realizado el ${fecha}
        </div>
        <div>
          Proveedor<br>
          <strong>${compra.proveedor}</strong><br>
          <a class="mostrar">Mostrar compra</a>
        </div>
      </div>

      <div class="container_pedido">
        <div class="section-title">PRODUCTOS</div>
    `;

    compra.productosComprados.forEach(prod => {
      html += `
        <div class="product">
         
          <div class="product-details">
            <h4>${prod.nombre}</h4>
            <p>Precio compra: $${prod.precioDeCompra.toFixed(2)}</p>
            <p>Producto ID: ${prod.productoId}</p>
          </div>
          <div class="price-info">
            <div class="label">Valor</div>
            $${prod.precioDeCompra.toFixed(2)}<br>
            <div class="label">Cant.</div>
            ${prod.cantidad}<br>
            <div class="label">Subtotal</div>
            $${prod.total.toFixed(2)}
          </div>
        </div>
      `;
    });

    html += '</div>'; // cerrar container_pedido
    contenedor.innerHTML += html;
  });
  agregarListenersMostrarCompra()
}

// Ejecutar al cargar
obtenerCompras();

function agregarListenersMostrarCompra() {
  const botones = document.querySelectorAll('.mostrar');

  botones.forEach(boton => {
    boton.addEventListener('click', (event) => {
      event.preventDefault();

      const container = boton.closest('.header').nextElementSibling;

      if (container.classList.contains('visible')) {
        container.classList.remove('visible');
        boton.textContent = 'Mostrar pedido';
      } else {
        container.classList.add('visible');
        boton.textContent = 'Ocultar';
      }
    });
  });
}
