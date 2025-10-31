"use client";

import react, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import {
  ShoppingBag,
  Truck,
  Shield,
  Headphones,
  Lock,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { categories } from "@/lib/product-data";

export default function HomePage() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);

  const fetchProducts = async (filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sort?: string;
  }) => {
    try {
      const params = new URLSearchParams();

      if (filters.category) params.append("category", filters.category);
      if (filters.minPrice) params.append("minPrice", String(filters.minPrice));
      if (filters.maxPrice) params.append("maxPrice", String(filters.maxPrice));
      if (filters.search) params.append("search", filters.search);
      if (filters.sort) params.append("sort", filters.sort);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();

      if (!data.success) throw new Error(data.error);

      return data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchProducts({ category: "Electronics", sort: "price-low" }).then(
      setProducts
    );
  }, []);

  const someProducts = products.slice(0, 3);

  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box className="page-transition">
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background:
            "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(6, 182, 212, 0.1) 100%)",
          position: "relative",
          overflow: "hidden",
          pt: 10,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography
              variant="h1"
              className="gradient-text"
              sx={{
                mb: 3,
                fontSize: { xs: "2.5rem", md: "4rem" },
                animation: "fadeIn 1s ease-out",
              }}
            >
              Discover Premium Products
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 5,
                color: "text.secondary",
                maxWidth: "700px",
                mx: "auto",
                lineHeight: 1.6,
                animation: "fadeIn 1.2s ease-out",
              }}
            >
              Experience luxury shopping with our curated collection of
              high-quality products. From fashion to electronics, find
              everything you need in one place.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                component={Link}
                href="/products"
                variant="contained"
                size="large"
                sx={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  px: 5,
                  py: 1.5,
                  fontSize: "1.1rem",
                  animation: "fadeIn 1.4s ease-out",
                }}
              >
                Shop Now
              </Button>
              <Button
                onClick={scrollToHowItWorks}
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "primary.main",
                  color: "primary.main",
                  px: 5,
                  py: 1.5,
                  fontSize: "1.1rem",
                  animation: "fadeIn 1.6s ease-out",
                  "&:hover": {
                    borderColor: "primary.light",
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>

        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
      </Box>

      {/* Steps Section */}
      <Container maxWidth="lg" sx={{ py: 10 }} id="how-it-works">
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: 2,
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          How It Works
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 8,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          Shopping made simple. Follow these easy steps to get your favorite
          products delivered to your doorstep.
        </Typography>

        <Grid container spacing={4} sx={{ width: "100%" }}>
          <Grid item size={12}>
            <Card
              className="hover-lift"
              sx={{ height: "100%", textAlign: "center" }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <ShoppingBag size={40} color="white" />
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Browse Products
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", lineHeight: 1.6 }}
                >
                  Explore our extensive catalog of premium products across
                  multiple categories
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item size={12}>
            <Card
              className="hover-lift"
              sx={{ height: "100%", textAlign: "center" }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <Shield size={40} color="white" />
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Secure Checkout
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", lineHeight: 1.6 }}
                >
                  Complete your purchase with our secure payment system and
                  multiple payment options
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item size={12}>
            <Card
              className="hover-lift"
              sx={{ height: "100%", textAlign: "center" }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <Truck size={40} color="white" />
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Fast Delivery
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", lineHeight: 1.6 }}
                >
                  Get your orders delivered quickly with our reliable shipping
                  partners worldwide
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item size={12}>
            <Card
              className="hover-lift"
              sx={{ height: "100%", textAlign: "center" }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <Headphones size={40} color="white" />
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  24/7 Support
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", lineHeight: 1.6 }}
                >
                  Our dedicated support team is always ready to help you with
                  any questions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Secure & Easy Checkout */}
      <Box sx={{ bgcolor: "background.paper", py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Secure & Easy Checkout
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 8,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Your security is our priority. Shop with confidence using our
            encrypted payment system.
          </Typography>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={12} sx={{ width: "100%" }}>
              <Box
                sx={{
                  position: "relative",
                  height: "400px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  background:
                    "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                }}
              >
                <Box
                  sx={{
                    width: "90%",
                    height: "80%",
                    background: "rgba(10, 10, 10, 0.8)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "16px",
                    p: 4,
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Lock size={24} color="#6366f1" />
                    <Typography variant="h6">Secure Payment</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}
                  >
                    {["Visa", "Mastercard", "PayPal", "Apple Pay"].map(
                      (method) => (
                        <Box
                          key={method}
                          sx={{
                            flex: 1,
                            minWidth: "80px",
                            height: "50px",
                            background: "rgba(99, 102, 241, 0.1)",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid rgba(99, 102, 241, 0.2)",
                          }}
                        >
                          <Typography variant="caption">{method}</Typography>
                        </Box>
                      )
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <CheckCircle size={20} color="#06b6d4" />
                    <Typography variant="body2">
                      256-bit SSL Encryption
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <CheckCircle size={20} color="#06b6d4" />
                    <Typography variant="body2">PCI DSS Compliant</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircle size={20} color="#06b6d4" />
                    <Typography variant="body2">Fraud Protection</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item size={12}>
                  <Card className="hover-lift">
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        p: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "12px",
                          background:
                            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <CreditCard size={30} color="white" />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ mb: 0.5 }}>
                          Multiple Payment Options
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Credit cards, debit cards, PayPal, Apple Pay, and more
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item size={12}>
                  <Card className="hover-lift">
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        p: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "12px",
                          background:
                            "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Shield size={30} color="white" />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ mb: 0.5 }}>
                          Buyer Protection
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          30-day money-back guarantee on all purchases
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item size={12}>
                  <Card className="hover-lift">
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        p: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "12px",
                          background:
                            "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Lock size={30} color="white" />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ mb: 0.5 }}>
                          Data Privacy
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Your information is encrypted and never shared
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Some Products */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: 2,
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Some Products
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 8,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          Handpicked selection of our most popular and trending products
        </Typography>

        <Grid container spacing={4}>
          {someProducts.map((product) => (
            <Grid item size={4} key={product.id}>
              <Link
                href={`/products/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  className="hover-lift"
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "100%",
                      overflow: "hidden",
                      bgcolor: "background.paper",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      p: 3,
                    }}
                  >
                    <Chip
                      label={product.category.name}
                      size="small"
                      sx={{
                        mb: 2,
                        width: "fit-content",
                        bgcolor: "primary.main",
                        color: "white",
                        fontSize: "0.75rem",
                      }}
                    />
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 2, flexGrow: 1 }}
                    >
                      {product.description.substring(0, 80)}...
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "primary.main" }}
                      >
                        ${product.price}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          ⭐ {product.rating}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        });
                      }}
                      sx={{
                        mt: 2,
                        background:
                          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            component={Link}
            href="/products"
            variant="outlined"
            size="large"
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              "&:hover": {
                borderColor: "primary.light",
                backgroundColor: "rgba(99, 102, 241, 0.1)",
              },
            }}
          >
            View All Products
          </Button>
        </Box>
      </Container>

      {/* Shop by Category */}
      <Box sx={{ bgcolor: "background.paper", py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Shop by Category
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 8,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Explore our diverse range of product categories tailored to your
            lifestyle
          </Typography>

          <Grid container spacing={1}>
            {categories.map((category, index) => (
              <Grid item size={3} key={category.name}>
                <Card
                  className="hover-lift"
                  sx={{
                    height: "320px",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    borderRadius: "16px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      "& .category-overlay": {
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)",
                      },
                      "& .category-image": {
                        transform: "scale(1.15)",
                      },
                      "& .category-content": {
                        transform: "translateY(-10px)",
                      },
                    },
                  }}
                >
                  <Box
                    className="category-image"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "transform 0.5s ease",
                    }}
                  />
                  <Box
                    className="category-overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)",
                      transition: "all 0.3s ease",
                    }}
                  />
                  <Box
                    className="category-content"
                    sx={{
                      position: "relative",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      p: 3,
                      zIndex: 1,
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <Chip
                      label={`#${index + 1}`}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        background:
                          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        color: "white",
                        fontWeight: 700,
                      }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, mb: 0.5, color: "white" }}
                    >
                      {category.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}
                    >
                      {category.description}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "primary.light", fontWeight: 600 }}
                    >
                      {category.count}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box
          sx={{
            background:
              "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
            borderRadius: "24px",
            p: { xs: 4, md: 8 },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
              color: "white",
            }}
          >
            Ready to Start Shopping?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: "rgba(255, 255, 255, 0.9)",
              maxWidth: "600px",
              mx: "auto",
              fontSize: "1.1rem",
            }}
          >
            Join thousands of satisfied customers and experience premium
            shopping today
          </Typography>
          <Button
            component={Link}
            href="/products"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "white",
              color: "primary.main",
              px: 6,
              py: 2,
              fontSize: "1.1rem",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.9)",
              },
            }}
          >
            Explore Products
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
