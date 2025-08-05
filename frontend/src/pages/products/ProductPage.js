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
import Navbar from "../../components/Navbar";
import Advertisements from "../../components/Advertisements";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts } from "../../features/products/productSlice";

// Helper: fallback for product fields (prevents undefined access!)
const getSafe = (obj, path, def = "") =>
  path.split(".").reduce((val, key) => (val && val[key] !== undefined ? val[key] : def), obj);

const ACCENT = "#603813";

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
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
    fade: true,
  };

  // --------- COMPONENT JSX ----------
  return (
    <>
      <Advertisements />
      <Navbar />

      <style>{`
        /* Animation for MDBCollapse content */
        .fade-collapse {
          transition: all .35s cubic-bezier(.52,0,.31,1);
          opacity: 1;
        }
        .fade-collapse:not(.show) {
          opacity: 0;
          transform: translateY(-15px);
        }
        /* Image hover for related cards */
        .card-hover img {
          transition: transform .4s cubic-bezier(.52,0,.31,1);
        }
        .card-hover:hover img {
          transform: scale(1.06);
          box-shadow: 0 4px 18px #deb88722;
        }
        .slick-dots li button:before {
          color: ${ACCENT};
        }
        .size-btn.selected, .size-btn.active {
          background: ${ACCENT};
          color: #fff !important;
          border-color: ${ACCENT};
          box-shadow: 0 2px 8px #60381328;
        }
      `}</style>

      <MDBContainer className="my-5">
        <MDBRow className="gx-4 gy-3 flex-column flex-md-row">
          <MDBCol md="6" className="mb-4 mb-md-0">
            {/* Mobile slider */}
            <div className="d-md-none mb-4 rounded-3 overflow-hidden shadow-sm" style={{ background: "#f8f8f4" }}>
              {product.images && product.images.length > 1 ? (
                <Slider {...sliderSettings}>
                  {product.images.map((img, i) => (
                    <div key={`mobile-${i}`}>
                      <img
                        src={img}
                        alt={`Product ${i + 1}`}
                        className="w-100"
                        style={{ height: "56vw", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img
                  src={getSafe(product, "images.0")}
                  alt="Product"
                  className="w-100"
                  style={{ height: "56vw", objectFit: "cover" }}
                />
              )}
            </div>
            {/* Desktop grid - like screenshot */}
            <div className="d-none d-md-flex flex-wrap gap-3 justify-content-between">
              {product.images?.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className="rounded-3 shadow-sm overflow-hidden"
                  style={{
                    width: "48%",
                    aspectRatio: "1 / 1",
                    background: "#f8f8f4",
                  }}
                >
                  <img
                    src={img}
                    alt={`Product ${i + 1}`}
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
              {/* Tall/wide large image, as in screenshot */}
              {product.images?.length > 4 && (
                <div className="w-100 rounded-3 overflow-hidden shadow-sm mt-2" style={{ background: "#f8f8f4" }}>
                  <img
                    src={product.images[4]}
                    alt="Main large"
                    className="img-fluid w-100"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "auto",
                      minHeight: "200px",
                    }}
                  />
                </div>
              )}
            </div>
          </MDBCol>

          <MDBCol md="6" className="d-flex flex-column pt-md-2">
            <h2 className="fw-bold mb-2" style={{ fontSize: "clamp(22px, 5vw, 36px)", letterSpacing: "0.5px" }}>
              {product.name}
            </h2>
            <h4 className="mb-3 fw-medium" style={{ color: ACCENT, fontSize: "clamp(18px, 4vw, 28px)" }}>
              Rs. {product.price}
            </h4>

            {/* Size selection */}
            <div className="mb-3">
              <div className="fw-bold" style={{ fontSize: 14 }}>SELECT SIZE</div>
              <div className="d-flex flex-wrap gap-2 mt-2 mb-1">
                {(product.sizes || []).map((size, idx) => (
                  <MDBBtn
                    key={size + idx}
                    outline
                    color="dark"
                    className="rounded-0 px-3 py-2 size-btn"
                    style={{
                      borderColor: ACCENT,
                      color: ACCENT,
                      fontSize: "13.5px",
                      minWidth: 48,
                      fontWeight: 600,
                      background: "#fff"
                    }}
                    // Add selection logic if you wish: `active={selectedSize === size}`
                  >
                    {size}
                  </MDBBtn>
                ))}
              </div>
              <div className="text-muted" style={{ fontSize: 13 }}>
                <span style={{ textDecoration: "underline", cursor: "pointer" }}>Size Guide</span>
              </div>
            </div>

            {/* Quantity selector */}
            <div className="d-flex align-items-center gap-3 my-3">
              <MDBBtn outline color="dark" className="rounded-0 px-3 shadow-none" style={{ color: ACCENT, borderColor: ACCENT }}>-</MDBBtn>
              <span style={{ fontSize: "17.5px", fontWeight: 600 }}>1</span>
              <MDBBtn outline color="dark" className="rounded-0 px-3 shadow-none" style={{ color: ACCENT, borderColor: ACCENT }}>+</MDBBtn>
            </div>

            {/* Add to cart button */}
            <MDBBtn
              className="rounded-0 w-100 shadow-sm"
              style={{
                background: `linear-gradient(97deg, #603813 70%, #b29a75 190%)`,
                border: "none",
                fontWeight: 700,
                fontSize: "16.5px",
                letterSpacing: 0.9,
                transition: "box-shadow .25s",
                boxShadow: "0 4px 16px #cdb78b16"
              }}
            >
              ADD TO CART
            </MDBBtn>

            {/* Animated Collapsible Sections */}
            {[
              "Description",
              "Product Details",
              "Product Care",
              "Shipping",
              "Exchange and Return",
            ].map((label) => (
              <div key={label} className="border-top mt-4 pt-3">
                <div
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => toggleCollapse(label)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  <h5 className="mb-0" style={{ fontSize: "16.3px", color: "#61441b", fontWeight: 700 }}>{label}</h5>
                  <MDBIcon icon={openSections[label] ? "angle-up" : "angle-down"} size="lg" />
                </div>
                <MDBCollapse show={openSections[label]} className="fade-collapse">
                  <div className="text-muted mt-2" style={{ fontSize: "14.1px" }}>
                    {getSafe(
                      product,
                      label.toLowerCase().replace(/ /g, ""),
                      "Information not available."
                    )}
                  </div>
                </MDBCollapse>
              </div>
            ))}
          </MDBCol>
        </MDBRow>

        {/* You May Also Like */}
        <h4 className="mb-4 mt-5 ps-1" style={{ fontWeight: 700, fontSize: "clamp(20px, 3vw, 23px)", color: "#603813" }}>
          You May Also Like
        </h4>
        <MDBRow className="g-3 mb-2">
          {(products || [])
            .filter((p) => p._id !== product._id)
            .slice(0, 4)
            .map((p) => (
              <MDBCol key={p._id} xs="6" sm="4" md="3">
                <div
                  className="text-center card-hover"
                  style={{
                    cursor: "pointer",
                    borderRadius: 11,
                    boxShadow: "0 1px 8px #b1926244",
                    background: "#fdfaed",
                    transition: "box-shadow .28s cubic-bezier(.33,0,.68,1)",
                  }}
                  onClick={() => navigate(`/product/${p._id}`)}
                >
                  <img
                    src={getSafe(p, "images.0")}
                    alt={p.name}
                    className="img-fluid rounded"
                    style={{
                      objectFit: "cover",
                      height: "220px",
                      width: "100%",
                      borderRadius: 10
                    }}
                  />
                  <h6 className="mt-3 mb-0" style={{ fontSize: "15.5px", fontWeight: 600, color: "#61441b" }}>
                    {getSafe(p, "name")}
                  </h6>
                  <div className="text-muted mb-3" style={{ fontSize: "14px" }}>
                    Rs. {getSafe(p, "price")}
                  </div>
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
