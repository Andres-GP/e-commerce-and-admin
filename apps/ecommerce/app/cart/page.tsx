"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } =
    useCart();

  if (cart.length === 0) {
    return (
      <Box className="page-transition" sx={{ minHeight: "100vh", py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", py: 10, mt: 4 }}>
            <ShoppingBag
              size={80}
              style={{ margin: "0 auto 24px", opacity: 0.3 }}
            />
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
              Your Cart is Empty
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
              Looks like you haven't added anything to your cart yet.
            </Typography>
            <Button
              component={Link}
              href="/products"
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                px: 5,
                py: 1.5,
              }}
            >
              Start Shopping
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box className="page-transition" sx={{ minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, mt: 4 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
            }}
          >
            Shopping Cart
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your
            cart
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                {cart.map((item, index) => (
                  <Box key={item.id}>
                    <Box sx={{ display: "flex", gap: 3, py: 3 }}>
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: "12px",
                          background: `url(/placeholder.svg?height=120&width=120&query=${item.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ mb: 1, fontWeight: 600 }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}
                        >
                          ${item.price.toFixed(2)}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              sx={{
                                border: "1px solid",
                                borderColor: "border",
                              }}
                            >
                              <Minus size={16} />
                            </IconButton>
                            <Typography
                              sx={{
                                minWidth: "30px",
                                textAlign: "center",
                                fontWeight: 600,
                              }}
                            >
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              sx={{
                                border: "1px solid",
                                borderColor: "border",
                              }}
                            >
                              <Plus size={16} />
                            </IconButton>
                          </Box>
                          <IconButton
                            onClick={() => removeFromCart(item.productId)}
                            sx={{
                              color: "error.main",
                              "&:hover": {
                                bgcolor: "error.light",
                              },
                            }}
                          >
                            <Trash2 size={20} />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                    {index < cart.length - 1 && <Divider />}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item size={12}>
            <Card sx={{ position: "sticky", top: 20 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                  Order Summary
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    ${getTotalPrice().toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1">Shipping</Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: "success.main" }}
                  >
                    Free
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1">Tax</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    ${(getTotalPrice() * 0.1).toFixed(2)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    ${(getTotalPrice() * 1.1).toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  component={Link}
                  href="/checkout"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    py: 1.5,
                    mb: 2,
                  }}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  component={Link}
                  href="/products"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: "primary.main",
                    color: "primary.main",
                  }}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
