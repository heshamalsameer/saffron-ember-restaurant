import React from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useApp } from "../context/AppContext";

const DishCard = ({ item, onOpen }) => {
  const { cart, add, setQty } = useApp();
  const qty = cart[item.id] || 0;
  return (
    <Box sx={{
      height: 1, display: "flex", flexDirection: "column", borderRadius: 4, overflow: "hidden", bgcolor: "background.paper",
      border: "1px solid", borderColor: "divider", transition: "transform .45s cubic-bezier(.2,.7,.2,1), border-color .3s, box-shadow .45s",
      "&:hover": { transform: "translateY(-8px)", borderColor: "rgba(218,165,32,.45)", boxShadow: "0 28px 50px -24px rgba(218,165,32,.35)" },
      "&:hover img": { transform: "scale(1.08)" },
    }}>
      <Box onClick={onOpen} sx={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", cursor: onOpen ? "zoom-in" : "default" }}>
        <Box component="img" src={item.image} alt={item.name} loading="lazy"
          sx={{ width: 1, height: 1, objectFit: "cover", transition: "transform .9s cubic-bezier(.2,.7,.2,1)" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(14,12,9,.75))" }} />
        <Stack direction="row" spacing={0.8} sx={{ position: "absolute", top: 14, left: 14 }}>
          {item.tags?.slice(0, 2).map((t) => (
            <Chip key={t} label={t} size="small" sx={{ bgcolor: "rgba(14,12,9,.7)", backdropFilter: "blur(6px)", color: "text.primary", fontSize: 12 }} />
          ))}
        </Stack>
        <Box sx={{ position: "absolute", right: 14, bottom: 14, px: 1.6, py: 0.4, borderRadius: 99, bgcolor: "rgba(14,12,9,.78)", backdropFilter: "blur(6px)", fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "primary.main" }}>
          ${item.price}
        </Box>
      </Box>
      <Box sx={{ p: 2.6, display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography variant="overline" color="text.secondary" sx={{ fontSize: 11, lineHeight: 1.4 }}>{item.category}</Typography>
        <Typography variant="h5" sx={{ fontSize: 22, mt: 0.5 }}>{item.name}</Typography>
        <Typography color="text.secondary" sx={{ mt: 1, fontSize: 14.5, lineHeight: 1.7, flex: 1 }}>{item.description}</Typography>
        <Box sx={{ mt: 2.4 }}>
          {qty === 0 ? (
            <Button fullWidth variant="outlined" startIcon={<AddIcon />} onClick={() => add(item.id)}
              sx={{ "&:hover": { bgcolor: "primary.main", color: "primary.contrastText", borderColor: "primary.main" } }}>
              Add to order
            </Button>
          ) : (
            <Stack direction="row" alignItems="center" justifyContent="space-between"
              sx={{ border: "1px solid", borderColor: "primary.main", borderRadius: 99, p: 0.4 }}>
              <Button aria-label="Remove one" onClick={() => setQty(item.id, qty - 1)} sx={{ minWidth: 0, px: 1.5 }}><RemoveIcon fontSize="small" /></Button>
              <Typography fontWeight={700}>{qty} in order</Typography>
              <Button aria-label="Add one" onClick={() => add(item.id)} sx={{ minWidth: 0, px: 1.5 }}><AddIcon fontSize="small" /></Button>
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DishCard;
