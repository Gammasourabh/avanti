

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Advertisements from "../../components/Advertisements";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import HeroCarousel from "./modules/HeroCarousel";
import HandicraftedSection from "./modules/HandicraftedSection";
import ImageScroller from "./modules/HeroCarousel";
import BestsellersSection from "./modules/BestsellersSection";
import Banner from "./modules/Banner";
import MainProductGallery from "./modules/MainProductGallery";
import OrderProcessSection from "./modules/OrderProcessSection";
import ShopByCategorySection from "./modules/ShopByCategorySection";
import AvantiSection from "./modules/AvantiSection";
import InstagramBanner from "./modules/InstagramBanner";


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
      <Advertisements />
      <Navbar />
      <HeroCarousel items={carouselItems} />
      <HandicraftedSection />
      <ImageScroller images={images} onViewAll={() => navigate("/all-images")} />
      <BestsellersSection suits={suits} onViewAll={() => navigate("/all-image")} />
      <Banner src="/1stbanner.png" />
      <MainProductGallery
        mainImages={mainImages}
        activeIndex={activeIndex}
        fade={fade}
        rightSideImages={rightSideImages}
        onViewAll={() => navigate("/all-imagess")}
      />
      <Banner src="/newslatter.png" />
      <OrderProcessSection itemData={itemData} />
      <Banner src="/2ndbanner.png" />
      <ShopByCategorySection Product={Product} />
      <AvantiSection mainImages={mainImages} activeIndex={activeIndex} prints={prints} />
      <InstagramBanner onClick={() => navigate("/all-imagess")} />
     
      <Footer />
    </>
  );
}
