import { createMuiTheme } from "@material-ui/core/styles";
export const theme = createMuiTheme({
  active: "false",
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#fafafa",
    },
    primary: {
      light: "#1B2021",
      main: "#1B2021",
      dark: "#1B2021",
      contrastText: "#fff",
    },
  },
});
export default theme;
