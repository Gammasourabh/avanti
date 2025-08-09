import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { motion } from "framer-motion";

export default function HeroCarousel({ items }) {
    
  return (
    
    <section>
      <MDBCarousel interval={3000}>
        {(items || []).map((item, index) => (
          <MDBCarouselItem itemId={index + 1} key={item._id}>
            <div className="position-relative">
              <img
                src={item.image}
                className="d-block w-100"
                alt={item.title}
                style={{ maxHeight: '90vh', objectFit: 'cover' }}
              />
              <div className="text-overlay text-center">
                <motion.p className="display-1" initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
                  {item.title}
                </motion.p>
                <motion.p className="display-1" initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.3 }}>
                  {item.subtitle}
                </motion.p>
              </div>
            </div>
          </MDBCarouselItem>
        ))}
      </MDBCarousel>
    </section>
  );
}
