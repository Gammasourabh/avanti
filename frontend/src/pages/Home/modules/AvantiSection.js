import React from "react";

export default function AvantiSection({
  mainImages,
  activeIndex,
  prints
}) {
  return (
    <section className="avanti-section py-5">
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-md-6 text-center mb-5 mb-md-0 animate-fadeIn">
            <h2 className="mb-2 avanti-heading">PEOPLE of Avanti</h2>
            <p className="text-muted">TAG US IN YOUR AVANTI LOOKS</p>
            <div className="main-image-wrapper mt-4 animate-zoomIn">
              <img
                src={mainImages[activeIndex].src}
                alt="Avanti Look"
                className="img-fluid main-image"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 text-center animate-fadeIn delay-1s">
            <h2 className="mb-2 avanti-heading">PRINTS of Avanti</h2>
            <p className="text-muted">CHOOSE THE PRINT YOU LIKE & SEE WHAT WE'VE GOT</p>
            <div className="prints-grid mt-4">
              {prints[activeIndex].map((image, index) => (
                <div key={index} className="print-item animate-zoomIn delay-2s">
                  <img
                    src={image.src}
                    alt={image.text}
                    className="img-fluid rounded print-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Styles for this section can be placed in CSS or as a <style> tag here */}
      <style>{`
        .avanti-heading {
          font-family: 'serif';
          color: #6B3E1D;
        }
        .main-image-wrapper {
          padding: 20px;
          background: url('/path-to-your-frame-background.png') center/cover no-repeat;
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.6s ease-in-out;
        }
        .main-image { border-radius: 10px; width: 100%; height: 100vh; object-fit: cover; }
        .prints-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .print-item img.print-image {
          object-fit: cover;
          height: 250px;
          width: 100%;
          transition: transform 0.3s ease;
        }
        .print-item img.print-image:hover { transform: scale(1.08); }
        @media (max-width: 768px) {
          .main-image-wrapper { padding: 10px; }
          .prints-grid img.print-image { height: 150px; }
          .prints-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
