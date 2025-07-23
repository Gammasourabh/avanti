import React, { useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <MDBContainer className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Best Sellers</h4>
        <div className="d-flex align-items-center gap-3">
          <select className="form-select form-select-sm w-auto">
            <option value="default">Sort By</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
          <select className="form-select form-select-sm w-auto">
            <option value="all">All Categories</option>
            <option value="co-ord">Co-ords</option>
            <option value="dresses">Dresses</option>
            <option value="tops">Tops</option>
          </select>
        </div>
      </div>

      <MDBRow className="g-4">
        {products.map((product) => (
          <MDBCol
            key={product._id}
            xs="6"
            sm="6"
            md="4"
            lg="3"
            onClick={() => navigate(`/product/${product._id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="text-center card-hover">
              <img
                src={product.images[0]}
                alt={product.name}
                className="img-fluid rounded"
                style={{
                  objectFit: "cover",
                  height: "340px",
                  width: "100%",
                  transition: "transform 0.4s ease",
                }}
              />
              <h6 className="mt-2 mb-0" style={{ fontSize: "15px" }}>
                {product.name}
              </h6>
              <p className="text-muted" style={{ fontSize: "14px" }}>
                Rs. {product.price}
              </p>
            </div>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default ProductListPage;
