const routes = {
  '/home': 'admin/home.html',
  '/about': 'pages/loguin.html',
  '/product': 'admin/product.html'
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
