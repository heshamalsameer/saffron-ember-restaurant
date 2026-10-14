import React, { useState } from "react";
import { Box, Button, Container, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Layout from "../components/Layout/Layout";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { brand, hours, images } from "../data/Data";
import { useApp } from "../context/AppContext";

const details = [
  { icon: SupportAgentIcon, label: "Support line", value: `${brand.phone} (${brand.phoneNote})`, href: `tel:${brand.phone}` },
  { icon: EmailIcon, label: "Email us", value: brand.email, href: `mailto:${brand.email}` },
  { icon: CallIcon, label: "Call the restaurant", value: brand.mobile, href: `tel:${brand.mobile}` },
];

const empty = { name: "", email: "", topic: "General question", message: "" };

const isOpenNow = () => {
  const d = new Date();
  const h = d.getHours() + d.getMinutes() / 60;
  const day = d.getDay();
  if (day === 0) return h >= 9 && h < 21;
  if (day === 5 || day === 6) return h >= 10 && h < 23.5;
  return h >= 11 && h < 22;
};

const Contact = () => {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const { notify } = useApp();
  const open = isOpenNow();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Please tell us your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "A valid email, please";
    if (form.message.trim().length < 10) err.message = "A few more words (10+ characters)";
    setErrors(err);
    if (Object.keys(err).length) return;
    notify(`Thanks ${form.name.split(" ")[0]}! We’ll reply within 24 hours.`);
    setForm(empty);
  };

  return (
    <Layout>
      <PageHero image={images.Pizza} crumb="Contact" kicker="Get in touch" title="Contact" accent="our restaurant"
        text="Questions, feedback, private events or catering — our team is happy to help." />

      <Container sx={{ pb: { xs: 10, md: 14 } }}>
        <Grid container spacing={3} sx={{ mb: { xs: 6, md: 8 } }}>
          {details.map((d, k) => (
            <Grid item xs={12} md={4} key={d.label}>
              <Reveal delay={k * 0.1} style={{ height: "100%" }}>
                <Box component="a" href={d.href} sx={{ height: 1, display: "flex", gap: 2.5, alignItems: "center", p: 3, borderRadius: 5, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", transition: "all .35s",
                  "&:hover": { borderColor: "primary.main", transform: "translateY(-5px)" }, "&:hover .ic": { bgcolor: "primary.main", color: "primary.contrastText" } }}>
                  <Box className="ic" sx={{ width: 56, height: 56, flex: "none", borderRadius: 3, display: "grid", placeItems: "center", bgcolor: "rgba(218,165,32,.12)", color: "primary.main", transition: "all .35s" }}>
                    <d.icon />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography color="text.secondary" fontSize={13}>{d.label}</Typography>
                    <Typography fontWeight={700} sx={{ wordBreak: "break-word" }}>{d.value}</Typography>
                  </Box>
                </Box>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={12} md={7}>
            <Reveal anim="left">
              <Box component="form" noValidate onSubmit={submit} sx={{ p: { xs: 3, md: 5 }, borderRadius: 6, border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
                <Typography variant="h4" sx={{ fontSize: { xs: 28, md: 34 } }}>Send us a message</Typography>
                <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>We usually answer within a few hours.</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}><TextField label="Your name" value={form.name} onChange={set("name")} error={!!errors.name} helperText={errors.name} /></Grid>
                  <Grid item xs={12} sm={6}><TextField label="Email" type="email" value={form.email} onChange={set("email")} error={!!errors.email} helperText={errors.email} /></Grid>
                  <Grid item xs={12}>
                    <TextField select label="Topic" value={form.topic} onChange={set("topic")}>
                      {["General question", "Feedback", "Private event", "Catering", "Careers"].map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}><TextField label="Message" multiline minRows={5} value={form.message} onChange={set("message")} error={!!errors.message} helperText={errors.message} /></Grid>
                </Grid>
                <Button type="submit" variant="contained" size="large" endIcon={<SendRoundedIcon />} sx={{ mt: 3 }}>Send message</Button>
              </Box>
            </Reveal>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack spacing={3} sx={{ height: 1 }}>
              <Reveal anim="right">
                <Box sx={{ p: 4, borderRadius: 6, border: "1px solid", borderColor: "divider" }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={1.2} alignItems="center"><AccessTimeIcon color="primary" /><Typography variant="h6">Opening hours</Typography></Stack>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: 13, fontWeight: 700, color: open ? "#6fcf97" : "#eb5757" }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "currentColor", boxShadow: "0 0 0 4px rgba(111,207,151,.15)" }} />
                      {open ? "Open now" : "Closed now"}
                    </Box>
                  </Stack>
                  <Stack spacing={1.5} sx={{ mt: 3 }}>
                    {hours.map((h) => (
                      <Stack key={h.day} direction="row" justifyContent="space-between" sx={{ pb: 1.5, borderBottom: "1px dashed", borderColor: "divider" }}>
                        <Typography color="text.secondary">{h.day}</Typography>
                        <Typography fontWeight={700}>{h.time}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Reveal>
              <Reveal anim="right" delay={0.1} style={{ flex: 1 }}>
                <Box sx={{ position: "relative", height: 1, minHeight: 240, borderRadius: 6, overflow: "hidden", border: "1px solid", borderColor: "divider",
                  backgroundColor: "#15120d",
                  backgroundImage: "linear-gradient(rgba(218,165,32,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(218,165,32,.07) 1px, transparent 1px)",
                  backgroundSize: "34px 34px" }}>
                  <Box component="svg" viewBox="0 0 400 260" preserveAspectRatio="none" sx={{ position: "absolute", inset: 0, width: 1, height: 1 }}>
                    <path d="M-10 190 C80 160 140 210 220 150 S340 90 420 110" stroke="rgba(244,238,226,.14)" strokeWidth="14" fill="none" />
                    <path d="M120 -10 C140 80 110 170 160 270" stroke="rgba(244,238,226,.1)" strokeWidth="9" fill="none" />
                    <path d="M-10 60 C120 70 250 40 420 70" stroke="rgba(244,238,226,.08)" strokeWidth="6" fill="none" />
                  </Box>
                  <Box sx={{ position: "absolute", left: "55%", top: "42%", transform: "translate(-50%, -100%)", textAlign: "center" }}>
                    <PlaceOutlinedIcon sx={{ fontSize: 48, color: "primary.main", animation: "float 2.6s ease-in-out infinite", filter: "drop-shadow(0 8px 10px rgba(0,0,0,.5))" }} />
                  </Box>
                  <Box sx={{ position: "absolute", left: 16, right: 16, bottom: 16, p: 2, borderRadius: 3, bgcolor: "rgba(14,12,9,.82)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                    <Box>
                      <Typography fontWeight={700}>{brand.name}</Typography>
                      <Typography color="text.secondary" fontSize={13}>{brand.address}</Typography>
                    </Box>
                    <Button size="small" variant="outlined" href="https://maps.google.com" target="_blank" rel="noreferrer">Directions</Button>
                  </Box>
                </Box>
              </Reveal>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Contact;
