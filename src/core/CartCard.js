import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/cartActions";
import { removeItemFromCart } from "./helper/carthelper";
import ImageHelper from "./helper/ImageHelper";

const CartCard = ({ product, setReload = (f) => f, reload = undefined }) => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const { data, cartcount } = useSelector((state) => state.carts);
  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";

  // const addToCart = () => {
  //   dispatch(addToCart())

  //   addItemToCart(product, () => setRedirect(true));
  // };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/user/cart" />;
    }
  };

  const showAddToCart = () => {
    const inCart = data.filter((item) => item._id === product._id).length;
    return (
      <>
        {inCart === 0 ? (
          <button
            onClick={() => dispatch(addToCart(product))}
            className="border-2 px-4 py-2 rounded-full shadow-md text-gray-800"
          >
            Add to Cart
          </button>
        ) : (
          <button
            onClick={() => dispatch(removeFromCart(product._id))}
            className="border-2 px-4 py-2 rounded-full shadow-md text-gray-800 neumoinset"
          >
            <i className="fas fa-trash text-red-800"></i>
          </button>
        )}
      </>
    );
  };

  return (
    <>
      <div className="rounded-xl overflow-hidden shadow-md  border-2 border-gray-600 ">
        <img
          className="h-44 w-full object-cover object-bottom"
          src={ImageHelper(product)}
          alt={cartTitle}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{cartTitle}</div>
          <p className="text-gray-700 text-base shadow-inner border rounded-lg p-3">
            {cartDescrption}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2 space-x-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 neumoinset">
            Price ${cartPrice}
          </span>
          {showAddToCart()}
        </div>
      </div>
    </>
  );
};

export default CartCard;
