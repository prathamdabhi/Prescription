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
        alt="logo"
      />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/"><li className="py-1">HOME</li></NavLink>
        <NavLink to="/doctors"><li className="py-1">ALL DOCTORS</li></NavLink>
        <NavLink to="/about"><li className="py-1">ABOUT</li></NavLink>
        <NavLink to="/contact"><li className="py-1">CONTACT</li></NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="hidden md:flex items-center gap-1 group relative">
            <img
              className="w-9 rounded-full cursor-pointer"
              src={userData.image}
              alt="profile"
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 flex rounded flex-col p-4 gap-4">
                <p onClick={() => navigate("/my-profile")} className="hover:bg-primary hover:text-white cursor-pointer">
                  My Profile
                </p>
                <p onClick={() => navigate("/my-apointments")} className="hover:bg-primary hover:text-white cursor-pointer">
                  My Appointment
                </p>
                <p onClick={logOut} className="hover:bg-primary hover:text-white cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-6 py-3 md:block hidden font-light rounded-full shadow-md"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <img
          onClick={() => setShowMenu(!showMenu)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu"
        />

        {/* Mobile Menu */}
        {showMenu && (
          <div className="fixed inset-0 bg-white z-20 flex flex-col items-center gap-7 p-5 text-lg font-medium md:hidden">
            <div className="flex items-center justify-between w-full px-5">
              <img className="w-36" src={assets.logo} alt="logo" />
              <img
                className="w-7 cursor-pointer"
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                alt="close"
              />
            </div>
            <NavLink onClick={() => setShowMenu(false)} to="/">
              HOME
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              ALL DOCTORS
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              ABOUT
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              CONTACT
            </NavLink>
            {token ? (
              <>
                <p onClick={() => { navigate("/my-profile"); setShowMenu(false); }} className="cursor-pointer">
                  My Profile
                </p>
                <p onClick={() => { navigate("/my-apointments"); setShowMenu(false); }} className="cursor-pointer">
                  My Appointment
                </p>
                <p onClick={() => { logOut(); setShowMenu(false); }} className="cursor-pointer">
                  Logout
                </p>
              </>
            ) : (
              <button
                onClick={() => { navigate("/login"); setShowMenu(false); }}
                className="bg-primary text-white px-6 py-3 font-light rounded-full shadow-md"
              >
                Create Account
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
