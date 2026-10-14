import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Container, Grid, IconButton, Rating, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import DishCard from "../components/DishCard";
import { MenuList, heroSlides, highlights, testimonials, images } from "../data/Data";

const icons = { spa: SpaOutlinedIcon, fire: LocalFireDepartmentOutlinedIcon, delivery: DeliveryDiningOutlinedIcon };

const Hero = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (n) => setI((n + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(() => setI((v) => (v + 1) % heroSlides.length), 6500);
    return () => clearTimeout(t);
  }, [i, paused]);

  const s = heroSlides[i];
  return (
    <Box component="section" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      sx={{ position: "relative", minHeight: { xs: "100svh", md: "100vh" }, display: "flex", alignItems: "center", overflow: "hidden", isolation: "isolate" }}>
      {heroSlides.map((sl, k) => (
        <Box key={k} sx={{ position: "absolute", inset: 0, zIndex: -2, opacity: k === i ? 1 : 0, transition: "opacity 1.4s ease" }}>
          <Box component="img" src={sl.image} alt="" key={k === i ? `on-${i}` : `off-${k}`}
            sx={{ width: 1, height: 1, objectFit: "cover", animation: k === i ? "kenburns 8s ease-out both" : "none" }} />
        </Box>
      ))}
      <Box sx={{ position: "absolute", inset: 0, zIndex: -1, background: "linear-gradient(90deg, rgba(14,12,9,.92) 0%, rgba(14,12,9,.7) 45%, rgba(14,12,9,.25) 100%), linear-gradient(0deg, #0e0c09 0%, transparent 30%)" }} />

      <Container sx={{ pt: { xs: 12, md: 8 }, pb: 12 }}>
        <Box key={i} sx={{ maxWidth: 680 }}>
          <Typography variant="overline" color="primary" className="fade-up" sx={{ display: "flex", alignItems: "center", gap: 1.5, "&::before": { content: '""', width: 34, height: "1px", bgcolor: "primary.main" } }}>
            {s.kicker}
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: "3rem", sm: "4.2rem", md: "5.6rem" }, lineHeight: 1.02, mt: 2 }}>
            <span className="line-mask"><span style={{ "--d": ".1s" }}>{s.title}</span></span>
            <span className="line-mask"><Box component="em" style={{ "--d": ".25s" }} sx={{ color: "primary.main", fontWeight: 500 }}>{s.accent}</Box></span>
          </Typography>
          <Typography className="fade-up" style={{ "--d": ".45s" }} color="text.secondary" sx={{ mt: 3, fontSize: { xs: "1.05rem", md: "1.2rem" }, maxWidth: 520, lineHeight: 1.75 }}>
            The best food in India, now around the corner. Fire-kissed grills, slow-cooked curries and an all-day brunch worth waking up for.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="fade-up" style={{ "--d": ".6s" }} sx={{ mt: 5 }}>
            <Button component={Link} to="/menu" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>Order now</Button>
            <Button component={Link} to="/reservation" variant="outlined" size="large" color="inherit">Book a table</Button>
          </Stack>
        </Box>
      </Container>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ position: "absolute", left: 0, right: 0, bottom: { xs: 28, md: 44 }, px: { xs: 2, sm: 3 }, maxWidth: 1200, mx: "auto" }}>
        <Typography sx={{ fontFamily: "'Fraunces', serif", fontSize: 20 }}>
          <Box component="span" color="primary.main">0{i + 1}</Box>
          <Box component="span" color="text.secondary"> / 0{heroSlides.length}</Box>
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flex: 1, maxWidth: 260 }}>
          {heroSlides.map((_, k) => (
            <Box key={k} component="button" aria-label={`Slide ${k + 1}`} onClick={() => go(k)}
              sx={{ flex: 1, height: 3, border: 0, p: 0, borderRadius: 2, bgcolor: "rgba(244,238,226,.2)", cursor: "pointer", overflow: "hidden", position: "relative" }}>
              {k === i && (
                <Box key={`bar-${i}-${paused}`} sx={{ position: "absolute", inset: 0, bgcolor: "primary.main", transformOrigin: "left", animation: paused ? "none" : "bar 6.5s linear both", transform: paused ? "scaleX(1)" : undefined }} />
              )}
              {k < i && <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(218,165,32,.5)" }} />}
            </Box>
          ))}
        </Stack>
        <Box sx={{ flex: 1 }} />
        <IconButton aria-label="Previous slide" onClick={() => go(i - 1)} sx={{ border: "1px solid", borderColor: "divider" }}><ArrowBackIcon /></IconButton>
        <IconButton aria-label="Next slide" onClick={() => go(i + 1)} sx={{ border: "1px solid", borderColor: "divider" }}><ArrowForwardIcon /></IconButton>
      </Stack>

      <Box className="fade-up" style={{ "--d": ".9s" }} sx={{ position: "absolute", right: { md: "6%", lg: "10%" }, top: "30%", display: { xs: "none", md: "block" } }}>
        <Box sx={{ p: 2.5, borderRadius: 4, bgcolor: "rgba(14,12,9,.6)", backdropFilter: "blur(14px)", border: "1px solid", borderColor: "divider", animation: "float 5s ease-in-out infinite" }}>
          <Stack direction="row" spacing={0.3} color="primary.main">{[0, 1, 2, 3, 4].map((k) => <StarRoundedIcon key={k} fontSize="small" />)}</Stack>
          <Typography sx={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 700, mt: 0.5 }}>4.9</Typography>
          <Typography color="text.secondary" fontSize={13}>from 2,300+ guests</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const words = ["Tandoori", "Masala", "Fresh naan", "Saffron", "Slow curries", "Brunch", "Chai", "Charcoal grill"];
