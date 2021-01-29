import React, { useEffect, useState } from "react";

import { Favorite, Share, ShoppingBasket } from "@material-ui/icons";
import { gsap } from "gsap";
import { API } from "../backend";
import { addItemToCart } from "./helper/carthelper";

function ProductCard({ product }) {
  const { _id, name, description, price, category, stock } = product;
  const [productImage, setProductImage] = useState("");

  useEffect(() => {
    // getProductImage
    fetch(`${API}/product/photo/${_id}`)
      .then((data) => setProductImage(data))
      .catch((err) => console.log(err));
    fadeIn();
  }, [product]);

  const addToCart = () => {
    product["inCart"] = true;
    addItemToCart(product, () => {});
  };
  return (
    <div className="">
      <div className="" image={`${productImage.url}`} title="Paella dish" />
      <div>
        <div>{name}</div>
        {description.length > 40
          ? description.substring(0, description.length / 2)
          : description}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: pink[100],
            transform: "scaleX(1.1)",
            marginTop: 20,
            padding: 5,
          }}
        >
          <h1>Rs.{price}</h1>
          <h1>{stock} Left</h1>
        </div>
      </div>
      <div>
        {!product.inCart && <button onClick={addToCart}>Add To Cart</button>}
      </div>
    </div>
  );
}

export default ProductCard;
