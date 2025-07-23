const Carousel = require('../models/HomePageModels/Carousel');

exports.getAllCarouselItems = async (req, res) => {
  try {
    const items = await Carousel.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCarouselItem = async (req, res) => {
  try {
    const newItem = await Carousel.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCarouselItem = async (req, res) => {
  try {
    const updatedItem = await Carousel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCarouselItem = async (req, res) => {
  try {
    await Carousel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Carousel item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
