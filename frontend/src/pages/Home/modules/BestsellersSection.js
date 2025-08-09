import React from "react";

export default function BestsellersSection({ suits, onViewAll }) {
  return (
    <section className="bymaster">
      <h2 style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "15vh",
        fontSize: "40px",
        fontFamily: "fantasy",
        color: "#000000",
      }}>
        Loved by everyone, presented for you
      </h2>
      <p style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontFamily: "serif",
      }}>explore our evergreen bestsellers</p>

      <div className="gallery-container">
        {suits.map((item, index) => (
          <div key={index} className="image-box">
            <img src={item.src} alt="Product" />
            <div className="overlay">
              <span>{item.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="view-all-container">
        <button className="view-all-button" onClick={onViewAll}>
          View All
        </button>
      </div>
    </section>
  );
}
