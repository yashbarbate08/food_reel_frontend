import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { RiHome2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-10 
      bg-gradient-to-r from-zinc-900/80 via-zinc-800/70 to-zinc-900/80
      backdrop-blur-md shadow-lg flex justify-around items-center 
      text-gray-200 z-50 rounded-t-xl">
      
      {/* Home */}
      <Link to="/reels" className="text-xl hover:text-white transition">
        <RiHome2Line />
      </Link>

      {/* More Options */}
      <button className="text-2xl hover:text-white transition">
        <IoEllipsisVerticalOutline />
      </button>

      {/* Saved */}
      <Link to="/saved" className="text-xl hover:text-white transition">
        <FaRegBookmark />
      </Link>
    </div>
  );
};

export default Footer;
