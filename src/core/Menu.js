import React, { Fragment } from "react";
import { NavLink, withRouter, useHistory } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/index";
import { toast, ToastContainer } from "react-toastify";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Menu as Menus,
  MenuItem,
  makeStyles,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuItem: {
    color: "white",
    textDecoration: "none",
    "&:hover": {
      color: "white",
      textDecoration: "none",
    },
  },
  menuItemRight: {
    display: "flex",
    marginLeft: "auto",
    float: "right",
  },
});

const Menu = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar className={classes.root} color="secondary" variant="elevation">
        <Toolbar>
          <MenuItem>
            <NavLink className={classes.menuItem} to="/">
              Home
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink className={classes.menuItem} to="/cart">
              Cart
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink className={classes.menuItem} to="/user/dashboard">
              Dashboard
            </NavLink>
          </MenuItem>
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <MenuItem>
              <NavLink className={classes.menuItem} to="/admin/dashboard">
                A.DashBoard
              </NavLink>
            </MenuItem>
          )}
          <Box className={classes.menuItemRight}>
            {isAuthenticated() ? (
              <MenuItem>
                <span
                  onClick={() => {
                    signout(() => {
                      toast.error("signed out");
                      history.push("/");
                    });
                  }}
                >
                  Signout
                  <ToastContainer />
                </span>
              </MenuItem>
            ) : (
              <>
                {" "}
                <MenuItem>
                  <NavLink className={classes.menuItem} to="/signin">
                    Sign in
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink className={classes.menuItem} to="/signup">
                    Sign up
                  </NavLink>
                </MenuItem>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default withRouter(Menu);
