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
      <footer className="hidden fixed bottom-0 md:block  footer bg-gray-800 mt-auto py-3 ">
        <div className="container-fluid bg-info text-white text-center rounded-top">
          if you have any questions, free feel to reach us
          <br />
          <button className="btn btn-warning btn-lg"> Contact us</button>
        </div>
        <div className="container">
          <span className="text-muted text-white">
            An <strong className="text-yellow-400">Amazing Place</strong> to
            shop
          </span>
        </div>
      </footer>
    </main>
  );
};

export default Base;
