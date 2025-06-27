const botones = document.querySelectorAll('.mostrar');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
   
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
