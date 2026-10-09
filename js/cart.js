// Cart stored in the browser (localStorage)
function getCart() {
  return JSON.parse(localStorage.getItem("voren_cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("voren_cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(
    (item) => item.id === product.id && item.size === product.size
  );
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
}

function removeFromCart(id, size) {
  saveCart(getCart().filter((item) => !(item.id === id && item.size === size)));
}

function cartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartCount() {
  const count = getCart().reduce((n, item) => n + item.qty, 0);
  const el = document.querySelector("#cart-count");
  if (el) el.textContent = count;
}
