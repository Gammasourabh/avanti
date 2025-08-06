import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import BestSeller from "./components/BestSeller";
import AboutUs from "./components/AboutUs";
import ProductPage from "./pages/products/ProductPage";
import AdminDashboard from "./components/AdminDashboard";
import FabricAndCare from "./components/FabricAndCare";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./components/AdminRoute";
import PublicRoute from "./pages/PublicRoute";
import VerifyEmail from "./pages/VerifyEmail";
import AddProduct from "./pages/products/AddProduct";
import ProductListPage from "./pages/products/ProductListPage";
import AllProducts from "./pages/products/AllProducts";
import BulkProductImportExport from "./pages/products/BulkProductImportExport";
import ProductCategories from "./pages/products/ProductCategories";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/best-sellers" element={<BestSeller />} />
        <Route path="/our-story" element={<AboutUs />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/fabric-care" element={<FabricAndCare />} />
        <Route path="/product-list" element={<ProductListPage />} />

        {/* Authentication routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        {/* Admin Routes: Nested under /admin with AdminDashboard as layout */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          {/* Nested admin child routes */}
          <Route path="add-product" element={<AddProduct />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="all-product" element={<AllProducts />} />
          <Route
            path="bulk-import-export"
            element={<BulkProductImportExport />}
          />
          <Route path="product-categories" element={<ProductCategories />} />
          {/* Add more admin routes here as needed */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
