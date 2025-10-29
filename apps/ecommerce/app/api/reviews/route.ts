import { NextResponse } from "next/server"

// In-memory review storage (in production, use a database)
const reviews: any[] = [
  {
    id: 1,
    productId: 1,
    userId: "user1",
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Absolutely love these headphones! The sound quality is incredible and the noise cancellation works perfectly.",
    createdAt: "2025-01-15T10:30:00Z",
  },
  {
    id: 2,
    productId: 1,
    userId: "user2",
    name: "Michael Chen",
    rating: 4,
    comment: "Great product overall. Very comfortable for long listening sessions. Battery life is impressive.",
    createdAt: "2025-01-10T14:20:00Z",
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    let productReviews = reviews

    if (productId) {
      productReviews = reviews.filter((review) => review.productId === Number(productId))
    }

    return NextResponse.json({
      success: true,
      data: productReviews,
      total: productReviews.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch reviews",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, userId, name, rating, comment } = body

    if (!productId || !userId || !name || !rating || !comment) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Rating must be between 1 and 5",
        },
        { status: 400 },
      )
    }

    const review = {
      id: reviews.length + 1,
      productId,
      userId,
      name,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    }

    reviews.push(review)

    return NextResponse.json({
      success: true,
      data: review,
      message: "Review submitted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit review",
      },
      { status: 500 },
    )
  }
}
