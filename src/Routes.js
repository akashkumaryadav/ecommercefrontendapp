import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./core/Home";
import { SignIn } from "./user/Signin";
import { SignUp } from "./user/Signup";
import { NotFound } from "./NotFound";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import { UserDashboard } from "./user/UserDashboard";
import { AdminDashboard } from "./user/AdminDashboard";
import { AddCategory } from "./admin/AddCategory";
import { AddProduct } from "./admin/AddProduct";
import { ManageCategory } from "./admin/ManageCategory";
import Cart from "./core/Cart";
import { makeStyles } from "@material-ui/core";
import ManageProducts from "./admin/ManageProduct";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
  },
}));

export default function Routes() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/home" exact component={Home}></Route>
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <AdminRoutes
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <AdminRoutes
            path="/admin/create/category"
            exact
            component={AddCategory}
          />
          <AdminRoutes
            path="/admin/create/product"
            exact
            component={AddProduct}
          />
          <AdminRoutes
            path="/admin/manage/categories"
            exact
            component={ManageCategory}
          />
          <AdminRoutes
            path="/admin/product/update"
            exact
            component={ManageProducts}
          />
          <PrivateRoutes
            path="/user/dashboard"
            exact
            component={UserDashboard}
          />
          <PrivateRoutes path="/user/cart" exact component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}
