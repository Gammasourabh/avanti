// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addProduct } from "../features/products/productSlice";
// import { toast } from "react-hot-toast";

// const AddProduct = () => {
//   const dispatch = useDispatch();
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     description: "",
//     sizes: "",
//     category: "",
//     stock: "",
//     sku: "",
//     discount: "",
//     discountPrice: "",
//     expirationDate: "",
//     instructions: [""],
//     labels: [],
//     material: "",
//   });
//   const [images, setImages] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const previews = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
//     setImages((prev) => [...prev, ...files]);
//     setPreviewImages((prev) => [...prev, ...previews]);
//   };

//   const removeImage = (index) => {
//     const updatedImages = [...images];
//     const updatedPreviews = [...previewImages];
//     updatedImages.splice(index, 1);
//     URL.revokeObjectURL(updatedPreviews[index].preview);
//     updatedPreviews.splice(index, 1);
//     setImages(updatedImages);
//     setPreviewImages(updatedPreviews);
//   };

//   const handleInstructionChange = (index, value) => {
//     const updated = [...form.instructions];
//     updated[index] = value;
//     setForm({ ...form, instructions: updated });
//   };

//   const addInstruction = () => {
//     setForm({ ...form, instructions: [...form.instructions, ""] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (images.length === 0) return toast.error("Upload at least one image");

//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       if (Array.isArray(value)) {
//         value.forEach((v) => formData.append(key, v));
//       } else {
//         formData.append(key, value);
//       }
//     });
//     images.forEach((img) => formData.append("images", img));

//     try {
//       await dispatch(addProduct(formData)).unwrap();
//       toast.success("✅ Product added successfully!");
//       setForm({ name: "", price: "", description: "", sizes: "", category: "", stock: "", sku: "", discount: "", discountPrice: "", expirationDate: "", instructions: [""], labels: [], material: "" });
//       setImages([]);
//       setPreviewImages([]);
//     } catch (err) {
//       toast.error("❌ Failed to add product");
//     }
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4">Add New Product</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="row g-4">
//           <div className="col-md-4">
//             <div className="card p-3">
//               <label className="form-label">Product Images</label>
//               <input type="file" className="form-control" multiple accept="image/*" onChange={handleImageChange} />
//               <div className="d-flex flex-wrap gap-2 mt-3">
//                 {previewImages.map((img, i) => (
//                   <div key={i} className="position-relative">
//                     <img src={img.preview} alt="preview" className="img-thumbnail" style={{ width: 100, height: 100 }} />
//                     <button className="btn btn-danger btn-sm position-absolute top-0 end-0" onClick={() => removeImage(i)}>&times;</button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="col-md-8">
//             <div className="row g-3">
//               <div className="col-md-6">
//                 <input className="form-control" placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
//               </div>
//               <div className="col-md-6">
//                 <input className="form-control" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
//               </div>
//               <div className="col-md-4">
//                 <input type="number" className="form-control" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
//               </div>
//               <div className="col-md-4">
//                 <input type="text" className="form-control" placeholder="Discount %" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
//               </div>
//               <div className="col-md-4">
//                 <input type="number" className="form-control" placeholder="Discount Price" value={form.discountPrice} onChange={(e) => setForm({ ...form, discountPrice: e.target.value })} />
//               </div>
//               <div className="col-md-6">
//                 <input className="form-control" placeholder="Sizes (S,M,L)" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
//               </div>
//               <div className="col-md-6">
//                 <input className="form-control" placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
//               </div>
//               <div className="col-md-6">
//                 <input className="form-control" placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
//               </div>
//               <div className="col-md-6">
//                 <input className="form-control" type="date" value={form.expirationDate} onChange={(e) => setForm({ ...form, expirationDate: e.target.value })} />
//               </div>
//               <div className="col-12">
//                 <textarea className="form-control" rows="3" placeholder="Product Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
//               </div>
//               <div className="col-12">
//                 <label className="form-label">Instructions</label>
//                 {form.instructions.map((ins, i) => (
//                   <input key={i} className="form-control mb-2" placeholder={`Instruction ${i + 1}`} value={ins} onChange={(e) => handleInstructionChange(i, e.target.value)} />
//                 ))}
//                 <button type="button" onClick={addInstruction} className="btn btn-outline-primary btn-sm">+ Add Instruction</button>
//               </div>
//               <div className="col-md-6">
//                 <input className="form-control" placeholder="Material" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} />
//               </div>
//               <div className="col-12 mt-4">
//                 <button className="btn btn-success w-100" type="submit">Save Product</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
//  import React, { useState } from "react";
//  import { useDispatch } from "react-redux";
//  import { addProduct } from "../features/products/productSlice";
//  import { toast } from "react-hot-toast";
// import { Form, Button, Accordion, Card, Row, Col } from 'react-bootstrap';

