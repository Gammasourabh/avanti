import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const adverts = [
  'END OF SEASON <b>SALE</b> IS HERE',
  'FREE SHIPPING ON ORDERS ABOVE <b>₹999</b>',
  'USE CODE <b>WELCOME10</b> FOR 10% OFF ON <b>FIRST PURCHASE</b>',
  'NEW: <b>ETHNIC SUMMER COLLECTION</b> LIVE NOW!',
];
const AD_SCROLL_INTERVAL = 4000;

const highlightStyle = {
  color: '#FFD700', // gold
  fontWeight: 700,
  letterSpacing: '1px',
};

const Advertisements = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeOutTimeout = setTimeout(() => setFade(false), AD_SCROLL_INTERVAL - 1000);
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % adverts.length);
        setFade(true);
      }, 1000);
    }, AD_SCROLL_INTERVAL);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearInterval(interval);
    };
  }, [index]);

  // Render HTML safely for highlighted words
  return (
    <Box
      sx={{
        background: 'repeating-linear-gradient(90deg, #754c29, #a87256 20%, #754c29 40%)',
        color: '#fff',
        textAlign: 'center',
        py: { xs: 1.2, md: 2 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: '11px', sm: '13px', md: '15px' },
          letterSpacing: 2,
          transition: 'opacity 1s cubic-bezier(.45,.06,.6,.92)',
          opacity: fade ? 1 : 0,
          position: 'relative',
          minHeight: { xs: 22, md: 26 },
          fontWeight: 600,
          userSelect: 'none',
          whiteSpace: 'nowrap',
          display: 'inline-block',
          mx: 'auto',
          px: 1.5,
        }}
        component="span"
      >
        <span
          // Dangerously set innerHTML to allow the <b> tags for highlights
          style={{ fontFamily: 'inherit' }}
          dangerouslySetInnerHTML={{
            __html: adverts[index].replace(
              /<b>(.*?)<\/b>/g,
              `<span style="color:${highlightStyle.color};font-weight:700">${'$1'}</span>`
            ),
          }}
        />
      </Typography>
    </Box>
  );
};

export default Advertisements;
