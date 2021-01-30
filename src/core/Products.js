import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories, fetchAllProducts } from "../redux/productActions";
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
      <div
        className="grid grid-rows-4 p-5   md:grid-cols-8 md:pb-20 gap-3 "
        style={{ height: "100vh" }}
      >
        <section className="grid grid-cols-2 lg:h-60 mt-14  md:row-start-2 md:row-end-3  md:shadow-xl p-2 rounded-lg">
          <h1 className="col-span-full font-bold text-3xl border-b-2 mb-1 ">
            Filters
          </h1>
          {categories.map((category) => (
            <span className="lg:col-span-full " key={category._id}>
              <input
                name={category.name}
                className="mx-2"
                type="checkbox"
                checked={activeCategories.includes(category._id)}
                onChange={() => dispatch(filterByCategory(category._id))}
              />
              <label for={category.name}>{category.name}</label>
            </span>
          ))}
        </section>

        <div className="scrollbar row-start-2 row-end-5 md:row-start-1 p-5  md:col-start-2 md:col-end-9  md:mb-10 mt-14  ">
          <div className="grid grid-cols-1 h-full md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-2   overflow-x-auto">
            {filteredData.length > 0 ? (
              filteredData.map((product) => (
                <div key={product._id}>
                  <CartCard product={product} />
                </div>
              ))
            ) : data.length > 0 ? (
              data.map((product) => (
                <div key={product._id}>
                  <CartCard product={product} />
                </div>
              ))
            ) : (
              <div>
                No Products <span role="image">😯</span> You Have to Wait
              </div>
            )}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
