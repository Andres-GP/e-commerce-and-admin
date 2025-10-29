"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Tabs,
  Tab,
  Rating,
  Avatar,
  Divider,
} from "@mui/material";
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { getProductById } from "@/lib/product-data";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Absolutely love these headphones! The sound quality is incredible and the noise cancellation works perfectly.",
    avatar: "user1",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    date: "1 month ago",
    comment:
      "Great product overall. Very comfortable for long listening sessions. Battery life is impressive.",
    avatar: "user2",
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 5,
    date: "1 month ago",
    comment: "Best headphones I've ever owned. Worth every penny!",
    avatar: "user3",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const { addToCart } = useCart();

  const product = getProductById(Number(params.id)) || getProductById(1)!;

  return (
    <Box className="page-transition" sx={{ minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <Box
          sx={{ mb: 4, mt: 8, display: "flex", gap: 1, alignItems: "center" }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              Home
            </Typography>
          </Link>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            /
          </Typography>
          <Link href="/products" style={{ textDecoration: "none" }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              Products
            </Typography>
          </Link>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            /
          </Typography>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {product.name}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item size={4}>
            <Card sx={{ mb: 2, overflow: "hidden" }}>
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "100%",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={product.images[selectedImage]}
                  alt={product.name}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Card>
            <Grid container spacing={2}>
              {product.images.map((img: string, index: number) => (
                <Grid item xs={4} key={index}>
                  <Card
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      cursor: "pointer",
                      border: "2px solid",
                      borderColor:
                        selectedImage === index
                          ? "primary.main"
                          : "transparent",
                      transition: "all 0.3s ease",
                      overflow: "hidden",
                      "&:hover": {
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        paddingTop: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        component="img"
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Product Info */}
          <Grid item size={8}>
            <Chip
              label={product.category.name}
              sx={{
                mb: 2,
                bgcolor: "primary.main",
                color: "white",
              }}
            />
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
              {product.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.rating} ({product.reviews} reviews)
              </Typography>
            </Box>

            <Typography
              variant="h4"
              sx={{ mb: 3, fontWeight: 700, color: "primary.main" }}
            >
              ${product.price}
            </Typography>

            <Typography
              variant="body1"
              sx={{ mb: 4, color: "text.secondary", lineHeight: 1.8 }}
            >
              {product.description}
            </Typography>

            {/* Quantity Selector */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Quantity
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  sx={{ minWidth: "40px", height: "40px" }}
                >
                  -
                </Button>
                <Typography
                  variant="h6"
                  sx={{ minWidth: "40px", textAlign: "center" }}
                >
                  {quantity}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setQuantity(quantity + 1)}
                  sx={{ minWidth: "40px", height: "40px" }}
                >
                  +
                </Button>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart size={20} />}
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    });
                  }
                }}
                sx={{
                  flex: 1,
                  minWidth: "200px",
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  py: 1.5,
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  minWidth: "50px",
                  borderColor: "border",
                }}
              >
                <Heart size={20} />
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  minWidth: "50px",
                  borderColor: "border",
                }}
              >
                <Share2 size={20} />
              </Button>
            </Box>

            {/* Features */}
            <Card sx={{ mb: 3, bgcolor: "background.paper" }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Truck size={24} color="#6366f1" />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Free Shipping
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          On orders over $50
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Shield size={24} color="#6366f1" />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          2 Year Warranty
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          Full coverage
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <RotateCcw size={24} color="#6366f1" />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          30-Day Returns
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          Money back guarantee
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Stock Status */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: product.inStock ? "#10b981" : "#ef4444",
                }}
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Tabs Section */}
        <Box sx={{ mt: 8 }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: "border",
              mb: 4,
            }}
          >
            <Tab label="Description" />
            <Tab label="Specifications" />
            <Tab label={`Reviews (${product.reviews})`} />
          </Tabs>

          {/* Description Tab */}
          {activeTab === 0 && (
            <Box>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Product Description
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, color: "text.secondary", lineHeight: 1.8 }}
              >
                {product.description}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Key Features
              </Typography>
              <Grid container spacing={2}>
                {product.features.map((feature: string, index: number) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                        }}
                      />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Specifications Tab */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Technical Specifications
              </Typography>
              <Card>
                <CardContent>
                  {Object.entries(product.specifications).map(
                    ([key, value], index) => (
                      <Box key={key}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            py: 2,
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {key}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {value as string}
                          </Typography>
                        </Box>
                        {index <
                          Object.entries(product.specifications).length - 1 && (
                          <Divider />
                        )}
                      </Box>
                    )
                  )}
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Reviews Tab */}
          {activeTab === 2 && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Customer Reviews
                </Typography>
                <Button variant="contained">Write a Review</Button>
              </Box>

              <Box sx={{ display: "flex", gap: 4, mb: 4, flexWrap: "wrap" }}>
                <Box>
                  <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                    {product.rating}
                  </Typography>
                  <Rating value={product.rating} precision={0.5} readOnly />
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: 1 }}
                  >
                    Based on {product.reviews} reviews
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent>
                      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            bgcolor: "primary.main",
                          }}
                        >
                          {review.name.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 600 }}
                            >
                              {review.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "text.secondary" }}
                            >
                              {review.date}
                            </Typography>
                          </Box>
                          <Rating
                            value={review.rating}
                            size="small"
                            readOnly
                            sx={{ mb: 1 }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary", lineHeight: 1.6 }}
                          >
                            {review.comment}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
