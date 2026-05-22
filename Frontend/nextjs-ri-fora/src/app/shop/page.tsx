import { client } from "@/sanity/client";
import Link from "next/link";
import { Heart, GitCompare } from "lucide-react";
import { createImageUrlBuilder } from "@sanity/image-url";
import AddToCartButton from "../../../components/AddToCartButton";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  images?: any[];
  category?: string;
}

/* 🔥 Sanity image builder */
const { projectId, dataset } = client.config();

const urlFor = (source: any) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset })
        .image(source)
        .url()
    : "";

/* 🔥 QUERY */
const QUERY = `*[
  _type == "post" && defined(slug.current)
]|order(publishedAt desc){
  _id,
  title,
  slug,
  images,
  category
}`;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  let posts: Post[] = [];

  const params = await searchParams;

  const activeCategory = params.category || "All";
  const page = Number(params.page || 1);

  const limit = 9;

  try {
    const data = await client.fetch<Post[]>(QUERY);
    posts = data ?? [];
  } catch (err) {
    console.log("Sanity error:", err);
    posts = [];
  }

  /* 🔥 CATEGORY LIST */
  const categories = ["All", "Women", "Kids", "Fragrance", "Footwear"];

  /* 🔥 FILTER */
  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  /* 🔥 PAGINATION */
  const start = (page - 1) * limit;
  const paginatedPosts = filteredPosts.slice(start, start + limit);
  const totalPages = Math.ceil(filteredPosts.length / limit);

  return (
    <main className="min-h-screen bg-[#f6f6f6] py-30 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight">
            All Products
          </h1>

          <p className="text-gray-500 mt-3">
            Explore our complete collection
          </p>
        </div>

        {/* CATEGORY (UNCHANGED) */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={
                cat === "All"
                  ? "/shop?page=1"
                  : `/shop?category=${cat}&page=1`
              }
            >
              <button
                className={`px-6 py-2 rounded-full border transition-all duration-300 text-sm font-medium
                ${
                  activeCategory === cat
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:bg-black hover:text-white"
                }`}
              >
                {cat}
              </button>
            </Link>
          ))}
        </div>

        {/* GRID (UNCHANGED DESIGN) */}
        <div className="grid gap-10 md:grid-cols-3">

          {(paginatedPosts || []).map((post) => (
            <Link
              key={post._id}
              href={`/${post.slug.current}`}
              className="block"
            >
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

                {/* IMAGE */}
                <div className="relative aspect-4/5 bg-gray-100 overflow-hidden">

                  {post.images?.[0] && (
                    <img
                      src={urlFor(post.images[0])}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  )}

                  <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full">
                    New
                  </span>

                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h2 className="text-lg font-semibold">
                    {post.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    Premium quality product
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="absolute bottom-30 left-0 w-full px-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition">

                  <div className="flex gap-2">
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow hover:bg-black hover:text-white transition">
                      <Heart size={16} />
                    </button>

                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow hover:bg-black hover:text-white transition">
                      <GitCompare size={16} />
                    </button>
                  </div>

                  <AddToCartButton post={post} />

                </div>

              </div>
            </Link>
          ))}

        </div>

        {/* 🔥 PAGINATION (SEPARATE, NO STYLE CHANGE TO CARDS) */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-14">

            {Array.from({ length: totalPages }).map((_, i) => (
              <Link
                key={i}
                href={
                  activeCategory === "All"
                    ? `/shop?page=${i + 1}`
                    : `/shop?category=${activeCategory}&page=${i + 1}`
                }
              >
                <button
                  className={`px-4 py-2 rounded-full border text-sm
                  ${
                    page === i + 1
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              </Link>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}