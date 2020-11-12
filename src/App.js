import React from "react";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";

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
