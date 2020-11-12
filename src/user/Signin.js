import React, { useState } from "react";
import Base from "../core/Base";
import { FormGroup } from "./utils/FormGroup";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import Logo from "../core/Logo";
import errorField from "./utils/formValidation";

export const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    errors: [],
    didRedirect: false,
    loading: false,
  });

  const { email, password, didRedirect, loading, errors } = values;
  const { user } = isAuthenticated();

  const handleOnChange = (event) => {
    return setValues({ ...values, [event.target.name]: event.target.value });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    signin({ email, password })
      .then((data) => {
        if (data.errors) {
          setValues({ ...values, errors: data.errors });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              didRedirect: true,
              loading: true,
              errors: [],
            });
          });
          toast.success("You have been successfully loggedin");
        }
      })
      .catch((err) => {
        console.log("SIGN in failed on client side", err);
      });
  };
  return (
    <Base>
      <Logo />
      {performRedirect()}
      <Grid container justify="space-around" spacing={2}>
        <Grid item lg={8} md={8} xs={12} sm={12}>
          <form>
            <FormGroup
              required
              error={errors && "email" === errorField("email", errors)}
              type="email"
              label="Email"
              onChange={handleOnChange}
              value={email}
            />
            <FormGroup
              required
              error={errors && "password" === errorField("password", errors)}
              type="password"
              label="Password"
              value={password}
              onChange={handleOnChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
              className="btn btn-warning btn-block"
              onClick={handleOnClick}
            >
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </Base>
  );
};