import {
  AppBar,
  Box,
  Drawer,
  makeStyles,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { NavLink, useHistory, withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { isAuthenticated, signout } from "../auth/helper/index";
import ToolbarComponent from "./menuComponents/Toolbar";
import DrawerComponent from "./menuComponents/Drawer";

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
  const [drawer, setDrawer] = useState({
    left: false,
  });
  const toggleDrawer = () => {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }

    setDrawer({ left: false });
  };

  const openDrawer = () => {
    setDrawer({
      left: true,
    });
  };

  return (
    <Fragment>
      <AppBar className={classes.root} color="secondary" variant="elevation">
        <ToolbarComponent openDrawerHandler={openDrawer} />
        <DrawerComponent
          left={drawer.left}
          toggleDrawerHandler={toggleDrawer}
        />
      </AppBar>
    </Fragment>
  );
};

export default withRouter(Menu);
