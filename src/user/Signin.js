import React, { useState } from "react";
import Base from "../core/Base";
import { FormGroup } from "./utils/FormGroup";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";

const successToast = (msg) => {
  toast.success(msg);
};

const errorToast = (msg) => {
  toast.error(msg);
};

export const SignIn = () => {
  const [values, setValues] = useState({
    email: "a@gmail.com",
    password: "code",
    didRedirect: false,
    loading: false,
  });

  const { email, password, didRedirect, loading } = values;
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
          data.errors.map((error) => errorToast(error));
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              didRedirect: true,
              loading: true,
            });
          });
          successToast("You have been successfully loggedin");
        }
      })
      .catch((err) => {
        console.log("SIGN in failed on client side", err);
      });
  };
  return (
    <Base title="Sign In page" descripton="This wil be a signin page">
      {performRedirect()}
      <div className="row">
        <div className="col-md-6 offset-sm-3">
          <form>
            <FormGroup
              type="email"
              label="Email"
              onChange={handleOnChange}
              value={email}
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
              onClick={handleOnClick}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Base>
  );
};
