"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/sanity/client";

/* 🔥 image builder */
const { projectId, dataset } = client.config();

const urlFor = (source: any) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source).url()
    : "";

export default function AddToCartButton({ post }: any) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() =>
        addItem({
          _id: post._id,
          title: post.title,
          image: post.images?.[0]
            ? urlFor(post.images[0])
            : "",
          price: post.price || 0,
          qty: 1,
        })
      }
      className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white shadow hover:scale-110 transition"
    >
      <ShoppingCart size={16} />
    </button>
  );
}