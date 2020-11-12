import React, { useState, useEffect } from "react";
import { getAllCategories } from "./helper/adminapicalls";
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
  const classes = useStyles();
  useEffect(() => {
    getAllCategories()
      .then((categories) => setCategories(categories))
      .catch((err) => console.log(err));
  });
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
