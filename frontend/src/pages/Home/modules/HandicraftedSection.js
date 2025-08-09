import React from "react";

export default function HandicraftedSection() {
  return (
    <section className="bymaster text-center py-5">
      <h1 className="display-4" style={{ fontFamily: "fantasy", color: "#000000" }}>
        Handicrafted
      </h1>
      <p className="lead" style={{ fontFamily: "serif" }}>
        by master craftspeople
      </p>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-4 col-md-2 d-flex align-items-center justify-content-center mb-4">
            <img src="/sustainable.png" alt="Sustainable" style={{
              width: "35px", height: "35px", objectFit: "contain", marginRight: "5px",
            }} />
            <span className="small">Sustainable</span>
          </div>
          <div className="col-4 col-md-2 d-flex align-items-center justify-content-center mb-4">
            <img src="/Unknown-1.svg" alt="Ethical" style={{
              width: "35px", height: "35px", objectFit: "contain", marginRight: "5px",
            }} />
            <span className="small">Ethical</span>
          </div>
          <div className="col-4 col-md-2 d-flex align-items-center justify-content-center mb-4">
            <img src="/Unknown.png" alt="Responsible" style={{
              width: "35px", height: "35px", objectFit: "contain", marginRight: "5px",
            }} />
            <span className="small">Responsible</span>
          </div>
        </div>
      </div>
    </section>
  );
}
