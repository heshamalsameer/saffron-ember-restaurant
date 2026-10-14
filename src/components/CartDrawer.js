import React, { useState } from "react";
import { Box, Button, Dialog, Divider, Drawer, IconButton, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Row = ({ label, value, strong }) => (
  <Stack direction="row" justifyContent="space-between" sx={{ fontSize: strong ? 18 : 15, fontWeight: strong ? 800 : 500, color: strong ? "text.primary" : "text.secondary" }}>
    <span>{label}</span><span>{value}</span>
  </Stack>
);

const CartDrawer = () => {
  const { items, subtotal, setQty, clear, cartOpen, setCartOpen } = useApp();
  const [mode, setMode] = useState("delivery");
  const [done, setDone] = useState(null);
  const navigate = useNavigate();
  const fee = mode === "delivery" && subtotal > 0 && subtotal < 40 ? 3 : 0;
  const total = subtotal + fee;

  const checkout = () => {
    setDone({ total, mode, ref: Math.random().toString(36).slice(2, 7).toUpperCase() });
    clear();
    setCartOpen(false);
  };

  return (
    <>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}
        PaperProps={{ sx: { width: { xs: "100%", sm: 420 }, bgcolor: "background.default", borderLeft: "1px solid", borderColor: "divider" } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 3, pb: 2 }}>
          <Typography variant="h4" fontSize={28}>Your order</Typography>
          <IconButton aria-label="Close order" onClick={() => setCartOpen(false)}><CloseIcon /></IconButton>
        </Stack>
        <Divider />
        {items.length === 0 ? (
          <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ flex: 1, p: 4, textAlign: "center" }}>
            <Box sx={{ width: 96, height: 96, borderRadius: "50%", display: "grid", placeItems: "center", bgcolor: "rgba(218,165,32,.1)", color: "primary.main", animation: "float 3s ease-in-out infinite" }}>
              <ShoppingBagOutlinedIcon sx={{ fontSize: 44 }} />
            </Box>
            <Typography variant="h5">Your bag is empty</Typography>
            <Typography color="text.secondary">Add a few favourites from the menu and they’ll show up here.</Typography>
            <Button variant="contained" onClick={() => { setCartOpen(false); navigate("/menu"); }}>Browse the menu</Button>
          </Stack>
        ) : (
          <>
            <Stack spacing={2} sx={{ flex: 1, overflowY: "auto", p: 3 }}>
              {items.map((i) => (
                <Stack key={i.id} direction="row" spacing={2} alignItems="center" className="fade-up">
                  <Box component="img" src={i.image} alt={i.name} sx={{ width: 72, height: 72, borderRadius: 3, objectFit: "cover", flex: "none" }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography fontWeight={700} noWrap>{i.name}</Typography>
                    <Typography color="primary" fontWeight={700} fontSize={14}>${i.price * i.qty}</Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                      <IconButton size="small" aria-label="Remove one" onClick={() => setQty(i.id, i.qty - 1)} sx={{ border: "1px solid", borderColor: "divider" }}><RemoveIcon sx={{ fontSize: 16 }} /></IconButton>
                      <Typography fontWeight={700} sx={{ minWidth: 18, textAlign: "center" }}>{i.qty}</Typography>
                      <IconButton size="small" aria-label="Add one" onClick={() => setQty(i.id, i.qty + 1)} sx={{ border: "1px solid", borderColor: "divider" }}><AddIcon sx={{ fontSize: 16 }} /></IconButton>
                    </Stack>
                  </Box>
                  <IconButton aria-label={`Remove ${i.name}`} onClick={() => setQty(i.id, 0)} sx={{ color: "text.secondary", "&:hover": { color: "error.main" } }}><DeleteOutlineIcon /></IconButton>
                </Stack>
              ))}
            </Stack>
            <Box sx={{ p: 3, borderTop: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
              <ToggleButtonGroup exclusive fullWidth size="small" value={mode} onChange={(e, v) => v && setMode(v)} sx={{ mb: 2.5, "& .MuiToggleButton-root": { textTransform: "none", fontWeight: 700, borderRadius: 99 } }}>
                <ToggleButton value="delivery">Delivery</ToggleButton>
                <ToggleButton value="pickup">Pick up</ToggleButton>
              </ToggleButtonGroup>
              <Stack spacing={1}>
                <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                <Row label={mode === "delivery" ? "Delivery (free over $40)" : "Pick up"} value={fee ? `$${fee.toFixed(2)}` : "Free"} />
                <Divider sx={{ my: 1 }} />
                <Row strong label="Total" value={`$${total.toFixed(2)}`} />
              </Stack>
              <Button fullWidth size="large" variant="contained" sx={{ mt: 2.5 }} onClick={checkout}>Place order</Button>
            </Box>
          </>
        )}
      </Drawer>

      <Dialog open={!!done} onClose={() => setDone(null)} PaperProps={{ sx: { borderRadius: 5, p: 4, textAlign: "center", maxWidth: 400, border: "1px solid", borderColor: "divider" } }}>
        <CheckCircleRoundedIcon color="primary" sx={{ fontSize: 72, mx: "auto", animation: "pop .5s ease" }} />
        <Typography variant="h4" sx={{ mt: 1 }}>Order placed!</Typography>
        <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.7 }}>
          Order <b>#{done?.ref}</b> · ${done?.total.toFixed(2)}<br />
          {done?.mode === "delivery" ? "Our kitchen is on it — arriving in about 35 minutes." : "Ready for pick up in about 20 minutes."}
        </Typography>
        <Button variant="contained" sx={{ mt: 3 }} onClick={() => setDone(null)}>Great, thanks</Button>
      </Dialog>
    </>
  );
};

export default CartDrawer;
