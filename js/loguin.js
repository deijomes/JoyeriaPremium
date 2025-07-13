const alertFallo = document.querySelector('.contenedor-alert');
const alertExito = document.querySelector('.contenedor-alerta');

document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita que se envíe el formulario



  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validar campos vacíos
  if (!email || !password) {
    alert('Por favor, completa todos los campos.');
    return;
  }


  login(email, password);
});

async function login(correo, password) {
  const payload = {
    correo: correo,
    password: password
  };

  try {
    const response = await fetch('https://jpremium-h6gahdceh0fgbscx.canadacentral-01.azurewebsites.net/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión: ' + response.status);
    }

    const data = await response.json();
    console.log('Login exitoso:', data);
    

    localStorage.setItem("usuario-logueado", JSON.stringify(data));
    window.location.href = '/indexAdmin.html'

  } catch (error) {
    console.error('Error durante el login:', error);
    alertFallo.classList.add('show');

    setTimeout(() => {
      alertFallo.classList.remove('show');
    }, 3000);
  }
}
