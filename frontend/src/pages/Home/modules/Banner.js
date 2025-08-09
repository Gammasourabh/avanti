// src/components/Banner.js
import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

export default function Banner({ src }) {
  return (
    <section>
      <MDBCarousel>
        <MDBCarouselItem itemId={1}>
          <img src={src} className="d-block w-100" alt="banner" />
        </MDBCarouselItem>
      </MDBCarousel>
    </section>
  );
}
