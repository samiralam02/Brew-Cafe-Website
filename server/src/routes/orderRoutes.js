import express from "express";
import Order from "../models/order.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/order - Place a new order
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Map items to the proper schema
    const orderItems = items.map(item => ({
      menuItemId: item._id, // menu item ID
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    // Calculate total price
    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      userId,
      items: orderItems,
      totalPrice
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
