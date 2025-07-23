import React, { useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { MDBRipple } from "mdb-react-ui-kit";
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import  Navbar from "../components/Navbar"
import Advertisements from "./Advertisements";
import Footer from "../components/Footer"

const AboutUs = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const Product = [
    {
      img: "/aboutusimg1.png",
      title: "Casual Salwar Suit",
    },
    {
      img: "/aboutusimg2.png",
      title: "Classic Dupatta Set",
    },
    {
      img: "/aboutusimg3.png",
      title: "Chikankari Dress",
    },
  ];

  const mainImages = [
    {
      src: "https://mdbootstrap.com/img/new/standard/city/044.webp",
      text: "Yellow Kurti Set",
    },
    {
      src: "https://mdbootstrap.com/img/new/standard/city/045.webp",
      text: "Blue Midnight Short Kurti",
    },
  ];
 
const fourImages = [
  { src: "https://mdbootstrap.com/img/new/standard/city/041.webp", text: "Print 1" },
  { src: "https://mdbootstrap.com/img/new/standard/city/041.webp", text: "Print 2" },
  { src: "https://mdbootstrap.com/img/new/standard/city/041.webp", text: "Print 3" },
  { src: "https://mdbootstrap.com/img/new/standard/city/041.webp", text: "Print 4" },
];

  return (
    <div>
      <>
       <Advertisements/>
      <Navbar/>
      </>
      <section className="bymaster">
  <Typography
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "15vh",
      fontSize: { xs: "30px", md: "40px" },
      fontFamily: "fantasy",
      color: "#000000",
    }}
  >
    Bringing culture
  </Typography>
  <Typography
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: { xs: "30px", md: "40px" },
      fontFamily: "fantasy",
    }}
  >
    to <em style={{ color: "brown", marginLeft: "10px" }}>clothing</em>
  </Typography>
</section>

<section>
  <div
    style={{
      marginTop: "5vh",
      display: "flex",
      justifyContent: "center",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        display: "flex",
        flexWrap: "nowrap",
        gap: "50px",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "auto",
        padding: "10px",
      }}
    >
      {Product.map((src, index) => (
        <MDBRipple
          rippleTag="a"
          key={index}
          style={{ flex: "0 0 auto", textAlign: "center" }}
        >
          <img
            src={src.img}
            alt={src.title}
            style={{
              height: "40vh",
              width: "auto",
              objectFit: "cover",
              display: "block",
              margin: "auto",
            }}
          />
        </MDBRipple>
      ))}
    </div>
  </div>
</section>

{/* Added new text section */}
<section style={{ marginTop: "5vh", padding: "0 10vw", textAlign: "center" }}>
  <Typography
    sx={{
      fontSize: { xs: "16px", md: "20px" },
      fontFamily: "'Lora', serif",
      color: "#333",
      lineHeight: 1.8,
    }}
  >
    Founded in 2024 by me, Dikshita, Avanti is a tribute to the timeless elegance of Jaipur’s heritage and 
    the artistry of Indian craftsmanship. Born from my deep love for traditional textiles and contemporary silhouettes, 
    Avanti is where classic Jaipuri prints meet modern styling—effortless, graceful, and made for the woman who 
    cherishes her roots while embracing the present.
  </Typography>

  <Typography
    sx={{
      fontSize: { xs: "16px", md: "20px" },
      fontFamily: "'Lora', serif",
      color: "#333",
      lineHeight: 1.8,
      marginTop: "2vh",
    }}
  >
    I started Avanti with a vision: to create garments that feel like home yet turn heads wherever you go.
    Every piece is crafted with care, blending heritage with wearability, comfort with charm. Whether you are 
    stepping out for a casual brunch or a festive soirée, Avanti is designed to be your companion—fluid, expressive, 
    and unapologetically you.
  </Typography>

  <Typography
    sx={{
      fontSize: { xs: "16px", md: "20px" },
      fontFamily: "'Lora', serif",
      color: "#333",
      lineHeight: 1.8,
      marginTop: "2vh",
      fontWeight: "bold",
    }}
  >
    Here’s to dressing in stories woven with love!
  </Typography>
