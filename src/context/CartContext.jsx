// src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

// ==============================
// UNIQUE CART KEY (product + variant)
// ==============================
const getCartKey = (item) =>
  `${item.productId || item.id}_${item.variantId || "base"}`;

// ==============================
// CART PROVIDER
// ==============================
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      const parsed = saved ? JSON.parse(saved) : [];

      // 🔥 SANITIZE STORED CART
      if (!Array.isArray(parsed)) return [];

      return parsed.filter((i) => {
        const price = Number(i.finalItemPrice);
        const qty = Number(i.quantity);
        return (
          (i.productId || i.id) &&
          Number.isFinite(price) &&
          price > 0 &&
          Number.isFinite(qty) &&
          qty > 0
        );
      });
    } catch (e) {
      console.error("Failed to parse cartItems from localStorage", e);
      return [];
    }
  });

  // ==============================
  // PERSIST CART
  // ==============================
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ==============================
  // ADD TO CART (HARD VALIDATION)
  // ==============================
  const addToCart = (item) => {
    const price = Number(item.finalItemPrice);
    const qty = Number(item.quantity) || 1;

    if (!Number.isFinite(price) || price <= 0) {
      console.error(
        "❌ Cart rejected: invalid finalItemPrice",
        item
      );
      return;
    }

    const normalized = {
      productId: item.productId || item.id,
      name: item.name,
      image: item.image,
      variantId: item.variantId || null,
      variantLabel: item.variantLabel || null,
      variantPrice:
        item.variantPrice != null
          ? Number(item.variantPrice)
          : null,
      variantDiscount:
        item.variantDiscount != null
          ? Number(item.variantDiscount)
          : null,
      finalItemPrice: price,
      quantity: qty,
    };

    setCartItems((prev) => {
      const key = getCartKey(normalized);
      const existing = prev.find((i) => getCartKey(i) === key);

      if (existing) {
        return prev.map((i) =>
          getCartKey(i) === key
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }

      return [...prev, normalized];
    });
  };

  // ==============================
  // INCREASE QUANTITY
  // ==============================
  const increaseQuantity = (productId, variantId = null) => {
    const key = `${productId}_${variantId || "base"}`;
    setCartItems((prev) =>
      prev.map((i) =>
        getCartKey(i) === key
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  // ==============================
  // DECREASE QUANTITY
  // ==============================
  const decreaseQuantity = (productId, variantId = null) => {
    const key = `${productId}_${variantId || "base"}`;
    setCartItems((prev) =>
      prev
        .map((i) =>
          getCartKey(i) === key
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  // ==============================
  // REMOVE ITEM
  // ==============================
  const removeFromCart = (productId, variantId = null) => {
    const key = `${productId}_${variantId || "base"}`;
    setCartItems((prev) =>
      prev.filter((i) => getCartKey(i) !== key)
    );
  };

  // ==============================
  // CLEAR CART
  // ==============================
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  // ==============================
  // PROVIDER
  // ==============================
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
