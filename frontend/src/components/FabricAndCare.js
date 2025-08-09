import React from 'react';
import Navbar from '../components/Navbar';
import Advertisements from './Advertisements';
import Footer from '../components/Footer';
import { Container, Row, Col } from 'react-bootstrap';

const FabricAndCare = () => (
  <>
    <Advertisements />
    <Navbar />

    <div style={{ position: 'relative' }}>
      {/* Top Curve SVG Divider */}
      <div className="custom-shape-divider-top-1687544386">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,
            82.39-16.72,168.19-17.73,250.45-.39C823.78,31,
            906.67,72,985.66,92.83c70.05,18.48,
            146.53,26.09,214.34,3V0H0V27.35A600.21,
            600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"></path>
        </svg>
      </div>

      {/* Brand/Landing Section */}
      <section style={{ background: "#fff8f5", position: "relative", zIndex: 2 }}>
        <Container className="text-center pb-4 pt-5">
          <div
            style={{
              maxWidth: 280, margin: "0 auto 16px",
              borderRadius: "999px 999px 120px 120px",
              background: "radial-gradient(circle 80% 110% at 50% 37%, #f7ede4 80%, #fff 100%)",
              boxShadow: "0 8px 64px #ede3ce",
              display: "flex", alignItems: "center",
              justifyContent: "center", overflow: "hidden"
            }}
          >
            <img
              src="/your-figma-persons.png" /* Replace with your Figma export */
              alt="Avanti Brand"
              style={{ width: "94%", height: "94%", objectFit: "contain" }}
            />
          </div>
          <div style={{
            color: "#754c29", fontFamily: "serif", fontWeight: 800,
            fontSize: "2.18rem", marginBottom: 10, letterSpacing: 1,
          }}>
            avanti
          </div>
          <div className="mx-auto mb-2"
            style={{
              maxWidth: 610, color: "#58381c",
              fontFamily: "serif", fontSize: 18, lineHeight: 1.56,
            }}>
            At Avanti, every thread, every weave, and every print carries a piece of Jaipur’s soul—handpicked, thoughtfully designed, and crafted with love.<br /><br />
            This isn’t just fashion; it’s a vision brought to life by our founder, <b>Dikshita</b>, who dreamt of draping the world in the heritage of Jaipur.<br /><br />
            From the very first fabric selection to the final stitch, every Avanti piece passes through her hands, her keen eye ensuring that no detail goes unnoticed.<br /><br />
            She chooses prints that speak, fabrics that embrace, and silhouettes that make you feel at home in your own skin.<br /><br />
            This isn’t mass production—it’s a labor of love, a celebration of Jaipur, and a promise of exclusivity stitched into every garment.
          </div>
        </Container>
      </section>
    </div>

    {/* Blue Fabric Section */}
    <section style={{ background: "#2d4067", color: "#fff" }}>
      <Container className="py-5">
        <Row className="align-items-center">
          <Col xs={12} md={7} className="mb-4 mb-md-0">
            <h3 style={{ fontWeight: 700, fontSize: 22, letterSpacing: 0.6 }}>
              Handpicked, Thoughtfully Chosen Fabrics
            </h3>
            <ul style={{ fontSize: "16px" }}>
              <li><b>Cotton</b>: Breathable, soft, timeless—Jaipur's signature feel</li>
              <li><b>Handwoven Textiles</b>: Nature's texture, crafted by traditions</li>
              <li><b>Remnants & Surplus</b>: Premium, upcycled, less waste</li>
              <li><b>Silk & Linen Blends</b>: Luxe and comfort, seasonless</li>
            </ul>
          </Col>
          <Col xs={12} md={5} className="text-center">
            <img
              src="/fabric-closeup.jpg" /* Swap for your Figma asset */
              alt="Fabric"
              className="img-fluid rounded-4 shadow-lg"
              style={{ maxHeight: 260, width: "98%", objectFit: "cover" }}
            />
          </Col>
        </Row>
      </Container>
      {/* Curve under blue section */}
      <div style={{
        width: "100%", height: 50, background: "#626a1e",
        borderRadius: "0 0 50px 50px / 0 0 100% 100%", marginBottom: -25,
      }} />
    </section>

    {/* Fabric Care: Olive section */}
    <section style={{ background: "#e5dfc8" }}>
      <Container className="py-5">
        <Row className="align-items-center">
          <Col xs={12} md={7}>
            <div className="rounded-4 p-4 bg-white shadow-sm"
              style={{ fontSize: 16, color: "#554618" }}>
              <h4 className="fw-bold mb-3" style={{ color: "#72481d" }}>
                Caring for Your Avanti Pieces
              </h4>
              <ul>
                <li>Hand wash cold with mild detergent</li>
                <li>Gentle machine cycle for sturdy fabrics</li>
                <li>No bleach</li>
                <li>Dry in shade</li>
                <li>Low heat iron/steam</li>
                <li>Store cool, dry—hang or fold</li>
              </ul>
            </div>
          </Col>
          <Col xs={12} md={5} className="d-flex flex-wrap gap-3 justify-content-center align-items-center mt-4 mt-md-0">
            {/* Use real images; placeholders here */}
            <div style={{ background: "#e0d4b0", height: 80, width: "46%", borderRadius: 12 }} />
            <div style={{ background: "#d7cab3", height: 80, width: "46%", borderRadius: 12 }} />
            <div style={{ background: "#efe8d4", height: 90, width: "98%", borderRadius: 12, marginTop: 8 }} />
          </Col>
        </Row>
      </Container>
      {/* Final curve divider to deep pink note */}
      <div style={{
        width: '100%', height: 44, background: '#883f46',
        borderRadius: '0 0 44px 44px / 0 0 100% 100%', marginBottom: -20,
      }} />
    </section>

    {/* Dikshita's Note */}
    <section style={{ background: "#883f46", color: "#fff", padding: "40px 0" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} className="text-center">
            <span style={{
              fontSize: 18, fontStyle: "italic", letterSpacing: 0.3,
            }}>
              <b style={{
                borderBottom: "2px dotted #ffcdbb", paddingBottom: 4
              }}>A Little Love Note from Dikshita</b>
              <br /><br />
              Your Avanti piece isn’t just clothing—it’s a piece of Jaipur, wrapped in love and stitched with stories.
              Treat it gently, wash with care, and wear it often. Let it dance in the sunshine, soak in memories, and age gracefully.
            </span>
          </Col>
        </Row>
      </Container>
    </section>

    <Footer />
  </>
);

export default FabricAndCare;
