"use client";

import { useCartStore } from "@/store/cart-store";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, increaseQty, decreaseQty, clearCart } =
    useCartStore();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = items.length ? 5 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + delivery + tax;

  return (
    <div className="min-h-screen bg-[#f6f6f6] py-12 px-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6" />
            <h1 className="text-3xl font-bold">Your Cart</h1>
          </div>

          <button
            onClick={clearCart}
            className="text-sm px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            Clear Cart
          </button>
        </div>

        {/* EMPTY STATE */}
        {items.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <ShoppingBag className="mx-auto w-12 h-12 text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mt-2">
              Add something beautiful to get started
            </p>
          </div>
        )}

        {/* CART ITEMS */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition"
            >
              {/* LEFT */}
              <div className="flex-1">
                <h2 className="font-semibold text-lg">
                  {item.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  ${item.price}
                </p>
              </div>

              {/* QTY CONTROLS */}
              <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                <button onClick={() => decreaseQty(item._id)}>
                  <Minus size={16} />
                </button>

                <span className="min-w-[20px] text-center">
                  {item.qty}
                </span>

                <button onClick={() => increaseQty(item._id)}>
                  <Plus size={16} />
                </button>
              </div>

              {/* REMOVE */}
              <button
                onClick={() => removeItem(item._id)}
                className="ml-4 text-red-500 hover:text-red-700 transition"
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        {items.length > 0 && (
          <div className="mt-10 bg-white rounded-3xl p-6 shadow-md">

            <h2 className="text-xl font-bold mb-5">
              Order Summary
            </h2>

            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>${delivery.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="w-full mt-6 bg-black text-white py-3 rounded-full hover:opacity-90 transition">
              Checkout
            </button>
          </div>
        )}

      </div>
    </div>
  );
}