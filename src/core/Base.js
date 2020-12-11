import React from "react";
import Menu from "./Menu";
import "react-toastify/dist/ReactToastify.css";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "5em",
    backgroundColor: theme.palette.background,
  },
  heroText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
}));

const Base = ({ title, descripton, children }) => {
  const classes = useStyles();
  return (
    <>
      <Menu />
      <Container className={classes.root}>
        <Grid container spacing={2}>
          <Container className={classes.heroText}>
            <Typography variant="h5">{title}</Typography>
            <br></br>
            <Typography variant="h6">{descripton}</Typography>
          </Container>
        </Grid>
        <Container maxWidth="xl">
          <main>{children}</main>
        </Container>
      </Container>
      {/* <footer className="footer bg-dark mt-auto py-3 ">
        <div className="container-fluid bg-info text-white text-center rounded-top">
          if you have any questions, free feel to reach us
          <br />
          <button className="btn btn-warning btn-lg"> Contact us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            An <strong className="text-white">Amazing Place</strong> to shop
          </span>
        </div>
      </footer> */}
    </>
  );
};

export default Base;
