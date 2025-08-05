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

  // Filter and sort
  let shownProducts = Array.isArray(products) ? [...products] : [];
  if (category !== "all") {
    shownProducts = shownProducts.filter(
      (p) => (p.category || "").toLowerCase() === category
    );
  }
  if (sortBy !== "default") shownProducts.sort(sortFns[sortBy]);

  // Responsive sidebar (uses offcanvas for mobile)
  return (
    <MDBContainer fluid className="py-5" style={{ background: "#FAF6F3", minHeight: "100vh" }}>
      <style>{`
        .sideDrawer-bg {
          background: ${SIDE_COLORS};
          border-radius: 20px;
        }
        .product-card:hover img {
          transform: scale(1.05);
          box-shadow: 0 2px 12px #ddb89233;
        }
        .product-card img {
          transition: transform .3s cubic-bezier(.6,0,.3,1);
        }
        @media (max-width: 991px) {
          .sidebar-col {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .mobileFilterBtn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 1048;
            background: ${PRIMARY};
            color: #fff;
            box-shadow: 0 4px 24px #60381322;
          }
        }
      `}</style>
      <MDBRow className="gx-5">
        {/* SIDEBAR (visible on desktop) */}
        <MDBCol lg="3" className="sidebar-col pe-lg-4 mb-4 mb-lg-0">
          <div className="sideDrawer-bg p-4 shadow-sm sticky-top" style={{ top: 80, minHeight: "300px" }}>
            <h5 className="fw-bold mb-3" style={{ color: PRIMARY }}>
              Filter & Sort
            </h5>
            <div className="mb-4">
              <label className="mb-2 fw-semi fs-6" style={{ color: "#61441b" }}>
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
              <label className="mb-2 fw-semi fs-6" style={{ color: "#61441b" }}>
                Category
              </label>
              <div className="d-grid gap-2">
                {CATEGORIES.map(cat => (
                  <MDBBtn
                    key={cat.value}
                    outline
                    style={{
                      borderColor: PRIMARY,
                      color: category === cat.value ? "#fff" : PRIMARY,
                      background: category === cat.value ? PRIMARY : "transparent",
                      fontWeight: category === cat.value ? "bold" : 500,
                      boxShadow: "none",
                      transition: "background .16s"
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
        {/* FILTER "DRAWER" on mobile */}
        <button
          className="mobileFilterBtn d-lg-none btn btn-lg rounded-circle"
          style={{ display: showFilter ? "none" : "inline-block" }}
          onClick={() => setShowFilter(true)}
        >
          <MDBIcon icon="filter" />
        </button>
        {showFilter && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
            style={{ zIndex: 2002, background: "rgba(40,20,1,0.23)" }}
            onClick={() => setShowFilter(false)}
          >
            <div
              className="sideDrawer-bg p-4"
              style={{
                position: "absolute",
                width: "85vw",
                maxWidth: 330,
                height: "100%",
                left: 0, top: 0, boxShadow: "4px 0 22px #60381316",
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0" style={{ color: PRIMARY }}>Filter & Sort</h5>
                <MDBBtn size="sm" outline color="dark" rounded onClick={() => setShowFilter(false)}>
                  <MDBIcon icon="times" />
                </MDBBtn>
              </div>
              <div className="mb-4">
                <label className="mb-2 fw-semi fs-6" style={{ color: "#61441b" }}>Sort by</label>
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
                <label className="mb-2 fw-semi fs-6" style={{ color: "#61441b" }}>Category</label>
                <div className="d-grid gap-2">
                  {CATEGORIES.map(cat => (
                    <MDBBtn
                      key={cat.value}
                      outline
                      style={{
                        borderColor: PRIMARY,
                        color: category === cat.value ? "#fff" : PRIMARY,
                        background: category === cat.value ? PRIMARY : "transparent",
                        fontWeight: category === cat.value ? "bold" : 500,
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
          {shownProducts.length === 0 ? (
            <div className="text-center py-5 text-muted">
              No products found.
            </div>
          ) : (
            <MDBRow className="g-4">
              {shownProducts.map((product) => (
                <MDBCol
                  key={product._id}
                  xs="6"
                  sm="6"
                  md="4"
                  lg="4"
                  xl="3"
                  className="mb-2"
                  onClick={() => navigate(`/product/${product._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="text-center product-card p-2 pb-3 h-100"
                    style={{
                      background: "#fff",
                      borderRadius: "17px",
                      boxShadow: "0 1px 18px #ddb89216",
                      transition: "box-shadow .18s cubic-bezier(.37,0,.48,1)"
                    }}
                  >
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="img-fluid rounded-4"
                      style={{
                        objectFit: "cover",
                        height: "300px",
                        width: "100%",
                        marginBottom: "12px",
                      }}
                    />
                    <h6 className="mt-1 mb-0 fw-bold" style={{ fontSize: "15.7px", color: PRIMARY }}>{product.name}</h6>
                    <p className="text-muted mb-0 mt-1" style={{ fontSize: "14.5px" }}>
                      Rs. {product.price}
                    </p>
                  </div>
                </MDBCol>
              ))}
            </MDBRow>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ProductListPage;
