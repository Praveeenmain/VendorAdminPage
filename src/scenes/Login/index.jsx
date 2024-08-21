import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import './index.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://vendoradminbackend.onrender.com/adminlogin', 
        { username, password }
      );
      // Set token in cookie
      Cookies.set("token", response.data.token, { expires: 1 }); // Token expires in 1 day
      setSuccess("Login successful!");
      setError("");

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div>
        <img src={require('../../assests/admin.png')} alt="admin" className="admin-image"/>
      </div>
      
      <form className="admin-login-form" onSubmit={handleSubmit}>
      <h2 className="admin-login-header">Admin Login</h2>
        <div className="admin-login-form-group">
          <label htmlFor="username" className="admin-login-label">Username</label>
          <input
            type="text"
            id="username"
            className="admin-login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="admin-login-form-group">
          <label htmlFor="password" className="admin-login-label">Password</label>
          <input
            type="password"
            id="password"
            className="admin-login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {error && <div className="admin-login-error-message">{error}</div>}
        {success && <div className="admin-login-success-message">{success}</div>}
        <button type="submit" className="admin-login-button" disabled={loading}>
          {loading ? <Circles color="#00BFFF" height={30} width={30} /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
