import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      <Box component="main" key={pathname} className="page-in" sx={{ minHeight: "60vh" }}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
