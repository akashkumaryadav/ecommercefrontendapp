import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const useStyles = makeStyles({
  links: {
    textDecoration: "none",
  },
  profile_head: {
    margin: "10px",
  },
});

export const AdminDashboard = () => {
  const { name, email } = isAuthenticated().user;
  const classes = useStyles();
  return (
    <Base title="Admin Dashboard" descripton="this is admin dashboard 😎">
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card className={classes.profile_head}>
            <CardHeader title="Profile Admin" />
            <CardContent>
              <Typography>Name: {name}</Typography>
              <Typography>address: {email}</Typography>
            </CardContent>
          </Card>
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card>
                <CardHeader title="Manage Everything Here 😎"></CardHeader>
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText>
                        <Link
                          to="/admin/create/category"
                          className={classes.links}
                        >
                          Create Category
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Link
                          to="/admin/manage/categories"
                          className={classes.links}
                        >
                          Manage Categories
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Link
                          to="/admin/create/product"
                          className={classes.links}
                        >
                          Create Product
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Link
                          to="admin/product/create"
                          className={classes.links}
                        >
                          Manage Products
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Link to="admin/order/create" className={classes.links}>
                          Manage Orders
                        </Link>
                      </ListItemText>
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Grid container>
                    <Grid item lg={6} md={10} sm={12} xs={12}>
                      <Button fullWidth variant="contained" color="secondary">
                        User Dashboard
                      </Button>
                    </Grid>
                    <Grid item lg={6} md={10} sm={12} xs={12}>
                      <Button fullWidth variant="contained" color="primary">
                        Product Page
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Base>
  );
};
