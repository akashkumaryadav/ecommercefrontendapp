import { cartActions } from "./store";

const {
  ADD_SUCCESS,
  REMOVE_SUCCESS,
  empty,
  INCREMENT,
  DECREMENT,
} = cartActions;

// addItemToCart
export const addToCart = (product) => async (dispatch) => {
  try {
    await dispatch(ADD_SUCCESS(product));
  } catch (error) {
    console.log(error);
  }
};

// removeItemFromCart
export const removeFromCart = (productId) => async (dispatch) => {
  try {
    await dispatch(REMOVE_SUCCESS(productId));
  } catch (error) {
    console.log(error);
  }
};

//increase the quantity

export const incrementQuantity = (productId) => async (dispatch) => {
  try {
    await dispatch(INCREMENT(productId));
  } catch (error) {
    console.log(error);
  }
};

// decrement the quantity
export const decrementQuantity = (productId) => async (dispatch) => {
  try {
    await dispatch(DECREMENT(productId));
  } catch (error) {}
};
