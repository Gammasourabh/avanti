import React, { useState } from 'react'
import {
  Typography,
  Container,
 
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { MDBCarousel, MDBCarouselItem, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import  Navbar from "../components/Navbar"
import Advertisements from "./Advertisements";
import Footer from "../components/Footer"

const BestSeller = () => {
  const navigate = useNavigate();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [activeIndex, setActiveIndex] = useState(0);
    const open = Boolean(anchorEl);
   
  
    const handleSortClick = (event) => {
           setAnchorEl(event.currentTarget);
         };
  
    const handleSortClose = () => {
      setAnchorEl(null);
    };
  

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
      <section>
       <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">

        <div className="carousel-item active">
          <div className="d-flex justify-content-between carousel-multi">
            <img src="/best1.png" className="carousel-image" alt="..." />
            <img src="/best2.png" className="carousel-image" alt="..." />
            <img src="/best3.png" className="carousel-image" alt="..." />
          </div>
        </div>

        <div className="carousel-item">
          <div className="d-flex justify-content-between carousel-multi">
            <img src="/best1.png" className="carousel-image" alt="..." />
            <img src="/best2.png" className="carousel-image" alt="..." />
            <img src="/best3.png" className="carousel-image" alt="..." />
          </div>
        </div>
      </div>
    </div>
    </section>
    <Container maxWidth="lg" style={{marginTop: "10vh"}}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          mb={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <HomeIcon />
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
            >
              Bestsellers
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <IconButton size="small">
              <FilterListIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
            >
              Filter
            </Typography>
          </Box>

          <Box>
            <IconButton size="small" onClick={handleSortClick}>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
              >
                Sort
              </Typography>
              <ExpandMoreIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleSortClose}>
              <MenuItem onClick={handleSortClose}>Price: Low to High</MenuItem>
              <MenuItem onClick={handleSortClose}>Price: High to Low</MenuItem>
              <MenuItem onClick={handleSortClose}>Newest First</MenuItem>
            </Menu>
          </Box>
        </Box>

        <MDBRow className="justify-content-center">
    {[
      { id: 1, name: "Morni Kurta", price: "Rs. 2100", imgSrc: "/morni.png" },
      { id: 2, name: "Floral Dress", price: "Rs. 3200", imgSrc: "/morni.png" },
      { id: 3, name: "Ethnic Set", price: "Rs. 4500", imgSrc: "/morni.png" },
      { id: 1, name: "Morni Kurta", price: "Rs. 2100", imgSrc: "/morni.png" },
      { id: 2, name: "Floral Dress", price: "Rs. 3200", imgSrc: "/morni.png" },
      { id: 3, name: "Ethnic Set", price: "Rs. 4500", imgSrc: "/morni.png" },
      { id: 1, name: "Morni Kurta", price: "Rs. 2100", imgSrc: "/morni.png" },
      { id: 2, name: "Floral Dress", price: "Rs. 3200", imgSrc: "/morni.png" },
      { id: 3, name: "Ethnic Set", price: "Rs. 4500", imgSrc: "/morni.png" },
    ].map((product) => (
      <MDBCol key={product.id} md="4" sm="6" xs="12" className="mb-3">
        <img
          src={product.imgSrc}
          alt={product.name}
          className="img-fluid w-100"
          style={{ height: "55vh", objectFit: "cover" }}
        />
        <p className="mt-2">{product.name}</p>
        <p>{product.price}</p>
      </MDBCol>
    ))}
  </MDBRow>
        <div className="view-all-container">
          <button
            className="view-all-button"
            onClick={() => navigate("/all-image")}
          >
            View All
          </button>
        </div>
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
  )
}

export default BestSeller

