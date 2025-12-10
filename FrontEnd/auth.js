// Save new user
function signup() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  // Check if user exists
  if (localStorage.getItem("user_" + username)) {
    alert("User already exists!");
    return;
  }

  // Save user
  const userData = { username, password };
  localStorage.setItem("user_" + username, JSON.stringify(userData));

  alert("Signup successful! Now you can login.");
  window.location.href = "login.html";
}


// Login user
function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const userData = localStorage.getItem("user_" + username);

  if (!userData) {
    alert("User not found");
    return;
  }

  const user = JSON.parse(userData);

  if (user.password !== password) {
    alert("Wrong password");
    return;
  }

  // Save session
  localStorage.setItem("logged_in_user", username);

  window.location.href = "index.html"; // go to planner
}


// Check login protection
function requireLogin() {
  const loggedIn = localStorage.getItem("logged_in_user");
  if (!loggedIn) {
    window.location.href = "login.html";
  }
}


// Logout
function logout() {
  localStorage.removeItem("logged_in_user");
  window.location.href = "login.html";
}
