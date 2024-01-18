import { Outlet } from "react-router-dom";
import NunitoVariableFont from "/fonts/Nunito-VariableFont_wght.ttf";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import Footer from "../ui/Footer";
import Header from "../ui/Header";
import NavBar from "../ui/NavBar";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Nunito';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Nunito'), local('Nunito-Regular'), url(${NunitoVariableFont}) format('ttf');
        }
      `,
    },
  },
});

export default function AppLayout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "rgb(229 229 229)",
        }}
      >
        <Header />
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
