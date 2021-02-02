import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/cartActions";
import "../styles.css";
import Base from "./Base";
import ImageHelper from "./helper/ImageHelper";
import PaymentBraintree from "./PaymentBraintree";

const Cart = () => {
  const dispatch = useDispatch();
  const { data, cartcount } = useSelector((state) => state.carts);
  const [reload, setReload] = useState(false);

  const loadAllProducts = () => {
    return (
      <div className="flex flex-col md:ml-10">
        {data.map((product, index) => (
          <div
            key={product._id}
            className="h-64 md:h-40 w-full md:w-3/4 mx-auto shadow-lg border rounded-md flex space-x-2 space-y-2 m-4"
          >
            <img
              className="object-cover h-full w-24"
              src={ImageHelper(product)}
            />
            <span className="flex flex-col h-full text-sm md:text-sm w-full p-2 space-y-1">
              <h1 className="text-base font-bold">{product.name}</h1>
              <p>{product.description}</p>
              <p className="neumoinset w-1/2 p-2 pl-10">
                Price ${product.price}
              </p>
              <span className="flex flex-col md:flex-row justify-between space-x-2">
                <span className="flex">
                  {/* decrement */}
                  <button className=" rounded-lg  mx-auto my-auto w-12 h-12 bg-white border shadow-lg">
                    <i
                      className="text-yellow-800 fas fa-minus"
                      onClick={() => dispatch(decrementQuantity(product._id))}
                    ></i>
                  </button>
                  <input
                    type="text"
                    disabled
                    value={product.quantity}
                    min="1"
                    className="items-end text-center self-stretch mx-auto my-auto w-full"
                  />
                  {/* increament  */}
                  <button
                    className=" rounded-lg  mx-auto my-auto w-12 h-12 bg-white border shadow-lg"
                    onClick={() => dispatch(incrementQuantity(product._id))}
                  >
                    <i className="text-yellow-800 fas fa-plus"></i>
                  </button>
                </span>
                {/* remove from cart */}
                <button
                  className=" rounded-lg  mx-auto my-auto w-12 h-12 bg-white border shadow-lg"
                  onClick={() => dispatch(removeFromCart(product._id))}
                >
                  <i className="fas fa-trash text-red-800"></i>
                </button>
              </span>
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Base title="Your Cart" description="Ready to checkout">
      <div className="h-screen grid grid-cols-1 md:grid-cols-2 pt-20 gap-x-4 gap-y-4 p-4">
        <div className=" md:overflow-x-auto scrollbar">
          {cartcount > 0 ? (
            loadAllProducts()
          ) : (
            <Typography variant="h6" align="center">
              Cart Is Empty
            </Typography>
          )}
        </div>
        <div className="h-0">
          <PaymentBraintree products={data} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
