const Product = require('../models/HomePageModels/productModel');

// GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err });
  }
};

// GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error getting product", error: err });
  }
};


// POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to create product", error: err });
  }
};
// PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err });
  }
};
// DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err });
  }
};

exports.createProduct = async (req, res) => {
  try {
    console.log("👉 req.body:", req.body);
    console.log("👉 req.files:", req.files);

    const {
      name,
      price,
      description,
      category,
      stock,
      sizes,
      instructions = [],
      labels = [],
    } = req.body;

    const sizeArray = typeof sizes === "string" ? sizes.split(",").map((s) => s.trim()) : [];
    const instructionArray = Array.isArray(instructions) ? instructions : [instructions];
    const labelArray = Array.isArray(labels) ? labels : [labels];

    const imagePaths = (req.files?.images || []).map((file) => `/upload/${file.filename}`);
    const certificatePath = req.files?.certificate?.[0]?.filename || null;

    const newProduct = new Product({
      name,
      price: Number(price),
      description,
      category,
      stock: Number(stock),
      sizes: sizeArray,
      images: imagePaths,
      instructions: instructionArray,
      labels: labelArray,
      certificate: certificatePath,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Backend error:", err);
    res.status(500).json({ message: "Failed to create product", error: err.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      stock,
      sizes,
      instructions,
      labels,
      material,
      discount,
      discountPrice,
      expirationDate,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        description,
        category,
        stock,
        sizes: typeof sizes === 'string' ? sizes.split(',') : sizes,
        instructions,
        labels,
        material,
        discount,
        discountPrice,
        expirationDate,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch products by category",
      error: err.message,
    });
  }
};

