import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  category: {
    name: String,
    image: String,
    count: String,
    description: String,
  },
  price: Number,
  rating: Number,
  reviews: Number,
  image: String,
  images: [String],
  description: String,
  features: [String],
  specifications: Object,
  inStock: Boolean,
});

export const Product = mongoose.model("Product", productSchema);
