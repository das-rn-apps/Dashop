import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  total: Number,
  razorpayOrderId: String,
  status: { type: String, default: "pending" },
});

export default mongoose.model("Order", orderSchema);
