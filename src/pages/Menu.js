import React, { useMemo, useState } from "react";
import { Box, Button, Chip, Container, Dialog, Grid, IconButton, InputBase, MenuItem, Select, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Layout from "../components/Layout/Layout";
import PageHero from "../components/PageHero";
import DishCard from "../components/DishCard";
import { MenuList, categories, images } from "../data/Data";
import { useApp } from "../context/AppContext";

const Menu = () => {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");
  const [preview, setPreview] = useState(null);
  const { add, count, subtotal, setCartOpen } = useApp();

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const out = MenuList.filter(
      (m) => (cat === "All" || m.category === cat) &&
        (!term || `${m.name} ${m.description} ${m.tags.join(" ")}`.toLowerCase().includes(term))
    );
    if (sort === "low") out.sort((a, b) => a.price - b.price);
    if (sort === "high") out.sort((a, b) => b.price - a.price);
    return out;
  }, [cat, q, sort]);

  const countFor = (c) => (c === "All" ? MenuList.length : MenuList.filter((m) => m.category === c).length);

  return (
    <Layout>
      <PageHero image={images.GrainBowl} crumb="Menu" kicker="Our menu" title="Something for" accent="every craving"
        text="From slow mornings to late dinners — pick your favourites and we’ll fire them up fresh." />

      <Container sx={{ pb: { xs: 10, md: 14 } }}>
        <Box sx={{ position: "sticky", top: { xs: 68, md: 70 }, zIndex: 5, py: 2, mb: 4, bgcolor: "rgba(14,12,9,.88)", backdropFilter: "blur(12px)", borderBottom: "1px solid", borderColor: "divider" }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }} justifyContent="space-between">
            <Stack direction="row" spacing={1} sx={{ overflowX: "auto", pb: { xs: 0.5, md: 0 }, "&::-webkit-scrollbar": { display: "none" } }}>
              {categories.map((c) => (
                <Chip key={c} label={`${c} · ${countFor(c)}`} onClick={() => setCat(c)} color={cat === c ? "primary" : "default"}
                  variant={cat === c ? "filled" : "outlined"} sx={{ px: 0.5, height: 38, borderRadius: 99, flex: "none", transition: "all .25s" }} />
              ))}
            </Stack>
            <Stack direction="row" spacing={1.5}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2, height: 42, borderRadius: 99, border: "1px solid", borderColor: "divider", flex: 1, minWidth: { md: 240 }, "&:focus-within": { borderColor: "primary.main" } }}>
                <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
                <InputBase value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes…" inputProps={{ "aria-label": "Search dishes" }} sx={{ flex: 1, fontSize: 15 }} />
                {q && <IconButton size="small" aria-label="Clear search" onClick={() => setQ("")}><CloseIcon fontSize="small" /></IconButton>}
              </Box>
              <Select size="small" value={sort} onChange={(e) => setSort(e.target.value)} inputProps={{ "aria-label": "Sort" }}
                sx={{ borderRadius: 99, height: 42, minWidth: 150, fontSize: 14 }}>
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="low">Price: low → high</MenuItem>
                <MenuItem value="high">Price: high → low</MenuItem>
              </Select>
            </Stack>
          </Stack>
        </Box>

        {list.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10 }} className="fade-up">
            <Typography variant="h4">Nothing matches “{q}”</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>Try another word or browse all dishes.</Typography>
            <Button sx={{ mt: 3 }} variant="outlined" onClick={() => { setQ(""); setCat("All"); }}>Show everything</Button>
          </Box>
        ) : (
          <Grid container spacing={3} key={`${cat}-${sort}`}>
            {list.map((item, k) => (
              <Grid item xs={12} sm={6} lg={4} key={item.id}>
                <Box className="fade-up" style={{ "--d": `${Math.min(k, 8) * 0.06}s` }} sx={{ height: 1 }}>
                  <DishCard item={item} onOpen={() => setPreview(item)} />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Box sx={{ position: "fixed", left: "50%", bottom: 22, zIndex: 20, transform: `translate(-50%, ${count ? 0 : 140}%)`, transition: "transform .5s cubic-bezier(.2,.7,.2,1)" }}>
        <Button variant="contained" size="large" startIcon={<ShoppingBagOutlinedIcon />} onClick={() => setCartOpen(true)}
          sx={{ boxShadow: "0 18px 40px -10px rgba(218,165,32,.55)", px: 4, whiteSpace: "nowrap" }}>
          View order · {count} {count === 1 ? "item" : "items"} · ${subtotal}
        </Button>
      </Box>

      <Dialog open={!!preview} onClose={() => setPreview(null)} maxWidth="md" fullWidth
        PaperProps={{ sx: { borderRadius: 5, overflow: "hidden", border: "1px solid", borderColor: "divider" } }}>
        {preview && (
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box component="img" src={preview.image} alt={preview.name} sx={{ width: 1, height: { xs: 260, md: 1 }, minHeight: { md: 440 }, objectFit: "cover" }} />
            </Grid>
            <Grid item xs={12} md={6} sx={{ p: { xs: 3, md: 5 }, position: "relative", display: "flex", flexDirection: "column" }}>
              <IconButton aria-label="Close" onClick={() => setPreview(null)} sx={{ position: "absolute", top: 12, right: 12 }}><CloseIcon /></IconButton>
              <Typography variant="overline" color="primary">{preview.category}</Typography>
              <Typography variant="h3" sx={{ fontSize: { xs: 30, md: 38 }, mt: 1 }}>{preview.name}</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                {preview.tags.map((t) => <Chip key={t} label={t} size="small" variant="outlined" />)}
              </Stack>
              <Typography color="text.secondary" sx={{ mt: 3, lineHeight: 1.8, flex: 1 }}>{preview.description}</Typography>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4 }}>
                <Typography sx={{ fontFamily: "'Fraunces', serif", fontSize: 38, fontWeight: 700, color: "primary.main" }}>${preview.price}</Typography>
                <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={() => { add(preview.id); setPreview(null); }}>Add to order</Button>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Dialog>
    </Layout>
  );
};

export default Menu;
