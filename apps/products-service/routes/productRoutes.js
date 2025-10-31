import express from "express";
import { Product } from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, sort } = req.query;

    let filter = {};

    if (category && category !== "All") {
      filter["category.name"] = String(category);
    }

    if (minPrice && !isNaN(Number(minPrice))) {
      filter.price = { ...filter.price, $gte: Number(minPrice) };
    }
    if (maxPrice && !isNaN(Number(maxPrice))) {
      filter.price = { ...filter.price, $lte: Number(maxPrice) };
    }

    if (search && typeof search === "string") {
      filter.name = { $regex: search, $options: "i" };
    }

    console.log("Filter being applied:", filter);

    let products = await Product.find(filter);

    if (sort === "price-low") products.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") products.sort((a, b) => b.price - a.price);
    else if (sort === "rating") products.sort((a, b) => b.rating - a.rating);

    res.json({ success: true, data: products, total: products.length });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    res.json({ success: true, data: product });
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(500).json({ success: false, error: "Failed to fetch product" });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({ success: true, data: product, message: "Product created" });
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ success: false, error: "Failed to create product" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    res.json({ success: true, data: product, message: "Product updated" });
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ success: false, error: "Failed to update product" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ success: false, error: "Failed to delete product" });
  }
});

export default router;
