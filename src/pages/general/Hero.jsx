import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.jpg"; // using your original image

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Delicious food showcase"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 space-y-8 animate-fade-in">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white animate-scale-in">
            Food
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent animate-slide-in-right">
            Video's
          </h2>
        </div>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-gray-200 max-w-md leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Discover, cook, and share amazing recipes through captivating video
          content
        </p>

        {/* CTA Button */}
        <div
          className="pt-4 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <Link
            to="/user/login"
            className="px-8 py-4 text-lg font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-5" />
    </div>
  );
};

export default Hero;
