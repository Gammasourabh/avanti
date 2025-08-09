import React from "react";
import { MDBRipple } from "mdb-react-ui-kit";

export default function ShopByCategorySection({ Product }) {
  return (
    <section className="bymaster" style={{ marginTop: "10vh" }}>
      <h2 style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "15vh",
        fontSize: "40px",
        fontFamily: "fantasy",
        color: "#000000",
      }}>
        Shop By Category
      </h2>
      <p style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontFamily: "serif",
      }}>Handpicked to add joy to your soul</p>
      <div className="scrolle-container" style={{ marginTop: "5vh" }}>
        <div
          style={{ animation: "none", gap: "68px" }}
          className="scroller-track"
        >
          {Product.map((src, index) => (
            <MDBRipple rippleTag="a" key={index} className="scroller-item">
              <img
                srcSet={`${src.img}?w=180&h=180&fit=crop&auto=format&dpr=2 2x`}
                src={`${src.img}?w=180&h=180&fit=crop&auto=format`}
                alt={src.title}
                loading="lazy"
              />
            </MDBRipple>
          ))}
        </div>
      </div>
    </section>
  );
}
