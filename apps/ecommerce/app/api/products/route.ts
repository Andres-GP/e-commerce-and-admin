import { NextResponse } from "next/server";

// Mock product database
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: {
      name: "Electronics",
      image: "/images/laptop-stand.jpg",
      count: "500+ Products",
      description: "Latest tech and gadgets",
    },
    price: 299,
    rating: 4.5,
    reviews: 128,
    image: "headphones",
    description: "High-quality wireless headphones with noise cancellation",
    inStock: true,
    stock: 45,
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    category: {
      name: "Electronics",
      image: "/images/laptop-stand.jpg",
      count: "500+ Products",
      description: "Latest tech and gadgets",
    },
    price: 399,
    rating: 4.8,
    reviews: 256,
    image: "smartwatch",
    description: "Advanced fitness tracking and notifications",
    inStock: true,
    stock: 32,
  },
  {
    id: 3,
    name: "Designer Leather Jacket",
    category: {
      name: "Fashion",
      image: "/images/laptop-stand.jpg",
      count: "800+ Products",
      description: "Trendy apparel and accessories",
    },
    price: 499,
    rating: 4.6,
    reviews: 89,
    image: "jacket",
    description: "Premium leather jacket with modern design",
    inStock: true,
    stock: 18,
  },
  {
    id: 4,
    name: "Running Shoes Elite",
    category: {
      name: "Sports & Fitness",
      image: "/images/laptop-stand.jpg",
      count: "200+ Products",
      description: "Gear for active lifestyle",
    },
    price: 159,
    rating: 4.7,
    reviews: 342,
    image: "shoes",
    description: "Professional running shoes for athletes",
    inStock: true,
    stock: 67,
  },
  {
    id: 5,
    name: "Modern Table Lamp",
    category: {
      name: "Home & Living",
      image: "/images/laptop-stand.jpg",
      count: "350+ Products",
      description: "Beautiful home essentials",
    },
    price: 89,
    rating: 4.4,
    reviews: 156,
    image: "lamp",
    description: "Elegant table lamp with adjustable brightness",
    inStock: true,
    stock: 23,
  },
  {
    id: 6,
    name: "Laptop Stand Pro",
    category: {
      name: "Electronics",
      image: "/images/laptop-stand.jpg",
      count: "500+ Products",
      description: "Latest tech and gadgets",
    },
    price: 79,
    rating: 4.3,
    reviews: 198,
    image: "laptop-stand",
    description: "Ergonomic laptop stand for better posture",
    inStock: true,
    stock: 54,
  },
  {
    id: 7,
    name: "Casual T-Shirt",
    category: {
      name: "Fashion",
      image: "/images/laptop-stand.jpg",
      count: "800+ Products",
      description: "Trendy apparel and accessories",
    },
    price: 39,
    rating: 4.2,
    reviews: 423,
    image: "tshirt",
    description: "Comfortable cotton t-shirt in various colors",
    inStock: true,
    stock: 120,
  },
  {
    id: 8,
    name: "Yoga Mat Premium",
    category: {
      name: "Sports & Fitness",
      image: "/images/laptop-stand.jpg",
      count: "200+ Products",
      description: "Gear for active lifestyle",
    },
    price: 49,
    rating: 4.6,
    reviews: 287,
    image: "yoga-mat",
    description: "Non-slip yoga mat with extra cushioning",
    inStock: true,
    stock: 78,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");

    let filteredProducts = [...products];

    // Filter by category
    if (category && category !== "All") {
      filteredProducts = filteredProducts.filter(
        (p) => p.category.name === category
      );
    }

    // Filter by price range
    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price >= Number(minPrice)
      );
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price <= Number(maxPrice)
      );
    }

    // Filter by search query
    if (search) {
      filteredProducts = filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort products
    if (sort === "price-low") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}
