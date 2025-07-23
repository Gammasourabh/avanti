const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");

const productController = require("../controllers/productController");
const carouselController = require("../controllers/carouselController");
const processController = require("../controllers/processController");
const Reg = require("../controllers/regControllers");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });


// Product routes
router.post(
  "/products",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "certificate", maxCount: 1 }
  ]),
  productController.createProduct
);
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);
router.get('/pro', productController.getProductsByCategory);
router.get('/products/category', productController.getProductsByCategory);



// 🧍‍♂️ Auth
router.post("/register", Reg.Registration);
router.post("/login", Reg.Login);
router.post("/logout", Reg.Logout);

// 🎠 Carousel
router.get("/carousel", carouselController.getAllCarouselItems);
router.post("/carousel", carouselController.createCarouselItem);
router.put("/carousel/:id", carouselController.updateCarouselItem);
router.delete("/carousel/:id", carouselController.deleteCarouselItem);

// 🧱 Process Steps
router.get("/process", processController.getAllSteps);
router.post("/process", processController.createStep);
router.put("/process/:id", processController.updateStep);
router.delete("/process/:id", processController.deleteStep);

module.exports = router;
