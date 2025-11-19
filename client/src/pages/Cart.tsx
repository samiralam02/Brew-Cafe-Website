import { useCart } from "../context/CartContext";
import { placeOrder } from "../api/orderApi";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty!");

    try {
      // Send cart to backend
      await placeOrder(cart);

      // Clear cart after successful order
      clearCart();

      alert("Order placed successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to place order. Please login.");
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : null}

      <ul>
        {cart.map(item => (
          <li key={item._id} style={{ marginBottom: "8px" }}>
            {item.name} - ₹{item.price} x {item.quantity}
            <button
              onClick={() => removeFromCart(item._id)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <>
          <h3>Total: ₹{totalPrice}</h3>
          <button onClick={handlePlaceOrder} style={{ marginTop: "10px" }}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
