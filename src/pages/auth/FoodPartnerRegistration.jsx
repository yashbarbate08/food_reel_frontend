import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FoodPartnerRegistration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const foodPartnerData = {
      name: restaurantName,
      email,
      password,
      contactName,
      phone,
      address,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/food-partner/register`,
        foodPartnerData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        const data = response.data;

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        toast.success("Registration successful! 🎉", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });

        // Clear form fields
        setRestaurantName("");
        setEmail("");
        setPassword("");
        setContactName("");
        setPhone("");
        setAddress("");

        // Navigate after a short delay to let toast show
        setTimeout(() => navigate("/create-food"), 1500);
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br dark:bg-gray-900 p-10">
      <div className="w-full max-w-md dark:bg-gray-800 backdrop-blur-lg rounded-2xl shadow-lg p-5 sm:p-8">
        <h2 className="text-[20px] sm:text-3xl font-bold text-center text-white mb-6">
          Food Partner Registration
        </h2>

        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-2 px-2 overflow-hidden"
        >
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Restaurant Name
            </label>
            <input
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              type="text"
              placeholder="Enter restaurant name"
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

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Contact Name
            </label>
            <input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              type="text"
              placeholder="Enter contact name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Phone Number
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              type="tel"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Address
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              type="text"
              placeholder="Enter address"
              required
            />
          </div>

          <button
            className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition mt-5 duration-200"
            type="submit"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-zinc-400">
          Already have an account?{" "}
          <Link
            className="text-indigo-400 hover:text-indigo-300 font-medium"
            to="/partner/login"
          >
            Login here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
