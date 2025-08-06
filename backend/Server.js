const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/upload", express.static("public/upload"));

const frontend = require("./router/frontendroutes");
const categoryRoutes = require("./router/categoryRoutes");
const authRoutes = require("./router/authRoutes");
const importExportRoutes = require("./router/importExportRoutes");
app.use("/api", importExportRoutes);
app.use("/api", frontend);
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Error: MongoDB URI is undefined. Check your .env file.");
  process.exit(1);
} else {
  console.log("MongoDB URI:", uri);
}

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    const port = process.env.PORT || 5008;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Connection to MongoDB failed:", error);
  });
