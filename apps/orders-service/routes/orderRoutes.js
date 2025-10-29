import express from "express";
import { Order } from "../models/Order.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
      total: orders.length,
    });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ success: false, error: "Failed to fetch orders" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      userId = "guest",
      items,
      shippingAddress,
      paymentMethod,
      total,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, error: "Cart is empty" });
    }

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        error: "Missing shipping or payment information",
      });
    }

    const order = await Order.create({
      userId,
      items,
      shippingAddress,
      paymentMethod,
      total: Number(total),
    });

    res.json({
      success: true,
      data: order,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
});

export default router;
