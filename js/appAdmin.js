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


mainContent.addEventListener('click', function (e) {
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


mainContent.addEventListener('submit', async function (event) {
  if (event.target && event.target.matches('#envioCompraForm')) {
    event.preventDefault();

    const proveedor = document.getElementById('proveedor').value.trim();

    if (!proveedor || productos.length === 0) {
      alert('Por favor, complete el proveedor y agregue al menos un producto.');
      return;
    }

    const exito = await enviarCompra(proveedor, productos);

    if (exito) {
      location.reload();
    }

  }
});

async function enviarCompra(proveedor, productos) {
  const payload = {
    proveedor,
    productos
  };

  try {
    const response = await fetch('https://jpremium-h6gahdceh0fgbscx.canadacentral-01.azurewebsites.net/api/compras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Error al registrar la compra: ' + response.status);
    }


    alert('✅ Compra registrada correctamente');

    // Limpia formulario y productos
    productos.length = 0;
    if (typeof actualizarTabla === 'function') actualizarTabla();
    document.getElementById("envioCompraForm").reset();

    return true;




  } catch (error) {
    console.error(' Error durante la compra:', error);

    const alertFallo = document.querySelector('.contenedor-alert');
    if (alertFallo) {
      alertFallo.classList.add('show');
      setTimeout(() => alertFallo.classList.remove('show'), 3000);
    }
    return false;
  }
}




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

















// 🔸 Lista de productos
let producto = [];

// 1. Obtener los productos desde la API
async function obtenerProductos() {
  try {
    const response = await fetch('https://jpremium-h6gahdceh0fgbscx.canadacentral-01.azurewebsites.net/api/producto');
    const data = await response.json();
    producto = data;
    console.log('✅ Productos obtenidos:', producto);
    renderizarSecciones(); // 👉 Llamar después de obtener los datos
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
  }
}

// 2. Función que pinta las secciones si existen
function renderizarSecciones() {
  const seccion = document.querySelector('.section__productos');
  const seccionDescuentos = document.querySelector('.section__descuentos');
  const tablaAdmin = document.querySelector('.productos-table');


  if (seccion && !seccion.dataset.loaded) {
    seccion.dataset.loaded = "true";
    cargarProductosEnSeccion(producto, seccion);
  }

  if (seccionDescuentos && !seccionDescuentos.dataset.loaded) {
    seccionDescuentos.dataset.loaded = "true";
    cargarProductosEnSeccion(producto, seccionDescuentos);
  }

  if (tablaAdmin && !tablaAdmin.dataset.loaded) {
    tablaAdmin.dataset.loaded = "true";

    if (producto && producto.length > 0) {
      cargarProductosEnTabla(producto); // <- nueva función para tabla
    } else {
      obtenerProductos().then(data => {
        cargarProductosEnTabla(data);
      });
    }
  }


}

// 3. MutationObserver que espera las secciones
function inicializarProductos() {
  const observer = new MutationObserver(() => {
    if (producto.length > 0) {
      renderizarSecciones();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  obtenerProductos(); // llamada inicial a la API
}

inicializarProductos()


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
      ? producto.imagenProductos[0].foto
      : 'img/NO IMAGEN.avif';
      

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

function cargarProductosEnTabla(productos) {
  const seccion = document.querySelector('.productos-table');

  if (!seccion) return;

  seccion.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Código</th>
          <th>Categoría</th>
          <th>Descripción</th>
          <th>Precio de venta</th>
          <th>Descuento</th>
          <th>Stock</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        ${productos.map(producto => `
          <tr data-id="${producto.id}">
            <td>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div class="img-box">
                  <img src="${producto.imagenProductos[0]?.foto || 'img/NO IMAGEN.avif'}" alt="${producto.nombre}">
                </div>
                <span>${producto.nombre}</span>
              </div>
            </td>
            <td>${producto.codigo}</td>
            <td>${producto.categoria}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.precioDeVenta}</td>
            <td>${producto.descuento || 0}%</td>
            <td>${producto.stock}</td>
            <td class="actions">
              <i class="fa fa-pen" onclick="abrirModal(${producto.id})"></i>
              
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
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


// 🔸 Al iniciar: actualizar badge
actualizarBadgeCarrito();




document.addEventListener('DOMContentLoaded', () => {
  const cerrarSesionBtn = document.getElementById('cerrar-sesion');

  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener('click', function (event) {
      event.preventDefault();


      localStorage.removeItem('productos-en-carrito');
      localStorage.removeItem('usuario-logueado');

      window.location.replace('/index.html');
    });
  } else {
    console.warn("❌ No se encontró el botón con id 'cerrar-sesion'");
  }
});


/*-------------------------------------------------------------------modal-------------------------------------*/


let productoId;
let imagen;

function abrirModal(id) {
  productoId = id;
  console.log('ID del producto:', productoId);
  document.getElementById('modalProducto').style.display = 'flex';
}

function capturarDatosProducto() {
  const descripcion = document.getElementById('descripcion').value.trim();
  const categoria = document.getElementById('categoria').value;
  const precio = parseFloat(document.getElementById('precioVenta').value);
  const imagenInput = document.getElementById('imagen');

  imagen = imagenInput.files[0];

  const datosProducto = {


    categoria,
    descripcion,
    precio,

  };

  console.log('Datos capturados:', datosProducto, 'Imagen:', imagen);
  return datosProducto;
}

// ✅ Función para hacer la petición PUT
async function actualizarProducto(id, datosProducto) {
  try {
    const respuesta = await fetch(`https://jpremium-h6gahdceh0fgbscx.canadacentral-01.azurewebsites.net/api/producto/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosProducto)
    });

    if (!respuesta.ok) {
      throw new Error('Error al actualizar el producto');
    }

    alert('actualizacion exitosa')
    

    return true;

  } catch (error) {
    console.error('❌ Error en la petición PUT:', error.message);
     alert('Error al actualizar el producto: ' + error.message);
    
    return false;
  }
}

async function subirImagenProducto(id, archivoImagen) {
  const formData = new FormData();
  formData.append('foto', archivoImagen); // usa el nombre de campo que tu backend espera

  const respuesta = await fetch(`https://jpremium-h6gahdceh0fgbscx.canadacentral-01.azurewebsites.net/api/producto/${id}/imagenes`, {
    method: 'POST',
    body: formData
  });

  if (!respuesta.ok) {
    throw new Error('Error al subir la imagen');
  }

  console.log('✅ Imagen subida correctamente');
}


mainContent.addEventListener('click', async function (event) {
  if (event.target && event.target.classList.contains('btn-agregar2')) {
    const form = document.getElementById('productoVentaForm');

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const producto = capturarDatosProducto(); // también actualiza la variable global `imagen`

    try {
      await actualizarProducto(productoId, producto);

      if (imagen) {
        await subirImagenProducto(productoId, imagen);
      }

      location.reload(); // recarga la página si todo fue exitoso

    } catch (error) {
      console.error('❌ Error en el proceso:', error.message);
      alert('Error: ' + error.message);
    }
  }
});


function cerrarModal() {
  document.getElementById('modalProducto').style.display = 'none';
}