// const AddProduct = () => {
//   const [productImage, setProductImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const handleImageRemove = () => {
//     setProductImage(null);
//     setPreviewUrl(null);
//   };
//   const dispatch = useDispatch();
//    const [form, setForm] = useState({
//      name: "",
//      price: "",
//     description: "",
//     sizes: "",
//      category: "",
//      stock: "",
//     sku: "",
//      discount: "",
//      discountPrice: "",
//      expirationDate: "",
//     instructions: [""],
//      labels: [],
//      material: "",
//    });
//    const [images, setImages] = useState([]);
//    const [previewImages, setPreviewImages] = useState([]);

//    const handleImageChange = (e) => {
//      const files = Array.from(e.target.files);
//      const previews = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
//      setImages((prev) => [...prev, ...files]);
//      setPreviewImages((prev) => [...prev, ...previews]);
//    };

//    const removeImage = (index) => {
//      const updatedImages = [...images];
//      const updatedPreviews = [...previewImages];
//     updatedImages.splice(index, 1);
//      URL.revokeObjectURL(updatedPreviews[index].preview);
//      updatedPreviews.splice(index, 1);
//      setImages(updatedImages);
//      setPreviewImages(updatedPreviews);
//    };

//    const handleInstructionChange = (index, value) => {
//     const updated = [...form.instructions];
//      updated[index] = value;
//      setForm({ ...form, instructions: updated });
//    };

//    const addInstruction = () => {
//      setForm({ ...form, instructions: [...form.instructions, ""] });
//    };

//  const handleSubmit = async (e) => {
//      e.preventDefault();
//      if (images.length === 0) return toast.error("Upload at least one image");

//      const formData = new FormData();
//      Object.entries(form).forEach(([key, value]) => {
//        if (Array.isArray(value)) {
//          value.forEach((v) => formData.append(key, v));
//       } else {
//          formData.append(key, value);
//        }
//      });
//      images.forEach((img) => formData.append("images", img));

//     try {
//       await dispatch(addProduct(formData)).unwrap();
//       toast.success("✅ Product added successfully!");
//       setForm({ name: "", price: "", description: "", sizes: "", category: "", stock: "", sku: "", discount: "", discountPrice: "", expirationDate: "", instructions: [""], labels: [], material: "" });
//       setImages([]);
//       setPreviewImages([]);
//     } catch (err) {
//        toast.error("❌ Failed to add product");
//      }
//   };

