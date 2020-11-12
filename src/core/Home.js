import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Products from "./Products";

export default function Home() {
  return (
    <Base title="Home Page" descripton="this is a home page">
      <Products />
    </Base>
  );
}
