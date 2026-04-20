"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(2);

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* LEFT */}
          <div className="hidden md:flex items-center gap-3 text-sm font-medium text-gray-700">
            {["Shop", "Collections", "About"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="relative group"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* LOGO */}
          <Link
            href="/"
            className="text-2xl font-semibold tracking-[0.9em]"
          >
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
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 rounded-full hover:bg-black/5 transition relative"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </button>

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
            {["Shop", "New", "Collections", "About"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="block">
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

      {/* CART DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-semibold">Your Cart</h2>
          <button onClick={() => setCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="p-4 text-sm text-gray-500">
          Your cart feels lonely… add something beautiful.
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition">
            Checkout
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}
    </>
  );
};

export default Navbar;