"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { client } from "@/sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

/* ================= IMAGE ================= */

const { projectId, dataset } = client.config();

const urlFor = (source: any) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source).url()
    : "";

/* ================= TYPE ================= */

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  image?: any;
  images?: any[];
}

/* ================= MAIN ================= */

export default function CollectionsClient({
  posts = [],
}: {
  posts?: Post[];
}) {
  const grouped = (posts || []).reduce((acc: Record<string, Post[]>, item) => {
    const cat = item.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-[#f6f6f6] px-6 py-20">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            Collections
          </h1>
          <p className="text-gray-500 mt-3">
            Premium curated shopping experience
          </p>
        </div>

        {Object.entries(grouped).map(([category, items]) => (
          <SliderRow key={category} category={category} items={items} />
        ))}

      </div>
    </main>
  );
}

/* ================= SLIDER ================= */

function SliderRow({
  category,
  items,
}: {
  category: string;
  items: Post[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <section className="mb-16">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">{category}</h2>

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full bg-white shadow hover:bg-black hover:text-white transition flex items-center justify-center"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full bg-white shadow hover:bg-black hover:text-white transition flex items-center justify-center"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ROW */}
      <div
        ref={ref}
        className="flex gap-5 overflow-hidden scroll-smooth"
      >
        {items.map((post) => {
          const img = post.images?.[0] || post.image;

          return (
            <Link
              key={post._id}
              href={`/${post.slug.current}`}   // ✅ FINAL FIX HERE
              className="min-w-[240px] group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition"
            >
              <div className="relative aspect-[3/4] overflow-hidden">

                {img && (
                  <Image
                    src={urlFor(img)}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                )}

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition" />

                {/* ICONS */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">

                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                    <Heart size={14} />
                  </button>

                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                    <Eye size={14} />
                  </button>

                  <button className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow">
                    <ShoppingCart size={14} />
                  </button>

                </div>

                {/* TITLE */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white text-sm font-medium">
                    {post.title}
                  </h3>
                </div>

              </div>
            </Link>
          );
        })}
      </div>

    </section>
  );
}