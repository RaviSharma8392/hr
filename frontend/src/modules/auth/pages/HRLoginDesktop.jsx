// HRLoginDesktop.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "../../../app/services/auth/AuthService";

export default function HRLoginDesktop() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginWithEmail(form.email, form.password);
      if (user.role !== "hr") throw new Error("HR only");

      navigate("/hr");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Marketing Side */}
      <div className="w-1/2 bg-[#0F172A] text-white flex flex-col justify-center p-16">
        <h1 className="text-5xl font-black mb-6">Build your dream workforce</h1>

        <p className="text-gray-400 text-lg">
          Manage hiring pipeline and candidates professionally.
        </p>
      </div>

      {/* Login Side */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-black">Employer Login</h2>

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Work email"
            className="w-full p-4 bg-gray-100 rounded-lg"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-4 bg-gray-100 rounded-lg"
          />

          <button className="w-full h-14 bg-[#008BDC] text-white font-bold rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
