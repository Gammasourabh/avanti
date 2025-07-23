const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    stock: Number,
    sizes: [String],
    images: [String],
    instructions: [String],
    labels: [String],
    material: String,
    discount: Number,
    discountPrice: Number,
    expirationDate: String,
    certificate: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);


