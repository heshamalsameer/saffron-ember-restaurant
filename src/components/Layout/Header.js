import React, { useEffect, useState } from "react";
import { AppBar, Badge, Box, Button, Container, Divider, Drawer, IconButton, Stack, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CallIcon from "@mui/icons-material/Call";
import { NavLink, Link } from "react-router-dom";
import Logo from "../Logo";
import { useApp } from "../../context/AppContext";
import { brand } from "../../data/Data";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const linkSx = {
  position: "relative", px: 0.5, py: 1, fontWeight: 600, fontSize: 15, color: "text.secondary", transition: "color .25s",
  "&::after": { content: '""', position: "absolute", left: 0, right: 0, bottom: 2, height: 2, borderRadius: 2, bgcolor: "primary.main", transform: "scaleX(0)", transformOrigin: "right", transition: "transform .35s cubic-bezier(.2,.7,.2,1)" },
  "&:hover": { color: "text.primary" },
  "&:hover::after, &.active::after": { transform: "scaleX(1)", transformOrigin: "left" },
  "&.active": { color: "primary.main" },
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, setCartOpen } = useApp();
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!count) return undefined;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <>
      <AppBar elevation={0} sx={{
        bgcolor: scrolled ? "rgba(14,12,9,.78)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(1.4)" : "none",
        borderBottom: "1px solid", borderColor: scrolled ? "divider" : "transparent",
        transition: "all .4s ease",
      }}>
        <Container>
          <Toolbar component="nav" disableGutters sx={{ minHeight: { xs: 68, md: scrolled ? 70 : 88 }, transition: "min-height .4s", gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}><Logo size={38} /></Box>
            <Stack direction="row" spacing={3.5} sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
              {links.map((l) => (
                <Box key={l.to} component={NavLink} to={l.to} end sx={linkSx}>{l.label}</Box>
              ))}
            </Stack>
            <IconButton aria-label="Open your order" onClick={() => setCartOpen(true)} sx={{ border: "1px solid", borderColor: "divider" }}>
              <Badge badgeContent={count} color="primary" className={bump ? "pop" : ""}>
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
            <Button component={Link} to="/reservation" variant="contained" sx={{ display: { xs: "none", sm: "inline-flex" } }}>
              Book a table
            </Button>
            <IconButton aria-label="Open menu" onClick={() => setOpen(true)} sx={{ display: { md: "none" } }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 300, p: 3, bgcolor: "background.default" } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Logo size={34} onClick={() => setOpen(false)} />
          <IconButton aria-label="Close menu" onClick={() => setOpen(false)}><CloseIcon /></IconButton>
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Stack spacing={0.5}>
          {links.map((l, i) => (
            <Box key={l.to} component={NavLink} to={l.to} end onClick={() => setOpen(false)} className="fade-up"
              style={{ "--d": `${0.05 * i + 0.1}s` }}
              sx={{ fontFamily: "'Fraunces', serif", fontSize: 30, py: 1, color: "text.secondary", "&.active": { color: "primary.main" }, "&:hover": { color: "text.primary", pl: 1 }, transition: "all .25s" }}>
              {l.label}
            </Box>
          ))}
        </Stack>
        <Box sx={{ mt: "auto" }}>
          <Button component={Link} to="/reservation" onClick={() => setOpen(false)} variant="contained" fullWidth size="large">Book a table</Button>
          <Button href={`tel:${brand.phone}`} startIcon={<CallIcon />} fullWidth sx={{ mt: 1.5, color: "text.secondary" }}>{brand.phone}</Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
