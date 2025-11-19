import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Menu type from backend
type MenuItem = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl?: string;
};

export default function Menu() {
  const { addToCart } = useCart();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [addedItemId, setAddedItemId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenu(response.data);
      } catch (err) {
        console.error("Failed to fetch menu items:", err);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart!");
      navigate("/login");
      return;
    }

    addToCart({ _id: item._id, name: item.name, price: item.price });
    setAddedItemId(item._id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Menu</h2>

      <div style={{ display: "grid", gap: "14px" }}>
        {menu.map(item => (
          <div
            key={item._id}
            style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "8px" }}
          >
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <strong>₹{item.price}</strong>
            <br />

            {addedItemId === item._id ? (
              <Link to="/cart">
                <button style={{ marginTop: "8px" }}>Go to Cart</button>
              </Link>
            ) : (
              <button onClick={() => handleAddToCart(item)} style={{ marginTop: "8px" }}>
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
