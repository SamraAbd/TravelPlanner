import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    const stored = localStorage.getItem("user_" + username);

    if (!stored) {
      alert("User not found. Please sign up first.");
      return;
    }

    const user = JSON.parse(stored);

    if (user.password !== password) {
      alert("Wrong password");
      return;
    }

    // mark user as logged in
    localStorage.setItem("logged_in_user", username);

    // go to home page with cities
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="auth-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
