import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [videos, setvideos] = useState([]);
  const [profile, setprofile] = useState(null);

  useEffect(() => {
    async function fetchDets() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/food-partner/${id}`,
          {
            withCredentials: true,
          }
        );

        setvideos(response.data.foodPartner.foodItems);
        setprofile(response.data.foodPartner || {});
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    }

    fetchDets(); // ✅ call it
  }, [id]);

  return (
    <div className="h-screen w-full bg-zinc-900 text-white p-1 overflow-hidden">
      {/* Profile Card */}
      <div className="bg-zinc-800 rounded-2xl shadow-lg p-6 m-4">
        <div className="flex items-center gap-5 border-b border-zinc-600 pb-4">
          <div className="h-24 w-24">
            <img
              className="rounded-full object-cover w-full h-full border-2 border-green-600"
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1160&auto=format&fit=crop"
              alt="profile"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">{profile?.name}</h1>
            <p className="text-zinc-400 text-sm">{profile?.address}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around mt-6">
          <div className="flex flex-col items-center bg-green-700 p-3 rounded-lg w-32 shadow-md">
            <h3 className="text-xs">Total Meals</h3>
            <h2 className="text-xl font-bold">58</h2>
          </div>
          <div className="flex flex-col items-center bg-green-700 p-3 rounded-lg w-32 shadow-md">
            <h3 className="text-xs">Customers Serve</h3>
            <h2 className="text-xl font-bold">15K+</h2>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="m-4 grid grid-cols-3 sm:grid-cols-4 gap-1 ">
        {videos.length > 0 ? (
          videos.map((v, i) => (
            <div
              key={v._id || i}
              className="h-50 w-full  flex items-center justify-center transition cursor-pointer"
            >
              <video
                src={v.video}
                autoPlay
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => e.currentTarget.pause()}
                className="w-full h-full "
              />
            </div>
          ))
        ) : (
          <p className="text-zinc-400">No videos available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
