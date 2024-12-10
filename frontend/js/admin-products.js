const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/api/products");
    const products = await response.json();
    const productTable = document.getElementById("productTable");
  
    productTable.innerHTML = products
      .map(
        (product) => `
        <tr>
          <td class="px-4 py-2 border">${product.name}</td>
          <td class="px-4 py-2 border">$${product.price}</td>
          <td class="px-4 py-2 border">${product.stock}</td>
          <td class="px-4 py-2 border">
            <button class="bg-red-500 text-white px-4 py-2 rounded" onclick="deleteProduct('${product._id}')">Delete</button>
          </td>
        </tr>
      `
      )
      .join("");
  };
  
  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  
    if (response.ok) {
      alert("Product deleted successfully");
      fetchProducts();
    } else {
      alert("Failed to delete product");
    }
  };
  
  const productForm = document.getElementById("productForm");
  
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const product = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      price: document.getElementById("price").value,
      stock: document.getElementById("stock").value,
      image: document.getElementById("image").value,
    };
  
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
  
    if (response.ok) {
      alert("Product added successfully");
      fetchProducts();
      productForm.reset();
    } else {
      alert("Failed to add product");
    }
  });
  
  fetchProducts();
  