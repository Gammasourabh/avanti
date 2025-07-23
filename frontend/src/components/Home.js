import React, { useEffect, useState } from "react";
import { MDBCarousel, MDBCarouselItem, MDBRipple } from "mdb-react-ui-kit";
import { motion } from "framer-motion";
import { Box, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import  Navbar from "../components/Navbar"
import Advertisements from "./Advertisements";
import Footer from "./Footer";



export default function Home() {
  
  const navigate = useNavigate();
   const [carouselItems, setCarouselItems] = useState([]);
     const [products, setProducts] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);

   useEffect(() => {
    // Fetch Carousel Items
    axios.get("http://localhost:5008/api/carousels")
      .then(response => setCarouselItems(response.data))
      .catch(error => console.error("Error fetching carousel items:", error));

    // Fetch Products
    axios.get("http://localhost:5008/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));

    // Fetch Process Steps
    axios.get("http://localhost:5008/api/process")
      .then(response => setProcessSteps(response.data))
      .catch(error => console.error("Error fetching process steps:", error));
  }, []);

  const prints = [
    [
      { src: "01.webp", text: "Print 1" },
      { src: "02.jpeg", text: "Print 2" },
      { src: "03.webp", text: "Print 3" },
      { src: "04.webp", text: "Print 4" },
    ],
    [
      { src: "03.webp", text: "Print 5" },
      { src: "02.jpeg", text: "Print 6" },
      { src: "04.webp", text: "Print 7" },
      { src: "01.webp", text: "Print 8" },
    ],
    [
      { src: "04.webp", text: "Print 9" },
      { src: "02.jpeg", text: "Print 10" },
      { src: "01.webp", text: "Print 11" },
      { src: "03.webp", text: "Print 12" },
    ],
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % mainImages.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  const images = [
    "https://mdbootstrap.com/img/new/standard/city/041.webp",
    "https://mdbootstrap.com/img/new/standard/city/042.webp",
    "https://mdbootstrap.com/img/new/standard/city/043.webp",
    "https://mdbootstrap.com/img/new/standard/city/044.webp",
    "https://mdbootstrap.com/img/new/standard/city/045.webp",
    "https://mdbootstrap.com/img/new/standard/city/046.webp",
    "https://mdbootstrap.com/img/new/standard/city/047.webp",
    "https://mdbootstrap.com/img/new/standard/city/048.webp",
    "https://mdbootstrap.com/img/new/standard/city/049.webp",
    "https://mdbootstrap.com/img/new/standard/city/050.webp",
  ];



  
  const suits = [
    {
      src: "/1.png",
      text: "Yellow Kurti Set",
    },
    {
      src: "/2.png",
      text: "Blue Midnight Short Kurti",
    },
    {
      src: "/3.png",
      text: "Printed Anarkali",
    },
    {
      src: "/4.png",
      text: "Festive Lehenga Set",
    },
  ];
  const Product = [
    {
      img: "https://mdbootstrap.com/img/new/standard/city/050.webp",
      title: "Casual Salwar Suit",
    },
    {
      img: "https://mdbootstrap.com/img/new/standard/city/051.webp",
      title: "Classic Dupatta Set",
    },
    {
      img: "https://mdbootstrap.com/img/new/standard/city/052.webp",
      title: "Chikankari Dress",
    },
    {
      img: "https://mdbootstrap.com/img/new/standard/city/053.webp",
      title: "Silk Lehenga",
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


  const rightSideImages = [
    [
      {
        src: "https://mdbootstrap.com/img/new/standard/city/046.webp",
        text: "Printed Anarkali",
      },
      {
        src: "https://mdbootstrap.com/img/new/standard/city/047.webp",
        text: "Festive Lehenga Set",
      },
      {
        src: "https://mdbootstrap.com/img/new/standard/city/048.webp",
        text: "Traditional Kurti",
      },
      {
        src: "https://mdbootstrap.com/img/new/standard/city/049.webp",
        text: "Elegant Saree",
      },
    ],
    [
      {
        src: "https://mdbootstrap.com/img/new/standard/city/050.webp",
        text: "Casual Salwar Suit",
      },
      {
        src: "https://mdbootstrap.com/img/new/standard/city/051.webp",
        text: "Classic Dupatta Set",
      },
      {
        src: "https://mdbootstrap.com/img/new/standard/city/052.webp",
        text: "Chikankari Dress",
      },
      {
        src: "https://mdbootstrap.com/img/new/standard/city/053.webp",
        text: "Silk Lehenga",
      },
    ],
  ];


  const itemData = [
    { img: "/check_13817631.png", title: "Order Confirmation" },
    { img: "/cutting_4857388.png", title: "Processing & Handcrafting" },
    { img: "/search_413013.png", title: "Quality Check" },
    { img: "/delivery_18864643.png", title: "Peckaging and Shipment" },
    { img: "/parcel-out_17660331.png", title: "Out for Delivery" },
    { img: "/order-fulfillment_18653425.png", title: "Deliverd with Joy" },
    
    
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % mainImages.length);
        setFade(false);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
     <>
     <Advertisements/>
      <Navbar/>
      </>
      <section>
      <MDBCarousel interval={3000}>
  {carouselItems.map((item, index) => (
    <MDBCarouselItem itemId={index + 1} key={item._id}>
      <div className="position-relative">
        <img
          src={item.image}
          className="d-block w-100"
          alt={item.title}
          style={{ maxHeight: '90vh', objectFit: 'cover' }}
        />
        <div className="text-overlay text-center">
          <motion.p className="display-1" initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
            {item.title}
          </motion.p>
          <motion.p className="display-1" initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.3 }}>
            {item.subtitle}
          </motion.p>
        </div>
      </div>
    </MDBCarouselItem>
  ))}
</MDBCarousel>

    </section>
    <section className="bymaster text-center py-5">
  <h1 
    className="display-4" 
    style={{ fontFamily: "fantasy", color: "#000000" }}
  >
    Handicrafted
  </h1>
  <p 
    className="lead" 
    style={{ fontFamily: "serif" }}
  >
    by master craftspeople
  </p>

  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-4 col-md-2 d-flex align-items-center justify-content-center mb-4">
        <img
          src="/sustainable.png"
          alt="Sustainable"
          style={{
            width: "35px",
            height: "35px",
            objectFit: "contain",
            marginRight: "5px",
          }}
        />
        <span className="small">Sustainable</span>
      </div>
      <div className="col-4 col-md-2 d-flex align-items-center justify-content-center mb-4">
        <img
          src="/Unknown-1.svg"
          alt="Ethical"
          style={{
            width: "35px",
            height: "35px",
            objectFit: "contain",
            marginRight: "5px",
          }}
        />
        <span className="small">Ethical</span>
      </div>
      <div className="col-4 col-md-2 d-flex align-items-center justify-content-center mb-4">
        <img
          src="/Unknown.png"
          alt="Responsible"
          style={{
            width: "35px",
            height: "35px",
            objectFit: "contain",
            marginRight: "5px",
          }}
        />
        <span className="small">Responsible</span>
      </div>
    </div>
  </div>
</section>

      <section>
        <div className="scroller-container">
          <div className="scroller-track">
            {images.concat(images).map((src, index) => (
              <MDBRipple rippleTag="a" key={index} className="scroller-item">
                <img
                  src={src}
                  className="img-fluid rounded"
                  alt={`example-${index}`}
                />
              </MDBRipple>
            ))}
          </div>
        </div>
        <div className="view-all-container">
          <button
            className="view-all-button"
            onClick={() => navigate("/all-images")}
          >
            View All
          </button>
        </div>
      </section>

      <section className="bymaster">
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "15vh",
            fontSize: "40px",
            fontFamily: "fantasy",
            color: "#000000",
          }}
        >
          Loved by everyone, presented for you
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontFamily: "serif",
          }}
        >
          explore our evergreen bestsellers
        </Typography>
      </section>

      <section>
        <div className="gallery-container">
          {suits.map((item, index) => (
            <div key={index} className="image-box">
              <img src={item.src} alt="Product" />
              <div className="overlay">
                <span>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <button
            className="view-all-button"
            onClick={() => navigate("/all-image")}
          >
            View All
          </button>
        </div>
      </section>

      <section>
        <MDBCarousel style={{ marginTop: "10vh" }}>
          <MDBCarouselItem itemId={1}>
            <img src="/1stbanner.png" className="d-block w-100" alt="..." />
          </MDBCarouselItem>
        </MDBCarousel>
      </section>
      <section>
        <div className="gallery-wrapper">
          <div className="main-product-image">
            <img
              src={mainImages[activeIndex].src}
              alt="Large Product"
              className={`primary-image ${fade ? "fade-out" : "fade-in"}`}
            />
          </div>

          <div className="secondary-image-grid">
            {rightSideImages[activeIndex].map((item, index) => (
              <div
                key={index}
                className={`secondary-image-box stagger-fade-${index + 1}`}
              >
                <img
                  src={item.src}
                  alt={item.text}
                  className="secondary-image"
                />
                <span className="image-caption">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="view-all-container">
          <button
            className="view-all-button"
            onClick={() => navigate("/all-imagess")}
          >
            View All
          </button>
        </div>
      </section>
      <section>
        <MDBCarousel style={{ marginTop: "5vh" }} className="section-container">
          <MDBCarouselItem itemId={1}>
            <div className="section-item-content">
              <img src="/newslatter.png" className="d-block w-100" alt="..." />
            </div>
          </MDBCarouselItem>
        </MDBCarousel>
      </section>
      <section className="text-center py-5">
  <h1 
    className="display-5" 
    style={{
      marginTop: "15vh",
      fontFamily: "fantasy",
      color: "#000000"
    }}
  >
    Your order will go through the following process!
  </h1>
</section>

<section className="py-5">
  <div className="container">
    {/* Top Row */}
    <div className="row justify-content-center align-items-center mb-5">
      {itemData.slice(0, 3).map((item, index) => (
        <React.Fragment key={item.img}>
          <div className="col-12 col-md-3 d-flex flex-column align-items-center mb-4 icon-container">
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="process-icon"
            />
            <p className="mt-3 fw-bold">{item.title}</p>
          </div>
          {index !== 2 && (
            <div className="col-1 d-flex justify-content-center arrow-container">
              <h2 className="fw-bold arrow">→</h2>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>

    {/* Bottom Row */}
    <div className="row justify-content-center align-items-center flex-row-reverse">
      {itemData.slice(3, 6).map((item, index) => (
        <React.Fragment key={item.img}>
          <div className="col-12 col-md-3 d-flex flex-column align-items-center mb-4 icon-container">
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="process-icon"
            />
            <p className="mt-3 fw-bold">{item.title}</p>
          </div>
          {index !== 2 && (
            <div className="col-1 d-flex justify-content-center arrow-container">
              <h2 className="fw-bold arrow">←</h2>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
</section>
      <section>
        <MDBCarousel style={{ marginTop: "3vh" }}>
          <MDBCarouselItem itemId={1}>
            <img src="/2ndbanner.png" className="d-block w-100" alt="..." />
          </MDBCarouselItem>
        </MDBCarousel>
      </section>
      <section className="bymaster">
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "15vh",
            fontSize: "40px",
            fontFamily: "fantasy",
            color: "#000000",
          }}
        >
          Shop By Ctaegory
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontFamily: "serif",
          }}
        >
          Handpicked to add joy to your soul
        </Typography>
      </section>
      <section>
        <div className="scrolle-container" style={{ marginTop: "5vh" }}>
          <div
            style={{ animation: "none", gap: "68px" }}
            className="scroller-track"
          >
            {Product.map((src, index) => (
              <MDBRipple rippleTag="a" key={index} className="scroller-item">
                <img
                  srcSet={`${src.img}?w=180&h=180&fit=crop&auto=format&dpr=2 2x`}
                  src={`${src.img}?w=180&h=180&fit=crop&auto=format`}
                  alt={src.title}
                  loading="lazy"
                />
              </MDBRipple>
            ))}
          </div>
        </div>
      </section>
      <section className="avanti-section py-5">
  <div className="container">
    <div className="row align-items-start">
      
      <div className="col-12 col-md-6 text-center mb-5 mb-md-0 animate-fadeIn">
        <h2 className="mb-2 avanti-heading">PEOPLE of Avanti</h2>
        <p className="text-muted">TAG US IN YOUR AVANTI LOOKS</p>
        <div className="main-image-wrapper mt-4 animate-zoomIn">
          <img
            src={mainImages[activeIndex].src}
            alt="Avanti Look"
            className="img-fluid main-image"
          />
        </div>
      </div>

      <div className="col-12 col-md-6 text-center animate-fadeIn delay-1s">
        <h2 className="mb-2 avanti-heading">PRINTS of Avanti</h2>
        <p className="text-muted">CHOOSE THE PRINT YOU LIKE & SEE WHAT WE'VE GOT</p>
        <div className="prints-grid mt-4">
          {prints[activeIndex].map((image, index) => (
            <div key={index} className="print-item animate-zoomIn delay-2s">
              <img
                src={image.src}
                alt={image.text}
                className="img-fluid rounded print-image"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>

  <style>{`
    .avanti-heading {
      font-family: 'serif';
      color: #6B3E1D; /* Deep earthy brown */
    }

    .main-image-wrapper {
      padding: 20px;
      background: url('/path-to-your-frame-background.png') center/cover no-repeat;
      border-radius: 15px;
      overflow: hidden;
      transition: all 0.6s ease-in-out;
    }

    .main-image {
      border-radius: 10px;
      width: 100%;
      hight:100vh;
      object-fit: cover;
    }

    /* Adjust the print images grid to make 2x2 grid */
    .prints-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr); /* Two columns */
      gap: 10px; /* Reduced space between images */
    }

    .print-item img.print-image {
      object-fit: cover;
      height: 250px;
      width: 100%;
      transition: transform 0.3s ease;
    }

    .print-item img.print-image:hover {
      transform: scale(1.08);
    }

    /* Animations */
    @keyframes fadeIn {
      0% {opacity: 0;}
      100% {opacity: 1;}
    }

    @keyframes zoomIn {
      0% {transform: scale(0.9); opacity: 0;}
      100% {transform: scale(1); opacity: 1;}
    }

    .animate-fadeIn {
      animation: fadeIn 1s ease forwards;
    }
    .animate-zoomIn {
      animation: zoomIn 1s ease forwards;
    }
    .delay-1s {
      animation-delay: 1s;
    }
    .delay-2s {
      animation-delay: 2s;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .main-image-wrapper {
        padding: 10px;
      }
      .prints-grid img.print-image {
        height: 150px;
      }
      .prints-grid {
        grid-template-columns: 1fr; /* Single column on small screens */
      }
    }
  `}</style>
</section>


 



      <section style={{ marginTop: "10vh" }}>
      <div className="insta-container">
          <button
            className="insta-button"
            onClick={() => navigate("/all-imagess")}
          >
            Follow us on Instagram  <i class="fab fa-instagram fa-xl" style={{marginLeft:'10px', color:'orange' }}></i>
          </button>
        </div>
      </section>
      <section>
        <div className="scroller-container-left">
          <div className="scroller-track-left">
            {images.concat(images).map((src, index) => (
              <MDBRipple rippleTag="a" key={index} className="scroller-item-left">
                <img
                  src={src}
                  className="img-fluid rounded"
                  alt={`example-${index}`}
                />
              </MDBRipple>
            ))}
          </div>
        </div>
        <div className="scroller-container-right">
          <div className="scroller-track-right">
            {images.concat(images).map((src, index) => (
              <MDBRipple rippleTag="a" key={index} className="scroller-item-right">
                <img
                  src={src}
                  className="img-fluid rounded"
                  alt={`example-${index}`}
                />
              </MDBRipple>
            ))}
          </div>
        </div>
       
      </section>
  <Footer/>
    </>
  );
}