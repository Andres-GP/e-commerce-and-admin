"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { Target, Users, Award, TrendingUp } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Target size={40} />,
      title: "Our Mission",
      description:
        "To provide premium quality products with exceptional customer service and create memorable shopping experiences.",
    },
    {
      icon: <Users size={40} />,
      title: "Customer First",
      description:
        "We prioritize our customers' needs and satisfaction above everything else, ensuring a seamless shopping journey.",
    },
    {
      icon: <Award size={40} />,
      title: "Quality Assured",
      description:
        "Every product is carefully curated and tested to meet our high standards of quality and durability.",
    },
    {
      icon: <TrendingUp size={40} />,
      title: "Innovation",
      description:
        "We continuously evolve and adapt to bring you the latest trends and cutting-edge products.",
    },
  ];

  const team = [
    { name: "Sarah Johnson", role: "CEO & Founder", avatar: "SJ" },
    { name: "Michael Chen", role: "Head of Operations", avatar: "MC" },
    { name: "Emma Davis", role: "Creative Director", avatar: "ED" },
    { name: "James Wilson", role: "Tech Lead", avatar: "JW" },
  ];

  return (
    <Box className="page-transition" sx={{ minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 8, mt: 4, textAlign: "center" }}>
          <Typography
            variant="h2"
            className="gradient-text"
            sx={{
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 700,
            }}
          >
            About LuxeStore
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            We're passionate about bringing you the finest selection of premium
            products. Since our founding, we've been committed to excellence,
            innovation, and customer satisfaction.
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 10,
            p: { xs: 4, md: 8 },
            borderRadius: "24px",
            background:
              "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item size={12}>
              <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
                Our Story
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", lineHeight: 1.8, mb: 2 }}
              >
                Founded in 2020, LuxeStore began with a simple vision: to create
                an online shopping destination that combines premium quality
                products with an exceptional customer experience.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", lineHeight: 1.8 }}
              >
                Today, we serve thousands of satisfied customers worldwide,
                offering a carefully curated selection of products across
                multiple categories. Our commitment to quality, innovation, and
                customer satisfaction remains at the heart of everything we do.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 10 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: 700,
            }}
          >
            Our Values
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 6,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            The principles that guide everything we do
          </Typography>

          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item size={12} key={index}>
                <Card
                  className="hover-lift"
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
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
                        color: "white",
                      }}
                    >
                      {value.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {value.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.6 }}
                    >
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: 10 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: 700,
            }}
          >
            Meet Our Team
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 6,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            The talented people behind LuxeStore
          </Typography>

          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item size={3} key={index}>
                <Card className="hover-lift" sx={{ textAlign: "center" }}>
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        mx: "auto",
                        mb: 2,
                        fontSize: "2rem",
                        background:
                          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      }}
                    >
                      {member.avatar}
                    </Avatar>
                    <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {member.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: "24px",
            background:
              "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ mb: 2, color: "white", fontWeight: 700 }}
          >
            Join Our Journey
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Be part of our growing community of satisfied customers. Experience
            premium shopping today.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
