"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Minus, Plus, Copy, Heart, ShoppingCart, User, Search, ArrowUpRight } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  tag: string;
  color: string;
  size: string;
  price: number;
  qty: number;
  checked: boolean;
  image: string;
};

const initialItems: CartItem[] = [
 
];

const sizes = ["US MEW4", "US MEW5", "US MEW6", "US MEW7", "US MEW8"];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  const toggleItem = (id: number) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const toggleAll = () => {
    const next = !allChecked;
    setAllChecked(next);
    setItems((prev) => prev.map((item) => ({ ...item, checked: next })));
  };

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const updateSize = (id: number, size: string) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, size } : item));
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const deleteAll = () => setItems([]);

  const checkedItems = items.filter((i) => i.checked);
  const subtotal = checkedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = 5.0;
  const taxes = +(subtotal * 0.05).toFixed(2);
  const discount = promoApplied ? -8.0 : 0;
  const total = +(subtotal + delivery + taxes + discount).toFixed(2);

  return (
    <div className="min-h-screen bg-white font-['DM_Sans',sans-serif]">

      

     

     

      {/* Body */}
      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">

        {/* Cart Items */}
        <div>
          {/* Cart Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleAll}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  allChecked ? "bg-gray-900 border-gray-900" : "border-gray-300"
                }`}
              >
                {allChecked && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <h1 className="text-2xl font-black tracking-tight text-gray-900">CARTS</h1>
              <span className="text-sm font-semibold text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                {String(items.length).padStart(2, "0")}
              </span>
            </div>
            <button
              onClick={deleteAll}
              className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors font-medium"
            >
              <Trash2 size={13} /> DELETE ALL
            </button>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {items.length === 0 && (
              <div className="text-center py-20 text-gray-300 text-sm">Your cart is empty</div>
            )}
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 rounded-2xl border transition-all duration-200 p-4 ${
                  item.checked
                    ? "border-gray-200 bg-white shadow-sm"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                    item.checked ? "bg-gray-900 border-gray-900" : "border-gray-300"
                  }`}
                >
                  {item.checked && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                        {item.tag}
                      </span>
                      <p className="font-bold text-gray-900 text-sm mt-0.5 truncate">{item.name}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900 shrink-0">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Color + Size + Actions */}
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="text-xs text-gray-500">
                      Color :{" "}
                      <span className="font-medium text-gray-700">{item.color}</span>
                    </span>

                    <select
                      value={item.size}
                      onChange={(e) => updateSize(item.id, e.target.value)}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-700 bg-white focus:outline-none focus:border-gray-400 cursor-pointer"
                    >
                      {sizes.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>

                    {/* Action icons */}
                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                      <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-400 transition-colors">
                        <Copy size={12} />
                      </button>

                      {/* Qty */}
                      <div className="flex items-center gap-1 border border-gray-200 rounded-xl px-2 py-1">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-xs font-bold w-5 text-center text-gray-900">
                          {String(item.qty).padStart(2, "0")}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-6 h-fit">
          <h2 className="text-2xl font-black tracking-tight text-gray-900 mb-5">SUMMARY</h2>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3 shadow-sm">

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total items</span>
              <span className="font-semibold text-gray-900">
                {String(checkedItems.reduce((s, i) => s + i.qty, 0)).padStart(2, "0")} Items
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Sub total</span>
              <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Est. Delivery</span>
              <span className="font-semibold text-gray-900">${delivery.toFixed(2)}</span>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Taxes</span>
                <span className="font-semibold text-red-500">+${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount</span>
                <span className={`font-semibold ${promoApplied ? "text-green-500" : "text-gray-300"}`}>
                  {promoApplied ? `-$${Math.abs(discount).toFixed(2)}` : "-$0.00"}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3 flex justify-between">
              <span className="font-bold text-gray-900 text-sm">Final payment</span>
              <span className="font-black text-gray-900">${total.toFixed(2)}</span>
            </div>

            {/* Promo */}
            <div className="flex gap-2 pt-1">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-gray-400 transition-colors"
              />
              <button
                onClick={() => {
                  if (promoCode.trim()) setPromoApplied(true);
                }}
                className="bg-gray-900 text-white text-xs font-bold px-4 rounded-xl hover:bg-gray-700 active:scale-95 transition-all"
              >
                APPLY
              </button>
            </div>

          </div>

          {/* Checkout Buttons */}
          <div className="mt-4 space-y-2">
            <button className="w-full bg-gray-900 text-white py-4 rounded-2xl text-sm font-bold tracking-widest hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-gray-900/20">
              CHECKOUT
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-3.5 rounded-2xl text-xs font-bold tracking-widest hover:border-gray-900 hover:text-gray-900 active:scale-[0.98] transition-all duration-200">
              MEMBER CHECKOUT
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