</section>


      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" sx={{ mt: 6 }}>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" gap={2}>
              <img
                src="/21.png"
                alt="Artisan working"
                style={{ width: "30%", height: "auto" }}
              />
              <img
                src="/22.png"
                alt="Artisan carving"
                style={{
                  width: "30%",
                  height: "auto",
                  marginLeft: "35%",
                  marginTop: "-20%",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Playfair Display', serif",
                color: "#8B5E3B",
                fontWeight: "bold",
              }}
            >
              How we work?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                color: "#333",
                lineHeight: 1.8,
              }}
            >
              At Avanti, every step we take is rooted in responsibility—towards
              our craft, our community, and our planet. We consciously source
              surplus and remnant fabrics, giving them a second life instead of
              letting them go to waste. Our artisans are the heart and soul of
              every creation...
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center" sx={{ mt: 10 }}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Playfair Display', serif",
                color: "#8B5E3B",
                fontWeight: "bold",
              }}
            >
              our aim
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                fontFamily: "'Lora', serif",
                color: "#333",
                lineHeight: 1.8,
              }}
            >
              To dress all these aspiring women in garments that they feel most
              confident in, so they stand out and feel empowered, regardless of
              whether they're running a business or simply building their
              family. So, for a day when you feel like dressing up and looking
              your best, to a day when you just want to keep it simple and
              casual, we've got all your looks covered.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center">
              <img
                src="/Vector.png"
                alt="Tailor sketch"
                style={{ width: "60%", height: "auto" }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={4} alignItems="center" sx={{ mt: 6 }}>
          <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
              <img
                src="/avantilogo.jpg"
                alt="Avanti Logo"
                style={{ width: "45%", height: "auto" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Playfair Display', serif",
                color: "#8B5E3B",
                fontWeight: "bold",
              }}
            >
              Our Logo
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                color: "#333",
                lineHeight: 1.8,
              }}
            >
              Avanti's logo is a seamless blend of tradition and modernity, much
              like the brand itself. The elegant typography reflects timeless
              sophistication, while the fluid curves symbolize effortless grace
              and movement—core to the brand’s design philosophy. The earthy
              brown hue pays homage to Avanti’s deep-rooted connection to
              heritage, craftsmanship, and nature. Every detail embodies the
              brand’s commitment to creating fashion that is refined yet deeply
              inspired by India’s rich textile legacy.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center" sx={{ mt: 10, mb: 6 }}>
  <Grid item xs={12} md={6}>
    <Typography
      variant="h3"
      sx={{
        fontFamily: "'Playfair Display', serif",
        color: "#8B5E3B",
        fontWeight: "bold",
      }}
    >
      our tagline
    </Typography>
    <Typography
      variant="body1"
      sx={{
        mt: 2,
        fontFamily: "'Lora', serif",
        color: "#333",
        lineHeight: 1.8,
      }}
    >
      Avanti’s tagline, "Exclusivity Stitched," embodies the brand’s
      essence—where timeless craftsmanship meets modern sophistication.
      Every piece is designed with meticulous attention to detail,
      ensuring that each stitch tells a story of heritage, artistry, and
      individuality. More than just fashion, Avanti creates garments
      that celebrate exclusivity, making every wearer feel special,
      confident, and effortlessly elegant.
    </Typography>
  </Grid>
  <Grid item xs={12} md={6} display="flex" justifyContent="center">
    <img
      src="/tag.png"
      alt="Exclusivity Stitched"
      style={{
        width: "100%", 
        maxWidth: "400px",
        height: "auto",
        borderRadius: "10px",
      }}
    />
  </Grid>
</Grid>

      </Container>
      <section className="avanti-section" style={{marginTop: "20vh"}}>
  <div className="people-section">
    <h2>PEOPLE of Avanti</h2>
    <p>TAG US IN YOUR AVANTI LOOKS</p>
    <div className="main-image-placeholder">
      <img src={mainImages[activeIndex].src} alt="Avanti Look" />
    </div>
  </div>

  <div className="prints-section">
    <h2>PRINTS of Avanti</h2>
    <p>CHOOSE THE PRINT YOU LIKE & SEE WHAT WE'VE GOT</p>
    <div className="prints-grid">
      {fourImages.map((image, index) => (
        <img key={index} src={image.src} alt={image.text} className="print-image" />
      ))}
    </div>
  </div>
</section>
<section>
        <MDBCarousel style={{ marginTop: "10vh" }} className="section-container">
          <MDBCarouselItem itemId={1}>
            <div className="section-item-content">
              <img src="/newslatter.png" className="d-block w-100" alt="..." />
            </div>
          </MDBCarouselItem>
        </MDBCarousel>
      </section>
      <Footer/>
    </div>
  );
};

export default AboutUs;
