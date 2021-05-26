import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicalls";
import { isAuthenticated } from "../auth/helper";
import { toast } from "react-toastify";
import {
  Grid,
  TextField,
  Button,
  FormGroup,
  Card,
  CardContent,
  CardHeader,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import { pink } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100%",
    [`@media (min-width:780px)`]: {
      width: "60%",
    },
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "10px 10px 20px 5px rgba(25,25,25,0.2)",
  },
  input: {
    margin: 10,
  },
  button: {
    marginTop: 5,
  },
});

export const AddCategory = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    success: false,
  });

  const { name, success } = values;
  const { user, auth_token } = isAuthenticated();

  console.log(isAuthenticated());

  const handleOnChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const data = await createCategory({
      userId: user.id,
      token: auth_token,
      category: { name },
    });
    if (data.error) {
      console.log(data.error);
      toast.error(data.error + " try some other name 😢");
    } else {
      toast.success(`${name} created 😎`);
    }
  };

  return (
    <Grid container alignContent="center" justify="center">
      <Grid item lg={12} md={10} sm={10} xs={12}>
        <Card className={classes.root}>
          <CardHeader title="Add Category" style={{ textAlign: "center" }} />
          <CardContent>
            <Typography align="center">Fill Out The Details</Typography>
            <form>
              <FormGroup>
                <TextField
                  required
                  helperText="provide the category name "
                  label="name"
                  type="text"
                  className={classes.input}
                  color="secondary"
                  placeholder="For eg.Summer,Winter"
                  name="name"
                  value={name}
                  onChange={handleOnChange}
                />
              </FormGroup>
              <Button
                className={classes.button}
                fullWidth
                variant="contained"
                color="secondary"
                className="btn btn-success rounded-pill m-2"
                onClick={handleOnSubmit}
              >
                create Category
              </Button>
              <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
                <Button
                  className={classes.button}
                  fullWidth
                  color="primary"
                  variant="outlined"
                >
                  Go Back
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
