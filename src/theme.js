import { createTheme } from "@mui/material";

export const gold = "#DAA520";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: gold, light: "#f0c457", dark: "#b8860b", contrastText: "#14110c" },
    secondary: { main: "#e2572f" },
    background: { default: "#0e0c09", paper: "#17140f" },
    text: { primary: "#f4eee2", secondary: "rgba(244,238,226,.66)" },
    divider: "rgba(244,238,226,.1)",
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: "'Manrope', system-ui, sans-serif",
    h1: { fontFamily: "'Fraunces', serif", fontWeight: 700, letterSpacing: "-.02em" },
    h2: { fontFamily: "'Fraunces', serif", fontWeight: 700, letterSpacing: "-.02em" },
    h3: { fontFamily: "'Fraunces', serif", fontWeight: 700, letterSpacing: "-.01em" },
    h4: { fontFamily: "'Fraunces', serif", fontWeight: 700 },
    h5: { fontFamily: "'Fraunces', serif", fontWeight: 500 },
    h6: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 700, letterSpacing: ".01em" },
    overline: { letterSpacing: ".22em", fontWeight: 700 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 22 },
        sizeLarge: { paddingBlock: 12, paddingInline: 30, fontSize: "1rem" },
        outlined: { borderColor: "rgba(244,238,226,.3)" },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiTextField: { defaultProps: { variant: "filled", fullWidth: true } },
    MuiFilledInput: {
      defaultProps: { disableUnderline: true },
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "rgba(244,238,226,.05)",
          border: "1px solid rgba(244,238,226,.08)",
          transition: "border-color .2s, background-color .2s",
          "&:hover": { backgroundColor: "rgba(244,238,226,.08)" },
          "&.Mui-focused": { backgroundColor: "rgba(244,238,226,.06)", borderColor: gold },
          "&.Mui-error": { borderColor: "#f44336" },
        },
      },
    },
  },
});

export default theme;
