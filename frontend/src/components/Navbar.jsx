import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const logOut = () => {
    setToken(false);
    localStorage.removeItem("token");
  };
  return (
    <div className="flex justify-between items-center mb-5 py-5 border-b border-b-gray-400 text-sm">
      <img
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden md:flex items-center gap-5 font-medium ">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-1 group relative">
            <img
              className="w-9 rounded-full cursor-pointer"
              src={userData.image}
              alt="profile picture"
            />
            <img
              className="w.2.5 h-2 cursor-pointer"
              src={assets.dropdown_icon}
              alt="dropdown icon"
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 flex rounded flex-col p-4 gap-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:bg-primary hover:text-white cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-apointments")}
                  className="hover:bg-primary hover:text-white cursor-pointer"
                >
                  My Appoitment
                </p>
                <p
                  onClick={logOut}
                  className="hover:bg-primary hover:text-white cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-6 py-3 md:block font-light hidden rounded-full shadow-md"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />
        {/* mobile menu */}
        <div
          className={` ${
            showMenu ? "fixed w-full" : "h-0 w-0"
          }md:hidden absolute left-0 right-0 top-0 bottom-0 z-20 overflow-hidden bg-white trasition-all `}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col gap-7 items-center mt-7 px-5 text-lg font-medium ">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
