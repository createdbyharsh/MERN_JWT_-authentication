import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", formData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-600">
          Login
        </h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none focus:border-blue-400"
              placeholder="Enter your email"
              required
              onChange={handleChange}
              name="email"
              value={formData.email}
              autoComplete="off"
            />
          </div>
          <div>
            <label className="">Password</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none focus:border-blue-400"
              placeholder="Enter your Password"
              required
              onChange={handleChange}
              name="password"
              value={formData.password}
            />
          </div>
          <button className=" bg-blue-600 text-white rounded-lg my-5 w-full cursor-pointer py-2 ">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
