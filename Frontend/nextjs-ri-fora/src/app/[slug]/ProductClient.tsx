"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/sanity/client";
import { ArrowLeft, Star, MessageCircle, Send, User, Heart, Truck, RotateCcw, Clock } from "lucide-react";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const { projectId, dataset } = client.config();

const urlFor = (source: any) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source).url()
    : "";

function Stars({ count, interactive = false, onSet }: { count: number; interactive?: boolean; onSet?: (v: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => onSet?.(i)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            size={interactive ? 18 : 14}
            className={`transition-colors ${
              i <= count ? "fill-amber-400 text-amber-400" : "text-gray-200"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

const ratingBreakdown = [
  { star: 5, count: 32 },
  { star: 4, count: 10 },
  { star: 3, count: 5 },
  { star: 2, count: 2 },
  { star: 1, count: 1 },
];

const sizes = ["S", "M", "L", "XL"];

export default function ProductClient({ post }: { post: any }) {
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  const imageUrl = post.image ? urlFor(post.image) : null;
  const [mainImage, setMainImage] = useState(imageUrl);
  const [selectedSize, setSelectedSize] = useState("M");
  const [wishlist, setWishlist] = useState(false);
  const [descOpen, setDescOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const [reviews, setReviews] = useState([
    {
      name: "Rahim Uddin",
      rating: 5,
      comment: "Premium quality product. Feels really luxury and comfortable.",
      date: "2 days ago",
      avatar: "RU",
    },
    {
      name: "Nusrat Jahan",
      rating: 4,
      comment: "Very good fit and fabric quality is excellent.",
      date: "1 week ago",
      avatar: "NJ",
    },
  ]);

  const [newReview, setNewReview] = useState({ name: "", comment: "", rating: 0 });

  const totalReviews = ratingBreakdown.reduce((a, b) => a + b.count, 0);

  const thumbnails = [mainImage, mainImage, mainImage].filter(Boolean);

  return (
    <main className={`${lato.className} min-h-screen bg-gray-50`}>
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-16">

        {/* Breadcrumb */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Shop
        </Link>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── Left: Images ── */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-4/5 w-full">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                  No image
                </div>
              )}
            </div>

            {thumbnails.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {thumbnails.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className={`rounded-xl overflow-hidden aspect-square border-2 transition-all duration-200 ${
                      mainImage === img
                        ? "border-gray-900 scale-95"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img src={img!} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Details ── */}
          <div className="flex flex-col gap-5">

            {/* Category + Title */}
            <div>
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Woman Fashion
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-1 leading-tight">
                {post.title}
              </h1>
            </div>

            {/* Price + Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-gray-900">৳ 4,499</span>
                <span className="text-sm line-through text-gray-400">৳ 6,999</span>
                <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  50% OFF
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Stars count={4} />
                <span className="text-sm font-semibold text-gray-700">4.5</span>
              </div>
            </div>

            {/* Delivery badge */}
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-100 rounded-xl px-4 py-3">
              <Clock size={15} className="text-gray-400" />
              Order in{" "}
              <span className="font-semibold text-gray-800">02:30:25</span>
              {" "}to get next day delivery
            </div>

            {/* Perks */}
            <div className="flex gap-4 text-xs text-gray-500 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-1.5">
                <Truck size={14} className="text-gray-400" />
                Fast delivery
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw size={14} className="text-gray-400" />
                7-day easy return
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Select Size</p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full text-sm font-medium transition-all duration-200 border ${
                      selectedSize === size
                        ? "bg-gray-900 text-white border-gray-900 scale-105 shadow-md"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-gray-900 text-white rounded-2xl py-4 text-sm font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-gray-900/20">
                Add to Cart
              </button>
              <button className="flex-1 border border-gray-900 text-gray-900 rounded-2xl py-4 text-sm font-semibold hover:bg-gray-900 hover:text-white active:scale-[0.98] transition-all duration-200">
                Buy Now
              </button>
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-200 ${
                  wishlist
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "bg-white border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400"
                }`}
              >
                <Heart size={20} fill={wishlist ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Description Accordion */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
              <button
                onClick={() => setDescOpen(!descOpen)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                Description & Fit
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${descOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {descOpen && (
                <div className="px-5 pb-5 border-t border-gray-50 text-sm text-gray-500 leading-relaxed pt-4">
                  {Array.isArray(post.body) ? (
                    <PortableText value={post.body} />
                  ) : (
                    "No description available."
                  )}
                </div>
              )}
            </div>

            {/* Shipping Accordion */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
              <button
                onClick={() => setShippingOpen(!shippingOpen)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                Shipping
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${shippingOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {shippingOpen && (
                <div className="px-5 pb-5 border-t border-gray-50">
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {[
                      { label: "Discount", value: "50% Off" },
                      { label: "Package", value: "Regular Package" },
                      { label: "Delivery Time", value: "3–6 Working Days" },
                      { label: "Estimated Arrival", value: "10–12 Oct 2024" },
                    ].map((item) => (
                      <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                        <p className="text-sm font-semibold text-gray-700">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ── Reviews Section ── */}
        <div className="mt-16 border-t border-gray-100 pt-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle size={20} />
              Rating & Reviews
            </h2>
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="text-sm text-gray-500 hover:text-black underline underline-offset-2 transition-colors"
            >
              {showReviews ? "Hide reviews" : "View all reviews"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Rating Summary */}
            <div className="flex flex-col items-start gap-4">
              <div>
                <span className="text-7xl font-bold text-gray-900 leading-none">4.5</span>
                <span className="text-gray-400 text-lg">/5</span>
              </div>
              <Stars count={5} />
              <p className="text-sm text-gray-400">({totalReviews} Reviews)</p>

              <div className="w-full space-y-2 mt-1">
                {ratingBreakdown.map(({ star, count }) => (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="w-3 text-gray-500 text-right text-xs">{star}</span>
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-gray-900 rounded-full"
                        style={{ width: `${(count / totalReviews) * 100}%` }}
                      />
                    </div>
                    <span className="w-5 text-xs text-gray-400">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Cards + Form */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {showReviews && reviews.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                        {r.avatar ?? <User size={14} />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                        <Stars count={r.rating} />
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed italic">"{r.comment}"</p>
                </div>
              ))}

              {/* Write a Review */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <Send size={14} />
                  Write a Review
                </h3>

                <input
                  placeholder="Your name"
                  value={newReview.name}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-gray-400 transition-colors"
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                />

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Your Rating</span>
                  <Stars
                    count={newReview.rating}
                    interactive
                    onSet={(val) => setNewReview({ ...newReview, rating: val })}
                  />
                </div>

                <textarea
                  placeholder="Write your experience..."
                  value={newReview.comment}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-gray-400 transition-colors resize-none"
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />

                <button
                  onClick={() => {
                    if (!newReview.name || !newReview.comment || newReview.rating === 0) return;
                    setReviews([{ ...newReview, date: "Just now", avatar: newReview.name.slice(0, 2).toUpperCase() }, ...reviews]);
                    setNewReview({ name: "", comment: "", rating: 0 });
                    setShowReviews(true);
                  }}
                  className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 active:scale-[0.99] transition-all duration-200"
                >
                  Submit Review
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
