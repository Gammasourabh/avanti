const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  category: { type: String, required: true }
  // Add more fields as needed
});

module.exports = mongoose.model('Products', ProductsSchema);
// 