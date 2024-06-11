import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useNavigate } from "react-router-dom";

const EmpLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const naviget=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      // Assuming the backend returns user data on successful authentication
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
      naviget("/employees")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>User Login</h2>
        <div className="mb-3">
          <label htmlFor="user-username" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="user-password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="user-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default EmpLogin;
