import React, { useState, useEffect } from "react";
import {
  getAllCategories,
  removeCategory,
  updateCategory,
} from "./helper/adminapicalls";
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
  TextField,
} from "@material-ui/core";
import { Delete, Update } from "@material-ui/icons";
import { pink, grey } from "@material-ui/core/colors";
import { isAuthenticated } from "../auth/helper";
import Modal from "../core/helper/Modal";
import { AddCategory } from "./AddCategory";

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
  const [categories, setCategories] = useState(null);
  const [update, setUpdate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const { user, auth_token } = isAuthenticated();
  const classes = useStyles();

  useEffect(() => {
    getAllCategories()
      .then((categories) => setCategories(categories))
      .catch((err) => console.log(err));
  }, [update]);
  const handleOnDelete = async (id) => {
    const data = await removeCategory(id, user.id, auth_token);
    if (data.error) {
      console.log("data", data.error);
    } else {
      let del = categories.pop((category) => category._id === id);
      setCategories(categories);
      setUpdate(del);
      console.log("deleted successfully");
      setUpdate(null);
    }
  };

  const handleOnUpdate = async (id) => {
    if (update && update._id === id) {
      const data = await updateCategory(update, user.id, auth_token);
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("successful update");
        setUpdate(null);
      }
    } else {
      let up = categories.find((e) => e._id === id);
      setUpdate(up);
    }
  };

  return (
    <div>
      <button
        className="float-right m-3 px-2 py-4"
        onClick={() => setShowAddModal(!showAddModal)}
      >
        Add New Category <i class="fas fa-plus"></i>
      </button>
      <Modal show={showAddModal} onClose={setShowAddModal}>
        <div>
          <AddCategory />
        </div>
      </Modal>
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
                    {update && update._id === category._id ? (
                      <TextField
                        name="name"
                        value={update.name}
                        onChange={(e) =>
                          setUpdate({
                            ...update,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    ) : (
                      category.name
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOnUpdate(category._id)}
                      >
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
    </div>
  );
};
