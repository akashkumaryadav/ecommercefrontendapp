import React from "react";
import { NavLink } from "react-router-dom";

const NeumoNavLink = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium shadow-lg"
      activeClassName="bg-gray-900 text-white"
    >
      {label}
    </NavLink>
  );
};

export default NeumoNavLink;
