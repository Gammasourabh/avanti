// src/components/ProductGallery.js
import React from "react";

export default function ProductGallery({
  mainImages,
  activeIndex,
  fade,
  rightSideImages,
  onViewAll,
}) {
  return (
    <section>
      <div className="gallery-wrapper">
        <div className="main-product-image">
          <img
            src={mainImages[activeIndex].src}
            alt="Large Product"
            className={`primary-image ${fade ? "fade-out" : "fade-in"}`}
          />
        </div>
        <div className="secondary-image-grid">
          {rightSideImages[activeIndex].map((item, index) => (
            <div key={index} className={`secondary-image-box stagger-fade-${index + 1}`}>
              <img src={item.src} alt={item.text} className="secondary-image" />
              <span className="image-caption">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="view-all-container">
        <button className="view-all-button" onClick={onViewAll}>
          View All
        </button>
      </div>
    </section>
  );
}
