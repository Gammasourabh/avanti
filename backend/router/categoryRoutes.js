const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET all categories
router.get('/', categoryController.getAllCategories);

// POST create category
router.post('/', categoryController.createCategory);

// PUT update category by id
router.put('/:id', categoryController.updateCategory);

// DELETE category by id
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
