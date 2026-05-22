"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Menu, X } from "lucide-react";
import CartBadge from "./CartBadge";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const items = ["Shop", "Collections", "About"];

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* LEFT */}
          <div className="hidden md:flex items-center gap-3 text-sm font-medium text-gray-700">
            {items.map((item) => {
              const href = `/${item.toLowerCase()}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={item}
                  href={href}
                  className="relative group"
                >
                  {item}

                  {/* underline (UNCHANGED STYLE) */}
                  <span
                    className={`absolute left-0 -bottom-1 h-px bg-black transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* LOGO */}
          <Link href="/" className="text-2xl font-semibold tracking-[0.9em]">
            RIFORA
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full hover:bg-black/5 transition"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* USER */}
            <button className="p-2 rounded-full hover:bg-black/5 transition">
              <User size={20} strokeWidth={1.5} />
            </button>

            {/* CART */}
            <CartBadge />

            {/* MOBILE MENU */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-black/5"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 space-y-4 text-gray-700">
            {items.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start pt-24">
          <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Search</h2>
              <button onClick={() => setSearchOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Search RiFora..."
              className="w-full border px-4 py-2 rounded-md outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;