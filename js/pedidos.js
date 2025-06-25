const botones = document.querySelectorAll('.mostrar');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    // Encontramos el contenedor del pedido más cercano al botón
    const container = boton.closest('.header').nextElementSibling;

    if (container.classList.contains('visible')) {
      container.classList.remove('visible');
      boton.textContent = 'Mostrar pedido';
    } else {
      container.classList.add('visible');
      boton.textContent = 'Ocultar pedido';
    }
  });
});
