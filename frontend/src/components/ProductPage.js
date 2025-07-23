import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCollapse,
} from "mdb-react-ui-kit";
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

  // Fetch product list and match product by ID
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

  return (
    <>
      <Advertisements />
      <Navbar />

      <MDBContainer className="my-5">
        <MDBRow className="mb-5">
          {/* LEFT: Image Gallery */}
          <MDBCol md="6">
            <MDBRow className="g-3">
              {product.images.slice(0, 4).map((img, i) => (
                <MDBCol key={i} xs="6">
                  <img
                    src={img}
                    alt={`Product ${i + 1}`}
                    className="img-fluid rounded"
                    style={{ objectFit: "cover", height: "180px" }}
                  />
                </MDBCol>
              ))}
              {product.images[4] && (
                <MDBCol xs="12">
                  <img
                    src={product.images[4]}
                    alt="Main"
                    className="img-fluid rounded"
                    style={{ objectFit: "cover", height: "350px", width: "100%" }}
                  />
                </MDBCol>
              )}
            </MDBRow>
          </MDBCol>

          {/* RIGHT: Product Info */}
          <MDBCol md="6">
            <h2 className="fw-bold mb-2" style={{ fontSize: "28px" }}>{product.name}</h2>
            <h4 style={{ color: "#603813" }}>Rs. {product.price}</h4>

            {/* Size Buttons */}
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
                📏 <span style={{ textDecoration: "underline" }}>Size Guide</span>
              </p>
            </div>

            {/* Quantity & Add to Cart */}
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

            {/* Accordions */}
            {[
              { label: "Description", content: product.description || "No Description" },
              { label: "Product Details", content: "Material: " + (product.material || "N/A") },
              { label: "Product Care", content: "Handle with care. Dry clean preferred." },
              { label: "Shipping", content: "Ships in 3-5 business days." },
              { label: "Exchange and Return", content: "Exchange allowed within 7 days." },
            ].map(({ label, content }) => (
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
                    {content}
                  </p>
                </MDBCollapse>
              </div>
            ))}
          </MDBCol>
        </MDBRow>

        {/* You May Also Like */}
        <h4 className="mb-4">You May Also Like</h4>
        <MDBRow className="g-4">
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
