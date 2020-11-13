import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAllCategories, createProduct } from "./helper/adminapicalls";
import { isAuthenticated } from "../auth/helper";
import { toast } from "react-toastify";
export const AddProduct = () => {
  const { user, auth_token } = isAuthenticated();
  const [values, setValues] = useState({
    categories: [],
    name: "",
    description: "",
    price: 0,
    category: "Summer",
    stock: 0,
    formData: "",
  });

  useEffect(() => {
    getAllCategories()
      .then((categories) =>
        setValues({
          ...values,
          categories: [categories],
          category: categories[0]._id,
          formData: new FormData(),
        })
      )
      .catch((err) => console.log(err));
  }, []);

  console.log(user.id);

  const handleOnChange = (e) => {
    const value =
      e.target.name === "photo" ? e.target.files[0] : e.target.value;
    console.log(e.target.name, value);
    values.formData.set(e.target.name, value);
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values.formData);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (!values.formData.get("category")) {
      values.formData.set("category", values.category);
    }
    const data = await createProduct(user.id, auth_token, values.formData);
    if (data.error) {
      console.log(data.error);
      toast.error(data.error);
    } else {
      console.log("created the product");
      toast.success("product added successfully 🎉");
    }
  };

  return (
    <Base title="Add a Product" descripton="add your product to sell 🤗">
      <div className="row">
        <form className="col-lg-6 col-md-8 col-sm-12 offset-lg-3">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={handleOnChange}
              placeholder="product name"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="description"
              onChange={handleOnChange}
              placeholder="product descriptoin"
            />
          </div>
          <div className="form-group">
            <select
              className="form-control"
              name="category"
              onChange={handleOnChange}
            >
              {values.categories[0] &&
                values.categories[0].map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="number"
              name="stock"
              min={0}
              onChange={handleOnChange}
              placeholder="stock available"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="number"
              name="price"
              min={0}
              onChange={handleOnChange}
              placeholder="price per product"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="file"
              name="photo"
              onChange={handleOnChange}
              placeholder="price per product"
            />
          </div>
          <button className="btn btn-primary" onClick={handleOnSubmit}>
            Add Product
          </button>
        </form>
      </div>
      <Link to="/admin/dashboard">Go to admin dashboard</Link>
    </Base>
  );
};
