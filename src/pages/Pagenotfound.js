import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Pagenotfound = () => (
  <Layout>
    <Container sx={{ minHeight: "80vh", display: "grid", placeItems: "center", textAlign: "center", pt: 14, pb: 10 }}>
      <Box>
        <Box sx={{ position: "relative", width: 220, height: 160, mx: "auto" }}>
          {[0, 1, 2].map((k) => (
            <Box key={k} sx={{ position: "absolute", bottom: 90, left: 70 + k * 30, width: 14, height: 46, borderRadius: 10, border: "2px solid rgba(218,165,32,.6)", borderColor: "rgba(218,165,32,.6) transparent", animation: `steam 2.4s ${k * 0.4}s ease-in-out infinite` }} />
          ))}
          <Box component="svg" viewBox="0 0 220 90" sx={{ position: "absolute", bottom: 0, left: 0, width: 1 }}>
            <ellipse cx="110" cy="60" rx="100" ry="22" fill="none" stroke="#DAA520" strokeWidth="3" />
            <ellipse cx="110" cy="56" rx="62" ry="11" fill="none" stroke="rgba(218,165,32,.4)" strokeWidth="2" />
          </Box>
        </Box>
        <Typography variant="h1" className="fade-up" sx={{ fontSize: { xs: 90, md: 140 }, lineHeight: 1, color: "primary.main", mt: 2 }}>404</Typography>
        <Typography variant="h4" className="fade-up" style={{ "--d": ".1s" }} sx={{ mt: 1 }}>This plate is empty</Typography>
        <Typography color="text.secondary" className="fade-up" style={{ "--d": ".2s" }} sx={{ mt: 1.5, maxWidth: 420, mx: "auto" }}>
          The page you’re looking for isn’t on the menu. Let’s get you back to something tasty.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" className="fade-up" style={{ "--d": ".3s" }} sx={{ mt: 4 }}>
          <Button component={Link} to="/" variant="contained" size="large">Back home</Button>
          <Button component={Link} to="/menu" variant="outlined" color="inherit" size="large">See the menu</Button>
        </Stack>
      </Box>
    </Container>
  </Layout>
);

export default Pagenotfound;
