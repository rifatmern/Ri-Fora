import { client } from "@/sanity/client";
import Link from "next/link";
import { ShoppingCart, Heart, GitCompare } from "lucide-react";
import { createImageUrlBuilder } from "@sanity/image-url";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  image?: any;
}

/* 🔥 Sanity image builder */
const { projectId, dataset } = client.config();

const urlFor = (source: any) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source).url()
    : "";

/* 🔥 QUERY */
const QUERY = `*[
  _type == "post" && defined(slug.current)
]|order(publishedAt desc){
  _id,
  title,
  slug,
  image
}`;

export default async function ShopPage() {
  let posts: Post[] = [];

  try {
    const data = await client.fetch<Post[]>(QUERY);
    posts = data ?? [];
  } catch (err) {
    console.log("Sanity error:", err);
    posts = [];
  }

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

        {/* GRID */}
        <div className="grid gap-10 md:grid-cols-3">

          {(posts || []).map((post) => (
            <Link
              key={post._id}
              href={`/${post.slug.current}`}
              className="block"
            >
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

                {/* IMAGE */}
                <div className="relative aspect-4/5 bg-gray-100 overflow-hidden">

                  {post.image && (
                    <img
                      src={urlFor(post.image)}
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

                  <button  className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white shadow hover:scale-110 transition">
                    <ShoppingCart size={16} />
                  </button>

                </div>

              </div>
            </Link>
          ))}

        </div>

      </div>
    </main>
  );
}