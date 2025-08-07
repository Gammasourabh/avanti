import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Container, Button} from "react-bootstrap";
import { FiGrid, FiList, FiSliders } from "react-icons/fi";
import Navbar from '..//../components/Navbar'
import Footer from '../../components/Footer'
import Advertisements from '..//../components/Advertisements'

const PRIMARY = "#603813";

const sortLabel = "Sort";
const filterLabel = "Filter";

// Adjust category labels as desired
const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "co-ord", label: "Co-ord Set" },
  { value: "dresses", label: "Dresses" },
  { value: "short kurta", label: "Short Kurta" }
];

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Only show first 3 products
  const shownProducts = (products || []).slice(0, 3);

  return (
    <>
    <div>
      <Advertisements/>
      <Navbar/>
    </div>

   
    <Container style={{ background: "#FFF8F3", minHeight: "100vh", paddingTop: 28 }}>
      {/* Header: Back + Title */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <span style={{ fontSize: 17, color: "#333" }}>
          <i className="bi bi-house-door"></i> Bestsellers
        </span>
      </div>

      {/* Sort/Filter Bar */}
      <div className="d-flex align-items-center mb-3 justify-content-between">
        <div className="d-flex gap-2">
          {/* Grid Icon - active */}
          <Button
            variant="light"
            className="p-2"
            style={{ borderRadius: 6, border: "1px solid #ddd" }}
            disabled
          >
            <FiGrid size={20} />
          </Button>
          {/* List Icon - example, not active */}
          <Button
            variant="light"
            className="p-2"
            style={{ borderRadius: 6, border: "1px solid #ddd", opacity: 0.5 }}
            disabled
          >
            <FiList size={20} />
          </Button>
        </div>
        <div className="d-flex gap-3">
          <Button
            variant="light"
            className="fw-semibold"
            style={{
              borderRadius: 6,
              background: "#fff",
              border: "1px solid #ddd",
              minWidth: 82,
              color: "#333"
            }}
            disabled
          >
            {sortLabel}
          </Button>
          <Button
            variant="light"
            className="fw-semibold"
            style={{
              borderRadius: 6,
              background: "#fff",
              border: "1px solid #ddd",
              minWidth: 82,
              color: "#333"
            }}
            disabled
          >
            <FiSliders style={{ marginRight: 3 }} />
            {filterLabel}
          </Button>
        </div>
      </div>

      {/* Product Grid - exactly 3 products */}
      <Row className="g-4 mb-5">
        {shownProducts.length === 0 ? (
          <div className="text-center text-muted py-5 fs-5 w-100">
            No products found.
          </div>
        ) : (
          shownProducts.map((product, idx) => (
            <Col xs={12} sm={4} key={product._id || idx}>
              <Card
                className="h-100 text-center"
                style={{
                  border: "none",
                  borderRadius: 12,
                  boxShadow: "0 2px 14px #e2c69933",
                  cursor: "pointer",
                  background: "#f8f7f3"
                }}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <div
                  style={{
                    height: 320,
                    borderRadius: "10px 10px 0 0",
                    overflow: "hidden"
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={product.images?.[0] || "/placeholder.jpg"}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                </div>
                <Card.Body className="p-2">
                  <div style={{ fontWeight: 600, marginBottom: 3, fontSize: 16 }}>
                    {product.name || ""}
                  </div>
                  <div className="text-muted mb-2" style={{ fontSize: 15 }}>
                    ₹{product.price}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
    <div>
      <Footer/>
    </div>
     </>
  );
};

export default ProductListPage;
