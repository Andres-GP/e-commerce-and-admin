"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Slider,
  Drawer,
  IconButton,
} from "@mui/material";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { categories } from "@/lib/product-data";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [sortBy, setSortBy] = useState("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);
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

      return data.data; // aquí vienen los productos
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

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category.name === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const FilterContent = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Filters
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Category
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {categories.map((category) => (
            <Chip
              key={category.name}
              label={category.name}
              onClick={() => setSelectedCategory(category.name)}
              sx={{
                bgcolor:
                  selectedCategory === category.name
                    ? "primary.main"
                    : "background.paper",
                color:
                  selectedCategory === category.name ? "white" : "text.primary",
                border: "1px solid",
                borderColor:
                  selectedCategory === category.name
                    ? "primary.main"
                    : "border",
                "&:hover": {
                  bgcolor:
                    selectedCategory === category.name
                      ? "primary.dark"
                      : "background.paper",
                },
              }}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={500}
          sx={{
            color: "primary.main",
            "& .MuiSlider-thumb": {
              bgcolor: "primary.main",
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ${priceRange[0]}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ${priceRange[1]}
          </Typography>
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Sort By
        </Typography>
        <FormControl fullWidth>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "border",
              },
            }}
          >
            <MenuItem value="featured">Featured</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="rating">Highest Rated</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );

  return (
    <Box className="page-transition" sx={{ minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 8, mt: 8 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
            }}
          >
            Our Products
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Discover our curated collection of premium products
          </Typography>
        </Box>

        <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flex: 1,
              minWidth: "250px",
              "& .MuiOutlinedInput-root": {
                bgcolor: "background.paper",
              },
            }}
            InputProps={{
              startAdornment: (
                <Search
                  size={20}
                  style={{ marginRight: 8, color: "#a1a1aa" }}
                />
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<SlidersHorizontal size={20} />}
            onClick={() => setDrawerOpen(true)}
            sx={{
              display: { xs: "flex", md: "none" },
              borderColor: "border",
              color: "text.primary",
            }}
          >
            Filters
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item size={12} sx={{ display: { xs: "none", md: "block" } }}>
            <Card sx={{ position: "sticky", top: 20 }}>
              <FilterContent />
            </Card>
          </Grid>

          <Grid item size={12}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Showing {sortedProducts.length} of {products.length} products
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {sortedProducts.map((product) => (
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
                        <Typography
                          variant="h6"
                          sx={{ mb: 1, fontWeight: 600 }}
                        >
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
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
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

            {sortedProducts.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  width: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "text.secondary" }}
                >
                  No products found
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Try adjusting your filters or search query
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: "80%",
              maxWidth: "400px",
              bgcolor: "background.default",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filters
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <X size={24} />
            </IconButton>
          </Box>
          <FilterContent />
        </Drawer>
      </Container>
    </Box>
  );
}
