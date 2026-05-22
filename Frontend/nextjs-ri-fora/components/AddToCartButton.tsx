"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/sanity/client";

const { projectId, dataset } = client.config();

const urlFor = (source: any) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source).url()
    : "";

export default function AddToCartButton({ post }: any) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem({
      _id: post._id,
      title: post.title || "Untitled",
      price: Number(post.price || 0), // 🔥 FORCE NUMBER
      image: post.image ? urlFor(post.image) : "",
      qty: 1,
      size: "",
    });
  };

  return (
    <button
      onClick={handleAdd}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white shadow hover:scale-110 transition"
    >
      <ShoppingCart size={16} />
    </button>
  );
}