import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeToggle from "../../components/ThemeToggle";
import { userDataContext } from "../../context/UserContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = React.useContext(userDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/user/login`,
        userData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        const data = response.data;

        setUser(data.user);

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Save user
        localStorage.setItem("user", JSON.stringify(data));

        setsuccess(data.message);

        toast.success(data.message, {
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

        // Navigate after short delay so toast shows
        setTimeout(() => navigate("/reels"), 1000);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
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
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center px-4 sm:px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <ThemeToggle />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Welcome Back 👋
        </h2>

        {/* Login form */}
        <form onSubmit={submitHandler} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              type="email"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Login Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 px-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-500 transition duration-300 shadow-md"
            type="submit"
          >
            Login
          </motion.button>
        </form>

        {/* Register link */}
        <p className="text-sm text-center mt-5 text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            to="/user/register"
          >
            Register here
          </Link>
        </p>

        {/* Food Partner login */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6"
        >
          <Link
            to="/partner/login"
            className="block text-center py-2 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold shadow hover:scale-105 transition-transform duration-300"
          >
            Login as Food Partner
          </Link>
        </motion.div>
      </motion.div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
