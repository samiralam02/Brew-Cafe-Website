import axios from "axios";
import type { MenuItem } from "../context/CartContext";

const API_URL = "http://localhost:5000/api/admin";

// Get all menu items
export const fetchAdminMenu = async (): Promise<MenuItem[]> => {
  const { data } = await axios.get(`${API_URL}/menu`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return data;
};

// Add new menu item
export const addMenuItem = async (item: Partial<MenuItem>) => {
  return axios.post(`${API_URL}/menu`, item, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

// Update menu item
export const updateMenuItem = async (id: string, item: Partial<MenuItem>) => {
  return axios.put(`${API_URL}/menu/${id}`, item, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

// Delete menu item
export const deleteMenuItem = async (id: string) => {
  return axios.delete(`${API_URL}/menu/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

// Fetch all orders
export const fetchOrders = async () => {
  const { data } = await axios.get(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return data;
};
