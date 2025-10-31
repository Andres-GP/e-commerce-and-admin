import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reviews", reviewRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT || 5002, () => {
      console.log(
        `🚀 Review Service running on port ${process.env.PORT || 5002}`
      );
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
