import { createMuiTheme } from "@material-ui/core/styles";
export const theme = createMuiTheme({
  active: "false",
  palette: {
    background: "#000",
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#1b2021",
    },
    primary: {
      light: "#CC2936",
      main: "#CC2936",
      dark: "#CC2936",
      contrastText: "#fff",
    },
    secondary: {
      light: "#FCCA46",
      main: "#FCCA46",
      dark: "#FCCA46",
      contrastText: "#000",
    },
    default: {
      light: "#388697",
      main: "#388697",
      dark: "#388697",
      contrastText: "#000",
    },
  },
});
export default theme;
