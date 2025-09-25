import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import axios from "axios";
import { FaBookmark, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Saved = () => {
  const [savedReels, setSavedReels] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/food/save`,
        { withCredentials: true }
      );

      const savedFoods = response.data.savedFoods.map((item) => ({
        _id: item.food._id,
        video: item.food.video,
        description: item.food.description,
        likeCount: item.food.likeCount,
        savesCount: item.food.saveCount,
        commentsCount: item.food.commentsCount,
        foodPartner: item.food.foodPartner,
        name: item.food.name,
      }));

      setSavedReels(savedFoods);
    }

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-2 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Saved Videos</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-1">
        {savedReels.length > 0 ? (
          savedReels.map((reel) => (
            <div
              key={reel._id}
              className="flex flex-col md:flex-row bg-gray-900 rounded-xl shadow-lg overflow-hidden"
            >
              <video
                className="w-full md:w-1/2 h-56 object-cover"
                src={reel.video || ""}
                controls
                loop
                muted
              />
              <div className="flex flex-col justify-between p-2 md:w-1/2">
                <div>
                  <h2 className="text-sm font-semibold mb-2">{reel.name}</h2>
                  <p className="text-xs text-gray-300 mb-4 line-clamp-3">
                    {reel.description}
                  </p>

                  <div className="flex gap-1 w-full justify-around items-center">
                    <div className="flex flex-col justify-center items-center gap-1">
                      <FaRegHeart className="text-xs" />
                      <p className="text-[10px]">{reel.likeCount || 0}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1">
                      <FaBookmark className="text-xs" />
                      <p className="text-[10px]">{reel.savesCount || 0}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={reel.storeUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-700 text-white text-[12px] font-semibold py-2 px-2 rounded-lg mt-2"
                >
                  Visit Store
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-400 mt-4">
            No videos found...
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Saved;
