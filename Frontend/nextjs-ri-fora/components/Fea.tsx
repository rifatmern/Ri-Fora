import Link from "next/link";
import { client } from "@/sanity/client";
import { ShoppingCart, Heart, GitCompare } from "lucide-react";
import { createImageUrlBuilder } from "@sanity/image-url";
import { JSX } from "react";
import AddToCartButton from "./AddToCartButton";

// ✅ Define proper type
interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;

  // 🔥 NEW MULTIPLE IMAGES
  images?: any[];

  // 🔥 OLD SINGLE IMAGE
  image?: any;
}

// Sanity image builder
const { projectId, dataset } = client.config();

const urlFor = (source: any) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source).url()
    : "";

// ✅ Fetch 4 items
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...4]{
  _id,
  title,
  slug,
  publishedAt,
  images,
  image
}`;

const options = { cache: "no-store" };

export default async function IndexPage(): Promise<JSX.Element> {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options);

  const hasMore = posts.length > 3;
  const visiblePosts = posts.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f6f6f6] py-30 px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight">
            Featured Collection
          </h1>

          <p className="text-gray-500 mt-3">Discover our most loved products</p>
        </div>

        {/* GRID */}
        <div className="grid gap-10 md:grid-cols-3">
          {visiblePosts.map((post) => {
            // 🔥 SUPPORT BOTH OLD + NEW IMAGE
            const productImage = post.images?.[0] || post.image;

            return (
              <div
                key={post._id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* IMAGE */}
                <div className="relative aspect-4/5 bg-gray-100 overflow-hidden">
                  {productImage && (
                    <img
                      src={urlFor(productImage)}
                      alt={post.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                    />
                  )}

                  {/* shine */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full duration-1000"></div>

                  <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full">
                    New
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <Link href={`/${post.slug.current}`}>
                    <h2 className="text-lg font-semibold group-hover:text-black transition">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-gray-500 mt-2">
                    Premium quality design product with modern aesthetics
                  </p>
                </div>

                {/* ACTION BAR */}
                <div className="absolute bottom-34 left-0 w-full px-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition">
                  <div className="flex gap-2">
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow hover:bg-black hover:text-white transition">
                      <Heart size={16} />
                    </button>

                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow hover:bg-black hover:text-white transition">
                      <GitCompare size={16} />
                    </button>
                  </div>

                  <Link
                    key={post._id}
                    href={`/${post.slug.current}`}
                    className="block"
                  >
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white shadow hover:scale-110 transition">
                      <AddToCartButton post={post} />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* SEE MORE */}
        {hasMore && (
          <div className="text-center mt-14">
            <Link
              href="/shop"
              className="inline-block px-8 py-3 rounded-full border border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
            >
              See More
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
