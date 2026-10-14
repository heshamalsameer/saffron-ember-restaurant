import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = ({ size = 40, onClick }) => (
  <Box component={Link} to="/" onClick={onClick} aria-label="Saffron & Ember home"
    sx={{ display: "inline-flex", alignItems: "center", gap: 1.3, color: "text.primary", "&:hover .flame": { animationDuration: ".6s" } }}>
    <Box component="svg" viewBox="0 0 64 64" sx={{ width: size, height: size, flex: "none" }}>
      <circle cx="32" cy="32" r="30" fill="none" stroke="#DAA520" strokeWidth="2" />
      <g className="flame">
        <path d="M32 12c3 7 11 12 11 22a11 11 0 0 1-22 0c0-5 3-8 5-11 0 4 2 6 4 7-1-7 0-12 2-18z" fill="#DAA520" />
        <path d="M32 30c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-4 3-5 0 2 1 3 2 3-1-3-1-5 0-7z" fill="#0e0c09" />
      </g>
      <path d="M19 50h26" stroke="#DAA520" strokeWidth="2.5" strokeLinecap="round" />
    </Box>
    <Box sx={{ lineHeight: 1 }}>
      <Box sx={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: size * 0.5, letterSpacing: "-.01em", whiteSpace: "nowrap" }}>
        Saffron <Box component="span" sx={{ color: "primary.main", fontStyle: "italic", fontWeight: 500 }}>&amp;</Box> Ember
      </Box>
      <Box sx={{ fontSize: size * 0.24, letterSpacing: ".32em", textTransform: "uppercase", color: "text.secondary", mt: 0.5 }}>
        Indian kitchen
      </Box>
    </Box>
  </Box>
);

export default Logo;
