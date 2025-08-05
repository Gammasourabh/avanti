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
import  AllProducts  from "./pages/products/AllProducts";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/best-sellers" element={<BestSeller />} />
        <Route path="/our-story" element={<AboutUs />} />
        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/fabric-care" element={<FabricAndCare />} />
        <Route path="/product-list" element={<ProductListPage/>}/>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
          <Route path="/admin/add-product/:id" element={<AddProduct />} />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route
          path="/admindashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
         
          {/* You can add more nested admin routes here */}
        </Route>
         <Route path="/admin/addproduct" element={<AddProduct />} />
          <Route path="/admin/allproduct" element={<AllProducts />} />
      </Routes>
    </>
  );
};

export default App;
