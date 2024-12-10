let cart = [];

const fetchProducts = async () => {
  const response = await fetch("http://localhost:5000/api/products");
  const products = await response.json();
  const productList = document.getElementById("productList");

  productList.innerHTML = products
    .map(
      (product) => `
      <div class="bg-white p-4 rounded-lg shadow-md">
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg mb-4">
        <h3 class="text-lg font-bold">${product.name}</h3>
        <p class="text-gray-500">${product.description}</p>
        <p class="text-gray-900 font-bold mt-2">$${product.price}</p>
        <button
          class="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onclick="addToCart('${product._id}', '${product.name}', ${product.price})"
        >
          Add to Cart
        </button>
      </div>
    `
    )
    .join("");
};

const addToCart = (id, name, price) => {
  const itemIndex = cart.findIndex((item) => item.id === id);

  if (itemIndex > -1) {
    cart[itemIndex].quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  updateCart();
};

const updateCart = () => {
  const cartItems = document.getElementById("cartItems");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="text-gray-500">Your cart is empty.</p>`;
    checkoutBtn.classList.add("hidden");
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
      <div class="flex justify-between items-center mb-4">
        <p>${item.name} (x${item.quantity})</p>
        <p class="font-bold">$${item.price * item.quantity}</p>
      </div>
    `
    )
    .join("");

  checkoutBtn.classList.remove("hidden");
};

const checkout = async () => {
  alert("Checkout functionality will be implemented later!");
  cart = [];
  updateCart();
};

fetchProducts();
