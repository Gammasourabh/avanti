// // controllers/categoryController.js

// // Mock categories data (replace with DB code)
// let categories = [
//   { id: '1', name: 'Short Kurta' },
//   { id: '2', name: 'Ethnic' },
//   { id: '3', name: 'Kurta' },
//   { id: '4', name: 'Pants' },
//   { id: '5', name: 'Co-ord set' },
//   { id: '6', name: 'Dresses' },
//   { id: '7', name: 'Accessories (bags and jewellery)' },
// ];

// // Helper to generate simple incremental IDs
// const generateId = () => (categories.length + 1).toString();

// exports.getAllCategories = (req, res) => {
//   res.json({ categories });
// };

// exports.createCategory = (req, res) => {
//   const { name } = req.body;
//   if (!name || !name.trim()) {
//     return res.status(400).json({ message: "Category name is required" });
//   }
//   const newCategory = { id: generateId(), name: name.trim() };
//   categories.push(newCategory);
//   res.status(201).json({ category: newCategory });
// };

// exports.updateCategory = (req, res) => {
//   const id = req.params.id;
//   const { name } = req.body;

//   if (!name || !name.trim()) {
//     return res.status(400).json({ message: "Category name is required" });
//   }

//   const category = categories.find(c => c.id === id);
//   if (!category) return res.status(404).json({ message: "Category not found" });

//   category.name = name.trim();
//   res.json({ category });
// };

// exports.deleteCategory = (req, res) => {
//   const id = req.params.id;
//   const index = categories.findIndex(c => c.id === id);
//   if (index === -1) return res.status(404).json({ message: "Category not found" });

//   categories.splice(index, 1);
//   res.json({ message: "Category deleted successfully" });
// };
const Category = require('../models/HomePageModels/Category');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 }); // Sorted alphabetically
    res.json({ categories });
  } catch (error) {
    console.error("Failed to get categories:", error);
    res.status(500).json({ message: "Server error retrieving categories" });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Category name is required" });
  }
  try {
    // Check for existing category to avoid duplicates
    const exists = await Category.findOne({ name: name.trim() });
    if (exists) {
      return res.status(409).json({ message: "Category already exists" });
    }
    const category = new Category({ name: name.trim() });
    await category.save();
    res.status(201).json({ category });
  } catch (error) {
    console.error("Failed to create category:", error);
    res.status(500).json({ message: "Server error creating category" });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Category name is required" });
  }
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Optional: check if new name conflicts with existing category
    const existing = await Category.findOne({ name: name.trim(), _id: { $ne: id } });
    if (existing) {
      return res.status(409).json({ message: "Another category with this name already exists" });
    }

    category.name = name.trim();
    await category.save();
    res.json({ category });
  } catch (error) {
    console.error("Failed to update category:", error);
    res.status(500).json({ message: "Server error updating category" });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Failed to delete category:", error);
    res.status(500).json({ message: "Server error deleting category" });
  }
};
