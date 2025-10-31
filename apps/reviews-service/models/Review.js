import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: false },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: String, required: true },
    comment: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
