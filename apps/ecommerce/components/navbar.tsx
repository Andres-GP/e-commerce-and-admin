"use client"

import { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material"
import { ShoppingCart, Menu as MenuIcon, Close } from "@mui/icons-material"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/lib/cart-context"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { getTotalItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled ? "rgba(10, 10, 10, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.3)" : "none",
          transition: "all 0.3s ease",
          borderBottom: scrolled ? "1px solid rgba(99, 102, 241, 0.1)" : "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "1.5rem",
                  letterSpacing: "-0.02em",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                LuxeStore
              </Typography>
            </Link>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 4,
              }}
            >
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      color: pathname === item.href ? "primary.main" : "text.primary",
                      fontWeight: pathname === item.href ? 600 : 500,
                      position: "relative",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "primary.main",
                        transform: "translateY(-2px)",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -4,
                        left: 0,
                        width: pathname === item.href ? "100%" : "0%",
                        height: "2px",
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        transition: "width 0.3s ease",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              ))}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                component={Link}
                href="/cart"
                sx={{
                  color: "text.primary",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "primary.main",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <Badge badgeContent={getTotalItems()} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: "text.primary",
                }}
                onClick={() => setMobileOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            background: "linear-gradient(135deg, rgba(10, 10, 10, 0.98) 0%, rgba(20, 20, 20, 0.98) 100%)",
            backdropFilter: "blur(20px)",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" className="gradient-text">
            Menu
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "text.primary" }}>
            <Close />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                sx={{
                  py: 2,
                  "&:hover": {
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    "& .MuiTypography-root": {
                      color: pathname === item.href ? "primary.main" : "text.primary",
                      fontWeight: pathname === item.href ? 600 : 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}
