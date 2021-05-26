import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated, signout } from "../auth/helper/index";
import NeumoNavLink from "./menuComponents/NeumoNavLinks";

const Menu = () => {
  const [profileMenu, setProfleMenu] = useState(false);
  const [menu, setMenu] = useState(false);
  const [redirect,setRedirect] = useState(false); 
  const { cartcount } = useSelector((state) => state.carts);

  if(redirect){
    return <Redirect to="/home"/>
  }

  return (
    <Fragment>
      <span>
        <nav className="bg-white fixed w-full z-10 top-0 border-b">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* menu triggel */}
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-expanded="false"
                  onClick={() => setMenu(!menu)}
                >
                  <span className="sr-only">Open main menu</span>

                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* brand */}
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start text-2xl font-bold text-gray-800">
                <div className="flex-shrink-0 flex items-center">
                  <span className="block lg:hidden h-8 w-auto"> <NavLink to="/">DC</NavLink></span>
                  <span className="hidden lg:block h-8 w-auto" alt="Workflow">
                    <NavLink to="/">Digital Complex</NavLink>
                  </span>
                </div>
                {/* menu */}
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {isAuthenticated() && (
                      <NeumoNavLink to="/user/dashboard" label="dashboard" />
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                      <NeumoNavLink
                        to="/admin/dashboard"
                        label="Admin DashBoard"
                      />
                    )}
                    <NeumoNavLink to="/home" label="prdoucts" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* cart */}
                {isAuthenticated() && (
                  <NavLink
                    to="/user/cart"
                    className="p-1  w-8 shadow-lg rounded-full border "
                    activeClassName="neumoinset"
                  >
                    <span className="flex">
                      <p className="absolute ml-4 top-2 z-10 text-white rounded-full w-4 h-4 text-center pb-5 bg-black font-bold">
                        {cartcount}
                      </p>
                      <i className="block text-xl text-black  fas fa-shopping-cart"></i>
                    </span>
                  </NavLink>
                )}
                {/* profileMenu trigger */}
                <div className="ml-3 relative">
                  <div>
                    {isAuthenticated() && (
                      <button
                        className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        id="user-menu"
                        onClick={() => setProfleMenu(!profileMenu)}
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>

                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://avatars.githubusercontent.com/u/49105309?s=460&u=17e3a305920b300802a671a1b3dd9e149996f710&v=4"
                          alt=""
                        />
                      </button>
                    )}
                    {!isAuthenticated() && (
                      <span className="hidden md:flex space-x-2 ">
                        <NavLink
                          className="block px-4 py-2 text-sm text-black  shadow-md rounded-xl"
                          to="/signin"
                          role="menuitem"
                          activeClassName="neumoinset"
                        >
                          Signin
                        </NavLink>
                        <NavLink
                          className="block px-4 py-2 text-sm text-black shadow-md rounded-xl"
                          activeClassName="neumoinset"
                          to="/signup"
                          role="menuitem"
                        >
                          Signup
                        </NavLink>
                      </span>
                    )}
                  </div>
                  {/* profieMenu */}
                  <div
                    className={`${
                      profileMenu ? "visible" : "hidden"
                    } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-20`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    {!isAuthenticated() && (
                      <span>
                        <NavLink
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          to="/signin"
                          role="menuitem"
                        >
                          Signin
                        </NavLink>
                        <NavLink
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          to="/signup"
                          role="menuitem"
                        >
                          Signup
                        </NavLink>
                      </span>
                    )}
                    {isAuthenticated() && (
                      <span>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Your Profile
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Settings
                        </a>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={() =>
                            signout(() => {
                              toast.error("signed out");
                              setRedirect(true);
                            })
                          }
                        >
                          Sign out
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* menuDrop */}
          <div className={`${menu ? "visible" : "hidden"} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                className="text-white px-3 py-2 rounded-md text-sm font-medium"
                to="/user/dashboard"
                activeClassName="bg-gray-900"
              >
                DashBoard
              </NavLink>
              <NavLink
                to="/admin/dashboard"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="bg-gray-900"
              >
                Admin DashBoard
              </NavLink>
              <NavLink
                to="/home"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="bg-gray-900"
              >
                Products
              </NavLink>{" "}
            </div>
          </div>
        </nav>
      </span>
    </Fragment>
  );
};

export default withRouter(Menu);
