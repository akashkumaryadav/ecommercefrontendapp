import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Menu from "./Menu";

const Base = ({ title, descripton, children }) => {
  return (
    <main className="box-border h-screen">
      <Menu />
      <div>
        <div className="container mx-auto">
          <section>{children}</section>
        </div>
      </div>
    </main>
  );
};

export default Base;
