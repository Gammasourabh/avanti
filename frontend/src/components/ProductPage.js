import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCollapse,
} from "mdb-react-ui-kit";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";
import Advertisements from "./Advertisements";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts } from "../features/products/productSlice";

const ProductPage = () => {
  const [openSections, setOpenSections] = useState({});
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { list: products } = useSelector((state) => state.products);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    } else {
      const found = products.find((p) => p._id === id);
      setProduct(found || null);
    }
  }, [dispatch, id, products]);

  const toggleCollapse = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (!product) {
    if (!products.length) return <p className="text-center mt-5">Loading...</p>;
    return <p className="text-center mt-5">Product not found.</p>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      <Advertisements />
      <Navbar />

      <MDBContainer className="my-5">
        <MDBRow className="mb-5 gx-4 gy-4 flex-column flex-md-row">
          <MDBCol md="6" className="mb-4">
            {/* Mobile view slider */}
            <div className="d-md-none mb-4">
              <Slider {...sliderSettings}>
                {product.images.map((img, i) => (
                  <div key={`mobile-${i}`}>
                    <img
                      src={img}
                      alt={`Product ${i + 1}`}
                      className="d-block w-100"
                      style={{ height: "70vw", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Desktop view grid */}
            <div className="d-none d-md-flex flex-wrap gap-3 justify-content-between">
              {product.images.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className="rounded overflow-hidden"
                  style={{
                    width: "48%",
                    aspectRatio: "1 / 1",
                    marginBottom: "1rem",
                  }}
                >
                  <img
                    src={img}
                    alt={`Product ${i + 1}`}
                    className="img-fluid"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}

              {product.images[4] && (
                <div className="w-100">
                  <img
                    src={product.images[4]}
                    alt="Main large"
                    className="img-fluid rounded"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "auto",
                      marginTop: "1rem",
                    }}
                  />
                </div>
              )}
            </div>
          </MDBCol>

          <MDBCol md="6">
            <h2 className="fw-bold mb-2" style={{ fontSize: "clamp(20px, 5vw, 28px)" }}>{product.name}</h2>
            <h4 style={{ color: "#603813", fontSize: "clamp(16px, 4vw, 22px)" }}>Rs. {product.price}</h4>

            <div className="mt-4">
              <p className="fw-bold mb-2">SELECT SIZE</p>
              <div className="d-flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <MDBBtn
                    key={size}
                    outline
                    color="dark"
                    className="rounded-0 px-3 py-2"
                    style={{
                      borderColor: "#603813",
                      color: "#603813",
                      fontSize: "14px",
                    }}
                  >
                    {size}
                  </MDBBtn>
                ))}
              </div>
              <p className="text-muted mt-1" style={{ fontSize: "13px" }}>
                <span style={{ textDecoration: "underline" }}>Size Guide</span>
              </p>
            </div>

            <div className="d-flex align-items-center gap-3 my-4">
              <MDBBtn outline color="dark" className="rounded-0">-</MDBBtn>
              <span style={{ fontSize: "18px" }}>1</span>
              <MDBBtn outline color="dark" className="rounded-0">+</MDBBtn>
            </div>

            <MDBBtn
              className="w-100 rounded-0"
              style={{
                backgroundColor: "#603813",
                fontSize: "15px",
                color: "#fff",
                padding: "12px",
                letterSpacing: "1px",
              }}
            >
              ADD TO CART
            </MDBBtn>

            {[
              "Description",
              "Product Details",
              "Product Care",
              "Shipping",
              "Exchange and Return",
            ].map((label) => (
              <div key={label} className="mt-4 border-top pt-2">
                <div
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => toggleCollapse(label)}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="mb-0" style={{ fontSize: "16px" }}>{label}</h5>
                  <MDBIcon icon={openSections[label] ? "angle-up" : "angle-down"} />
                </div>
                <MDBCollapse show={openSections[label]}>
                  <p className="text-muted mt-2" style={{ fontSize: "14px" }}>
                    {product[label.toLowerCase().replace(/ /g, "")] || "Information not available."}
                  </p>
                </MDBCollapse>
              </div>
            ))}
          </MDBCol>
        </MDBRow>

        <h4 className="mb-4">You May Also Like</h4>
        <MDBRow className="g-3">
          {products
            .filter((p) => p._id !== product._id)
            .slice(0, 4)
            .map((p) => (
              <MDBCol key={p._id} xs="6" sm="4" md="3">
                <div className="text-center card-hover" onClick={() => navigate(`/product/${p._id}`)}>
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="img-fluid rounded"
                    style={{
                      objectFit: "cover",
                      height: "250px",
                      width: "100%",
                      transition: "transform 0.4s ease",
                    }}
                  />
                  <h6 className="mt-2 mb-0" style={{ fontSize: "15px" }}>{p.name}</h6>
                  <p className="text-muted" style={{ fontSize: "14px" }}>Rs. {p.price}</p>
                </div>
              </MDBCol>
            ))}
        </MDBRow>
      </MDBContainer>

      <Footer />
    </>
  );
};

export default ProductPage;