import React, { useState } from "react";
import Base from "../core/Base";
import { FormGroup } from "./utils/FormGroup";
import { signup, isAuthenticated } from "../auth/helper/index";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { Button, Card, CardContent, Grid } from "@material-ui/core";
import Logo from "../core/Logo";
import errorField from "../user/utils/formValidation";

const successToast = (msg) => {
  toast.success(msg);
};

export const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    errors: [],

    success: false,
  });

  const { name, lastname, email, password, errors } = values;

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const handleOnChange = (event) => {
    return setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    signup({ name, lastname, email, password })
      .then((data) => {
        if (data.errors) {
          setValues({ ...values, errors: data.errors });
        } else {
          successToast(`Account created with name of ${name}`);
          setValues({
            ...values,
            name: "",
            lastname: "",
            email: "",
            password: "",
            errors: [],
            success: true,
          });
        }
      })
      .catch((err) => console.log("Fail to signup on client side"));
  };

  return (
    <Base>
      <Logo />
      {performRedirect()}
      <Grid container justify="center" spacing={2}>
        <Grid item lg={10} md={10} sm={12}>
          <form>
            <Card>
              <CardContent>
                <FormGroup
                  required
                  error={errors && "name" === errorField("name", errors)}
                  type="text"
                  label="Name"
                  value={name}
                  onChange={handleOnChange}
                />
                <FormGroup
                  error={
                    errors && "lastname" === errorField("lastname", errors)
                  }
                  type="text"
                  label="Lastname"
                  value={lastname}
                  onChange={handleOnChange}
                />
                <FormGroup
                  required
                  error={errors && "email" === errorField("email", errors)}
                  type="email"
                  label="Email"
                  value={email}
                  onChange={handleOnChange}
                />
                <FormGroup
                  required
                  error={
                    errors && "password" === errorField("password", errors)
                  }
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
                  onClick={handleOnSubmit}
                >
                  submit
                </Button>
              </CardContent>
            </Card>
          </form>
        </Grid>
      </Grid>
    </Base>
  );
};
