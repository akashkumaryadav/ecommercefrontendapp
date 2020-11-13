import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Favorite, Share, ShoppingBasket } from "@material-ui/icons";
import { amber, green, blue, pink } from "@material-ui/core/colors";
import { gsap } from "gsap";
import { API } from "../backend";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    opacity: 0,
  },
  media: {
    paddingTop: "56.25%", // 16:9
    "&:hover": {
      transform: "scale(1.2)",
    },
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

const fadeIn = () => {
  gsap.to(".cards", { opacity: 1, duration: 0.5 });
};

function ProductCard({ product }) {
  const classes = useStyles();
  const { _id, name, description, price, category, stock } = product;
  const [productImage, setProductImage] = useState("");

  useEffect(() => {
    // getProductImage
    fetch(`${API}/product/photo/${_id}`)
      .then((data) => setProductImage(data))
      .catch((err) => console.log(err));
    fadeIn();
  }, []);

  return (
    <Card className={`${classes.root} cards`}>
      <CardMedia
        className={classes.media}
        image={`${productImage.url}`}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        {description.length > 40
          ? description.substring(0, description.length / 2)
          : description}
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: pink[100],
            transform: "scaleX(1.1)",
            marginTop: 20,
            padding: 5,
          }}
        >
          <Typography variant="subtitle1">Rs.{price}</Typography>
          <Typography variant="subtitle1">{stock} Left</Typography>
        </Box>
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
