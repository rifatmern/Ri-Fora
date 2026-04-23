"use client";

import React from "react";
import Link from "next/link";

const Banner: React.FC = () => {
  return (
    <section className="w-full min-h-screen bg-[#f8f8f8] flex items-center justify-center px-4">
      
      {/* CENTER CONTENT */}
      <div className="text-center space-y-6 max-w-2xl">

        <p className="text-xs sm:text-sm tracking-[0.3em] text-gray-500 uppercase">
          New Collection 2026
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Elevate Your <br />
          Everyday Style
        </h1>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
          Discover timeless pieces crafted with elegance and designed to redefine your wardrobe.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <Link
            href="/shop"
            className="border border-black px-6 py-3 rounded-md hover:bg-black hover:text-white transition"
          >
            Shop Now
          </Link>

          <Link
            href="/new"
            className="border border-black px-6 py-3 rounded-md hover:bg-black hover:text-white transition"
          >
            Explore
          </Link>

        </div>

      </div>

    </section>
  );
};

export default Banner;