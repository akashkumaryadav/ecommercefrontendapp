import React from "react";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import ThemeState from "./themeState";
import {
  ThemeProvider,
  Theme,
  MuiThemeProvider,
  makeStyles,
} from "@material-ui/core";
import darktheme from "./themes/darktheme";
import lighttheme from "./themes/lighttheme";
import "./index.css";

export default function App() {
  return (
    <ThemeState>
      <MuiThemeProvider theme={lighttheme}>
        <ToastContainer
          autoClose={3000}
          draggable={true}
          closeOnClick={true}
          position="top-right"
          hideProgressBar={true}
        />
        <Routes />
      </MuiThemeProvider>
    </ThemeState>
  );
}
