import { API } from "../../backend";

// category based calls
export const createCategory = ({ userId, token, category }) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result, "results");
      return result;
    })
    .catch((err) => console.log(err));
};

// get all categories
export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => console.log(err, "from get all categories"));
};

// product based calls
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => console.log(err, "from Product calls"));
};

/**
 *
 * @param {userId} param0  current logged in user
 * @param {token} param1 authentication token
 * @param {productId} param2  productId to get a specific product
 */
export const getProduct = ({ userId, token, productId }) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => response)
    .catch((err) => console.log(err, "from get product"));
};

/**
 * @param {limit} number of products to request
 * get all products
 */
export const getAllProducts = (limit) => {
  return fetch(`${API}/products/?limit=${limit}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err, "from get all products"));
};
