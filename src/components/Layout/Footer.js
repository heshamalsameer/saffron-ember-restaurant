import React, { useState } from "react";
import { Box, Container, Grid, IconButton, InputBase, Stack, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { brand, hours } from "../../data/Data";
import { useApp } from "../../context/AppContext";

const Col = ({ title, children }) => (
  <Box>
    <Typography variant="overline" color="primary" sx={{ display: "block", mb: 2 }}>{title}</Typography>
    <Stack spacing={1.2} sx={{ color: "text.secondary", fontSize: 15, "& a:hover": { color: "primary.main" }, "& a": { transition: "color .2s" } }}>
      {children}
    </Stack>
  </Box>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const { notify } = useApp();
  const subscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return notify("Please enter a valid email", "error");
    notify("You’re on the list — welcome to the table!");
    setEmail("");
    return undefined;
  };

  return (
    <Box component="footer" sx={{ borderTop: "1px solid", borderColor: "divider", bgcolor: "#0a0907", pt: 9, pb: 4, position: "relative", overflow: "hidden" }}>
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Logo size={42} />
            <Typography color="text.secondary" sx={{ mt: 2.5, maxWidth: 320, lineHeight: 1.8 }}>
              Fire-kissed grills, slow-cooked curries and all-day brunch — cooked with spices we grind every morning.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              {[InstagramIcon, TwitterIcon, GitHubIcon, YouTubeIcon].map((Icon, i) => (
                <IconButton key={i} aria-label="social link" sx={{ border: "1px solid", borderColor: "divider", transition: "all .3s",
                  "&:hover": { bgcolor: "primary.main", color: "primary.contrastText", transform: "translateY(-4px)" } }}>
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={6} md={2}>
            <Col title="Explore">
              <Link to="/menu">Menu</Link>
              <Link to="/reservation">Reservations</Link>
              <Link to="/about">Our story</Link>
              <Link to="/contact">Contact</Link>
            </Col>
          </Grid>
          <Grid item xs={6} md={2.5}>
            <Col title="Opening hours">
              {hours.map((h) => (
                <Box key={h.day}><Box component="span" sx={{ color: "text.primary" }}>{h.day}</Box><br />{h.time}</Box>
              ))}
            </Col>
          </Grid>
          <Grid item xs={12} md={3.5}>
            <Col title="Newsletter">
              <Box>Monthly specials and secret menu drops. No spam, ever.</Box>
              <Box component="form" onSubmit={subscribe} sx={{ display: "flex", alignItems: "center", p: 0.6, pl: 2, borderRadius: 99, border: "1px solid", borderColor: "divider", "&:focus-within": { borderColor: "primary.main" } }}>
                <InputBase value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" inputProps={{ "aria-label": "Email address" }} sx={{ flex: 1, fontSize: 15 }} />
                <IconButton type="submit" aria-label="Subscribe" sx={{ bgcolor: "primary.main", color: "primary.contrastText", "&:hover": { bgcolor: "primary.light" } }}>
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box>{brand.address}</Box>
            </Col>
          </Grid>
        </Grid>
        <Box sx={{ mt: 8, pt: 3, borderTop: "1px solid", borderColor: "divider", display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "space-between", color: "text.secondary", fontSize: 14 }}>
          <span>All rights reserved &copy; {new Date().getFullYear()} {brand.name}</span>
          <span>Made with fire &amp; spice</span>
        </Box>
      </Container>
      <Typography aria-hidden sx={{ position: "absolute", bottom: -40, right: -20, fontFamily: "'Fraunces', serif", fontSize: { xs: 120, md: 220 }, fontStyle: "italic",
        color: "transparent", WebkitTextStroke: "1px rgba(218,165,32,.08)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>
        Ember
      </Typography>
    </Box>
  );
};

export default Footer;
