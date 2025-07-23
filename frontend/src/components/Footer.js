import React from "react";
import { Box, Typography, Container, Grid, Divider} from "@mui/material";
import { Email, Phone } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#FFFFFF", py: 6 }}>
      <Container>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "#754c29", mb: 2 }}
        >
          <Link to='/'><img src="/Unknown-2.svg" alt="Avanti" style={{ width: "100px" }} /></Link>
        </Typography>

        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          WELCOME TO AVANTI
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{ maxWidth: "800px", margin: "0 auto", mb: 3 }}
        >
          <b>Founded in 2024</b>, Avanti is a Jaipur-based fashion label
          celebrating heritage through contemporary designs. We create
          ready-to-wear pieces for women, blending traditional Jaipuri prints
          with modern silhouettes.
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{ maxWidth: "800px", margin: "0 auto", mb: 3 }}
        >
          At Avanti, every piece is a tribute to the artisans who bring our
          vision to life. We honor the rich textile traditions of India,
          crafting ethically made, timeless fashion.
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{ maxWidth: "800px", margin: "0 auto", mb: 3 }}
        >
          The name Avanti symbolizes elegance and movement—an ode to the
          timeless charm of Jaipur’s heritage wear.
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{ fontWeight: "bold", fontStyle: "italic", mb: 4 }}
        >
          Avanti – exclusively stitched
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid
            item
            xs={4}
            md={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/sustainable.png"
              alt="Sustainable"
              style={{
                width: "35px",
                height: "35px",
                objectFit: "contain",
                marginRight: "8px",
              }}
            />
            <Typography variant="body2">Sustainable</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            md={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/Unknown-1.svg"
              alt="Artisanal"
              style={{
                width: "35px",
                height: "35px",
                objectFit: "contain",
                marginRight: "8px",
              }}
            />
            <Typography variant="body2">Artisanal</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            md={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/Unknown.png"
              alt="Mindful"
              style={{
                width: "35px",
                height: "35px",
                objectFit: "contain",
                marginRight: "8px",
              }}
            />
            <Typography variant="body2">Mindful</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, backgroundColor: "#ddd" }} />

        <Grid container spacing={4} sx={{ mt: 3 }} justifyContent="center">
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Typography variant="body2">
              All our pieces at Avanti are crafted in India, celebrating the
              rich heritage of Jaipuri prints and traditional craftsmanship.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Each piece carries the soul of artisanal techniques, making subtle
              variations a mark of its authenticity.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              We believe these nuances add character, turning every creation
              into a story of culture and elegance.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
              Some call it timeless charm. We call it Avanti.
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: "center", md: "right" } }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              MON - SAT <b>10:00 AM TO 6:00 PM (IST)</b>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "right" },
                alignItems: "center",
                mt: 1,
              }}
            >
              <Phone sx={{ mr: 1 }} /> +91 938E273941827
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "right" },
                alignItems: "center",
                mt: 1,
              }}
            >
              <Email sx={{ mr: 1 }} /> avanti.made@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
