import express from "express";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.json({ success: true, item: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
