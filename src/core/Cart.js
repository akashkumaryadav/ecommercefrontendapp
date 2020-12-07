import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import { loadCart } from "./helper/carthelper";
import CartCard from "./CartCard";
import { Grid } from "@material-ui/core";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <Grid
        container
        spacing={2}
        alignItems="center"
        alignContent="center"
        justify="space-evenly"
      >
        {products.map((product, index) => (
          <Grid item key={product._id} lg={3} md={4} sm={4} xs={12}>
            <CartCard
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          </Grid>
        ))}
      </Grid>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">Checkout section</div>
      </div>
    </Base>
  );
};

export default Cart;
