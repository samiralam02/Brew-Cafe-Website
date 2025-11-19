import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import menuRoutes from "./routes/menuRoutes.js";
import authRoutes from "./routes/authRoutes.js";  // now this works
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/menu", menuRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("BrewByte Café Backend Running ☕🔥");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Connection Error:", err));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
