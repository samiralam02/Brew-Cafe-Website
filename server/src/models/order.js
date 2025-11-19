import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  menuItemId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
}, { _id: false }); // _id not needed for each item

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: [OrderItemSchema], required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
