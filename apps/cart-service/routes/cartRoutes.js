import express from "express";
import CartItem from "../models/CartItem.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = "guest";
    const cart = await CartItem.find({ userId });

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    res.json({ success: true, data: cart, total });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch cart" });
  }
});

router.post("/", async (req, res) => {
  try {
    let {
      userId = "guest",
      productId,
      name,
      price,
      quantity,
      image,
      updateOnly,
    } = req.body;

    const isUpdate = updateOnly === true || updateOnly === "true";

    if (!productId || (!isUpdate && (!name || !price || !quantity))) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    if (isUpdate) {
      const existing = await CartItem.findOne({ userId, productId });
      if (!existing) {
        return res.status(404).json({
          success: false,
          error: "Item not found",
        });
      }

      existing.quantity = quantity;
      await existing.save();

      const updatedCart = await CartItem.find({ userId });
      return res.json({
        success: true,
        data: updatedCart,
        message: "Quantity updated",
      });
    }

    const existing = await CartItem.findOne({ userId, productId });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
    } else {
      await CartItem.create({
        userId,
        productId,
        name,
        price,
        quantity,
        image,
      });
    }

    const updatedCart = await CartItem.find({ userId });

    res.json({
      success: true,
      data: updatedCart,
      message: "Item added to cart",
    });
  } catch (error) {
    console.error("Cart POST error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to add or update item" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const userId = req.query.userId || "guest";
    const productId = req.query.productId;

    console.log("productId:", productId);
    if (productId && productId !== "null" && productId !== "undefined") {
      await CartItem.deleteOne({ userId, productId });
    } else {
      await CartItem.deleteMany({ userId });
    }

    const updatedCart = await CartItem.find({ userId });

    res.json({
      success: true,
      data: updatedCart,
      message: productId ? "Item removed from cart" : "Cart cleared",
    });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to remove item(s) from cart" });
  }
});

export default router;
