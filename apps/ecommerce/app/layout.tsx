import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeRegistry } from "@/components/theme-registry";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import Box from "@mui/material/Box"; // Import Box from MUI
import { CartProvider } from "@/lib/cart-context"; // Added CartProvider to wrap the app

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuxeStore - Premium E-Commerce",
  description:
    "Discover premium products with an exceptional shopping experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <CartProvider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Navbar />
              <Box sx={{ flex: 1 }}>{children}</Box>
              <Footer />
            </Box>
          </CartProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
