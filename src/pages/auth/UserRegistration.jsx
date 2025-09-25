import React, { useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const registerData = { fullname: name, email, password };


    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/user/register`,
        registerData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        const data = response.data;



        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        navigate("/reels");
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br dark:bg-gray-900">
      <div className="w-full max-w-md dark:bg-gray-800 backdrop-blur-lg rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center  text-white mb-6">
          User Registration
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              type="text"
              placeholder="Enter name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              type="email"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200"
            type="submit"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-zinc-400">
          Already have an account?{" "}
          <Link
            className="text-indigo-400 hover:text-indigo-300 font-medium"
            to="/user/login"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
