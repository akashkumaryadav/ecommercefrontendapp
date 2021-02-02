import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { authenticate, isAuthenticated, signin } from "../auth/helper/index";
import Base from "../core/Base";
import Logo from "../core/Logo";
import { FormGroup } from "./utils/FormGroup";
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
    console.log(errors);
    event.preventDefault();
    signin({ email, password })
      .then((data) => {
        console.log(data, "signin");
        if (data.errors) {
          if (data.errors.length === 1) {
            toast.warn(data.errors[0]);
          }
          setValues({ ...values, errors: data.errors, didRedirect: false });
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
        console.log("SIGN in failed on client side");
      });
  };
  return (
    <Base>
      {performRedirect()}
      <div className="h-screen pt-20 grid grid-cols-1 md:grid-rows-6 justify-center">
        <form className="md:row-start-2 flex flex-col justify-center align-middle items-center px-2  w-full">
          {errors.length > 0 && (
            <p className="border-red-500 px-3 py-2 rounded-md w-1/2 text-white">
              {errors.filter((er) => er.match("user"))}
            </p>
          )}
          <span className="md:w-1/2 ">
            <FormGroup
              type="text"
              onChange={handleOnChange}
              label="email"
              errors={errors}
              placeholder="please enter email"
            />
          </span>
          <span className="md:w-1/2 ">
            <FormGroup
              type="password"
              onChange={handleOnChange}
              label="password"
              errors={errors}
              placeholder="please enter password"
            />
          </span>
          <button
            onClick={handleOnClick}
            className="rounded-lg w-full my-4  md:w-1/2 bg-gray-800 text-white  p-2"
          >
            Signin
          </button>
        </form>
      </div>
    </Base>
  );
};
