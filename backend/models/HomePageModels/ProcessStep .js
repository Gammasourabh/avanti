const mongoose = require('mongoose');

const processStepSchema = new mongoose.Schema({
  title: String,
  image: String,
  order: Number,
});

module.exports = mongoose.model('ProcessStep', processStepSchema);
