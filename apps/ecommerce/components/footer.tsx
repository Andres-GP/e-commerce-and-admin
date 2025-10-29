"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "border",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              className="gradient-text"
              sx={{
                mb: 2,
                fontWeight: 700,
              }}
            >
              LuxeStore
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 3, lineHeight: 1.8 }}
            >
              Your premium destination for high-quality products. Experience
              luxury shopping with exceptional service and fast delivery.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                sx={{
                  bgcolor: "background.default",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "white",
                  },
                }}
              >
                <Facebook size={20} />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "background.default",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "white",
                  },
                }}
              >
                <Twitter size={20} />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "background.default",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "white",
                  },
                }}
              >
                <Instagram size={20} />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "background.default",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "white",
                  },
                }}
              >
                <Linkedin size={20} />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Shop
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link
                href="/products?category=Electronics"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  Electronics
                </Typography>
              </Link>
              <Link
                href="/products?category=Fashion"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  Fashion
                </Typography>
              </Link>
              <Link
                href="/products?category=Sports"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  Sports
                </Typography>
              </Link>
              <Link
                href="/products?category=Home"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  Home & Living
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Support
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  Contact Us
                </Typography>
              </Link>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  Shipping Info
                </Typography>
              </Link>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  Returns
                </Typography>
              </Link>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  FAQ
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Company
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link href="/about" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  About Us
                </Typography>
              </Link>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  Careers
                </Typography>
              </Link>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  Blog
                </Typography>
              </Link>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  Press
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item size={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Newsletter
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 2, lineHeight: 1.6 }}
            >
              Subscribe to get special offers and updates.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <TextField
                placeholder="Your email"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "background.default",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton size="small" sx={{ color: "primary.main" }}>
                      <Mail size={18} />
                    </IconButton>
                  ),
                }}
              />
              <Button
                variant="contained"
                size="small"
                sx={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            © 2025 LuxeStore. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                  transition: "color 0.2s",
                }}
              >
                Privacy Policy
              </Typography>
            </Link>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                  transition: "color 0.2s",
                }}
              >
                Terms of Service
              </Typography>
            </Link>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                  transition: "color 0.2s",
                }}
              >
                Cookie Policy
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
