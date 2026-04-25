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
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-between px-10 py-12">

         

          {/* FORM */}
          <div className="max-w-sm mx-auto w-full">

            <div className="mb-10">
              <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">
                Welcome back
              </p>

              <h1 className="text-4xl font-light text-gray-900 leading-tight">
                Sign in to <br />
                your account
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

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

              {/* Remember */}
              <div className="flex justify-between items-center text-xs">
                <label
                  onClick={() => setRemember(!remember)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div
                    className={`w-4 h-4 border flex items-center justify-center ${
                      remember ? "bg-black border-black" : "border-gray-300"
                    }`}
                  >
                    {remember && <div className="w-2 h-2 bg-white" />}
                  </div>
                  Remember me
                </label>

                <Link href="#" className="text-gray-400 hover:text-black">
                  Forgot?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 text-xs tracking-[0.2em] uppercase hover:opacity-80 transition"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-3">
              <div className="h-px bg-gray-100 flex-1" />
              <span className="text-[10px] text-gray-300 uppercase">or</span>
              <div className="h-px bg-gray-100 flex-1" />
            </div>

            {/* Google */}
            <button className="w-full border py-3 text-xs uppercase tracking-widest text-gray-500 hover:text-black">
              Continue with Google
            </button>

            {/* Signup */}
            <p className="text-center text-xs text-gray-400 mt-8">
              New user?{" "}
              <Link href="/register" className="text-black underline">
                Create account
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-[10px] text-gray-300 text-center mt-10">
            © 2026 RIFORA
          </p>
        </div>

        {/* RIGHT SIDE */}
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