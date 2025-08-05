const Product = require('../models/HomePageModels/productModel');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch products", 
      error: err.message 
    });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Error getting product", 
      error: err.message 
    });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    console.log("👉 req.body:", req.body);
    console.log("👉 req.files:", req.files);

    const {
      name,
      category,
      price,
      discount,
      discountPrice,
      description,
      sku,
      stock,
      sizes,
      instructions,
      material
    } = req.body;

    // Validate required fields
    if (!name || !category || !price || !sku) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, category, price, and sku are required"
      });
    }

    // Process arrays from form data
    const sizeArray = sizes ? 
      (typeof sizes === "string" ? sizes.split(",").map(s => s.trim()) : sizes) : [];
    
    const instructionArray = instructions ? 
      (Array.isArray(instructions) ? instructions : [instructions]) : [];

    // Handle image uploads
    const imagePaths = (req.files?.images || []).map(file => `/upload/${file.filename}`);

    // Calculate discount price if not provided
    let finalDiscountPrice = discountPrice;
    if (discount && discount > 0 && !discountPrice) {
      finalDiscountPrice = price - (price * discount / 100);
    }

    const newProduct = new Product({
      name,
      category,
      price: Number(price),
      discount: discount ? Number(discount) : 0,
      discountPrice: finalDiscountPrice ? Number(finalDiscountPrice) : null,
      description,
      sku: sku.toUpperCase(), // Ensure SKU is uppercase
      stock: stock ? Number(stock) : 0,
      sizes: sizeArray,
      instructions: instructionArray,
      material,
      images: imagePaths
    });

    const saved = await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: saved
    });
  } catch (err) {
    console.error("Create product error:", err);
    
    // Handle duplicate SKU error
    if (err.code === 11000 && err.keyPattern?.sku) {
      return res.status(400).json({
        success: false,
        message: "SKU already exists. Please use a unique SKU.",
        error: "Duplicate SKU"
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Failed to create product", 
      error: err.message 
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const {
      name,
      category,
      price,
      discount,
      discountPrice,
      description,
      sku,
      stock,
      sizes,
      instructions,
      material
    } = req.body;

    // Build update object with only provided fields
    const updateData = {};
    
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (price !== undefined) updateData.price = Number(price);
    if (discount !== undefined) updateData.discount = Number(discount);
    if (discountPrice !== undefined) updateData.discountPrice = Number(discountPrice);
    if (description !== undefined) updateData.description = description;
    if (sku !== undefined) updateData.sku = sku.toUpperCase();
    if (stock !== undefined) updateData.stock = Number(stock);
    if (material !== undefined) updateData.material = material;
    
    // Handle arrays
    if (sizes !== undefined) {
      updateData.sizes = typeof sizes === 'string' ? sizes.split(',').map(s => s.trim()) : sizes;
    }
    if (instructions !== undefined) {
      updateData.instructions = Array.isArray(instructions) ? instructions : [instructions];
    }

    // Handle new image uploads
    if (req.files?.images) {
      const imagePaths = req.files.images.map(file => `/upload/${file.filename}`);
      updateData.images = imagePaths;
    }

    // Calculate discount price if discount is updated but discountPrice is not provided
    if (updateData.discount && updateData.discount > 0 && !updateData.discountPrice) {
      const currentPrice = updateData.price || (await Product.findById(id)).price;
      updateData.discountPrice = currentPrice - (currentPrice * updateData.discount / 100);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id, 
      updateData, 
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Product updated successfully", 
      data: updatedProduct 
    });
  } catch (error) {
    console.error("Update error:", error);
    
    // Handle duplicate SKU error
    if (error.code === 11000 && error.keyPattern?.sku) {
      return res.status(400).json({
        success: false,
        message: "SKU already exists. Please use a unique SKU.",
        error: "Duplicate SKU"
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Failed to update product",
      error: error.message 
    });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ 
        success: false,
        message: "Category parameter is required" 
      });
    }

    const products = await Product.find({ 
      category: { $regex: new RegExp(category, 'i') } // Case-insensitive search
    });
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products by category",
      error: err.message,
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }
    res.status(200).json({ 
      success: true,
      message: "Product deleted successfully",
      data: deleted
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: error.message 
    });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;
    
    let query = {};
    
    // Text search
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { sku: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Category filter
    if (category) {
      query.category = { $regex: new RegExp(category, 'i') };
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    const products = await Product.find(query);
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message
    });
  }
};

// Get product by SKU
exports.getProductBySku = async (req, res) => {
  try {
    const { sku } = req.params;
    const product = await Product.findOne({ sku: sku.toUpperCase() });
    
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found with this SKU" 
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Error getting product by SKU", 
      error: err.message 
    });
  }
};
