const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    const users = await response.json();
    const usersTable = document.getElementById("usersTable");
  
    usersTable.innerHTML = users
      .map(
        (user) => `
        <tr>
          <td class="px-4 py-2 border">${user._id}</td>
          <td class="px-4 py-2 border">${user.username}</td>
          <td class="px-4 py-2 border">${user.email}</td>
          <td class="px-4 py-2 border">
            <button class="bg-red-500 text-white px-4 py-2 rounded" onclick="deleteUser('${user._id}')">Delete</button>
          </td>
        </tr>
      `
      )
      .join("");
  };
  
  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  
    if (response.ok) {
      alert("User deleted successfully");
      fetchUsers();
    } else {
      alert("Failed to delete user");
    }
  };
  
  fetchUsers();
  