import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FoodPartnerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const foodPartnerData = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/food-partner/login`,
        foodPartnerData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        const data = response.data;

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // save partner data too if needed
        localStorage.setItem("foodPartner", JSON.stringify(data));

        toast.success(data.message || "Login successful 🎉", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        // delay so toast shows before redirect
        setTimeout(() => navigate("/create-food"), 1000);
      }
    } catch (err) {
      if (err.response?.data?.message) {
        seterror(err.response.data.message);

        toast.error(err.response.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        seterror("Something went wrong. Please try again.");

        toast.error("Something went wrong. Please try again.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br dark:bg-gray-900">
      <div className="w-full max-w-md dark:bg-gray-800 backdrop-blur-lg rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
          Food Partner Login
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">
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
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-zinc-400">
          Don’t have an account?{" "}
          <Link
            className="text-indigo-400 hover:text-indigo-300 font-medium"
            to="/partner/register"
          >
            Register here
          </Link>
        </p>

        <div className="mt-6">
          <Link
            to="/user/login"
            className="block text-center py-2 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold shadow hover:scale-105 transition-transform duration-200"
          >
            Login as User
          </Link>
        </div>
      </div>
      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
