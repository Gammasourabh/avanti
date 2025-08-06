// controllers/importExportController.js

const fs = require('fs');
const csv = require('csv-parser');
const { Parser } = require('json2csv');
const Product = require('../models/HomePageModels/Product'); // Import your Mongoose model

// CSV fields for import/export (adjust fields as per your Product schema)
const csvFields = ['_id', 'name', 'price', 'category'];


/**
 * Import products from uploaded CSV file
 */
exports.importProducts = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = req.file.path;
  const importedProducts = [];

  try {
    // ONCE upload detected, parse CSV and insert to DB

    // We need to accumulate rows first because csv-parser is stream-based and async
    const rows = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ',' }))
        .on('data', (row) => {
          const { name, price, category } = row;
          if (name && price && category) {
            rows.push({
              name: name.trim(),
              price: parseFloat(price),
              category: category.trim(),
            });
          }
        })
        .on('end', () => resolve())
        .on('error', (error) => reject(error));
    });

    // Bulk insert products to DB
    const inserted = await Product.insertMany(rows);

    importedProducts.push(...inserted);

    fs.unlinkSync(filePath); // Delete uploaded file

    return res.json({
      message: "Products imported successfully",
      importedCount: inserted.length,
      importedProducts: inserted,
    });

  } catch (error) {
    // Cleanup on error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error('Import error:', error);
    return res.status(500).json({ message: "Error processing CSV file", error: error.message });
  }
};


/**
 * Export all products as CSV file download
 */
exports.exportProducts = async (req, res) => {
  try {
    // Fetch all products from DB
    const products = await Product.find().lean();

    // Use json2csv to convert JSON to CSV string
    const json2csvParser = new Parser({ fields: csvFields });
    const csvData = json2csvParser.parse(products);

    // Set headers to prompt file download in browser
    res.setHeader('Content-disposition', 'attachment; filename=products_export.csv');
    res.set('Content-Type', 'text/csv');
    return res.status(200).send(csvData);

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ message: "Failed to export products", error: error.message });
  }
};
