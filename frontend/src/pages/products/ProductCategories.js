import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  ListGroup,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Spinner,
  Modal,
  Alert,
} from "react-bootstrap";
import { FiPlus, FiEdit3, FiTrash2, FiX, FiCheck } from "react-icons/fi";

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // For new category
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryParent, setNewCategoryParent] = useState(""); // parent _id or ""

  // For editing categories
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingName, setEditingName] = useState("");

  // For adding subcategory inline
  const [addingSubCatFor, setAddingSubCatFor] = useState(null);
  const [newSubCatName, setNewSubCatName] = useState("");

  // Modal for edit confirmation or errors
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Fetch categories from backend
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/categories");
      // Expecting backend to send categories with possible subcategories nested under a `subcategories` field
      // Example: { categories: [{ _id, name, subcategories: [{ _id, name }] }] }
      setCategories(res.data.categories);
    } catch (e) {
      console.error(e);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add top-level or sub category
  const addCategory = async (parentId = "") => {
    const nameToAdd = parentId ? newSubCatName : newCategoryName;
    if (!nameToAdd.trim()) return;

    try {
      await axios.post("/api/categories", {
        name: nameToAdd.trim(),
        parent: parentId || null, // pass parent for subcategories; backend logic needed to handle parent
      });

      if (parentId) {
        setNewSubCatName("");
        setAddingSubCatFor(null);
      } else {
        setNewCategoryName("");
      }
      setNewCategoryParent("");
      fetchCategories();
    } catch (e) {
      console.error(e);
      alert("Failed to add category");
    }
  };

  // Delete category or subcategory by id
  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`/api/categories/${id}`);
      fetchCategories();
    } catch (e) {
      console.error(e);
      alert("Failed to delete category");
    }
  };

  // Start editing category
  const startEditing = (category) => {
    setEditingCategory(category._id);
    setEditingName(category.name);
  };

  // Save edited category
  const saveEdit = async () => {
    if (!editingName.trim()) return;
    try {
      await axios.put(`/api/categories/${editingCategory}`, {
        name: editingName.trim(),
      });
      setEditingCategory(null);
      setEditingName("");
      fetchCategories();
    } catch (e) {
      console.error(e);
      alert("Failed to update category");
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingCategory(null);
    setEditingName("");
  };

  // Render categories recursively with subcategories
  const renderCategoryItem = (cat) => (
    <ListGroup.Item
      key={cat._id}
      className="d-flex flex-column"
      style={{ borderRadius: 10, marginBottom: 10 }}
    >
      <Row className="align-items-center">
        <Col xs={8} sm={9}>
          {editingCategory === cat._id ? (
            <InputGroup>
              <Form.Control
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                autoFocus
              />
              <Button variant="success" onClick={saveEdit} title="Save">
                <FiCheck />
              </Button>
              <Button variant="outline-secondary" onClick={cancelEdit} title="Cancel">
                <FiX />
              </Button>
            </InputGroup>
          ) : (
            <h5 className="mb-0">{cat.name}</h5>
          )}
        </Col>
        <Col xs={4} sm={3} className="text-end">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => startEditing(cat)}
            className="me-2"
            title="Edit"
          >
            <FiEdit3 />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => deleteCategory(cat._id)}
            title="Delete"
          >
            <FiTrash2 />
          </Button>
        </Col>
      </Row>

      {/* Subcategories List */}
      {cat.subcategories && cat.subcategories.length > 0 && (
        <ListGroup
          as="ul"
          className="mt-2 ms-4"
          style={{
            borderLeft: "2px solid #dee2e6",
            paddingLeft: 15,
            maxWidth: "85%",
          }}
        >
          {cat.subcategories.map((subcat) => renderCategoryItem(subcat))}
        </ListGroup>
      )}

      {/* Add subcategory input */}
      {addingSubCatFor === cat._id ? (
        <InputGroup className="mt-3" style={{ maxWidth: 400 }}>
          <Form.Control
            placeholder="New subcategory name"
            value={newSubCatName}
            onChange={(e) => setNewSubCatName(e.target.value)}
            autoFocus
          />
          <Button variant="success" onClick={() => addCategory(cat._id)} title="Add">
            <FiPlus />
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setAddingSubCatFor(null);
              setNewSubCatName("");
            }}
            title="Cancel"
          >
            <FiX />
          </Button>
        </InputGroup>
      ) : (
        <Button
          variant="link"
          size="sm"
          className="text-primary mt-2"
          onClick={() => setAddingSubCatFor(cat._id)}
        >
          + Add Subcategory
        </Button>
      )}
    </ListGroup.Item>
  );

  return (
    <Container fluid="md" className="py-4" style={{ minHeight: "80vh" }}>
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">Product Categories Management</h3>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Add New Top-Level Category */}
          <Row className="align-items-center mb-4">
            <Col xs={12} sm={8} md={6}>
              <Form.Control
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                disabled={loading}
              />
            </Col>
            <Col xs={12} sm={4} md={3}>
              <Button
                onClick={() => addCategory()}
                disabled={loading || !newCategoryName.trim()}
                className="w-100"
              >
                <FiPlus className="me-2" />
                Add Category
              </Button>
            </Col>
          </Row>

          {/* Categories List */}
          {loading ? (
            <div className="d-flex justify-content-center my-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <ListGroup as="ul" variant="flush">
              {categories && categories.length > 0 ? (
                categories.map((cat) => renderCategoryItem(cat))
              ) : (
                <p className="text-muted text-center">No categories found.</p>
              )}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductCategories;
