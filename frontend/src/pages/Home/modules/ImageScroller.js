import React from "react";
import { MDBRipple } from "mdb-react-ui-kit";

export default function ImageScroller({ images, onViewAll }) {
  return (
    <section>
      <div className="scroller-container">
        <div className="scroller-track">
          {images.concat(images).map((src, index) => (
            <MDBRipple rippleTag="a" key={index} className="scroller-item">
              <img
                src={src}
                className="img-fluid rounded"
                alt={`example-${index}`}
              />
            </MDBRipple>
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
