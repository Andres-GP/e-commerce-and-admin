import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json({ success: true, data: reviews, total: reviews.length });
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    res.status(500).json({ success: false, error: "Failed to fetch reviews" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { productId, name, rating, date, comment, avatar } = req.body;

    if (!name || !rating || !date || !comment || !avatar) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    const review = new Review({
      productId,
      name,
      rating,
      date,
      comment,
      avatar,
    });

    await review.save();

    res.json({
      success: true,
      data: review,
      message: "Review submitted successfully",
    });
  } catch (error) {
    console.error("❌ Error submitting review:", error);
    res.status(500).json({ success: false, error: "Failed to submit review" });
  }
});

export default router;
