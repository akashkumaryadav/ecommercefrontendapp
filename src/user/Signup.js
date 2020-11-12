import React, { useState } from "react";
import Base from "../core/Base";
import { FormGroup } from "./utils/FormGroup";
import { signup, isAuthenticated } from "../auth/helper/index";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const successToast = (msg) => {
  toast.success(msg);
};

const errorToast = (msg) => {
  toast.error(msg);
};

export const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    success: false,
  });

  const { name, lastname, email, password } = values;

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
          data.errors.map((error) => errorToast(error));
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
    <Base title="Sign up page" descripton="This wil be a signup page">
      {performRedirect()}
      <div className="row">
        <div className="col-md-6 offset-sm-3">
          <form>
            <FormGroup
              type="text"
              label="Name"
              value={name}
              onChange={handleOnChange}
            />
            <FormGroup
              type="text"
              label="Lastname"
              value={lastname}
              onChange={handleOnChange}
            />
            <FormGroup
              type="email"
              label="Email"
              value={email}
              onChange={handleOnChange}
            />
            <FormGroup
              type="password"
              label="Password"
              value={password}
              onChange={handleOnChange}
            />
            <button
              type="submit"
              className="btn btn-warning btn-block"
              onClick={handleOnSubmit}
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </Base>
  );
};
