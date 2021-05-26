import { Category } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories, fetchAllProducts } from "../redux/productActions";
import { productActions } from "../redux/store";
import CartCard from "./CartCard";
import Modal from "./helper/Modal";

function Products() {
  const [showModal, setShowModal] = useState(false);
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

  return (
    <>
      <div className="grid pt-20" style={{ height: "100vh" }}>
        <section className="grid col-span-full m-2 grid-cols-2">
          <button
            onClick={() => setShowModal(!showModal)}
            className="rounded-xl py-2 2"
          >
            <i class="fas fa-filter"></i> Filter
          </button>
         <label htmlFor="sortby" className="self-center pl-10 font-bold">
          Sort By <i class="fas fa-sort"></i>
          <select className="w-5/6">
            <option>Price</option>
            <option>Popularity</option>
            <option>Newly Added</option>
          </select>
         </label>
            {/* filter modal */}
          <Modal show={showModal} onClose={setShowModal}>
            <span className="flex flex-col justify-center items-center bg-white w-full h-full rounded-xl">
              <h1>Filter By Category</h1>
              <span className="flex flex-wrap justify-center">
                {categories.map((category) => (
                  <span className="m-3" key={category._id}>
                    <label htmlFor={category.name}>
                      {" "}
                      <input
                        className="m-2"
                        name={category.name}
                        type="checkbox"
                        checked={activeCategories.includes(category._id)}
                        onChange={() =>
                          dispatch(filterByCategory(category._id))
                        }
                      />
                      {category.name}
                    </label>
                  </span>
                ))}
              </span>
            </span>
          </Modal>
          {/* filter mode end */}
        </section>

        <div className="scrollbar  ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-3 gap-y-4    overflow-x-auto">
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
                className="shadow-lg px-4 py-2 rounded-xl bg-gray-500 text-white m-2"
                onClick={() => dispatch(incrementLimit())}
              >
                More Products
              </button>
              <button
                className="shadow-lg px-4 py-2 rounded-xl bg-gray-700 text-white"
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
