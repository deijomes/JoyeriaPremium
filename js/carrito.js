document.getElementById("btnCheckout").addEventListener("click", function () {
    const token = localStorage.getItem("token"); 

    if (!token) {
      
      window.location.href = "pages/loguin.html"; 
    } else {
      // Si hay token, continuar al checkout
      window.location.href = "/checkout.html"; // Cambia por tu ruta real
    }
  });

  document.getElementById("btnContinue").addEventListener("click", function () {
    const token = localStorage.getItem("token"); 

    if (!token) {
      
      window.location.href = "index.html"; 
    } else {
      // Si hay token, continuar al checkout
      window.location.href = "/checkout.html"; // Cambia por tu ruta real
    }
  });