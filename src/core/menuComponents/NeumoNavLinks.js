import React from "react";
import { NavLink } from "react-router-dom";

const NeumoNavLink = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className="text-black px-3 py-2 rounded-2xl text-sm inset-5 shadow-xl font-medium"
      activeClassName=" text-gray-800 neumoinset"
    >
      {label}
    </NavLink>
  );
};

export default NeumoNavLink;