//   return (
//     <div className="container py-5">
//       <h3 className="mb-4">Add New Product</h3>
//       <Row>
//         <Col md={4}>
//           <Card className="mb-3">
//             <Card.Body>
//               <Form.Group controlId="formImage">
//                 <Form.Label>Product Image</Form.Label>
//                 {previewUrl ? (
//                   <div className="mb-2 text-center">
//                     <img
//                       src={previewUrl}
//                       alt="Preview"
//                       style={{ width: '100%', borderRadius: '8px' }}
//                     />
//                     <div className="d-flex justify-content-around mt-2">
//                       <Button size="sm" variant="secondary" onClick={() => document.getElementById('imageInput').click()}>Replace</Button>
//                       <Button size="sm" variant="danger" onClick={handleImageRemove}>Remove</Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <Form.Control type="file" id="imageInput" onChange={handleImageChange} />
//                 )}
//               </Form.Group>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={8}>
//           <Card className="mb-3">
//             <Card.Body>
//               <h5>General Information</h5>
//               <Row>
//                 <Col md={6}>
//                   <Form.Group>
//                     <Form.Label>Product Name</Form.Label>
//                     <Form.Control type="text" placeholder="Enter product name" />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group>
//                     <Form.Label>Product Merk</Form.Label>
//                     <Form.Control type="text" placeholder="e.g. Scarlett Whitening" />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col md={6}>
//                   <Form.Group>
//                     <Form.Label>Product Type</Form.Label>
//                     <Form.Control as="select">
//                       <option>Moisturizer</option>
//                       <option>Shampoo</option>
//                       <option>Soap</option>
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group>
//                     <Form.Label>Expiration Date</Form.Label>
//                     <Form.Control type="date" />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col md={4}>
//                   <Form.Group>
//                     <Form.Label>Price</Form.Label>
//                     <Form.Control type="number" />
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group>
//                     <Form.Label>Discount (%)</Form.Label>
//                     <Form.Control type="number" />
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group>
//                     <Form.Label>Discount Price</Form.Label>
//                     <Form.Control type="number" />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Form.Group>
//                 <Form.Label>Product Description</Form.Label>
//                 <Form.Control as="textarea" rows={3} maxLength={500} />
//               </Form.Group>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* ACCORDION SECTIONS */}
//       <Accordion defaultActiveKey="0" alwaysOpen>
//         <Accordion.Item eventKey="0">
//           <Accordion.Header>Manage Stock</Accordion.Header>
//           <Accordion.Body>
//             <Row>
//               <Col md={4}>
//                 <Form.Group>
//                   <Form.Label>SKU</Form.Label>
//                   <Form.Control type="text" />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group>
//                   <Form.Label>Stock</Form.Label>
//                   <Form.Control type="number" />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group>
//                   <Form.Label>Min. Stock</Form.Label>
//                   <Form.Control type="number" />
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Accordion.Body>
//         </Accordion.Item>

//         <Accordion.Item eventKey="1">
//           <Accordion.Header>Instructions and Material</Accordion.Header>
//           <Accordion.Body>
//             <Form.Group>
//               <Form.Label>Instructions</Form.Label>
//               <Form.Control as="textarea" rows={2} placeholder="1. Cleanse face" />
//             </Form.Group>
//             <Form.Group className="mt-2">
//               <Form.Label>Material Used</Form.Label>
//               <Form.Control type="text" placeholder="E.g. Hyaluronic Acid" />
//             </Form.Group>
//           </Accordion.Body>
//         </Accordion.Item>

//         <Accordion.Item eventKey="2">
//           <Accordion.Header>Label and Certificate</Accordion.Header>
//           <Accordion.Body>
//             <Form.Group>
//               <Form.Label>Label</Form.Label>
//               <Form.Control type="text" placeholder="Enter label" />
//             </Form.Group>
//             <Form.Group className="mt-2">
//               <Form.Label>Upload Certificate</Form.Label>
//               <Form.Control type="file" />
//             </Form.Group>
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>

//       <div className="text-center mt-4">
//         <Button variant="success" type="submit">Save Product</Button>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/products/productSlice";
import { toast } from "react-hot-toast";
import { Form, Button, Accordion, Card, Row, Col } from "react-bootstrap";

