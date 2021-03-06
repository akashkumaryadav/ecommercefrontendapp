import { Redirect } from "react-router-dom";
import { API } from "../../backend";

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  console.log("inside signin function");
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));

    next();
  }
};

export const signout = async (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    next();
    const res = await fetch(`${API}/signout`, {
      method: "GET",
    });
    if (!res) {
      return console.log("Signout failed");
    }
    return "Signout success";
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
