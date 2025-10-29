import { NextResponse } from "next/server";

// Mock product database
const products: Record<string, any> = {
  "1": {
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
    images: ["headphones", "headphones-side", "headphones-case"],
    description:
      "Experience superior sound quality with our premium wireless headphones. Featuring advanced noise cancellation technology, these headphones deliver crystal-clear audio whether you're listening to music, taking calls, or enjoying your favorite podcasts.",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Premium leather ear cushions",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone",
      "Foldable design with carrying case",
    ],
    specifications: {
      Brand: "LuxeAudio",
      Model: "LA-WH1000",
      Color: "Midnight Black",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
      Battery: "40 hours playback",
    },
    inStock: true,
    stock: 45,
  },
  "2": {
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
    images: ["smartwatch", "smartwatch-side", "smartwatch-app"],
    description:
      "Stay connected and track your fitness goals with our advanced smart watch. Features include heart rate monitoring, GPS tracking, and seamless smartphone integration.",
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant up to 50m",
      "7-day battery life",
      "Sleep tracking",
      "Smartphone notifications",
    ],
    specifications: {
      Brand: "TechFit",
      Model: "TF-SW500",
      Color: "Space Gray",
      Weight: "45g",
      Display: "1.4 inch AMOLED",
      Battery: "7 days typical use",
    },
    inStock: true,
    stock: 32,
  },
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = products[params.id];

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}