const AddProduct = () => {
  const dispatch = useDispatch();

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
    expirationDate: "",
    instructions: [""],
    labels: [],
    material: "",
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // Handle multiple image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previewImages];
    URL.revokeObjectURL(updatedPreviews[index].preview);
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  const handleInstructionChange = (index, value) => {
    const updated = [...form.instructions];
    updated[index] = value;
    setForm({ ...form, instructions: updated });
  };

  const addInstruction = () => {
    setForm({ ...form, instructions: [...form.instructions, ""] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return toast.error("Upload at least one image");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value);
      }
    });
    images.forEach((img) => formData.append("images", img));

    try {
      await dispatch(addProduct(formData)).unwrap();
      toast.success("✅ Product added successfully!");
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
        expirationDate: "",
        instructions: [""],
        labels: [],
        material: "",
      });
      setImages([]);
      setPreviewImages([]);
    } catch (err) {
      toast.error("❌ Failed to add product");
    }
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4">Add New Product</h3>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          {/* Images */}
          <Col md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Form.Group controlId="formImage">
                  <Form.Label>Product Image</Form.Label>

                  <div className="d-flex flex-wrap gap-4">
                    {previewImages.map((img, index) => (
                      <div
                        key={index}
                        className="image-preview-wrapper position-relative"
                        style={{
                          width: "200px",
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={img.preview}
                          alt={`preview-${index}`}
                          className="w-100 h-auto rounded shadow"
                          style={{ display: "block" }}
                        />

                        {/* Buttons on hover */}
                        <div
                          className="overlay-buttons position-absolute top-50 start-50 translate-middle text-center"
                          style={{
                            display: "none",
                            backgroundColor: "rgba(255,255,255,0.95)",
                            padding: "10px",
                            borderRadius: "10px",
                            zIndex: 10,
                          }}
                        >
                          <Button
                            variant="secondary"
                            size="sm"
                            className="me-2"
                            onClick={(e) => {
                              e.preventDefault();
                              document
                                .getElementById(`replace-image-${index}`)
                                .click();
                            }}
                          >
                            Replace
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              removeImage(index);
                            }}
                          >
                            Remove
                          </Button>
                          <Form.Control
                            id={`replace-image-${index}`}
                            type="file"
                            className="d-none"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const updatedImages = [...images];
                                const updatedPreviews = [...previewImages];
                                URL.revokeObjectURL(
                                  updatedPreviews[index].preview
                                );
                                updatedImages[index] = file;
                                updatedPreviews[index] = {
                                  file,
                                  preview: URL.createObjectURL(file),
                                };
                                setImages(updatedImages);
                                setPreviewImages(updatedPreviews);
                              }
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="mt-3"
                    variant="outline-dark"
                    onClick={() =>
                      document.getElementById("add-more-images").click()
                    }
                  >
                    + Add Another Image
                  </Button>
                  <Form.Control
                    id="add-more-images"
                    type="file"
                    multiple
                    className="d-none"
                    onChange={handleImageChange}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Form */}
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <h5>General Information</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Discount (%)</Form.Label>
                      <Form.Control
                        type="number"
                        name="discount"
                        value={form.discount}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Discount Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="discountPrice"
                        value={form.discountPrice}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={3}
                    value={form.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Accordion Sections */}
        <Accordion defaultActiveKey="0" alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Manage Stock</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>SKU</Form.Label>
                    <Form.Control
                      type="text"
                      name="sku"
                      value={form.sku}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Sizes</Form.Label>
                    <Form.Control
                      type="text"
                      name="sizes"
                      value={form.sizes}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Instructions & Material</Accordion.Header>
            <Accordion.Body>
              {form.instructions.map((instruction, i) => (
                <Form.Control
                  key={i}
                  type="text"
                  placeholder={`Instruction ${i + 1}`}
                  value={instruction}
                  onChange={(e) => handleInstructionChange(i, e.target.value)}
                  className="mb-2"
                />
              ))}
              <Button
                variant="outline-primary"
                size="sm"
                onClick={addInstruction}
              >
                + Add Instruction
              </Button>

              <Form.Group className="mt-3">
                <Form.Label>Material Used</Form.Label>
                <Form.Control
                  type="text"
                  name="material"
                  value={form.material}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Label and Certificate</Accordion.Header>
            <Accordion.Body>
              <Form.Group>
                <Form.Label>Labels</Form.Label>
                <Form.Control
                  type="text"
                  name="labels"
                  value={form.labels.join(",")}
                  onChange={(e) =>
                    setForm({ ...form, labels: e.target.value.split(",") })
                  }
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Upload Certificate</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="text-center mt-4">
          <Button variant="success" type="submit">
            Save products
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
