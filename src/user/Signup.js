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
      {performRedirect()}
      <div className="p-4 h-screen pt-20 grid grid-cols-1 md:grid-rows-6 justify-center">
        <form className="md:row-start-2 flex flex-col justify-center align-middle items-center px-2  w-full">
          <span className="md:w-1/2">
            <FormGroup
              required
              errors={errors}
              type="text"
              label="name"
              placeholder="name"
              value={name}
              onChange={handleOnChange}
            />
          </span>
          <span className="md:w-1/2">
            <FormGroup
              errors={errors}
              type="text"
              label="lastname"
              placeholder="lastname"
              value={lastname}
              onChange={handleOnChange}
            />
          </span>
          <span className="md:w-1/2">
            <FormGroup
              required
              errors={errors}
              type="email"
              label="email"
              placeholder="email"
              value={email}
              onChange={handleOnChange}
            />
          </span>
          <span className="md:w-1/2">
            <FormGroup
              required
              errors={errors}
              type="password"
              label="password"
              placeholder="password"
              value={password}
              onChange={handleOnChange}
            />
          </span>
          <button
            fullWidth
            className="w-full md:w-1/2 mt-4 bg-gray-800 text-white py-2"
            onClick={handleOnSubmit}
          >
            submit
          </button>
        </form>
      </div>
    </Base>
  );
};
