document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita que se envíe el formulario

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validar campos vacíos
  if (!nombre || !correo || !telefono || !password) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Llamar a la función con el orden correcto
  registro(nombre, correo, telefono, password);
});

async function registro(nombre, correo, telefono, password) {
  const payload = {
    nombre: nombre,
    correo: correo,
    telefono: telefono, // corregido
    password: password
  };

  try {
    const response = await fetch('https://localhost:7287/api/usuarios/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Error al registrar: ' + response.status);
    }

    const data = await response.json();
    console.log('Registro exitoso:', data);

    localStorage.setItem("usuario-logueado", JSON.stringify(data));
    window.location.href = '/indexAdmin.html';

  } catch (error) {
    console.error('Error durante el registro:', error);
    alert('No se pudo completar el registro. Intenta más tarde.');
  }
}
