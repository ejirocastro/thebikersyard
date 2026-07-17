"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGarageStore } from "../store";
import { PRODUCTS } from "../data";

export default function MyGaragePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { myGarage, selectedBike, setSelectedBike, removeFromGarage, cart, removeFromCart, updateQty, wishlist, toggleWishlist } = useGarageStore();

  const cartProducts = cart.map((item) => ({
    ...item,
    product: PRODUCTS.find((p) => p.id === item.productId),
  })).filter((i) => i.product);

  const cartTotal = cartProducts.reduce((sum, i) => sum + (i.product!.price * i.qty), 0);
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 z-[66] flex h-full w-full max-w-sm flex-col border-l border-white/10 bg-[#0d0d0d] shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="font-display text-base font-bold italic uppercase text-white">My Garage</p>
                <p className="text-xs text-white/35">{myGarage.length} bike{myGarage.length !== 1 ? "s" : ""} saved</p>
              </div>
              <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* saved bikes */}
              <div className="border-b border-white/8 p-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Saved Bikes</p>
                {myGarage.length === 0 ? (
                  <p className="text-xs text-white/25 italic">No bikes saved yet.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {myGarage.map((bike) => {
                      const isActive = selectedBike?.key === bike.key;
                      return (
                        <div
                          key={bike.key}
                          className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${isActive ? "border-accent/30 bg-accent/8" : "border-white/8 bg-white/3"}`}
                        >
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-bold truncate ${isActive ? "text-accent" : "text-white"}`}>
                              {bike.year} {bike.make} {bike.model}
                            </p>
                            <p className="text-[10px] text-white/35">{bike.variant} · {bike.engine}</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setSelectedBike(isActive ? null : bike)}
                              className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition-colors ${isActive ? "bg-accent text-white" : "border border-white/10 text-white/40 hover:border-accent/30 hover:text-accent"}`}
                            >
                              {isActive ? "Active" : "Select"}
                            </button>
                            <button onClick={() => removeFromGarage(bike.key)} className="text-white/20 hover:text-red-400 transition-colors">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* cart */}
              <div className="border-b border-white/8 p-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Cart ({cart.length})</p>
                {cartProducts.length === 0 ? (
                  <p className="text-xs text-white/25 italic">Your cart is empty.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {cartProducts.map(({ product, qty, productId }) => (
                      <div key={productId} className="flex items-start gap-3">
                        <div className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${product!.gradient} flex items-center justify-center`}>
                          <span className="text-[10px] font-bold text-white/30">{product!.brand.slice(0, 3).toUpperCase()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-xs font-semibold text-white">{product!.name}</p>
                          <p className="text-[10px] text-white/40">{product!.brand}</p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <div className="flex items-center rounded-lg border border-white/10">
                              <button onClick={() => updateQty(productId, qty - 1)} className="px-2 py-0.5 text-white/40 hover:text-white transition-colors">−</button>
                              <span className="px-2 text-xs font-bold text-white">{qty}</span>
                              <button onClick={() => updateQty(productId, qty + 1)} className="px-2 py-0.5 text-white/40 hover:text-white transition-colors">+</button>
                            </div>
                            <button onClick={() => removeFromCart(productId)} className="text-[10px] text-white/25 hover:text-red-400 transition-colors">Remove</button>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-accent">${(product!.price * qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* wishlist */}
              {wishlistProducts.length > 0 && (
                <div className="p-4">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Wishlist ({wishlistProducts.length})</p>
                  <div className="flex flex-col gap-2">
                    {wishlistProducts.map((p) => (
                      <div key={p.id} className="flex items-center gap-3">
                        <div className={`h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br ${p.gradient}`} />
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-xs text-white/70">{p.name}</p>
                          <p className="text-[10px] text-accent font-bold">${p.price.toLocaleString()}</p>
                        </div>
                        <button onClick={() => toggleWishlist(p.id)} className="text-white/20 hover:text-red-400 transition-colors">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* checkout */}
            {cartProducts.length > 0 && (
              <div className="border-t border-white/10 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-white/50">Total</span>
                  <span className="font-display text-xl font-bold text-accent">${cartTotal.toLocaleString()}</span>
                </div>
                <button className="w-full rounded-xl bg-accent py-3 text-sm font-bold text-white transition-colors hover:bg-[#FF8A1D]">
                  Proceed to Checkout
                </button>
                <button className="mt-2 w-full rounded-xl border border-white/10 py-2.5 text-xs font-semibold text-white/50 transition-colors hover:border-white/20 hover:text-white">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
