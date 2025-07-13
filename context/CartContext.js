import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

const addToCart = (vendorId, item) => {
  setCartItems((prev) => {
    const vendorItems = prev[vendorId] || [];

    const existingIndex = vendorItems.findIndex((i) => i.id === item.id);

    let updatedVendorItems;

    if (existingIndex !== -1) {
      const updatedItem = {
        ...vendorItems[existingIndex],
        quantity: vendorItems[existingIndex].quantity + item.quantity,
      };

      // ❗ Remove item if quantity is 0 or less
      if (updatedItem.quantity <= 0) {
        updatedVendorItems = vendorItems.filter((_, i) => i !== existingIndex);
      } else {
        updatedVendorItems = [...vendorItems];
        updatedVendorItems[existingIndex] = updatedItem;
      }
    } else {
      // Only add item if quantity is positive
      updatedVendorItems = item.quantity > 0 ? [...vendorItems, item] : vendorItems;
    }

    const newCart = {
      ...prev,
      [vendorId]: updatedVendorItems,
    };

    // ❗ Clean up vendor if no items left
    if (updatedVendorItems.length === 0) {
      delete newCart[vendorId];
    }

    return newCart;
  });
};


  const clearCart = () => setCartItems({});

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
