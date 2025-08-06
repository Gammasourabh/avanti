import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  updateProduct,
} from "../../features/products/productSlice";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  Button,
  Accordion,
  Card,
  Row,
  Col,
  Container,
  Image,
  Badge,
  Alert,
  InputGroup,
  ProgressBar,
  Tooltip,
  OverlayTrigger,
  FloatingLabel,
  Modal,
} from "react-bootstrap";
import {
  FiImage,
  FiSave,
  FiX,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiPackage,
  FiTag,
  FiDollarSign,
  FiPercent,
  FiFileText,
  FiInfo,
} from "react-icons/fi";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    sizes: "",
    category: "",
    stock: "",
    sku: "",
    discount: "",
    discountPrice: "",
    instructions: [""],
    material: "",
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch available categories from the backend
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategories([]); // fallback
      });
  }, []);
  // Load product data in edit mode
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`/api/products/${id}`)
        .then((res) => {
          const data = res.data.data || res.data;

          setForm({
            name: data.name || "",
            price: data.price || "",
            description: data.description || "",
            sizes: data.sizes?.join(", ") || "",
            category: data.category || "",
            stock: data.stock || "",
            sku: data.sku || "",
            discount: data.discount || "",
            discountPrice: data.discountPrice || "",
            instructions:
              data.instructions?.length > 0 ? data.instructions : [""],
            material: data.material || "",
          });

          if (data.images?.length > 0) {
            setExistingImages(data.images);
            const previews = data.images.map((url, index) => ({
              id: `existing-${index}`,
              preview: url,
              fromServer: true,
            }));
            setPreviewImages(previews);
          }
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          toast.error("Failed to load product for editing");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      toast.error("Please select only image files (JPEG, PNG, WebP)");
      return;
    }

    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error("File size should be less than 5MB");
      return;
    }

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    const previews = files.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file),
      fromServer: false,
    }));

    setImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (imageId) => {
    const imageIndex = previewImages.findIndex((img) => img.id === imageId);
    if (imageIndex === -1) return;

    const imageToRemove = previewImages[imageIndex];

    if (imageToRemove.fromServer) {
      const serverImageIndex = existingImages.findIndex(
        (url) => url === imageToRemove.preview
      );
      if (serverImageIndex !== -1) {
        setExistingImages((prev) =>
          prev.filter((_, index) => index !== serverImageIndex)
        );
      }
    } else {
      const newImageIndex = images.findIndex(
        (img) => URL.createObjectURL(img) === imageToRemove.preview
      );
      if (newImageIndex !== -1) {
        setImages((prev) => prev.filter((_, index) => index !== newImageIndex));
      }
      URL.revokeObjectURL(imageToRemove.preview);
    }

    setPreviewImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleInstructionChange = (index, value) => {
    const updated = [...form.instructions];
    updated[index] = value;
    setForm({ ...form, instructions: updated });
  };

  const addInstruction = () => {
    setForm({ ...form, instructions: [...form.instructions, ""] });
  };

  const removeInstruction = (index) => {
    if (form.instructions.length > 1) {
      const updated = form.instructions.filter((_, i) => i !== index);
      setForm({ ...form, instructions: updated });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Auto-calculate discount price
    if (name === "price" || name === "discount") {
      const price =
        name === "price" ? parseFloat(value) || 0 : parseFloat(form.price) || 0;
      const discount =
        name === "discount"
          ? parseFloat(value) || 0
          : parseFloat(form.discount) || 0;

      if (price > 0 && discount > 0) {
        const discountPrice = price - (price * discount) / 100;
        setForm((prev) => ({
          ...prev,
          discountPrice: discountPrice.toFixed(2),
        }));
      }
    }
  };

  const handleDescriptionChange = (content) => {
    setForm((prev) => ({ ...prev, description: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = [
      "name",
      "price",
      "category",
      "description",
      "stock",
      "sku",
    ];
    const missingFields = requiredFields.filter(
      (field) => !form[field]?.toString().trim()
    );

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      setLoading(false);
      return;
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "instructions") {
        value
          .filter((instruction) => instruction.trim())
          .forEach((instruction) => {
            formData.append("instructions", instruction);
          });
      } else if (key === "sizes") {
        const sizesArray =
          typeof value === "string"
            ? value
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s)
            : value;
        sizesArray.forEach((size) => {
          formData.append("sizes", size);
        });
      } else {
        formData.append(key, value);
      }
    });

    images.forEach((image) => {
      formData.append("images", image);
    });

    if (id && existingImages.length > 0) {
      existingImages.forEach((imageUrl) => {
        formData.append("existingImages", imageUrl);
      });
    }

    try {
      if (id) {
        await dispatch(updateProduct({ id, formData })).unwrap();
        toast.success("Product updated successfully!");
        navigate("/admin/all-products");
      } else {
        await dispatch(addProduct(formData)).unwrap();
        toast.success("Product added successfully!");

        setForm({
          name: "",
          price: "",
          description: "",
          sizes: "",
          category: "",
          stock: "",
          sku: "",
          discount: "",
          discountPrice: "",
          instructions: [""],
          material: "",
        });
        setImages([]);
        setPreviewImages([]);
        setExistingImages([]);
      }
    } catch (err) {
      console.error("Submit error:", err);
      const errorMessage = err.message || "Failed to save product";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderTooltip = (text) => <Tooltip>{text}</Tooltip>;

  if (loading && id) {
    return (
      <Container className="py-5 text-center">
        <div className="d-flex flex-column align-items-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="text-muted">Loading product details...</h5>
        </div>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="py-3 py-md-4"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
      }}
    >
      <Row className="justify-content-center">
        <Col xs={12} xl={11} xxl={10}>
          {/* Header Section with Gradient */}
          <Card
            className="shadow-lg border-0 mb-4"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <Card.Body className="text-white">
              <Row className="align-items-center">
                <Col xs={12} md={8}>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <FiEdit3 size={32} />
                    </div>
                    <div>
                      <h2 className="mb-1 fw-bold">
                        {id ? "Edit Product" : "Create New Product"}
                      </h2>
                      <p className="mb-0 opacity-75">
                        {id
                          ? "Update your product details"
                          : "Add a new product to your inventory"}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
                  <Badge
                    bg={id ? "warning" : "success"}
                    className="px-4 py-2 fs-6"
                  >
                    <FiTag className="me-2" />
                    {id ? "Edit Mode" : "Create Mode"}
                  </Badge>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row className="g-4">
              {/* Image Upload Section */}
              <Col xs={12} lg={5}>
                <Card
                  className="shadow-sm border-0 h-100"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Header className="bg-transparent border-0 pt-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <FiImage className="text-primary me-2" size={20} />
                        <h5 className="mb-0 fw-bold">Product Images</h5>
                      </div>
                      <Badge bg="info" className="px-3 py-2">
                        {previewImages.length}/10
                      </Badge>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    {/* Upload Progress */}
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mb-3">
                        <ProgressBar
                          now={uploadProgress}
                          label={`${uploadProgress}%`}
                          className="mb-2"
                          style={{ height: "8px" }}
                        />
                        <small className="text-muted">
                          Uploading images...
                        </small>
                      </div>
                    )}

                    {/* Image Previews Grid */}
                    {previewImages.length > 0 && (
                      <Row className="g-3 mb-4">
                        {previewImages.map((img) => (
                          <Col xs={6} sm={4} lg={6} key={img.id}>
                            <div className="position-relative image-preview-card">
                              <Image
                                src={img.preview}
                                alt="Preview"
                                className="w-100 rounded-3 shadow-sm"
                                style={{
                                  height: "120px",
                                  objectFit: "cover",
                                  cursor: "pointer",
                                  transition: "transform 0.2s",
                                }}
                                onClick={() => setShowPreview(true)}
                                onMouseEnter={(e) => {
                                  e.target.style.transform = "scale(1.05)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.transform = "scale(1)";
                                }}
                              />
                              <div className="position-absolute top-0 end-0 p-2">
                                <OverlayTrigger
                                  placement="top"
                                  overlay={renderTooltip("Remove Image")}
                                >
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    className="rounded-circle p-1 shadow"
                                    style={{ width: "28px", height: "28px" }}
                                    onClick={() => removeImage(img.id)}
                                  >
                                    <FiX size={14} />
                                  </Button>
                                </OverlayTrigger>
                              </div>
                              {img.fromServer && (
                                <Badge
                                  bg="secondary"
                                  className="position-absolute bottom-0 start-0 m-2"
                                >
                                  Saved
                                </Badge>
                              )}
                            </div>
                          </Col>
                        ))}
                      </Row>
                    )}

                    {/* Upload Area */}
                    <div className="text-center">
                      <div
                        className="border border-2 border-dashed rounded-3 p-4 mb-3"
                        style={{
                          borderColor: "#e3f2fd",
                          background:
                            "linear-gradient(45deg, #f8f9ff, #ffffff)",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onClick={() =>
                          document.getElementById("image-upload").click()
                        }
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = "#2196f3";
                          e.target.style.background =
                            "linear-gradient(45deg, #e3f2fd, #f8f9ff)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderColor = "#e3f2fd";
                          e.target.style.background =
                            "linear-gradient(45deg, #f8f9ff, #ffffff)";
                        }}
                      >
                        <FiPlus size={32} className="text-primary mb-2" />
                        <h6 className="text-primary mb-2">
                          {previewImages.length === 0
                            ? "Upload Product Images"
                            : "Add More Images"}
                        </h6>
                        <small className="text-muted">
                          Drag & drop or click to browse
                          <br />
                          Max 10 images, 5MB each
                        </small>
                      </div>

                      <Form.Control
                        id="image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="d-none"
                        onChange={handleImageChange}
                        disabled={previewImages.length >= 10}
                      />

                      <div className="d-flex justify-content-center gap-2 flex-wrap">
                        <Badge bg="light" text="dark" className="px-3 py-2">
                          JPEG
                        </Badge>
                        <Badge bg="light" text="dark" className="px-3 py-2">
                          PNG
                        </Badge>
                        <Badge bg="light" text="dark" className="px-3 py-2">
                          WebP
                        </Badge>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Main Form Section */}
              <Col xs={12} lg={7}>
                {/* Basic Information */}
                <Card
                  className="shadow-sm border-0 mb-4"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Header className="bg-transparent border-0 pt-4">
                    <div className="d-flex align-items-center">
                      <FiFileText className="text-primary me-2" size={20} />
                      <h5 className="mb-0 fw-bold">General Information</h5>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-4">
                      <Col xs={12} md={6}>
                        <FloatingLabel label="Product Name *" className="mb-0">
                          <Form.Control
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            placeholder="Product Name"
                            required
                            style={{ borderRadius: "10px" }}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6}>
                        <FloatingLabel label="Category *" className="mb-0">
                          <Form.Select
                            name="category"
                            value={form.category}
                            onChange={handleInputChange}
                            required
                            style={{ borderRadius: "10px" }}
                          >
                            <option value="" disabled>
                              Select a category
                            </option>
                            {categories.map((cat) => (
                              <option key={cat._id} value={cat.name}>
                                {cat.name}
                              </option>
                            ))}
                          </Form.Select>
                        </FloatingLabel>
                      </Col>

                      {/* Price Section with Icons */}
                      <Col xs={12} sm={6} md={4}>
                        <Form.Label className="fw-semibold text-muted small">
                          <FiDollarSign className="me-1" />
                          Price *
                        </Form.Label>
                        <InputGroup className="mb-0">
                          <InputGroup.Text
                            style={{ borderRadius: "10px 0 0 10px" }}
                          >
                            <FiDollarSign />
                          </InputGroup.Text>
                          <Form.Control
                            type="number"
                            step="0.01"
                            min="0"
                            name="price"
                            value={form.price}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            required
                            style={{ borderRadius: "0 10px 10px 0" }}
                          />
                        </InputGroup>
                      </Col>
                      <Col xs={12} sm={6} md={4}>
                        <Form.Label className="fw-semibold text-muted small">
                          <FiPercent className="me-1" />
                          Discount (%)
                        </Form.Label>
                        <InputGroup className="mb-0">
                          <InputGroup.Text
                            style={{ borderRadius: "10px 0 0 10px" }}
                          >
                            <FiPercent />
                          </InputGroup.Text>
                          <Form.Control
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            name="discount"
                            value={form.discount}
                            onChange={handleInputChange}
                            placeholder="0"
                            style={{ borderRadius: "0 10px 10px 0" }}
                          />
                        </InputGroup>
                      </Col>
                      <Col xs={12} md={4}>
                        <Form.Label className="fw-semibold text-muted small">
                          <FiTag className="me-1" />
                          Final Price
                        </Form.Label>
                        <InputGroup className="mb-0">
                          <InputGroup.Text
                            style={{ borderRadius: "10px 0 0 10px" }}
                          >
                            <FiDollarSign />
                          </InputGroup.Text>
                          <Form.Control
                            type="number"
                            step="0.01"
                            min="0"
                            name="discountPrice"
                            value={form.discountPrice}
                            onChange={handleInputChange}
                            placeholder="Auto-calculated"
                            style={{
                              borderRadius: "0 10px 10px 0",
                              backgroundColor:
                                form.discount > 0 ? "#e8f5e8" : "white",
                            }}
                          />
                        </InputGroup>
                      </Col>

                      {/* TinyMCE Rich Text Editor for Description */}
                      <Col xs={12}>
                        <Form.Label className="fw-semibold text-muted small mb-3">
                          <FiEdit3 className="me-1" />
                          Product Description *
                          <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip(
                              "Use the toolbar to format your text with bold, italic, colors, and more!"
                            )}
                          >
                            <FiInfo
                              className="ms-2 text-info"
                              style={{ cursor: "help" }}
                            />
                          </OverlayTrigger>
                        </Form.Label>
                        <div
                          style={{
                            borderRadius: "15px",
                            overflow: "hidden",
                            border: "1px solid #dee2e6",
                          }}
                        >
                          <Editor
                            apiKey="enxslos9eh7zn5wvakov97f2rbuqv68c9718amhcxvdsb3yj" // Get free API key from TinyMCE
                            value={form.description}
                            onEditorChange={handleDescriptionChange}
                            init={{
                              height: 300,
                              menubar: false,
                              plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount",
                                "emoticons",
                                "template",
                                "codesample",
                              ],
                              toolbar:
                                "undo redo | blocks | bold italic underline strikethrough | " +
                                "alignleft aligncenter alignright alignjustify | " +
                                "bullist numlist outdent indent | removeformat | " +
                                "forecolor backcolor | fontsize fontfamily | " +
                                "link image media | emoticons | help",
                              content_style:
                                "body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; line-height: 1.4; }",
                              branding: false,
                              resize: false,
                              elementpath: false,
                              statusbar: false,
                              content_css: false,
                              skin: "oxide",
                              placeholder:
                                "Write a detailed product description...",
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Enhanced Accordion Sections */}
                <Accordion
                  defaultActiveKey={["0", "1"]}
                  alwaysOpen
                  className="shadow-sm"
                >
                  {/* Stock Management */}
                  <Accordion.Item
                    eventKey="0"
                    style={{ borderRadius: "15px 15px 0 0", border: "none" }}
                  >
                    <Accordion.Header style={{ borderRadius: "15px 15px 0 0" }}>
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                          <FiPackage className="text-primary" size={18} />
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold">Inventory Management</h6>
                          <small className="text-muted">
                            Stock, SKU, and sizing information
                          </small>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="bg-light bg-opacity-50">
                      <Row className="g-4">
                        <Col xs={12} sm={6} md={4}>
                          <FloatingLabel label="SKU Code *" className="mb-0">
                            <Form.Control
                              type="text"
                              name="sku"
                              value={form.sku}
                              onChange={handleInputChange}
                              placeholder="SKU-001"
                              style={{
                                textTransform: "uppercase",
                                borderRadius: "10px",
                                fontFamily: "monospace",
                              }}
                              required
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                          <FloatingLabel
                            label="Stock Quantity *"
                            className="mb-0"
                          >
                            <Form.Control
                              type="number"
                              min="0"
                              name="stock"
                              value={form.stock}
                              onChange={handleInputChange}
                              placeholder="0"
                              required
                              style={{ borderRadius: "10px" }}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xs={12} md={4}>
                          <FloatingLabel
                            label="Available Sizes"
                            className="mb-0"
                          >
                            <Form.Control
                              type="text"
                              name="sizes"
                              value={form.sizes}
                              onChange={handleInputChange}
                              placeholder="S, M, L, XL"
                              style={{ borderRadius: "10px" }}
                            />
                          </FloatingLabel>
                          <Form.Text className="text-muted small mt-1">
                            <FiInfo size={12} className="me-1" />
                            Separate multiple sizes with commas
                          </Form.Text>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Instructions & Material */}
                  <Accordion.Item
                    eventKey="1"
                    style={{ borderRadius: "0 0 15px 15px", border: "none" }}
                  >
                    <Accordion.Header>
                      <div className="d-flex align-items-center">
                        <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                          <FiEdit3 className="text-success" size={18} />
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold">
                            Care Instructions & Materials
                          </h6>
                          <small className="text-muted">
                            Product care guide and material information
                          </small>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="bg-light bg-opacity-50">
                      <Row className="g-4">
                        <Col xs={12}>
                          <Form.Label className="fw-semibold text-muted small mb-3">
                            Care Instructions
                          </Form.Label>
                          {form.instructions.map((instruction, i) => (
                            <div key={i} className="d-flex gap-2 mb-3">
                              <div className="flex-grow-1">
                                <InputGroup>
                                  <InputGroup.Text
                                    style={{ borderRadius: "10px 0 0 10px" }}
                                  >
                                    {i + 1}
                                  </InputGroup.Text>
                                  <Form.Control
                                    type="text"
                                    placeholder={`Care instruction ${i + 1}`}
                                    value={instruction}
                                    onChange={(e) =>
                                      handleInstructionChange(i, e.target.value)
                                    }
                                    style={{
                                      borderRadius: "0 10px 10px 0",
                                      borderLeft: "none",
                                    }}
                                  />
                                </InputGroup>
                              </div>
                              {form.instructions.length > 1 && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={renderTooltip("Remove Instruction")}
                                >
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => removeInstruction(i)}
                                    className="rounded-circle p-2"
                                    style={{ width: "40px", height: "40px" }}
                                  >
                                    <FiTrash2 size={14} />
                                  </Button>
                                </OverlayTrigger>
                              )}
                            </div>
                          ))}
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={addInstruction}
                            className="rounded-pill px-4"
                          >
                            <FiPlus className="me-2" size={14} />
                            Add Instruction
                          </Button>
                        </Col>

                        <Col xs={12}>
                          <FloatingLabel label="Material Used" className="mb-0">
                            <Form.Control
                              type="text"
                              name="material"
                              value={form.material}
                              onChange={handleInputChange}
                              placeholder="e.g., 100% Cotton, Polyester blend"
                              style={{ borderRadius: "10px" }}
                            />
                          </FloatingLabel>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                {/* Action Buttons */}
                <Card
                  className="shadow-sm border-0 mt-4"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={12} md={6}>
                        <div className="d-flex align-items-center text-muted">
                          <FiInfo className="me-2" />
                          <small>All fields marked with * are required</small>
                        </div>
                      </Col>
                      <Col xs={12} md={6}>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3 mt-md-0">
                          <Button
                            variant="outline-secondary"
                            onClick={() => navigate("/admin/all-products")}
                            disabled={loading}
                            className="rounded-pill px-4"
                          >
                            <FiX className="me-2" />
                            Cancel
                          </Button>
                          <Button
                            variant={id ? "warning" : "success"}
                            type="submit"
                            disabled={loading}
                            className="rounded-pill px-4 shadow"
                            style={{
                              background: id
                                ? "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
                                : "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
                              border: "none",
                            }}
                          >
                            {loading ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                />
                                {id ? "Updating..." : "Creating..."}
                              </>
                            ) : (
                              <>
                                <FiSave className="me-2" />
                                {id ? "Update Product" : "Create Product"}
                              </>
                            )}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {/* Image Preview Modal */}
      <Modal
        show={showPreview}
        onHide={() => setShowPreview(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {previewImages.length > 0 && (
            <Image
              src={previewImages[0]?.preview}
              alt="Preview"
              className="img-fluid rounded"
              style={{ maxHeight: "70vh" }}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AddProduct;
