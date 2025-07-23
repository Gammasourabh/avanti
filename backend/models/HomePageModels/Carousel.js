const mongoose = require('mongoose');


const carouselSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Carousel', carouselSchema);
