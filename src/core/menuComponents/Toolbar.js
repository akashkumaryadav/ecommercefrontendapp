import React from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import MoreIcon from "@material-ui/icons/MoreVert";
import { NavLink, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../../auth/helper";
import { toast, ToastContainer } from "react-toastify";

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  menuItem: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: "black",
      textDecoration: "none",
    },
  },
  menuItemRight: {
    display: "flex",
    marginLeft: "auto",
    float: "right",
  },
});

class ToolbarComponent extends React.Component {
  state = {
    achorEl: false,
    MobileMoreAnchorEl: false,
  };

  handleProfileMenuOpen = (event) => {
    this.setState({
      achorEl: event.currentTarget,
    });
  };

  handleMobileMenuClose = () => {
    this.setState({
      mobileMoreAnchorEl: null,
    });
  };

  handleMenuClose = () => {
    this.setState({
      achorEl: null,
      mobileMoreAnchorEl: null,
    });
  };

  handleMobileMenuOpen = (event) => {
    this.setState({
      mobileMoreAnchorEl: event.currentTarget,
    });
  };
  handleSignout = (event) => {
    signout(() => {
      toast.error("signed out");
      this.props.history.push("/");
    });
  };

  render() {
    const { classes } = this.props;
    const isMenuOpen = Boolean(this.state.anchorEl);
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

    const menuId = "primary-search-account-menu";
    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        {isAuthenticated() ? (
          <div>
            <MenuItem>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <p>Messages</p>
            </MenuItem>
            <MenuItem>
              <IconButton
                aria-label="show 11 new notifications"
                color="inherit"
              >
                <Badge
                  badgeContent={
                    localStorage.getItem("cart") &&
                    JSON.parse(localStorage.getItem("cart")).length
                  }
                  color="secondary"
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <p>Shopping Cart</p>
            </MenuItem>
            <MenuItem>
              <span onClick={this.handleSignout}>
                Signout
                <ToastContainer />
              </span>
            </MenuItem>
            <MenuItem onClick={this.handleProfileMenuOpen}>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <p>{isAuthenticated().user.name}</p>
            </MenuItem>
          </div>
        ) : (
          <div>
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
          </div>
        )}
      </Menu>
    );

    return (
      <div className={classes.grow}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.openDrawerHandler}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                DigitalComplex
              </NavLink>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {isAuthenticated() ? (
                <div className={classes.menuItemRight}>
                  <MenuItem>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                      <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      aria-label="show 17 new notifications"
                      color="inherit"
                    >
                      <NavLink className={classes.menuItem} to="/user/cart">
                        <Badge
                          badgeContent={
                            localStorage.getItem("cart") &&
                            JSON.parse(localStorage.getItem("cart")).length
                          }
                          color="secondary"
                        >
                          <ShoppingCart color="secondary" />
                        </Badge>
                      </NavLink>
                    </IconButton>
                  </MenuItem>
                  <MenuItem>
                    <span onClick={this.handleSignout}>
                      Signout
                      <ToastContainer />
                    </span>
                  </MenuItem>
                  <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <p>{isAuthenticated().user.name}</p>
                  </MenuItem>
                </div>
              ) : (
                <div
                  className={classes.menuItemRight}
                  style={{ color: "white" }}
                >
                  {" "}
                  <MenuItem>
                    <NavLink
                      className={classes.menuItem}
                      style={{ color: "white" }}
                      to="/signin"
                    >
                      Sign in
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      className={classes.menuItem}
                      style={{ color: "white" }}
                      to="/signup"
                    >
                      Sign up
                    </NavLink>
                  </MenuItem>
                </div>
              )}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ToolbarComponent));
