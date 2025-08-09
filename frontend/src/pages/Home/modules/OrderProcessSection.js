import React from "react";

export default function OrderProcessSection({ itemData }) {
  return (
    <>
      <section className="text-center py-5">
        <h1 className="display-5" style={{
          marginTop: "15vh", fontFamily: "fantasy", color: "#000000"
        }}>
          Your order will go through the following process!
        </h1>
      </section>
      <section className="py-5">
        <div className="container">
          {/* Top Row */}
          <div className="row justify-content-center align-items-center mb-5">
            {itemData.slice(0, 3).map((item, index) => (
              <React.Fragment key={item.img}>
                <div className="col-12 col-md-3 d-flex flex-column align-items-center mb-4 icon-container">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="process-icon"
                  />
                  <p className="mt-3 fw-bold">{item.title}</p>
                </div>
                {index !== 2 && (
                  <div className="col-1 d-flex justify-content-center arrow-container">
                    <h2 className="fw-bold arrow">→</h2>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Bottom Row */}
          <div className="row justify-content-center align-items-center flex-row-reverse">
            {itemData.slice(3, 6).map((item, index) => (
              <React.Fragment key={item.img}>
                <div className="col-12 col-md-3 d-flex flex-column align-items-center mb-4 icon-container">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="process-icon"
                  />
                  <p className="mt-3 fw-bold">{item.title}</p>
                </div>
                {index !== 2 && (
                  <div className="col-1 d-flex justify-content-center arrow-container">
                    <h2 className="fw-bold arrow">←</h2>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
