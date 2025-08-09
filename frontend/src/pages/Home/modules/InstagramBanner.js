import React from "react";

export default function InstagramBanner({ onClick }) {
  return (
    <section style={{ marginTop: "10vh" }}>
      <div className="insta-container">
        <button className="insta-button" onClick={onClick}>
          Follow us on Instagram
          <i className="fab fa-instagram fa-xl" style={{ marginLeft: '10px', color: 'orange' }}></i>
        </button>
      </div>
    </section>
  );
}
