import React, { useState, useEffect } from "react";
import { getAllCategories, removeCategory } from "./helper/adminapicalls";
import Base from "../core/Base";
import {
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  makeStyles,
  Button,
  ButtonGroup,
  IconButton,
} from "@material-ui/core";

import { Delete, Update } from "@material-ui/icons";

import { pink, grey } from "@material-ui/core/colors";
import { isAuthenticated } from "../auth/helper";

const useStyles = makeStyles({
  tableHead: {
    backgroundColor: pink[100],
  },
  tableCell: {
    backgroundColor: grey[200],
    color: grey[900],
    textAlign: "center",
  },
});

export const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const { user, auth_token } = isAuthenticated();
  console.log(user, auth_token);
  const classes = useStyles();
  useEffect(() => {
    getAllCategories()
      .then((categories) => setCategories(categories))
      .catch((err) => console.log(err));
  }, []);

  const handleOnDelete = async (id) => {
    const data = await removeCategory(id, user.id, auth_token);
    console.log(data);
    if (data.error) {
      console.log("data", data.error);
    } else {
      categories.pop((category) => category._id === id);
      console.log("deleted successfully");
    }
  };

  return (
    <Base title="Manage Categories">
      <TableContainer>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Manage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories &&
              categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell className={classes.tableCell}>
                    {category.name}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <ButtonGroup>
                      <Button variant="contained" color="primary">
                        <Update />
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={{ outline: "none" }}
                        onClick={() => handleOnDelete(category._id)}
                      >
                        <Delete />
                        Delete
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Base>
  );
};
