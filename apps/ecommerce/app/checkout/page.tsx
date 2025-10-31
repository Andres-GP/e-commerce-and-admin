"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Alert,
} from "@mui/material";
import { CreditCard, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    setMounted(true);
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart, router]);

  const total = (getTotalPrice() * 1.1).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const orderData = {
        userId: "guest",
        items: cart,
        shippingAddress,
        paymentMethod,
        total: total,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
        router.push("/order-success");
      } else {
        alert("❌ Error when processing order: " + data.error);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("There was an error when processing the order. Try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (!mounted || cart.length === 0) return null;

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
            Checkout
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Complete your purchase securely
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                    Shipping Information
                  </Typography>
                  <Grid container spacing={3}>
                    {[
                      { label: "First Name", key: "firstName" },
                      { label: "Last Name", key: "lastName" },
                      { label: "Email Address", key: "email", type: "email" },
                      { label: "Phone Number", key: "phone" },
                      { label: "Address", key: "address" },
                      { label: "City", key: "city" },
                      { label: "State", key: "state" },
                      { label: "ZIP Code", key: "zip" },
                    ].map((field) => (
                      <Grid
                        item
                        xs={12}
                        sm={
                          field.key === "firstName" ||
                          field.key === "lastName" ||
                          field.key === "city" ||
                          field.key === "state"
                            ? 6
                            : 12
                        }
                        key={field.key}
                      >
                        <TextField
                          label={field.label}
                          type={field.type || "text"}
                          fullWidth
                          required
                          value={
                            shippingAddress[
                              field.key as keyof typeof shippingAddress
                            ]
                          }
                          onChange={(e) =>
                            setShippingAddress({
                              ...shippingAddress,
                              [field.key]: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                    Payment Method
                  </Typography>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <CreditCard size={20} />
                          <Typography>Credit/Debit Card</Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="paypal"
                      control={<Radio />}
                      label="PayPal"
                    />
                    <FormControlLabel
                      value="apple"
                      control={<Radio />}
                      label="Apple Pay"
                    />
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <Box sx={{ mt: 3 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            label="Card Number"
                            placeholder="1234 5678 9012 3456"
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Expiry Date"
                            placeholder="MM/YY"
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="CVV"
                            placeholder="123"
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Cardholder Name"
                            fullWidth
                            required
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  <Alert
                    icon={<Lock size={20} />}
                    severity="info"
                    sx={{
                      mt: 3,
                      bgcolor: "rgba(99, 102, 241, 0.1)",
                      border: "1px solid rgba(99, 102, 241, 0.2)",
                    }}
                  >
                    Your payment information is encrypted and secure
                  </Alert>
                </CardContent>
              </Card>
            </Grid>

            <Grid item size={12}>
              <Card sx={{ position: "sticky", top: 20 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                    Order Summary
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {cart.map((item) => (
                      <Box
                        key={item.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            Qty: {item.quantity}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Divider sx={{ my: 2 }} />
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
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={processing}
                    sx={{
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      py: 1.5,
                    }}
                  >
                    {processing ? "Processing..." : "Place Order"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
