import axios from "axios";
import type { MenuItem } from "../context/CartContext"; // import type

const API_URL = "http://localhost:5000/api/menu";

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const response = await axios.get(API_URL);
  return response.data; // array of menu items from backend
};
