"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";

export default function CartBadge() {
  const items = useCartStore((state) => state.items);

  const totalQty = items.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <Link
      href="/cart"
      className="p-2 rounded-full hover:bg-black/5 transition relative"
    >
      <ShoppingBag size={20} strokeWidth={1.5} />

      {totalQty > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
          {totalQty}
        </span>
      )}
    </Link>
  );
}