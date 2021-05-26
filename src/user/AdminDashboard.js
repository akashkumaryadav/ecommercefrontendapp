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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { ManageCategory } from "../admin/ManageCategory";
import ManageProduct from "../admin/ManageProduct";

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
  const [activeComponent, setActiveComponent] = useState("category");
  return (
    <Base title="Admin Dashboard" descripton="this is admin dashboard 😎">
      <div className="grid grid-cols-8 pt-20">
        {/* TODO:sidebar */}
        <div className="flex flex-row flex-wrap  py-10 w-full shadow-xl rounded-sm max-h-96">
          <h1 className="px-2">Welcome Back {name} </h1>
          <ul className="mt-10 w-full text-center">
            <li
              className={`py-3  ${
                activeComponent === "category" && "neumoinset"
              }`}
              onClick={() => setActiveComponent("category")}
            >
              Category
            </li>
            <li
              className={`py-3  ${
                activeComponent === "product" && "neumoinset"
              }`}
              onClick={() => setActiveComponent("product")}
            >
              Product
            </li>
            <li
              className={`py-3  ${activeComponent === "order" && "neumoinset"}`}
              onClick={() => setActiveComponent("order")}
            >
              Order
            </li>
          </ul>
        </div>
        {/* TODO:WorkArea */}
        <div className="col-start-2 col-end-9">
          {activeComponent === "category" && <ManageCategory />}
          {activeComponent === "product" && <ManageProduct />}
          {activeComponent === "order" && <ManageCategory />}
        </div>
      </div>
    </Base>
  );
};