const Marquee = () => (
  <Box sx={{ py: 2.5, borderBlock: "1px solid", borderColor: "divider", overflow: "hidden", bgcolor: "#120f0b" }}>
    <Box sx={{ display: "flex", width: "max-content", animation: "marquee 30s linear infinite" }}>
      {[...words, ...words].map((w, k) => (
        <Typography key={k} sx={{ fontFamily: "'Fraunces', serif", fontSize: { xs: 22, md: 30 }, fontStyle: k % 2 ? "italic" : "normal", color: k % 2 ? "primary.main" : "text.primary", px: 3, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
          "&::after": { content: '"✦"', fontSize: 16, color: "primary.main", fontStyle: "normal" } }}>
          {w}
        </Typography>
      ))}
    </Box>
  </Box>
);

const Counter = ({ end, suffix = "+", label }) => {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1600, 1);
        setV(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end]);
  return (
    <Box ref={ref}>
      <Typography sx={{ fontFamily: "'Fraunces', serif", fontSize: { xs: 36, md: 46 }, fontWeight: 700, color: "primary.main", lineHeight: 1 }}>{v}{suffix}</Typography>
      <Typography color="text.secondary" fontSize={14} sx={{ mt: 0.8 }}>{label}</Typography>
    </Box>
  );
};

const Testimonials = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearTimeout(t);
  }, [i]);
  const t = testimonials[i];
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <SectionTitle kicker="Guest love" title="Words from" accent="our table" mb={5} />
        <Reveal>
          <FormatQuoteRoundedIcon sx={{ fontSize: 70, color: "primary.main", opacity: 0.35 }} />
          <Box key={i} className="fade-up">
            <Typography sx={{ fontFamily: "'Fraunces', serif", fontSize: { xs: 22, md: 32 }, lineHeight: 1.45, fontStyle: "italic", minHeight: { md: 140 } }}>
              “{t.text}”
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
              <Avatar sx={{ bgcolor: "primary.main", color: "primary.contrastText", fontWeight: 800 }}>{t.name[0]}</Avatar>
              <Box sx={{ textAlign: "left" }}>
                <Typography fontWeight={700}>{t.name}</Typography>
                <Typography color="text.secondary" fontSize={13}>{t.role}</Typography>
              </Box>
              <Rating value={t.rating} readOnly size="small" sx={{ pl: 1 }} />
            </Stack>
          </Box>
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 4 }}>
            {testimonials.map((_, k) => (
              <Box key={k} component="button" aria-label={`Review ${k + 1}`} onClick={() => setI(k)}
                sx={{ width: k === i ? 30 : 10, height: 10, borderRadius: 9, border: 0, cursor: "pointer", bgcolor: k === i ? "primary.main" : "rgba(244,238,226,.2)", transition: "all .4s" }} />
            ))}
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
};

