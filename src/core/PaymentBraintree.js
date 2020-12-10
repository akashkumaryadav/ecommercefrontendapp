import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/carthelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymenthelper";
import { createOrder } from "./helper/orderhelper";
import { isAuthenticated } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";
import { Button } from "@material-ui/core";

const PaymentBraintree = ({
  products,
  setReload = (f) => f,
  reload = undefined,
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
              color="primary"
              onClick={onPurchase}
            >
              Buy
            </Button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
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
          //TODO: empty the cart
          //TODO: force reload
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
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
      <h3>Your bill is {getAmount()} $</h3>
      {showbtdropIn()}
    </div>
  );
};

export default PaymentBraintree;
