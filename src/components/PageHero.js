import React from "react";
import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PageHero = ({ image, kicker, title, accent, text, crumb }) => (
  <Box sx={{ position: "relative", overflow: "hidden", pt: { xs: 16, md: 20 }, pb: { xs: 8, md: 11 }, isolation: "isolate" }}>
    <Box component="img" src={image} alt="" sx={{ position: "absolute", inset: 0, width: 1, height: 1, objectFit: "cover", zIndex: -2, animation: "kenburns 14s ease-out both" }} />
    <Box sx={{ position: "absolute", inset: 0, zIndex: -1, background: "linear-gradient(180deg, rgba(14,12,9,.75) 0%, rgba(14,12,9,.82) 60%, #0e0c09 100%)" }} />
    <Container>
      <Breadcrumbs className="fade-up" sx={{ mb: 2, color: "text.secondary", fontSize: 14 }}>
        <Link to="/">Home</Link>
        <Typography color="primary" fontSize={14}>{crumb}</Typography>
      </Breadcrumbs>
      <Typography variant="overline" color="primary" className="fade-up" style={{ "--d": ".1s" }}>{kicker}</Typography>
      <Typography variant="h1" sx={{ fontSize: { xs: "2.6rem", md: "4.4rem" }, lineHeight: 1.05, mt: 1 }}>
        <span className="line-mask"><span style={{ "--d": ".15s" }}>{title}</span></span>
        {accent && <span className="line-mask"><Box component="em" style={{ "--d": ".3s" }} sx={{ color: "primary.main", fontWeight: 500 }}>{accent}</Box></span>}
      </Typography>
      {text && (
        <Typography className="fade-up" style={{ "--d": ".45s" }} color="text.secondary" sx={{ mt: 2.5, maxWidth: 560, fontSize: "1.1rem", lineHeight: 1.7 }}>
          {text}
        </Typography>
      )}
    </Container>
  </Box>
);

export default PageHero;
