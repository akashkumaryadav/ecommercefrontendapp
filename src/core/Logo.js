import { makeStyles } from "@material-ui/core";
import React from "react";
import logo from "../assets/DC.svg";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",

    alignContent: "center",
    alignItems: "center",
    paddingBottom: "10px",
  },
  logoImage: {
    maxWidth: "250px",
  },
});

const Logo = () => {
  const classes = useStyles();
  return (
    <div className={classes.logoContainer}>
      <img src={logo} className={classes.logoImage} />
    </div>
  );
};

export default Logo;
