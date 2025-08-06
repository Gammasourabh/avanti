// backend/scripts/seedCategories.js

const mongoose = require('mongoose');
const Category = require('../models/HomePageModels/Category');

const categories = [
  "Short Kurta",
  "Ethnic",
  "Kurta",
  "Pants",
  "Co-ord set",
  "Dresses",
  "Accessories (bags and jewellery)"
];

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/AVANTI_DB';

async function run() {
  await mongoose.connect(uri);

  for (const name of categories) {
    const exists = await Category.findOne({ name });
    if (!exists) {
      await new Category({ name }).save();
      console.log("Added:", name);
    } else {
      console.log("Already exists:", name);
    }
  }

  mongoose.disconnect();
  console.log("Seeding completed!");
}

run().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
