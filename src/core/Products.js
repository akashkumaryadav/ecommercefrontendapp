import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, fetchAllCategories } from "../redux/productActions";
import { productActions } from "../redux/store";
import CartCard from "./CartCard";

function Products() {
  const dispatch = useDispatch();
  const {
    data,
    limit,
    categories,
    filteredData,
    activeCategories,
  } = useSelector((state) => state.products);

  const { incrementLimit, decrementLimit, filterByCategory } = productActions;

  useEffect(() => {
    dispatch(fetchAllProducts(limit));
    dispatch(fetchAllCategories());
  }, [dispatch, limit]);

  console.log(filteredData);
  return (
    <>
      <section>
        {categories.map((category) => (
          <label key={category._id}>
            <input
              type="checkbox"
              checked={activeCategories.includes(category._id)}
              onChange={() => dispatch(filterByCategory(category._id))}
            />
            {category.name}
          </label>
        ))}
      </section>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((product) => (
            <div key={product._id} lg={3} md={4} sm={4} xs={12}>
              <CartCard product={product} />
            </div>
          ))
        ) : data.length > 0 ? (
          data.map((product) => (
            <div key={product._id} lg={3} md={4} sm={4} xs={12}>
              <CartCard product={product} />
            </div>
          ))
        ) : (
          <div>
            No Products <span role="image">😯</span> You Have to Wait
          </div>
        )}
      </div>
      <div className="p-5 gird grid-cols-2 w-full mx-auto justify-center items-center">
        <button
          className="py-2 mx-auto px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={() => dispatch(incrementLimit())}
        >
          More Products
        </button>
        <button
          className="py-2 mx-auto px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={limit > 4 ? () => dispatch(decrementLimit()) : ""}
        >
          Show Less
        </button>
      </div>
    </>
  );
}

export default Products;
