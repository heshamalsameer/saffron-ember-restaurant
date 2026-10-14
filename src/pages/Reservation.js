import React, { useMemo, useState } from "react";
import { Box, Button, Container, Dialog, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import Layout from "../components/Layout/Layout";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { brand, images } from "../data/Data";

const slots = ["12:00", "13:00", "14:00", "18:00", "19:00", "19:30", "20:00", "21:00"];
const occasions = ["None", "Birthday", "Date night", "Business", "Family"];
const takenFor = (date) => {
  const n = date ? new Date(date).getDate() : 0;
  return [slots[n % slots.length], slots[(n * 3) % slots.length]];
};

const pad = (n) => String(n).padStart(2, "0");
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const Choice = ({ active, disabled, children, onClick }) => (
  <Box component="button" type="button" disabled={disabled} onClick={onClick}
    sx={{ px: 2, py: 1.1, borderRadius: 99, border: "1px solid", fontWeight: 700, fontSize: 14, fontFamily: "inherit", cursor: disabled ? "not-allowed" : "pointer", transition: "all .25s",
      borderColor: active ? "primary.main" : "divider", bgcolor: active ? "primary.main" : "transparent",
      color: active ? "primary.contrastText" : disabled ? "rgba(244,238,226,.25)" : "text.primary",
      textDecoration: disabled ? "line-through" : "none",
      "&:hover:not(:disabled)": { borderColor: "primary.main" } }}>
    {children}
  </Box>
);

const Reservation = () => {
  const [date, setDate] = useState(today());
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState("None");
  const [info, setInfo] = useState({ name: "", phone: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const taken = useMemo(() => takenFor(date), [date]);

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!date) err.date = "Pick a date";
    if (!time) err.time = "Pick a time";
    if (!info.name.trim()) err.name = "Your name, please";
    if (!/^[+\d][\d\s-]{6,}$/.test(info.phone.trim())) err.phone = "A valid phone number";
    setErrors(err);
    if (!Object.keys(err).length) setDone(true);
  };

  const reset = () => {
    setDone(false);
    setTime("");
    setInfo({ name: "", phone: "", notes: "" });
    setOccasion("None");
  };

  const niceDate = date ? new Date(`${date}T00:00`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }) : "";

  return (
    <Layout>
      <PageHero image={images.LambChops} crumb="Reservation" kicker="Book a table" title="Reserve your" accent="evening"
        text="Choose a date, time and party size — we’ll have your table ready." />

      <Container sx={{ pb: { xs: 10, md: 14 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={12} md={8}>
            <Reveal>
              <Box component="form" noValidate onSubmit={submit} sx={{ p: { xs: 3, md: 5 }, borderRadius: 6, border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
                <Typography variant="overline" color="primary">Step 1</Typography>
                <Typography variant="h5" sx={{ mb: 2.5 }}>When are you coming?</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <TextField type="date" label="Date" value={date} onChange={(e) => { setDate(e.target.value); setTime(""); }}
                      inputProps={{ min: today() }} InputLabelProps={{ shrink: true }} error={!!errors.date} helperText={errors.date}
                      sx={{ "& input::-webkit-calendar-picker-indicator": { filter: "invert(.8)" } }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, height: 56, borderRadius: 3, border: "1px solid", borderColor: "divider", bgcolor: "rgba(244,238,226,.05)" }}>
                      <Box>
                        <Typography fontSize={12} color="text.secondary">Guests</Typography>
                        <Typography fontWeight={800}>{guests} {guests === 1 ? "person" : "people"}</Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <IconButton size="small" aria-label="Fewer guests" disabled={guests <= 1} onClick={() => setGuests((g) => g - 1)} sx={{ border: "1px solid", borderColor: "divider" }}><RemoveIcon fontSize="small" /></IconButton>
                        <IconButton size="small" aria-label="More guests" disabled={guests >= 12} onClick={() => setGuests((g) => g + 1)} sx={{ border: "1px solid", borderColor: "divider" }}><AddIcon fontSize="small" /></IconButton>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>

                <Typography fontWeight={700} sx={{ mt: 3, mb: 1.5 }}>Available times</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {slots.map((s) => (
                    <Choice key={s} active={time === s} disabled={taken.includes(s)} onClick={() => setTime(s)}>{s}</Choice>
                  ))}
                </Stack>
                {errors.time && <Typography color="error" fontSize={13} sx={{ mt: 1 }}>{errors.time}</Typography>}

                <Typography fontWeight={700} sx={{ mt: 3, mb: 1.5 }}>Special occasion?</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {occasions.map((o) => <Choice key={o} active={occasion === o} onClick={() => setOccasion(o)}>{o}</Choice>)}
                </Stack>

                <Typography variant="overline" color="primary" sx={{ display: "block", mt: 5 }}>Step 2</Typography>
                <Typography variant="h5" sx={{ mb: 2.5 }}>Your details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}><TextField label="Full name" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} error={!!errors.name} helperText={errors.name} /></Grid>
                  <Grid item xs={12} sm={6}><TextField label="Phone" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} error={!!errors.phone} helperText={errors.phone} /></Grid>
                  <Grid item xs={12}><TextField label="Notes (allergies, high chair, window seat…)" multiline minRows={3} value={info.notes} onChange={(e) => setInfo({ ...info, notes: e.target.value })} /></Grid>
                </Grid>
                <Button type="submit" variant="contained" size="large" startIcon={<EventAvailableRoundedIcon />} sx={{ mt: 3 }}>Confirm reservation</Button>
              </Box>
            </Reveal>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ position: { md: "sticky" }, top: 100 }}>
              <Reveal anim="right">
                <Box sx={{ borderRadius: 6, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
                  <Box component="img" src={images.SalmonCurry} alt="" sx={{ width: 1, height: 160, objectFit: "cover" }} />
                  <Box sx={{ p: 3.5 }}>
                    <Typography variant="h5">Your booking</Typography>
                    <Stack spacing={1.6} sx={{ mt: 2.5 }}>
                      {[["Date", niceDate || "—"], ["Time", time || "—"], ["Guests", guests], ["Occasion", occasion]].map(([k, v]) => (
                        <Stack key={k} direction="row" justifyContent="space-between" sx={{ pb: 1.4, borderBottom: "1px dashed", borderColor: "divider" }}>
                          <Typography color="text.secondary">{k}</Typography>
                          <Typography key={String(v)} fontWeight={700} className="fade-up" sx={{ textAlign: "right" }}>{v}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <Typography color="text.secondary" fontSize={13} sx={{ mt: 2.5, lineHeight: 1.7 }}>
                      Parties larger than 12? Call us on <Box component="a" href={`tel:${brand.mobile}`} sx={{ color: "primary.main" }}>{brand.mobile}</Box>.
                      Tables are held for 15 minutes.
                    </Typography>
                  </Box>
                </Box>
              </Reveal>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={done} onClose={reset} PaperProps={{ sx: { borderRadius: 5, p: 4, textAlign: "center", maxWidth: 420, border: "1px solid", borderColor: "divider" } }}>
        <CelebrationOutlinedIcon color="primary" sx={{ fontSize: 70, mx: "auto", animation: "pop .5s ease" }} />
        <Typography variant="h4" sx={{ mt: 1 }}>See you soon, {info.name.split(" ")[0]}!</Typography>
        <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.8 }}>
          Table for <b>{guests}</b> on <b>{niceDate}</b> at <b>{time}</b>.<br />We’ll text a confirmation to {info.phone}.
        </Typography>
        <Button variant="contained" sx={{ mt: 3 }} onClick={reset}>Done</Button>
      </Dialog>
    </Layout>
  );
};

export default Reservation;
