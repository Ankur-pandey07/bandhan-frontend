"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // admin check
    if (!localStorage.getItem("admin")) {
      window.location.href = "/admin-login";
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    await fetch(`http://localhost:5000/api/admin/users/${id}`, { method: "DELETE" });

    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-red-50 p-6">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-5">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {users.map((u) => (
          <div key={u._id} className="card">
            <h2 className="text-xl font-bold">{u.name}</h2>
            <p>{u.email}</p>
            <p>{u.age} • {u.gender}</p>
            <p className="text-gray-600">{u.location}</p>

            <button
              className="btn-primary mt-3 bg-red-700"
              onClick={() => deleteUser(u._id)}
            >
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
