"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">

      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-semibold tracking-[0.5em] mb-4">
            RIFORA
          </h2>

          <p className="text-sm text-gray-500 leading-6">
            A refined fashion experience built with simplicity, elegance,
            and modern luxury aesthetics.
          </p>
        </div>

        {/* NAV LINKS */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-gray-800">
            Navigation
          </h3>

          <ul className="space-y-3 text-sm text-gray-500">

            <li>
              <Link href="/" className="hover:text-black transition">
                Home
              </Link>
            </li>

            <li>
              <Link href="/shop" className="hover:text-black transition">
                Shop
              </Link>
            </li>

            <li>
              <Link href="/collections" className="hover:text-black transition">
                Collections
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-black transition">
                About
              </Link>
            </li>

          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-gray-800">
            Support
          </h3>

          <ul className="space-y-3 text-sm text-gray-500">

            <li className="hover:text-black cursor-pointer transition">
              Shipping Info
            </li>

            <li className="hover:text-black cursor-pointer transition">
              Returns
            </li>

            <li className="hover:text-black cursor-pointer transition">
              Privacy Policy
            </li>

            <li className="hover:text-black cursor-pointer transition">
              Terms
            </li>

          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-gray-800">
            Contact
          </h3>

          <div className="space-y-3 text-sm text-gray-500">

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Bangladesh</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+880 1XXXXXXXXX</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>support@rifora.com</span>
            </div>

          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

          <p>© {new Date().getFullYear()} RIFORA. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-black cursor-pointer transition">
              Instagram
            </span>
            <span className="hover:text-black cursor-pointer transition">
              Facebook
            </span>
            <span className="hover:text-black cursor-pointer transition">
              TikTok
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
}