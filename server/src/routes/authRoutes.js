// server/src/routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// --- Signup ---
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // allow optional role

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default role is 'customer' if not provided
    const userRole = role === "admin" ? "admin" : "customer";

    // Create new user
    const user = new User({ name, email, password: hashedPassword, role: userRole });
    await user.save();

    res.json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- Login ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Include role in JWT payload
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret123",
      { expiresIn: "7d" }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
