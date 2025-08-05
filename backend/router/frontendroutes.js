const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const productController = require("../controllers/productController");
const carouselController = require("../controllers/carouselController");
const processController = require("../controllers/processController");
const Reg = require("../controllers/regControllers");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// Initialize multer upload for images and other files
const upload = multer({ storage });

// ==================== Product Routes ====================

// Create a new product with multiple images and optional certificate upload
router.post(
  "/products",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "certificate", maxCount: 1 }
  ]),
  productController.createProduct
);

// Get all products
router.get("/products", productController.getAllProducts);

// Get product by ID
router.get("/products/:id", productController.getProductById);

// Update product with optional image upload(s)
router.put(
  "/products/:id",
  upload.fields([
    { name: "images", maxCount: 10 }
  ]),
  productController.updateProduct
);

// Delete product by ID
router.delete("/products/:id", productController.deleteProduct);

// Fetch products by category (query parameter)
router.get("/products/category", productController.getProductsByCategory);

// For category-specific filtering, you could also use a URL param if desired
// e.g., router.get("/products/category/:categoryName", productController.getProductsByCategory);

// ==================== Authentication Routes ====================

// Register user
router.post("/register", Reg.Registration);

// Login user
router.post("/login", Reg.Login);

// Logout user
router.post("/logout", Reg.Logout);

// ==================== Carousel Routes ====================

// Get all carousel items
router.get("/carousel", carouselController.getAllCarouselItems);

// Create new carousel item
router.post("/carousel", carouselController.createCarouselItem);

// Update existing carousel item
router.put("/carousel/:id", carouselController.updateCarouselItem);

// Delete carousel item
router.delete("/carousel/:id", carouselController.deleteCarouselItem);

// ==================== Process Steps Routes ====================

// Get all process steps
router.get("/process", processController.getAllSteps);

// Create a new process step
router.post("/process", processController.createStep);

// Update a process step
router.put("/process/:id", processController.updateStep);

// Delete a process step
router.delete("/process/:id", processController.deleteStep);

module.exports = router;
