import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

import { getAllProducts, deleteProduct } from "./helper/adminapicalls";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/productActions";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.products);

  const { user, token } = isAuthenticated();

  // const preload = () => {
  //   getAllProducts().then((data) => {
  //     if (data.errors) {
  //       console.log(data.errors);
  //     } else {
  //       setProducts(data);
  //     }
  //   });
  // };

  useEffect(() => {
    // preload();
    dispatch(fetchAllProducts(100));
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user.id, token).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        // preload();
      }
    });
  };

  return (
    <>
      <div className="flex flex-col h-5/6 scrollbar overflow-x-auto">
        <h2 className="text-center text-black my-3">
          In Inventory {data.length} Products
        </h2>

        {data.map((product, index) => {
          return (
            <div key={index} className=" ">
              <div className="col-4">
                <h3 className="text-black text-left">{product.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/${product._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => {
                    deleteThisProduct(product._id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ManageProducts;
