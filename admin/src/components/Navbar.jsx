import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DocterContext } from "../context/DocterContext";

const Navbar = () => {
  const { atoken, setAtoken } = useContext(AdminContext);
  const { dtoken, setDtoken } = useContext(DocterContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    if (atoken) {
      setAtoken("");
      localStorage.removeItem("atoken");
    } else {
      setDtoken("");
      localStorage.removeItem("dtoken");
    }
  };
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 border-b py-3 bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt=""
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {atoken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm sm:text-base py-1 px-6 rounded-full"
      >
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
