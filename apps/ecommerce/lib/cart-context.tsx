"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  productId: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const userId = "guest";

  const fetchCart = async () => {
    try {
      const res = await fetch(`/api/cart?userId=${userId}`);
      const data = await res.json();
      if (data.success) setCart(data.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
        }),
      });
      const data = await res.json();
      if (data.success) setCart(data.data);
      else console.error("Error adding item:", data.error);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      const res = await fetch(`/api/cart?userId=${userId}&productId=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) setCart(data.data);
      else console.error("Error removing item:", data.error);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: id,
          quantity,
          updateOnly: true,
        }),
      });
      const data = await res.json();
      if (data.success) setCart(data.data);
      else console.error("Error updating quantity:", data.error);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch(`/api/cart?userId=${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setCart([]);

        fetchCart();
      } else {
        console.error("Error clearing cart:", data.error);
      }
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const getTotalItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
