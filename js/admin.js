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



