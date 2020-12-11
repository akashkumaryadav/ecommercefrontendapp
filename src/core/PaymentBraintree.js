import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/carthelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymenthelper";
import { createOrder } from "./helper/orderhelper";
import { isAuthenticated } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";
import { Button, Typography } from "@material-ui/core";
import { toast } from "react-toastify";

const PaymentBraintree = ({
  products,
  setReload = (f) => f,
  reload = false,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user.id;

  const token = isAuthenticated() && isAuthenticated().auth_token;

  const getToken = (userId, token) => {
    getmeToken(userId, token)
      .then((info) => {
        // console.log("INFORMATION", info);
        if (info.error) {
          setInfo({ ...info, error: info.error });
        } else {
          const clientToken = info.clientToken;
          setInfo({ ...info, clientToken });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showbtdropIn = () => {
    return (
      <div style={{ paddingBottom: 20 }}>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              onClick={onPurchase}
            >
              Buy
            </Button>
          </div>
        ) : (
          <Typography variant="h4">
            Please login or add something to cart
          </Typography>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ ...info, loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      console.log("paying");
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          const orderData = {
            products: products,
            transection_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData);
          toast.success("Payment Done Order Is on The Way");
          //TODO: empty the cart
          cartEmpty(() => {
            console.log("clearing the cart");
          });
          //TODO: force reload
          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log(error);
          console.log("PAYMENT FAILED");
        });
    });
  };
  console.log(info);
  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <Typography variant="h5">Your bill is {getAmount()} $</Typography>
      {showbtdropIn()}
    </div>
  );
};

export default PaymentBraintree;
