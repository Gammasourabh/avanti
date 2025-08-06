const express = require('express');
const multer = require('multer');
const router = express.Router();
const importExportController = require('../controllers/importExportController');

const upload = multer({ dest: 'uploads/' }); // Configure your upload path

// POST route for importing products via CSV file upload
router.post('/products/import', upload.single('file'), importExportController.importProducts);

// GET route to export products as CSV file
router.get('/products/export', importExportController.exportProducts);

module.exports = router;
