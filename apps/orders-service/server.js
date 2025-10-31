import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "orders_db",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB (orders-service)"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () =>
  console.log(`🚀 Orders service running on port ${PORT}`)
);
