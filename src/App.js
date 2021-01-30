import React from "react";
import { ToastContainer } from "react-toastify";
import "./index.css";
import Routes from "./Routes";

export default function App() {
  return (
    <>
      <ToastContainer
        autoClose={3000}
        draggable={true}
        closeOnClick={true}
        position="top-right"
        hideProgressBar={true}
      />
      <Routes />
    </>
  );
}
