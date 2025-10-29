import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userId: { type: String, default: "guest" },
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String },
  addedAt: { type: Date, default: Date.now },
});

export default mongoose.model("CartItem", cartItemSchema);
