import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Form,
  Card,
  Container,
  Row,
  Col,
  Badge,
  Alert,
  Spinner,
  Modal,
  InputGroup,
} from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { deleteMultipleProducts } from '../../features/products/productSlice';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { FiPlus, FiTrash2, FiEdit3, FiRefreshCw, FiSearch, FiPackage, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Helper to normalize array
  const extractArray = (data) =>
    Array.isArray(data) ? data :
    Array.isArray(data.data) ? data.data :
    Array.isArray(data.items) ? data.items : [];

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/products");
      const arr = extractArray(res.data);
      setProducts(arr);
      setFilteredProducts(arr);
    } catch (err) {
      setError("Failed to load products.");
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Search & filter
  useEffect(() => {
    let filtered = products;
    if (searchTerm)
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    if (categoryFilter)
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, products]);

  const handleSelectAll = () => {
    if (selected.length === filteredProducts.length) setSelected([]);
    else setSelected(filteredProducts.map((p) => p._id));
  };
  const handleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  const handleEdit = (id) => navigate(`/admin/add-product/${id}`);

  // --- BULK DELETE Robustness ---
  const handleBulkDelete = async () => {
    if (selected.length === 0) return;
    try {
      // IF your backend doesn't support bulk delete,
      // you can fallback to Promise.all deletion here.
      await dispatch(deleteMultipleProducts(selected)); // Your slice must POST/DELETE {ids: selected}
      toast.success(`Deleted ${selected.length} products!`);
      setSelected([]);
      fetchProducts();
    } catch {
      toast.error("Bulk delete failed.");
    }
  };

  // single delete
  const confirmDelete = (p) => { setProductToDelete(p); setShowDeleteModal(true); };
  const executeDelete = () => {
    if (productToDelete) {
      (async () => {
        setShowDeleteModal(false);
        await axios.delete(`/api/products/${productToDelete._id}`);
        toast.success("Product deleted.");
        fetchProducts();
        setSelected(selected.filter((id) => id !== productToDelete._id));
      })();
    }
  };

  // Categories for dropdown
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfLastItem - itemsPerPage, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Format price and badge helpers
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(price);
  const getStockBadge = (stock) =>
    stock === 0 ? <Badge bg="danger">Out</Badge>
      : stock < 10 ? <Badge bg="warning" text="dark">Low</Badge>
      : <Badge bg="success">In</Badge>;

  // ===================== RENDER =====================

  return (
    <Container fluid style={{ background: 'linear-gradient(135deg,#e8eaf6 0%,#fff 80%)', minHeight: '100vh', paddingBottom: 40 }}>
      {/* Gradient Header */}
      <Row className="justify-content-center pt-4 pt-md-5 mb-2">
        <Col xs={12} md={10} lg={9}>
          <Card className="border-0 shadow-lg mb-4"
            style={{ background: "linear-gradient(95deg,#673ab7 0%, #2196f3 120%)", color: "white", borderRadius: 16 }}>
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={12} md={7} className="mb-2 mb-md-0">
                  <div className="d-flex align-items-center">
                    <FiPackage className="me-3" size={36} />
                    <div>
                      <h2 className="fw-bold mb-1" style={{ letterSpacing: -1 }}>All Products</h2>
                      <span className="fs-6 opacity-75">{products.length} Total</span>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={5} className="text-md-end">
                  <Button
                    variant="light"
                    className="rounded-pill px-4 fw-semibold d-inline-flex align-items-center"
                    style={{ color: "#1976d2" }}
                    onClick={() => navigate("/admin/add-product")}
                  >
                    <FiPlus className="me-2" />Add Product
                  </Button>
                  {selected.length > 0 && (
                    <Button
                      variant="danger"
                      className="rounded-pill px-4 fw-semibold d-inline-flex align-items-center ms-2 mt-2 mt-md-0"
                      onClick={handleBulkDelete}
                    >
                      <FiTrash2 className="me-2" />
                      Delete Selected
                    </Button>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Search/Filter */}
      <Row className="justify-content-center mb-3">
        <Col xs={12} md={10} lg={9}>
          <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 18 }}>
            <Card.Body>
              <Row className="g-3 align-items-end">
                <Col xs={12} sm={7} md={5}>
                  <InputGroup>
                    <InputGroup.Text><FiSearch /></InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search products…"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col xs={12} sm={5} md={3}>
                  <Form.Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => <option key={cat}>{cat}</option>)}
                  </Form.Select>
                </Col>
                <Col xs={12} md={4} className="text-end mt-2 mt-md-0">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={fetchProducts}
                  >
                    <FiRefreshCw className="me-1" />Refresh
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setCategoryFilter("");
                    }}>
                    Reset Filters
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          {/* Errors/Empty */}
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" /><br />
              <span className="fw-semibold mt-3">Loading products…</span>
            </div>
          )}
          {error && (
            <Alert variant="danger">{error}</Alert>
          )}
          {!loading && filteredProducts.length === 0 && (
            <Card className="shadow-sm text-center">
              <Card.Body>
                <h5 className="text-muted my-4">No products found</h5>
                <Button variant="outline-primary" onClick={() => navigate("/admin/add-product")}>
                  <FiPlus className="me-1" />Add Product
                </Button>
              </Card.Body>
            </Card>
          )}
          {/* TABLE ON DESKTOP */}
          {!loading && filteredProducts.length > 0 && (
            <>
              <div className="d-none d-md-block">
                <Card className="shadow-sm">
                  <Card.Body className="p-0">
                    <div className="table-responsive">
                      <Table className="mb-0" hover>
                        <thead className="table-dark">
                          <tr>
                            <th style={{ width: 36 }}>
                              <Form.Check
                                type="checkbox"
                                checked={
                                  selected.length === currentProducts.length &&
                                  currentProducts.length > 0
                                }
                                onChange={handleSelectAll}
                              />
                            </th>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Sizes</th>
                            <th style={{ minWidth: 110 }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentProducts.map((product) => (
                            <tr key={product._id}>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  checked={selected.includes(product._id)}
                                  onChange={() => handleSelect(product._id)}
                                />
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  {product.images?.[0] && (
                                    <img
                                      src={product.images[0]}
                                      alt={product.name}
                                      className="rounded me-2 border"
                                      style={{ width: 38, height: 38, objectFit: "cover", background: "#f0f0f0" }}
                                    />
                                  )}
                                  <div>
                                    <span className="fw-bold">{product.name}</span>
                                    <div className="small text-muted">{(product.description || "").replace(/<[^>]+>/g, '').substring(0, 45)}…</div>
                                  </div>
                                </div>
                              </td>
                              <td><code className="small">{product.sku}</code></td>
                              <td><Badge bg="secondary">{product.category}</Badge></td>
                              <td>{formatPrice(product.price)}{product.discount > 0 ? <span className="ms-1 text-success small">{product.discount}% off</span> : null}</td>
                              <td>{product.stock}{getStockBadge(product.stock)}</td>
                              <td>
                                {Array.isArray(product.sizes) && product.sizes.length > 0 ?
                                  product.sizes.slice(0, 3).map((s, i) => (
                                    <Badge key={i} bg="light" text="dark" className="me-1">{s}</Badge>
                                  )) : <span className="text-muted">N/A</span>}
                                {product.sizes?.length > 3 && <Badge bg="primary">+{product.sizes.length - 3}</Badge>}
                              </td>
                              <td>
                                <Button
                                  size="sm"
                                  variant="outline-primary"
                                  className="me-2"
                                  onClick={() => handleEdit(product._id)}
                                >
                                  <FiEdit3 />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => confirmDelete(product)}
                                >
                                  <FiTrash2 />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              {/* Mobile Cards */}
              <div className="d-md-none d-block">
                {currentProducts.map((product) => (
                  <Card key={product._id} className="mb-2 shadow-sm" style={{ borderRadius: 14 }}>
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col xs={3} className="pe-0 text-center">
                          <Form.Check
                            type="checkbox"
                            checked={selected.includes(product._id)}
                            onChange={() => handleSelect(product._id)}
                          />
                          {product.images?.[0] &&
                            <img src={product.images[0]} alt="img"
                              className="rounded mt-2"
                              style={{ width: 46, height: 46, objectFit: "cover", background: "#fcfcfc" }} />}
                        </Col>
                        <Col xs={9}>
                          <div className="fw-bold">{product.name}</div>
                          <div className="small text-muted">
                            {(product.description || "").replace(/<[^>]+>/g, '').substring(0, 35)}…
                          </div>
                          <div className="my-2">
                            <Badge bg="secondary">{product.category}</Badge>{" "}
                            <span className="text-muted">/</span>{" "}
                            <code className="small">{product.sku}</code>
                          </div>
                          <div>
                            <span className="fw-semibold">{formatPrice(product.price)}</span>
                            {product.discount > 0 && <span className="ms-1 text-success">{product.discount}% off</span>}
                          </div>
                          <div>
                            {getStockBadge(product.stock)} <span className="ms-1 text-muted small">Stock: {product.stock}</span>
                          </div>
                          <div className="my-2">
                            {Array.isArray(product.sizes) && product.sizes.length > 0 &&
                              product.sizes.slice(0, 4).map((s, i) => (
                                <Badge bg="light" text="dark" className="me-1" key={i}>{s}</Badge>
                              ))}
                            {product.sizes?.length > 4 && <Badge bg="info" text="dark">+{product.sizes.length - 4}</Badge>}
                          </div>
                          <div className="d-flex gap-2 mt-1">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="flex-fill"
                              onClick={() => handleEdit(product._id)}
                            >
                              <FiEdit3 /> Edit
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="flex-fill"
                              onClick={() => confirmDelete(product)}
                            >
                              <FiTrash2 /> Delete
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center py-3">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="me-2"
                  >
                    <FiChevronLeft />
                  </Button>
                  <span>Page <span className="fw-bold">{currentPage}</span> / <span className="fw-bold">{totalPages}</span></span>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="ms-2"
                  >
                    <FiChevronRight />
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Bulk Delete Modal */}
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Are you sure you want to delete <strong>{productToDelete?.name}</strong>?
              </p>
              <p className="text-muted small mb-0">This action cannot be undone.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={executeDelete}>
                Delete Product
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default AllProducts;
