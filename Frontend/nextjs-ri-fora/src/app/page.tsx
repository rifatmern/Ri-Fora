import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { ShoppingCart, Heart, GitCompare } from "lucide-react";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...3]{_id, title, slug, publishedAt}`;

const options = { cache: "no-store" };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="min-h-screen bg-[#f6f6f6] py-30 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight">
            Featured Collection
          </h1>
          <p className="text-gray-500 mt-3">
            Discover our most loved products
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-10 md:grid-cols-3">

          {posts.map((post, index) => (
            <div
              key={post._id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >

              {/* IMAGE PLACEHOLDER (realistic feel) */}
              <div className="h-72 bg-linear-to-br from-gray-200 to-gray-100 relative overflow-hidden">

                {/* subtle shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] duration-1000"></div>

                {/* badge */}
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

              {/* BOTTOM ACTION BAR */}
              <div className="absolute bottom-34 left-0 w-full px-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition">

                <div className="flex gap-2">

                  <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow hover:bg-black hover:text-white transition">
                    <Heart size={16} />
                  </button>

                  <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow hover:bg-black hover:text-white transition">
                    <GitCompare size={16} />
                  </button>

                </div>

                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white shadow hover:scale-110 transition">
                  <ShoppingCart size={16} />
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>
    </main>
  );
}