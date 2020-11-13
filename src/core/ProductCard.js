import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Favorite, Share, ShoppingBasket } from "@material-ui/icons";
import { amber, green, blue } from "@material-ui/core/colors";
import { API } from "../backend";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    paddingTop: "56.25%", // 16:9
  },
  addToCart: {
    marginLeft: "auto",
    color: green[800],
    "&:hover": {
      backgroundColor: amber[400],
    },
  },
  shareProduct: {
    color: blue[800],
  },
});
function ProductCard({ product }) {
  const classes = useStyles();
  const { _id, name, description, price, category, stock } = product;
  const [productImage, setProductImage] = useState("");

  useEffect(() => {
    // getProductImage
    fetch(`${API}/product/photo/${_id}`)
      .then((data) => setProductImage(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={`${productImage.url}`}
        title="Paella dish"
      />
      <CardContent>
        <CardHeader title={name} />
        {description.length > 40
          ? description.substring(0, description.length / 2)
          : description}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <Favorite />
        </IconButton>
        <IconButton className={classes.shareProduct}>
          <Share />
        </IconButton>
        <IconButton className={classes.addToCart}>
          <ShoppingBasket />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
