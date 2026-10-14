import React, { useState } from "react";
import { Box, Button, Container, Dialog, Grid, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmojiNatureOutlinedIcon from "@mui/icons-material/EmojiNatureOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import { gallery, images, timeline } from "../data/Data";

const values = [
  { icon: EmojiNatureOutlinedIcon, title: "Honest ingredients", text: "Local produce, whole spices and no shortcuts — you can taste the difference." },
  { icon: FavoriteBorderIcon, title: "Cooked with care", text: "Every plate is fired to order and checked at the pass before it reaches you." },
  { icon: GroupsOutlinedIcon, title: "A table for everyone", text: "Vegetarian, gluten-free or spice-shy — tell us and we’ll make it right." },
];

const About = () => {
  const [lb, setLb] = useState(-1);
  const move = (d) => setLb((v) => (v + d + gallery.length) % gallery.length);

  return (
    <Layout>
      <PageHero image={images.FrenchToast} crumb="About" kicker="About us" title="Welcome to" accent="our restaurant"
        text="A neighbourhood kitchen where Indian tradition meets modern comfort food." />

      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={{ xs: 5, md: 10 }} alignItems="center">
            <Grid item xs={12} md={5}>
              <Reveal anim="left">
                <Box sx={{ position: "relative" }}>
                  <Box component="img" src={images.TandooriChicken} alt="Tandoori chicken fresh from the oven" sx={{ width: 1, aspectRatio: "4 / 5", objectFit: "cover", borderRadius: 6 }} />
                  <Box sx={{ position: "absolute", inset: 0, borderRadius: 6, border: "1px solid", borderColor: "primary.main", transform: "translate(18px, 18px)", zIndex: -1 }} />
                </Box>
              </Reveal>
            </Grid>
            <Grid item xs={12} md={7}>
              <SectionTitle align="left" mb={3} kicker="Who we are" title="Small kitchen," accent="big flavour" />
              <Reveal delay={0.1}>
                <Typography color="text.secondary" sx={{ lineHeight: 1.9, fontSize: "1.05rem", mb: 2 }}>
                  Saffron &amp; Ember began as a family dream: to cook the food we grew up with and share it the way it was shared with us — generously, and always fresh.
                  Our grills run on real charcoal, our curries simmer for hours and our breads are slapped into the tandoor the moment you order.
                </Typography>
              </Reveal>
              <Reveal delay={0.2}>
                <Typography color="text.secondary" sx={{ lineHeight: 1.9, fontSize: "1.05rem" }}>
                  Over the years we’ve added an all-day brunch, a few playful twists and a lot more tables, but the heart hasn’t changed.
                  Spices are still toasted and ground every morning, and every guest is still welcomed like family.
                </Typography>
              </Reveal>
              <Reveal delay={0.3}>
                <Box sx={{ mt: 4, pl: 3, borderLeft: "3px solid", borderColor: "primary.main" }}>
                  <Typography sx={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 22, lineHeight: 1.5 }}>
                    “Good food is patient. We give it the time it needs.”
                  </Typography>
                  <Typography color="primary" fontWeight={700} sx={{ mt: 1 }}>— The head chef</Typography>
                </Box>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: "#120f0b", borderBlock: "1px solid", borderColor: "divider" }}>
        <Container>
          <SectionTitle kicker="What we believe" title="Three things we" accent="never compromise" />
          <Grid container spacing={3}>
            {values.map((v, k) => (
              <Grid item xs={12} md={4} key={v.title}>
                <Reveal delay={k * 0.12} style={{ height: "100%" }}>
                  <Box sx={{ height: 1, p: 4, textAlign: "center", borderRadius: 5, border: "1px solid", borderColor: "divider", transition: "all .4s",
                    "&:hover": { borderColor: "primary.main", transform: "translateY(-6px)" }, "&:hover svg": { transform: "scale(1.15) rotate(-6deg)" } }}>
                    <v.icon sx={{ fontSize: 46, color: "primary.main", transition: "transform .4s" }} />
                    <Typography variant="h5" sx={{ mt: 2 }}>{v.title}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 1.2, lineHeight: 1.75 }}>{v.text}</Typography>
                  </Box>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 9, md: 13 } }}>
        <Container maxWidth="md">
          <SectionTitle kicker="Our journey" title="From six tables" accent="to today" />
          <Box sx={{ position: "relative", "&::before": { content: '""', position: "absolute", top: 0, bottom: 0, left: { xs: 15, md: "50%" }, width: "1px", bgcolor: "divider" } }}>
            {timeline.map((t, k) => {
              const right = k % 2 === 1;
              return (
                <Reveal key={t.year} anim={right ? "right" : "left"} style={{ position: "relative", marginBottom: 36 }}>
                  <Box sx={{ position: "absolute", top: 6, left: { xs: 8, md: "calc(50% - 7px)" }, width: 15, height: 15, borderRadius: "50%", bgcolor: "primary.main", boxShadow: "0 0 0 6px rgba(218,165,32,.15)" }} />
                  <Box sx={{ width: { xs: "auto", md: "50%" }, ml: { xs: 6, md: right ? "50%" : 0 }, pl: { md: right ? 6 : 0 }, pr: { md: right ? 0 : 6 }, textAlign: { md: right ? "left" : "right" } }}>
                    <Typography sx={{ fontFamily: "'Fraunces', serif", color: "primary.main", fontSize: 28, fontWeight: 700 }}>{t.year}</Typography>
                    <Typography variant="h6" sx={{ mt: 0.5 }}>{t.title}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.7 }}>{t.text}</Typography>
                  </Box>
                </Reveal>
              );
            })}
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ pb: { xs: 10, md: 14 } }}>
        <Container>
          <SectionTitle kicker="Gallery" title="A taste of" accent="our kitchen" />
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" }, gridAutoRows: { xs: 160, md: 220 } }}>
            {gallery.map((src, k) => (
              <Reveal key={k} anim="zoom" delay={k * 0.07}
                style={{ gridColumn: [0, 4, 5].includes(k) ? "span 2" : undefined, gridRow: k === 0 || k === 2 ? "span 2" : undefined }}>
                <Box component="button" onClick={() => setLb(k)} aria-label={`Open photo ${k + 1}`}
                  sx={{ p: 0, border: 0, width: 1, height: 1, borderRadius: 4, overflow: "hidden", position: "relative", cursor: "zoom-in", display: "block",
                    "&:hover img": { transform: "scale(1.08)" }, "&:hover .ov": { opacity: 1 } }}>
                  <Box component="img" src={src} alt="" loading="lazy" sx={{ width: 1, height: 1, objectFit: "cover", transition: "transform .8s cubic-bezier(.2,.7,.2,1)" }} />
                  <Box className="ov" sx={{ position: "absolute", inset: 0, bgcolor: "rgba(14,12,9,.45)", display: "grid", placeItems: "center", opacity: 0, transition: "opacity .35s", color: "primary.main" }}>
                    <ZoomInIcon sx={{ fontSize: 42 }} />
                  </Box>
                </Box>
              </Reveal>
            ))}
          </Box>
          <Stack alignItems="center" sx={{ mt: 6 }}>
            <Button component={Link} to="/menu" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>Explore the menu</Button>
          </Stack>
        </Container>
      </Box>

      <Dialog open={lb >= 0} onClose={() => setLb(-1)} maxWidth="lg"
        PaperProps={{ sx: { bgcolor: "transparent", boxShadow: "none", overflow: "visible", m: 1 } }}
        slotProps={{ backdrop: { sx: { bgcolor: "rgba(8,7,5,.92)", backdropFilter: "blur(6px)" } } }}>
        {lb >= 0 && (
          <Box sx={{ position: "relative" }}>
            <Box key={lb} component="img" src={gallery[lb]} alt="" className="fade-up" sx={{ maxWidth: "92vw", maxHeight: "84vh", borderRadius: 4, objectFit: "contain" }} />
            <IconButton aria-label="Close" onClick={() => setLb(-1)} sx={{ position: "absolute", top: 10, right: 10, bgcolor: "rgba(14,12,9,.7)" }}><CloseIcon /></IconButton>
            <IconButton aria-label="Previous" onClick={() => move(-1)} sx={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(14,12,9,.7)" }}><ArrowBackIcon /></IconButton>
            <IconButton aria-label="Next" onClick={() => move(1)} sx={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(14,12,9,.7)" }}><ArrowForwardIcon /></IconButton>
          </Box>
        )}
      </Dialog>
    </Layout>
  );
};

export default About;
