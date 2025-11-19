import type { CartItem } from "../context/CartContext";
import axios from "axios";

export const placeOrder = (cart: CartItem[]) => {
  const token = localStorage.getItem("token");
  return axios.post(
    "http://localhost:5000/api/order",
    { items: cart },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
