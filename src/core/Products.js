import { Button, ButtonGroup, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../admin/helper/adminapicalls";
import CartCard from "./CartCard";
import { addToCart } from "./helper/carthelper";
import ProductCard from "./ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(8);
  useEffect(() => {
    getAllProducts(limit)
      .then((products) => setProducts(products))
      .catch((err) => console.log(err));
  }, [limit]);

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        alignContent="center"
        justify="space-evenly"
      >
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item key={product._id} lg={3} md={4} sm={4} xs={12}>
              <CartCard product={product} />
            </Grid>
          ))
        ) : (
          <Typography variant="h5">No Products 😯 You Have to Wait</Typography>
        )}
      </Grid>
      <Grid
        container
        justify="center"
        style={{ marginTop: 20, paddingBottom: 20 }}
      >
        <ButtonGroup>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setLimit(limit + 4)}
          >
            More Products
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={limit > 4 ? () => setLimit(limit - 4) : setLimit(8)}
            disabled={limit === 8}
          >
            Show Less
          </Button>
        </ButtonGroup>
      </Grid>
    </>
  );
}

export default Products;
