import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Upload, Play } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { IoIosLogOut } from "react-icons/io";
import { Navigate, useNavigate } from "react-router-dom";

const FoodCreationForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    video: null,
  });
  const [preview, setPreview] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      if (name === "video") {
        setPreview(URL.createObjectURL(files[0]));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    if (form.video) formData.append("video", form.video);

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/food`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );

      // Show success toast
      toast.success("🍽 Food created successfully!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Reset form
      setForm({ name: "", description: "", video: null });
      setPreview(null);
      setUploadProgress(0);
      setLoading(false);
      setShowVideo(false);
    } catch (err) {
      console.error("Error creating food:", err.response?.data || err.message);
      toast.error("❌ Failed to create food", {
        position: "top-right",
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  async function LogOut() {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/auth/food-partner/logout`,
      {
        withCredentials: true,
      }
    );

    if (response) {
      navigate("/partner/login");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black px-5">
      <div
        onClick={() => {
          LogOut();
        }}
        className="absolute top-4 right-8 bg-red-700 p-1 rounded-full  "
      >
        <h1 className="text-base font-semibold cursor-pointer dark:text-white text-gray-900">
          <IoIosLogOut />
        </h1>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/30 dark:bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-white/20"
      >
        <h2 className="text-2xl font-bold text-center dark:text-white text-gray-900">
          🍽 Create Food Item
        </h2>

        {/* Name */}
        <div className="relative">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="peer w-full rounded-xl bg-transparent border border-gray-400 dark:border-gray-600 px-3 pt-5 pb-2 text-gray-900 dark:text-white placeholder-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Food Name"
          />
          <label className="absolute left-3 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-500">
            Food Name
          </label>
        </div>

        {/* Description */}
        <div className="relative">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="peer w-full rounded-xl bg-transparent border border-gray-400 dark:border-gray-600 px-3 pt-5 pb-2 text-gray-900 dark:text-white placeholder-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            placeholder="Description"
          />
          <label className="absolute left-3 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-500">
            Description
          </label>
        </div>

        {/* Video Upload */}
        <div className="space-y-3 relative">
          <label className="block text-sm font-medium dark:text-zinc-300 text-gray-700">
            Upload Video
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed roun</div>ded-xl cursor-pointer bg-white/40 dark:bg-white/5 border-gray-400 dark:border-gray-600 hover:border-indigo-500 hover:bg-white/60 dark:hover:bg-white/10 transition">
              <Upload className="w-8 h-8 text-gray-500 dark:text-gray-400 mb-2" />
              <span className="text-gray-500 dark:text-gray-400">
                Click to upload video
              </span>
              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Preview with Play Overlay */}
          {preview && (
            <div
              className="relative rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 cursor-pointer group mt-2"
              onClick={() => setShowVideo(!showVideo)}
            >
              {!showVideo ? (
                <>
                  <img
                    src="https://dummyimage.com/600x300/000/fff&text=Video+Preview"
                    alt="video thumbnail"
                    className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition"
                  />
                  <Play className="absolute inset-0 m-auto w-14 h-14 text-white drop-shadow-lg opacity-80 group-hover:scale-110 transition" />
                </>
              ) : (
                <video
                  src={preview}
                  controls
                  className="w-full h-48 object-cover"
                />
              )}

              {/* Upload Progress Overlay */}
              {loading && (
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center">
                  <div className="w-3/4 bg-gray-300 h-2 rounded overflow-hidden">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-white mt-2 font-medium">
                    Uploading: {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? `Uploading... ${uploadProgress}%` : "Create Food"}
        </motion.button>
      </motion.form>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default FoodCreationForm;
