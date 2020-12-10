/// <reference path="../react-app-env.d.ts" />
import React from "react";
import DropIn from "braintree-web-drop-in-react";
import { getmeToken, processPayment } from "./helper/paymenthelper";
import { isAuthenticated } from "../auth/helper";

interface props {
products:any;
}


class Store extends React.Component<props> {
  instance:any;
  loading:any;
  success:any;
  clientToken:any;
  error:any;
   userId:any = isAuthenticated() && isAuthenticated().user.id;
   token:any = isAuthenticated() && isAuthenticated().auth_token;
  state = {
    loading: false,
    success: false,
    clientToken: null,
    error: "",
  };

  getToken = (userId:any, token:any) => {
    getmeToken(userId, token)
      .then((info) => {
        // console.log("INFORMATION", info);
        if (info.error) {
          this.setState({ error: info.error });
        } else {
          const clientToken = info.clientToken;
          this.setState({ clientToken: clientToken });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async componentDidMount() {
   
    this.getToken(this.userId, this.token);
  }

  onPurchase = () => {
    this.setState({ loading: true });
    let nonce;
   
    let getNonce = this.instance.requestPaymentMethod().then((data:any) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: this.getAmount(),
      };
      processPayment(this.userId, this.token, paymentData)
        .then((response) => {
          this.setState({ success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          //TODO: empty the cart
          //TODO: force reload
        })
        .catch((error) => {
          this.setState({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  getAmount = () => {
    let amount = 0;
    this.props.products.map((p:any) => {
      amount = amount + p.price;
    });
    return amount;
  };

  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div>
          <DropIn
            options={{ authorization: this.state.clientToken }}
            onInstance={(instance) => (this.instance = instance)}
          />
          <button onClick={this.onPurchase.bind(this)}>Buy</button>
        </div>
      );
    }
  }
}


export default Store;
