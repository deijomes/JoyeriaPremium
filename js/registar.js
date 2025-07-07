
const alertFallo = document.querySelector('.contenedor-alert');
const alertExito = document.querySelector('.contenedor-alerta');

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

        
        alertExito.classList.add('show');

        setTimeout(() => {
            alertExito.classList.remove('show');
            window.location.href = '/indexAdmin.html'; 
        }, 1000);


    } catch (error) {
        console.error('Error durante el registro:', error);
        alertFallo.classList.add('show');

        setTimeout(() => {
            alertFallo.classList.remove('show');
        }, 2000);
    }
}
