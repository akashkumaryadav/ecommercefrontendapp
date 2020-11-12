import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicalls";
import { isAuthenticated } from "../auth/helper";
import { toast } from "react-toastify";

export const AddCategory = () => {
  const [values, setValues] = useState({
    name: "",
    success: false,
  });

  const { name, success } = values;
  const { user, auth_token } = isAuthenticated();

  console.log(isAuthenticated());

  const handleOnChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const data = await createCategory({
      userId: user.id,
      token: auth_token,
      category: { name },
    });
    if (data.error) {
      console.log(data.error);
      toast.error(data.error + " try some other name 😢");
    } else {
      toast.success(`${name} created 😎`);
    }
  };

  return (
    <Base title="Manage Your Collection Here">
      <div className="container">
        <div className="card text-dark  mb-3">
          <div className="card-header">
            <strong>Add Category</strong>
          </div>
          <div className="card-body">
            <h5 className="card-title">Fill out the Details</h5>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="For eg.Summer,Winter"
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={handleOnChange}
                />
              </div>
              <button
                className="btn btn-success rounded-pill m-2"
                onClick={handleOnSubmit}
              >
                create Category
              </button>
              <Link
                to="/admin/dashboard"
                className="btn btn-warning rounded-pill m-2"
              >
                GoBack
              </Link>
            </form>
            <p>{JSON.stringify(values, null, 2)}</p>
          </div>
        </div>
      </div>
    </Base>
  );
};
