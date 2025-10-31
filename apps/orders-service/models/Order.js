import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
});

const OrderItemSchema = new mongoose.Schema({
  addedAt: { type: String, required: true },
  image: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  addedAt: { type: String, required: true },
  userId: { type: String, required: true },
  __v: { type: Number },
  _id: { type: String },
});

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true, default: "guest" },
  items: { type: [OrderItemSchema], required: true },
  shippingAddress: { type: shippingAddressSchema, required: true },
  paymentMethod: { type: String, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  estimatedDelivery: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
});

export const Order = mongoose.model("Order", OrderSchema);
