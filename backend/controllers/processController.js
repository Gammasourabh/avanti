const ProcessStep = require("../models/HomePageModels/ProcessStep ");

// Get all steps in order
exports.getAllSteps = async (req, res) => {
  try {
    const steps = await ProcessStep.find().sort({ order: 1 });
    res.json(steps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new step
exports.createStep = async (req, res) => {
  try {
    const newStep = await ProcessStep.create(req.body);
    res.status(201).json(newStep);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update step
exports.updateStep = async (req, res) => {
  try {
    const updated = await ProcessStep.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete step
exports.deleteStep = async (req, res) => {
  try {
    await ProcessStep.findByIdAndDelete(req.params.id);
    res.json({ message: "Step deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
