"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/sanity/client";
import {
  ArrowLeft,
  Star,
  MessageCircle,
  Send,
  User,
  Heart,
  Truck,
  RotateCcw,
  Clock,
} from "lucide-react";
import { Lato } from "next/font/google";
import { useCartStore } from "@/store/cart-store";



const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});
const { projectId, dataset } = client.config();

const urlFor = (source: any) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source).url()
    : "";

function Stars({
  count,
  interactive = false,
  onSet,
}: {
  count: number;
  interactive?: boolean;
  onSet?: (v: number) => void;
}) {
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


export default function ProductClient({ post }: { post: any }) {
  if (!post) {
    return (
     

      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  // 1. DYNAMIC IMAGES: Fallback from new 'images' array to old 'image' field safely
  const imageGallery =
    post.images && post.images.length > 0
      ? post.images.map((img: any) => urlFor(img))
      : post.image
        ? [urlFor(post.image)]
        : [];

  const [mainImage, setMainImage] = useState(imageGallery[0] || null);

  // Sync main image if the post content changes asynchronously
  useEffect(() => {
    if (imageGallery.length > 0) setMainImage(imageGallery[0]);
  }, [post]);

  // 2. DYNAMIC PRICING & CALCULATION
  const price = post.price || 0;
  const compareAtPrice = post.compareAtPrice || 0;
  const discountPercentage =
    compareAtPrice > price
      ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
      : 0;

  // 3. DYNAMIC SIZES
  const availableSizes = post.availableSizes || ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || "");

  const [wishlist, setWishlist] = useState(false);
  const [descOpen, setDescOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  // 4. REAL-TIME NEXT DAY DELIVERY COUNTDOWN
  const [countdown, setCountdown] = useState("00:00:00");
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0); // Target is midnight
      const diff = tomorrow.getTime() - now.getTime();

      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0",
      );
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
        2,
        "0",
      );
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      setCountdown(`${hours}:${minutes}:${seconds}`);
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(timer);
  }, []);

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

  const [newReview, setNewReview] = useState({
    name: "",
    comment: "",
    rating: 0,
  });
  const totalReviews = ratingBreakdown.reduce((a, b) => a + b.count, 0);

  function addItem(arg0: { _id: any; title: any; price: any; image: any; qty: number; size: any; }): void {
    throw new Error("Function not implemented.");
  }

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
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-4/5 w-full shadow-inner relative">
              {/* Dynamic Badge Component */}
              {post.badge && (
                <span className="absolute top-4 left-4 z-10 text-xs font-bold uppercase tracking-wider bg-black text-white px-3 py-1.5 rounded-lg shadow-md">
                  {post.badge.replace("-", " ")}
                </span>
              )}
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                  No image available
                </div>
              )}
            </div>

            {imageGallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {imageGallery.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className={`rounded-xl overflow-hidden aspect-square border-2 transition-all duration-200 ${
                      mainImage === img
                        ? "border-gray-900 scale-95 shadow-sm"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
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
                {post.category || "General Fashion"}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-1 leading-tight">
                {post.title}
              </h1>
              {post.sku && (
                <p className="text-xs text-gray-400 mt-1">SKU: {post.sku}</p>
              )}
            </div>

            {/* Price + Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-gray-900">
                  ৳ {price.toLocaleString()}
                </span>
                {discountPercentage > 0 && (
                  <>
                    <span className="text-sm line-through text-gray-400">
                      ৳ {compareAtPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <Stars count={4} />
                <span className="text-sm font-semibold text-gray-700">4.5</span>
              </div>
            </div>

            {/* Dynamic Inventory / Urgency Notification */}
            {post.inventory !== undefined &&
            post.inventory <= 5 &&
            post.inventory > 0 ? (
              <div className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
                Only {post.inventory} items left in stock!
              </div>
            ) : post.inventory === 0 ? (
              <div className="text-xs font-bold text-gray-500 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2">
                Out of Stock
              </div>
            ) : null}

            {/* Delivery badge with active live countdown */}
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-100 rounded-xl px-4 py-3">
              <Clock size={15} className="text-gray-400" />
              Order in{" "}
              <span className="font-mono font-semibold text-gray-800">
                {countdown}
              </span>{" "}
              to get next day delivery
            </div>

            {/* Perks */}
            <div className="flex gap-4 text-xs text-gray-500 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-1.5">
                <Truck size={14} className="text-gray-400" />
                {post.shippingNotice || "Fast delivery"}
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw size={14} className="text-gray-400" />
                7-day easy return
              </div>
            </div>

            {/* Size selection map from backend array */}
            {availableSizes.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Select Size
                </p>
                <div className="flex gap-2 flex-wrap">
                  {availableSizes.map((size: string) => (
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
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() =>
                  addItem({
                    _id: post._id,
                    title: post.title,
                    price: post.price || 0,
                    image: imageGallery?.[0],
                    qty: 1,
                    size: selectedSize,
                  })
                }
                disabled={post.inventory === 0}
                className="flex-1 bg-gray-900 text-white rounded-2xl py-4 text-sm font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-gray-900/20 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
              >
                Add to Cart
              </button>
              <button
                disabled={post.inventory === 0}
                className="flex-1 border border-gray-900 text-gray-900 rounded-2xl py-4 text-sm font-semibold hover:bg-gray-900 hover:text-white active:scale-[0.98] transition-all duration-200 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
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
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {descOpen && (
                <div className="px-5 pb-5 border-t border-gray-50 text-sm text-gray-500 leading-relaxed pt-4 portable-text-wrapper">
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
                Shipping Details
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${shippingOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {shippingOpen && (
                <div className="px-5 pb-5 border-t border-gray-50">
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {[
                      {
                        label: "Deal status",
                        value:
                          discountPercentage > 0
                            ? `${discountPercentage}% Off`
                            : "Standard Price",
                      },
                      {
                        label: "Delivery Type",
                        value: post.shippingNotice || "Regular Home Delivery",
                      },
                      {
                        label: "Stock Availability",
                        value: post.inventory > 0 ? "In Stock" : "Out of Stock",
                      },
                      { label: "Region", value: "Worldwide Delivery" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-gray-50 rounded-xl p-3"
                      >
                        <p className="text-xs text-gray-400 mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-gray-700">
                          {item.value}
                        </p>
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
                <span className="text-7xl font-bold text-gray-900 leading-none">
                  4.5
                </span>
                <span className="text-gray-400 text-lg">/5</span>
              </div>
              <Stars count={5} />
              <p className="text-sm text-gray-400">({totalReviews} Reviews)</p>

              <div className="w-full space-y-2 mt-1">
                {ratingBreakdown.map(({ star, count }) => (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="w-3 text-gray-500 text-right text-xs">
                      {star}
                    </span>
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
              {showReviews &&
                reviews.map((r, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                          {r.avatar ?? <User size={14} />}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {r.name}
                          </p>
                          <Stars count={r.rating} />
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{r.date}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed italic">
                      "{r.comment}"
                    </p>
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
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
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
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                />

                <button
                  onClick={() => {
                    if (
                      !newReview.name ||
                      !newReview.comment ||
                      newReview.rating === 0
                    )
                      return;
                    setReviews([
                      {
                        ...newReview,
                        date: "Just now",
                        avatar: newReview.name.slice(0, 2).toUpperCase(),
                      },
                      ...reviews,
                    ]);
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
