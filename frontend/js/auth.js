// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {


  // Check the current URL path to determine which form is present
  const currentPath = window.location.pathname;

  if (currentPath === "/register") {


    // Registration Form Handling
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
          const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
          });

          const data = await response.json();

          if (response.status === 201) {
            alert("Registration successful. Redirecting to login...");
            window.location.href = "/login"; // Redirect to login page
          } else {
            alert(data.message || "Registration failed");
          }
        } catch (error) {
          console.error("Error during registration:", error);
          alert("An unexpected error occurred. Please try again.");
        }
      });
    } else {
      console.error("Registration form not found");
    }
  } else if (currentPath === "/login") {


    // Login Form Handling
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
          const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (response.status === 200) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            alert("Login successful. Redirecting...");

            if (data.role === "admin") {
              window.location.href = "/dashboard"; // Redirect to admin dashboard
            } else {
              window.location.href = "/"; // Redirect to home for regular users
            }
          } else {
            alert(data.message || "Login failed");
          }
        } catch (error) {
          console.error("Error during login:", error);
          alert("An unexpected error occurred. Please try again.");
        }
      });
    } else {
      console.error("Login form not found");
    }
  } else {
    console.log("No relevant form detected for this route");
  }
});
