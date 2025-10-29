"use client"

import { Box, Container, Typography, Button, Card, CardContent } from "@mui/material"
import { CheckCircle, Package, Mail } from "lucide-react"
import Link from "next/link"

export default function OrderSuccessPage() {
  return (
    <Box className="page-transition" sx={{ minHeight: "100vh", py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", py: 8, mt: 4 }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 4,
            }}
          >
            <CheckCircle size={60} color="white" />
          </Box>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Order Placed Successfully!
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", mb: 6, maxWidth: "600px", mx: "auto" }}>
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </Typography>

          <Card sx={{ mb: 4, textAlign: "left" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                What's Next?
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={24} color="white" />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
                    Check Your Email
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    We've sent a confirmation email with your order details and tracking information.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Package size={24} color="white" />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
                    Track Your Order
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    You can track your order status anytime using the tracking link in your email.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
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
              Continue Shopping
            </Button>
            <Button
              component={Link}
              href="/"
              variant="outlined"
              size="large"
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
                px: 5,
                py: 1.5,
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
