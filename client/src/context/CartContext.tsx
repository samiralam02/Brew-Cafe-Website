import { createContext, useContext, useState, type ReactNode } from "react";

// Menu item type from backend
export type MenuItem = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl?: string;
};

// Cart item with quantity
export type CartItem = MenuItem & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: MenuItem, delta?: number) => void; // delta allows +1 or -1
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add to cart or update quantity
 const addToCart = (item: MenuItem, delta: number = 1) => {
  setCart(prev => {
    const existing = prev.find(cartItem => cartItem._id === item._id);

    if (existing) {
      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        return prev.filter(cartItem => cartItem._id !== item._id);
      }
      return prev.map(cartItem =>
        cartItem._id === item._id ? { ...cartItem, quantity: newQty } : cartItem
      );
    }

    if (delta > 0) {
      // <-- THIS LINE: explicitly type as CartItem
      const newCartItem: CartItem = { ...item, quantity: delta };
      return [...prev, newCartItem];
    }

    return prev;
  });
};


  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext)!;
