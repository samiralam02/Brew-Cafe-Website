import { useEffect, useState } from "react";
import { fetchOrders } from "../api/adminApi";

// Order item types
type OrderItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  _id: string;
  customerName?: string; // optional if you store username
  items: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt: string;
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <h2>All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Placed At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.customerName || "Anonymous"}</td>
                <td>
                  <ul>
                    {order.items.map(item => (
                      <li key={item._id}>
                        {item.name} x {item.quantity} (₹{item.price})
                      </li>
                    ))}
                  </ul>
                </td>
                <td>₹{order.totalPrice}</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
