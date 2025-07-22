// import "./Register.css";
// import { useRef } from "react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const url = `${API_URL}/api/users/register`;
      const res = await axios.post(url, form);
      if (res.status === 201 || res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please check your details.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2>Create Account</h2>
        {error && <p className="error-msg">{error}</p>}

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={handleRegister}>Create Account</button>
      </div>
    </div>
  );
}
