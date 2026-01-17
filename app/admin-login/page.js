"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginAdmin = async () => {
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("admin", "true");
      window.location.href = "/admin-dashboard";
    } else {
      setMessage("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-red-50">
      <div className="card w-96">
        <h1 className="text-3xl font-bold text-red-700 mb-4">Admin Login</h1>

        <input className="input" placeholder="Admin Email" name="email" onChange={handleChange} />
        <input className="input" type="password" placeholder="Admin Password" name="password" onChange={handleChange} />

        <button className="btn-primary mt-4" onClick={loginAdmin}>Login</button>

        {message && <p className="text-red-600 text-center mt-3">{message}</p>}
      </div>
    </div>
  );
}
