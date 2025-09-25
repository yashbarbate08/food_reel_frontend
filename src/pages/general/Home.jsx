import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import Footer from "../../components/Footer";
import CommentPanal from "../../components/CommentPanal";
import { gsap } from "gsap";

const Home = () => {
  const navigate = useNavigate();
  const videoRefs = useRef([]);
  const [videos, setVideos] = useState([]);
  const [showCommentPanal, setshowCommentPanal] = useState(false);
  const commentRef = useRef(null);
  const [getCommentId, setgetCommentId] = useState("");
  const [getComments, setgetComments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // Auto play/pause based on which video is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.8 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
      observer.disconnect();
    };
  }, [videos]);

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/food`,
          { withCredentials: true }
        );
        setVideos(response.data.foodItems || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  // Like video
  async function likeVideo(item) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/food/like`,
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                likeCount: response.data.likeCount,
                liked: response.data.liked,
              }
            : v
        )
      );
    } catch (err) {
      console.error("Error liking video:", err);
    }
  }

  // Bookmark video
  async function bookmarkVideo(item) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/food/save`,
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                saveCount: response.data.saveCount,
                saved: response.data.saved,
              }
            : v
        )
      );
    } catch (err) {
      console.error("Error saving video:", err);
    }
  }

  // Logout
  async function LogOut() {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/user/logout`, {
        withCredentials: true,
      });
      navigate("/user/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  }

  // GSAP animation for comment panel
  useEffect(() => {
    if (commentRef.current) {
      gsap.to(commentRef.current, {
        y: showCommentPanal ? 0 : "100%",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [showCommentPanal]);

  // Fetch comments for a food item
  async function getComment(foodId) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/food/comment/${foodId}`,
        { withCredentials: true }
      );

      setgetComments(
        Array.isArray(response.data.comments) ? response.data.comments : []
      );
      return response.data.comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
      setgetComments([]);
      return [];
    }
  }

  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black">
      <div
        onClick={LogOut}
        className="absolute top-4 right-4 bg-red-700 p-1 rounded-full z-50"
      >
        <IoIosLogOut className="text-white text-xl cursor-pointer" />
      </div>

      {videos.map((item, idx) => (
        <div
          key={item._id}
          className="relative h-screen w-screen flex items-center justify-center snap-start"
        >
          {/* Video */}
          <video
            ref={(el) => (videoRefs.current[idx] = el)}
            className="absolute inset-0 w-full h-full object-cover"
            src={item.video}
            loop
            // muted
            playsInline
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="flex">
            {/* Description + Button */}
            <div className="absolute bottom-0 left-0 w-[80%] px-5 pb-6 z-10">
              <h2 className="ml-2 text-xl text-white font-bold">{item.name}</h2>
              <p className="text-white -ml-2 text-sm md:text-lg font-medium mb-1 rounded-lg px-4 py-2 max-w-xl">
                {item.description}
              </p>
              <Link
                to={`/food-partner/${item.foodPartner}`}
                className="bg-blue-600 w-38 mb-6 flex justify-center gap-2 items-center text-white font-semibold py-2 px-5 rounded-xl shadow-lg transition"
              >
                Visit Store
                <RiSendPlaneFill />
              </Link>
            </div>

            {/* Actions */}
            <div className="absolute bottom-25 flex flex-col gap-6 right-7">
              {/* Like */}
              <div className="flex flex-col justify-center items-center gap-1">
                <button onClick={() => likeVideo(item)}>
                  {item.liked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
                <p className="text-[10px]">{item.likeCount}</p>
              </div>

              {/* Comment */}
              <div className="flex flex-col justify-center gap-1 items-center">
                <button
                  onClick={() => {
                    setshowCommentPanal(true);
                    setgetCommentId(item);
                    getComment(item._id);
                  }}
                >
                  <FaRegComment className="text-xl" />
                </button>
                <p className="text-[10px]">{getComments.length}</p>
              </div>

              {/* Save */}
              <div className="flex flex-col justify-center gap-1 items-center">
                <button onClick={() => bookmarkVideo(item)}>
                  {item.saved ? (
                    <FaBookmark className="text-white" />
                  ) : (
                    <IoBookmarkOutline className="text-white" />
                  )}
                </button>
                <p className="text-[10px]">{item.saveCount}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Footer />

      {/* Comment Panel */}
      <div
        ref={commentRef}
        className="w-full h-[70%] bottom-0 sticky text-black bg-white rounded-t-4xl transform translate-y-full z-10"
      >
        <CommentPanal
          setshowCommentPanal={setshowCommentPanal}
          user={user}
          getCommentId={getCommentId}
          getComments={getComments}
          refreshComments={getComment}
        />
      </div>
    </div>
  );
};

export default Home;
