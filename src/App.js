import "./App.css";
import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { Alert, CssBaseline, Snackbar, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { AppProvider, useApp } from "./context/AppContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Pagenotfound from "./pages/Pagenotfound";
import CartDrawer from "./components/CartDrawer";

const ScrollTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Toast = () => {
  const { toast, setToast } = useApp();
  return (
    <Snackbar
      key={toast?.key}
      open={!!toast}
      autoHideDuration={2600}
      onClose={() => setToast(null)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      {toast ? (
        <Alert variant="filled" severity={toast.severity} onClose={() => setToast(null)} sx={{ borderRadius: 99, fontWeight: 600 }}>
          {toast.message}
        </Alert>
      ) : (
        <span />
      )}
    </Snackbar>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="*" element={<Pagenotfound />} />
          </Routes>
          <CartDrawer />
          <Toast />
        </HashRouter>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
