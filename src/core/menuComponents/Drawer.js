import React from "react";
import Drawer from "@material-ui/core/Drawer";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  MenuItem,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { NavLink } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
const styles = (theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  menuItem: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: "black",
      textDecoration: "none",
    },
  },
});

class DrawerComponent extends React.Component {
  state = {
    left: false,
  };

  render() {
    const { classes } = this.props;

    const sideList = (side) => (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.props.toggleDrawerHandler}
        onKeyDown={this.props.toggleDrawerHandler}
      >
        <List>
          <ListItem button>
            <MenuItem>
              <NavLink className={classes.menuItem} to="/">
                Home
              </NavLink>
            </MenuItem>
          </ListItem>
          <ListItem button>
            <MenuItem>
              <NavLink className={classes.menuItem} to="/user/cart">
                Cart
              </NavLink>
            </MenuItem>
          </ListItem>
          <ListItem button>
            <MenuItem>
              <NavLink className={classes.menuItem} to="/user/dashboard">
                Dashboard
              </NavLink>
            </MenuItem>
          </ListItem>
          <ListItem button>
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <MenuItem>
                <NavLink className={classes.menuItem} to="/admin/dashboard">
                  A.DashBoard
                </NavLink>
              </MenuItem>
            )}
          </ListItem>
        </List>
        <Divider />
        <List>
          {["WishList", "Contact"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <Drawer open={this.props.left} onClose={this.props.toggleDrawerHandler}>
        {sideList("left")}
      </Drawer>
    );
  }
}

export default withStyles(styles)(DrawerComponent);
