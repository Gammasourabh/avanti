import React from "react";
import {  MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import  Navbar from "../components/Navbar"
import Advertisements from "./Advertisements";
import Footer from "../components/Footer"

const FabricAndCare = () => {
  return (
    <>
    <>
     <Advertisements/>
      <Navbar/>
      </>
   
    <MDBContainer className="text-center my-5">
      <MDBRow className="justify-content-center">
        <MDBCol md={8}>
          <img
            src="/finallogo.jpg" 
            alt="Avanti Collection"
            className="img-fluid"
            style={{ maxWidth: "20%", height: "auto" }}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="justify-content-center mt-4">
        <MDBCol md={6}>
          <img
            src="/loho.png"
            alt="Avanti Collection"
            className="img-fluid"
            style={{ maxWidth: "20%", height: "auto" }}
            />
        </MDBCol>
      </MDBRow>

      <MDBRow className="justify-content-center mt-3">
        <MDBCol md={8}>
          <p>
            At Avanti, every thread, every weave, and every print carries a piece of Jaipur’s soul—handpicked, thoughtfully designed, and crafted with love.
          </p>
          <p>
            This isn’t just fashion; it’s a vision brought to life by our founder, <i>Dikshita</i>, who dreamt of draping the world in the heritage of Jaipur.
          </p>
          <p>
            From the very first fabric selection to the final stitch, every Avanti piece passes through her hands, her keen eye ensuring that no detail goes unnoticed.
          </p>
          <p>
            She chooses prints that speak, fabrics that embrace, and silhouettes that make you feel at home in your own skin.
          </p>
          <p>
            This isn’t mass production—it’s a labor of love, a celebration of Jaipur, and a promise of exclusivity stitched into every garment.
          </p>
        </MDBCol>
      </MDBRow>
      <MDBCol md={12}>
      <div className="fabriccare"></div>
    </MDBCol>
    </MDBContainer>
      <Footer/>
     </>
  );
};

export default FabricAndCare;