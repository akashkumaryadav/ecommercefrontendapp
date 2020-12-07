import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAllCategories, createProduct } from "./helper/adminapicalls";
import { isAuthenticated } from "../auth/helper";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormGroup,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

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
});

export const AddProduct = () => {
  const classes = useStyles();
  const { user, auth_token } = isAuthenticated();
  const [values, setValues] = useState({
    categories: [],
    name: "",
    description: "",
    price: 0,
    category: "Summer",
    stock: 0,
    formData: "",
  });

  useEffect(() => {
    getAllCategories()
      .then((categories) =>
        setValues({
          ...values,
          categories: [categories],
          category: categories[0]._id,
          formData: new FormData(),
        })
      )
      .catch((err) => console.log(err));
  }, []);

  console.log(user.id);

  const handleOnChange = (e) => {
    const value =
      e.target.name === "photo" ? e.target.files[0] : e.target.value;
    console.log(e.target.name, value);
    values.formData.set(e.target.name, value);
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values.formData);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (!values.formData.get("category")) {
      values.formData.set("category", values.category);
    }
    const data = await createProduct(user.id, auth_token, values.formData);
    if (data.error) {
      console.log(data.error);
      toast.error(data.error);
    } else {
      console.log("created the product");
      toast.success("product added successfully 🎉");
    }
  };

  return (
    <Base title="Add a Product" descripton="add your product to sell 🤗">
      <Grid container alignContent="center" justify="center">
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card className={classes.root}>
            <CardHeader title="Add Product" style={{ textAlign: "center" }} />
            <CardContent>
              <Typography align="center">Fill Out The Details</Typography>
              <form>
                <FormGroup>
                  <TextField
                    className={classes.input}
                    type="text"
                    name="name"
                    onChange={handleOnChange}
                    placeholder="product name"
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    className={classes.input}
                    type="text"
                    name="description"
                    onChange={handleOnChange}
                    placeholder="product descriptoin"
                  />
                </FormGroup>
                <FormGroup className={classes.input}>
                  <InputLabel id="category_label">Category</InputLabel>
                  <Select
                    labelId="category_label"
                    name="category"
                    id="category"
                    onChange={handleOnChange}
                  >
                    {values.categories[0] &&
                      values.categories[0].map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <TextField
                    className={classes.input}
                    type="number"
                    name="stock"
                    min={0}
                    onChange={handleOnChange}
                    placeholder="stock available"
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    className={classes.input}
                    type="number"
                    name="price"
                    min={0}
                    onChange={handleOnChange}
                    placeholder="price per product"
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    className={classes.input}
                    type="file"
                    name="photo"
                    onChange={handleOnChange}
                  />
                </FormGroup>
                <Button
                  onClick={handleOnSubmit}
                  variant="contained"
                  color="primary"
                >
                  AddProduct
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Link to="/admin/dashboard">Go to admin dashboard</Link>
    </Base>
  );
};
