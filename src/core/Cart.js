import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import { loadCart } from "./helper/carthelper";
import CartCard from "./CartCard";
import { Grid, Typography } from "@material-ui/core";
import PaymentBraintree from "./PaymentBraintree";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <Grid
        container
        spacing={2}
        alignItems="center"
        alignContent="center"
        justify="space-evenly"
      >
        {products.map((product, index) => (
          <Grid item key={product._id} lg={4} md={4} sm={4} xs={12}>
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

  return (
    <Base title="Your Cart" description="Ready to checkout">
      <Grid container spacing={2}>
        <Grid item lg={8} md={6} sm={12} xs={12}>
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <Typography variant="h6" align="center">
              Cart Is Empty
            </Typography>
          )}
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12} className="col-6">
          <PaymentBraintree products={products} setReload={setReload} />
        </Grid>
      </Grid>
    </Base>
  );
};

export default Cart;
