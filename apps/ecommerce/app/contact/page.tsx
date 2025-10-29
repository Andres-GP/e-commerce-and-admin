"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Mail size={32} />,
      title: "Email Us",
      content: "support@luxestore.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: <Phone size={32} />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm",
    },
    {
      icon: <MapPin size={32} />,
      title: "Visit Us",
      content: "123 Commerce Street, NY 10001",
      description: "Our headquarters",
    },
    {
      icon: <Clock size={32} />,
      title: "Business Hours",
      content: "Mon-Fri: 8am - 6pm",
      description: "Weekend: 10am - 4pm",
    },
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
            Get In Touch
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Have a question or need assistance? We're here to help. Reach out to
            us through any of the channels below.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {contactInfo.map((info, index) => (
            <Grid item size={3} key={index}>
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
                      color: "white",
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {info.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                    {info.content}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {info.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          <Grid item size={12}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                  Send Us a Message
                </Typography>
                <Box
                  component="form"
                  sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  <TextField
                    label="Your Name"
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "background.paper",
                      },
                    }}
                  />
                  <TextField
                    label="Email Address"
                    type="email"
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "background.paper",
                      },
                    }}
                  />
                  <TextField
                    label="Subject"
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "background.paper",
                      },
                    }}
                  />
                  <TextField
                    label="Message"
                    multiline
                    rows={6}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "background.paper",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      py: 1.5,
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 8,
            p: { xs: 4, md: 6 },
            borderRadius: "24px",
            background:
              "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
            Looking for quick answers? Check out our FAQ section for common
            questions about shipping, returns, and more.
          </Typography>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              px: 4,
              "&:hover": {
                borderColor: "primary.light",
                backgroundColor: "rgba(99, 102, 241, 0.1)",
              },
            }}
          >
            View FAQ
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