const Home = () => {
  const signature = MenuList.filter((m) => m.signature);
  return (
    <Layout>
      <Hero />
      <Marquee />

      <Box component="section" sx={{ py: { xs: 10, md: 13 } }}>
        <Container>
          <Grid container spacing={3}>
            {highlights.map((h, k) => {
              const Icon = icons[h.icon];
              return (
                <Grid item xs={12} md={4} key={h.title}>
                  <Reveal delay={k * 0.12} style={{ height: "100%", "--d": `${k * 0.12}s` }}>
                    <Box sx={{ height: 1, p: 4, borderRadius: 5, border: "1px solid", borderColor: "divider", position: "relative", overflow: "hidden", transition: "all .4s",
                      "&::before": { content: '""', position: "absolute", inset: 0, background: "radial-gradient(400px circle at 0% 0%, rgba(218,165,32,.14), transparent 60%)", opacity: 0, transition: "opacity .4s" },
                      "&:hover": { borderColor: "rgba(218,165,32,.4)", transform: "translateY(-6px)" },
                      "&:hover::before": { opacity: 1 },
                      "&:hover .ic": { bgcolor: "primary.main", color: "primary.contrastText", transform: "rotate(-8deg) scale(1.05)" } }}>
                      <Box className="ic" sx={{ width: 60, height: 60, borderRadius: 3, display: "grid", placeItems: "center", bgcolor: "rgba(218,165,32,.12)", color: "primary.main", transition: "all .4s" }}>
                        <Icon />
                      </Box>
                      <Typography variant="h5" sx={{ mt: 3, fontSize: 24 }}>{h.title}</Typography>
                      <Typography color="text.secondary" sx={{ mt: 1.2, lineHeight: 1.75 }}>{h.text}</Typography>
                    </Box>
                  </Reveal>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: "#120f0b", borderBlock: "1px solid", borderColor: "divider" }}>
        <Container>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "flex-end" }} sx={{ mb: 6 }} spacing={3}>
            <SectionTitle align="left" mb={0} kicker="Signature plates" title="Loved by" accent="everyone" />
            <Reveal>
              <Button component={Link} to="/menu" endIcon={<ArrowForwardIcon />} sx={{ color: "primary.main" }}>See the full menu</Button>
            </Reveal>
          </Stack>
          <Grid container spacing={3}>
            {signature.map((item, k) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Reveal delay={k * 0.1} style={{ height: "100%", "--d": `${k * 0.1}s` }}><DishCard item={item} /></Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 10, md: 14 }, overflow: "hidden" }}>
        <Container>
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Reveal anim="left">
                <Box sx={{ position: "relative", pr: { xs: 4, md: 8 }, pb: { xs: 6, md: 8 } }}>
                  <Box component="img" src={images.LambChops} alt="Spiced lamb chops on a white plate"
                    sx={{ width: 1, aspectRatio: "4 / 5", objectFit: "cover", borderRadius: 6 }} />
                  <Box component="img" src={images.Pancakes} alt="Blueberry pancakes"
                    sx={{ position: "absolute", right: 0, bottom: 0, width: "48%", aspectRatio: "1", objectFit: "cover", borderRadius: 5, border: "8px solid", borderColor: "background.default", animation: "float 6s ease-in-out infinite" }} />
                  <Box sx={{ position: "absolute", top: 24, left: -18, width: 110, height: 110, borderRadius: "50%", bgcolor: "primary.main", color: "primary.contrastText", display: "grid", placeItems: "center", textAlign: "center", boxShadow: "0 20px 40px -12px rgba(218,165,32,.5)" }}>
                    <Box>
                      <Box sx={{ fontFamily: "'Fraunces', serif", fontSize: 34, fontWeight: 700, lineHeight: 1 }}>10</Box>
                      <Box sx={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" }}>years of<br />flavour</Box>
                    </Box>
                  </Box>
                </Box>
              </Reveal>
            </Grid>
            <Grid item xs={12} md={6}>
              <SectionTitle align="left" mb={3} kicker="Our story" title="Recipes passed down," accent="cooked for today" />
              <Reveal delay={0.1}>
                <Typography color="text.secondary" sx={{ lineHeight: 1.85, fontSize: "1.05rem" }}>
                  It started with six tables and a family recipe book. Today we still grind our spices every morning, marinate overnight and fire everything to order —
                  because great food doesn’t take shortcuts.
                </Typography>
              </Reveal>
              <Reveal delay={0.2}>
                <Grid container spacing={3} sx={{ mt: 3, mb: 4 }}>
                  <Grid item xs={4}><Counter end={45} label="Dishes on the menu" /></Grid>
                  <Grid item xs={4}><Counter end={12} label="Chefs in the kitchen" /></Grid>
                  <Grid item xs={4}><Counter end={98} suffix="%" label="Happy guests" /></Grid>
                </Grid>
              </Reveal>
              <Reveal delay={0.3}>
                <Button component={Link} to="/about" variant="outlined" color="inherit" endIcon={<ArrowForwardIcon />}>Read our story</Button>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Testimonials />

      <Box component="section" sx={{ pb: { xs: 10, md: 14 } }}>
        <Container>
          <Reveal anim="zoom">
            <Box sx={{ position: "relative", borderRadius: 7, overflow: "hidden", px: { xs: 3, md: 8 }, py: { xs: 7, md: 10 }, isolation: "isolate", textAlign: { xs: "center", md: "left" } }}>
              <Box component="img" src={images.PrawnMasala} alt="" sx={{ position: "absolute", inset: 0, width: 1, height: 1, objectFit: "cover", zIndex: -2 }} />
              <Box sx={{ position: "absolute", inset: 0, zIndex: -1, background: "linear-gradient(90deg, rgba(14,12,9,.95) 20%, rgba(14,12,9,.55))" }} />
              <Grid container alignItems="center" spacing={4}>
                <Grid item xs={12} md={8}>
                  <Typography variant="overline" color="primary">Reservations</Typography>
                  <Typography variant="h2" sx={{ fontSize: { xs: "2.1rem", md: "3.2rem" }, mt: 1, lineHeight: 1.1 }}>
                    Save your seat at <Box component="em" sx={{ color: "primary.main", fontWeight: 500 }}>the table</Box>
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 480 }}>Birthdays, date nights or a long Sunday brunch — book in under a minute.</Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: { md: "right" } }}>
                  <Button component={Link} to="/reservation" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>Book a table</Button>
                </Grid>
              </Grid>
            </Box>
          </Reveal>
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;
