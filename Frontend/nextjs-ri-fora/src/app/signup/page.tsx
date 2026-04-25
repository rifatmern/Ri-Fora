"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className={`${lato.className} min-h-screen bg-gray-50 flex items-center justify-center px-4`}>

      {/* CONTAINER */}
      <div className="w-full max-w-6xl bg-white shadow-sm border border-gray-100 overflow-hidden grid lg:grid-cols-2">

        {/* LEFT SIDE (FORM) */}
        <div className="flex flex-col justify-between px-10 py-12">

          {/* FORM */}
          <div className="max-w-sm mx-auto w-full">

            <div className="mb-10">
              <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">
                Start journey
              </p>

              <h1 className="text-4xl font-light text-gray-900 leading-tight">
                Create <br />
                your account
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-b border-gray-200 py-3 pr-10 text-sm focus:outline-none focus:border-black"
                    placeholder="••••••••"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border-b border-gray-200 py-3 pr-10 text-sm focus:outline-none focus:border-black"
                    placeholder="••••••••"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 text-xs tracking-[0.2em] uppercase hover:opacity-80 transition"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            {/* Login link */}
            <p className="text-center text-xs text-gray-400 mt-8">
              Already have an account?{" "}
              <Link href="/login" className="text-black underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* FOOTER */}
          <p className="text-[10px] text-gray-300 text-center mt-10">
            © 2026 RIFORA
          </p>
        </div>

        {/* RIGHT SIDE (IMAGE SAME STYLE) */}
        <div className="hidden lg:block relative">

          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

        </div>

      </div>
    </div>
  );
}