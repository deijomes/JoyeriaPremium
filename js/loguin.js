document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que se envíe el formulario

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validar campos vacíos
    if (!email || !password) {
      alert('Por favor, completa todos los campos.');
     
    }


    if (email === 'admin@joyeria.com' && password === '123') {
      alert('Inicio de sesión exitoso');
       window.location.href = '/indexAdmin.html'
    } else {
      alert('Correo o contraseña incorrectos');
    }
  });