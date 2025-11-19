// server/src/routes/admin.js
import express from "express";
import MenuItem from "../models/MenuItem.js";
import Order from "../models/order.js";
import authMiddleware, { isAdmin } from "../middleware/authMiddleware.js"; // correct import

const router = express.Router();

// Apply middlewares
router.use(authMiddleware, isAdmin);

// --- Menu CRUD ---
router.get("/menu", async (req, res) => {
  const menu = await MenuItem.find();
  res.json(menu);
});

router.post("/menu", async (req, res) => {
  const item = new MenuItem(req.body);
  await item.save();
  res.json(item);
});

router.put("/menu/:id", async (req, res) => {
  const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedItem);
});

router.delete("/menu/:id", async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

// --- Orders ---
router.get("/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

router.put("/orders/:id/status", async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(order);
});

export default router;
