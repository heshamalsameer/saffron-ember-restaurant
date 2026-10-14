import React from "react";
import { Box, Typography } from "@mui/material";
import Reveal from "./Reveal";

const SectionTitle = ({ kicker, title, accent, text, align = "center", mb = 6 }) => (
  <Box sx={{ textAlign: align, mb, maxWidth: align === "center" ? 680 : "none", mx: align === "center" ? "auto" : 0 }}>
    <Reveal>
      <Typography variant="overline" color="primary" sx={{ display: "inline-flex", alignItems: "center", gap: 1.5,
        "&::before, &::after": { content: '""', width: 26, height: "1px", bgcolor: "primary.main", display: align === "center" ? "block" : "none" },
        "&::before": { display: "block" } }}>
        {kicker}
      </Typography>
    </Reveal>
    <Reveal delay={0.08}>
      <Typography variant="h2" sx={{ fontSize: { xs: "2.1rem", md: "3rem" }, mt: 1, lineHeight: 1.1 }}>
        {title}{" "}
        {accent && <Box component="em" sx={{ color: "primary.main", fontWeight: 500 }}>{accent}</Box>}
      </Typography>
    </Reveal>
    {text && (
      <Reveal delay={0.16}>
        <Typography color="text.secondary" sx={{ mt: 2, fontSize: "1.05rem", lineHeight: 1.75 }}>{text}</Typography>
      </Reveal>
    )}
  </Box>
);

export default SectionTitle;
