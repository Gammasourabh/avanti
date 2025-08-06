import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "co-ord", label: "Co-ords" },
  { value: "dresses", label: "Dresses" },
  { value: "tops", label: "Tops" },
];
const SIDE_COLORS = "#F5F6FA";
const PRIMARY = "#603813";

const sortFns = {
  default: (a, b) => 0,
  priceLowHigh: (a, b) => a.price - b.price,
  priceHighLow: (a, b) => b.price - a.price,
  newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
};

const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: products } = useSelector((state) => state.products);

  const [sortBy, setSortBy] = useState("default");
  const [category, setCategory] = useState("all");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  let shownProducts = safeArray(products);
  if (category !== "all") {
    shownProducts = shownProducts.filter(
      (p) => (p.category || "").toLowerCase() === category
    );
  }
  if (sortBy !== "default") shownProducts.sort(sortFns[sortBy]);

  return (
    <div style={{ background: "#FFF8F3", minHeight: "100vh" }}>
      {/* Hero Section - image banner */}
      <div style={{
        width: "100%",
        minHeight: "225px",
        background: "url('/your-hero-image.jpg') center/cover #e2c699",
        position: "relative"
      }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(246,232,203,0.79)",
            zIndex: 1,
          }}
        />
        <div
          className="container d-flex flex-column align-items-center justify-content-center"
          style={{
            position: "relative",
            zIndex: 2,
            minHeight: "225px",
            color: PRIMARY,
            fontFamily: "serif",
          }}
        >
          <h1
            style={{
              fontWeight: 700,
              fontSize: "clamp(23px, 4vw, 45px)",
              letterSpacing: 0.1,
              marginBottom: 8,
              textShadow: "0 4px 16px #fff5",
            }}
          >
            Sundress <br /> Mood Is On!
          </h1>
          <div
            style={{
              borderTop: `2px solid ${PRIMARY}44`,
              width: "70%",
              margin: "12px auto 0 auto",
            }}
          />
        </div>
      </div>

      {/* Product/search/filter grid */}
      <MDBContainer fluid className="py-3 px-1 px-md-3" style={{ maxWidth: 1440 }}>
        <style>{`
          .sideDrawer-bg {
            background: ${SIDE_COLORS};
            border-radius: 20px;
          }
          .product-card:hover img {
            transform: scale(1.045);
            box-shadow: 0 2px 16px #c4a37e22;
          }
          .product-card img {
            transition: transform .39s cubic-bezier(.6,0,.3,1);
          }
          @media (max-width: 991px) {
            .sidebar-col {
              display: none !important;
            }
          }
          @media (max-width: 767px) {
            .mobileFilterBtn {
              position: fixed;
              bottom: 22px;
              right: 22px;
              z-index: 1048;
              background: ${PRIMARY};
              color: #fff;
              box-shadow: 0 4px 20px #60422022;
            }
          }
          .product-card {
            cursor: pointer;
            min-height: 370px;
            background: #fff;
            border-radius: 15px;
            box-shadow: 0 5px 26px #e2c69914;
            transition: box-shadow .21s cubic-bezier(.41,0,.48,1);
          }
        `}</style>
        <MDBRow className="gx-5">
          {/* SIDEBAR DESKTOP */}
          <MDBCol lg="3" className="sidebar-col pe-lg-4 mb-4 mb-lg-0">
            <div className="sideDrawer-bg p-4 shadow-sm sticky-top" style={{ top: 85 }}>
              <h5 className="fw-bold mb-3" style={{ color: PRIMARY, letterSpacing: 0.3 }}>Sort & Filter</h5>
              <div className="mb-4">
                <label className="mb-2 fw-semi fs-6" style={{ color: "#5d4530" }}>
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="form-select form-select-sm mb-2"
                >
                  <option value="default">Default</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
              <div>
                <label className="mb-2 fw-semi fs-6" style={{ color: "#5d4530" }}>Category</label>
                <div className="d-grid gap-2">
                  {CATEGORIES.map(cat => (
                    <MDBBtn
                      key={cat.value}
                      outline
                      style={{
                        borderColor: PRIMARY,
                        color: category === cat.value ? "#fff" : PRIMARY,
                        background: category === cat.value ? PRIMARY : "transparent",
                        fontWeight: category === cat.value ? 700 : 500,
                        boxShadow: "none",
                        transition: "background .18s"
                      }}
                      size="sm"
                      className="rounded-pill"
                      onClick={() => setCategory(cat.value)}
                    >
                      {cat.label}
                    </MDBBtn>
                  ))}
                </div>
              </div>
            </div>
          </MDBCol>

          {/* MOBILE DRAWER */}
          <button
            className="mobileFilterBtn d-lg-none btn btn-lg rounded-circle"
            style={{ display: showFilter ? "none" : "inline-block" }}
            onClick={() => setShowFilter(true)}
            aria-label="Open filters"
          >
            <MDBIcon icon="filter" />
          </button>
          {showFilter && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
              style={{ zIndex: 2002, background: "rgba(40,20,1,0.12)" }}
              onClick={() => setShowFilter(false)}
            >
              <div
                className="sideDrawer-bg p-4"
                style={{
                  position: "absolute",
                  width: "85vw",
                  maxWidth: 330,
                  height: "100%",
                  left: 0, top: 0, boxShadow: "4px 0 26px #ae977c18",
                }}
                onClick={e => e.stopPropagation()}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0" style={{ color: PRIMARY }}>Sort & Filter</h5>
                  <MDBBtn size="sm" outline color="dark" rounded onClick={() => setShowFilter(false)}>
                    <MDBIcon icon="times" />
                  </MDBBtn>
                </div>
                <div className="mb-4">
                  <label className="mb-2 fw-semi fs-6" style={{ color: "#5d4530" }}>Sort by</label>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="form-select form-select-sm mb-2"
                  >
                    <option value="default">Default</option>
                    <option value="priceLowHigh">Price: Low to High</option>
                    <option value="priceHighLow">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 fw-semi fs-6" style={{ color: "#5d4530" }}>Category</label>
                  <div className="d-grid gap-2">
                    {CATEGORIES.map(cat => (
                      <MDBBtn
                        key={cat.value}
                        outline
                        style={{
                          borderColor: PRIMARY,
                          color: category === cat.value ? "#fff" : PRIMARY,
                          background: category === cat.value ? PRIMARY : "transparent",
                          fontWeight: category === cat.value ? 700 : 500,
                          boxShadow: "none"
                        }}
                        size="sm"
                        className="rounded-pill"
                        onClick={() => { setCategory(cat.value); setShowFilter(false); }}
                      >
                        {cat.label}
                      </MDBBtn>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCT GRID */}
          <MDBCol xs="12" lg="9">
            <MDBRow className="g-4">
              {shownProducts.length === 0 ? (
                <div className="text-center text-muted py-5 fs-5 w-100">
                  No products found.
                </div>
              ) : (
                shownProducts.map((product) => (
                  <MDBCol
                    key={product._id}
                    xs="6"
                    sm="6"
                    md="4"
                    lg="4"
                    xl="3"
                    onClick={() => navigate(`/product/${product._id}`)}
                    style={{
                      cursor: "pointer",
                      minHeight: 340,
                      display: 'flex',
                      alignItems: 'stretch'
                    }}
                  >
                    <div className="text-center product-card p-2 pb-3 w-100">
                      <img
                        src={product.images?.[0] || "/placeholder.jpg"}
                        alt={product.name}
                        className="img-fluid rounded-4"
                        style={{
                          objectFit: "cover",
                          height: "310px",
                          width: "100%",
                          marginBottom: "14px",
                        }}
                      />
                      <h6 className="mb-1 fw-bold" style={{ fontSize: "15.7px", color: PRIMARY, letterSpacing: 0.1 }}>{product.name || ""}</h6>
                      <p className="text-muted mb-0" style={{ fontSize: "15px" }}>
                        Rs. {product.price}
                      </p>
                    </div>
                  </MDBCol>
                ))
              )}
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default ProductListPage;
