import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const { name, email } = isAuthenticated().user;
  return (
    <Base title="Admin Dashboard" descripton="this is admin dashboard 😎">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="card">
              <div className="card-header text-dark">
                Profile{" "}
                <small className="badge-danger rounded-pill p-1 float-right">
                  Admin
                </small>
              </div>
              <ul className="card-body  m-0 p-0">
                <li className="nav-link text-dark">
                  Name: <span className="text-dark-50">{name}</span>
                </li>
                <li className="nav-link text-dark">
                  Email: <span className="text-dark-50">{email}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-9 text-dark">
            <div className="card">
              <div className="card-header">
                <strong>Manage Products Here</strong>
              </div>
              <div className="card-body">
                <Link
                  to="/admin/create/category"
                  className="nav-link border-bottom"
                >
                  Create Category
                </Link>
                <Link
                  to="/admin/manage/categories"
                  className="nav-link border-bottom"
                >
                  Manage Categories
                </Link>
                <Link
                  to="/admin/create/product"
                  className="nav-link border-bottom"
                >
                  Create Product
                </Link>
                <Link
                  to="admin/product/create"
                  className="nav-link border-bottom"
                >
                  Manage Products
                </Link>
                <Link
                  to="admin/order/create"
                  className="nav-link border-bottom"
                >
                  Manage Orders
                </Link>
              </div>
              <div className="card-footer p-2 border-top-0">
                <div className="row">
                  <div className="col-lg-5 col-md-5 col-sm-5 col-xs-11 m-1">
                    <button className="btn btn-warning rounded-pill">
                      User dashboard
                    </button>
                  </div>
                  <div className="col-lg-5 col-md-5 col-sm-5 col-xs-11 m-1">
                    <button className="btn btn-info rounded-pill">
                      Product page
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};
