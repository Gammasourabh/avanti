const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    sizes: [{
      type: String,
      trim: true
    }],
    images: [{
      type: String,
      trim: true
    }],
    instructions: [{
      type: String,
      trim: true
    }],
    material: {
      type: String,
      trim: true
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    discountPrice: {
      type: Number,
      min: 0
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    }
  },
  { timestamps: true }
);

// Create indexes for better query performance
productSchema.index({ sku: 1 });
productSchema.index({ category: 1 });
productSchema.index({ name: 'text', description: 'text' });

// Pre-save middleware to calculate discount price if not provided
productSchema.pre('save', function(next) {
  if (this.discount > 0 && !this.discountPrice) {
    this.discountPrice = this.price - (this.price * this.discount / 100);
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
