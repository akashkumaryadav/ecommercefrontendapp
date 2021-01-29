import {
  getAllCategories,
  getAllProducts,
  getProduct,
} from "../admin/helper/adminapicalls";
import { productActions } from "./store";

const { fetchAllProductSuccess, fetchAllCategorySuccess } = productActions;

export const fetchAllProducts = (limit) => async (dispatch) => {
  try {
    await getAllProducts(limit).then((response) =>
      dispatch(fetchAllProductSuccess({ data: response }))
    );
  } catch (error) {
    console.error(error, "pa");
  }
};

export const fetchAllCategories = () => async (dispatch) => {
  try {
    await getAllCategories().then((response) =>
      dispatch(fetchAllCategorySuccess({ categories: response }))
    );
  } catch (error) {
    console.log(error);
  }
};
