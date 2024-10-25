import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import { DocterContext } from "../context/DocterContext";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DocterContext);
  return (
    <div className="min-h-screen bg-white border-r">
      {atoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/admin-dashbord"
          >
            <img src={assets.home_icon} alt="" />
            <p>Dashbord</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/all-appointments"
          >
            <img src={assets.appointment_icon} alt="" />
            <p>Appointment</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/add-doctor"
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/doctor-list"
          >
            <img src={assets.people_icon} alt="" />
            <p>Doctor List</p>
          </NavLink>
        </ul>
      )}

      {dtoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/doctor-dashboard"
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashbord</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/doctor-appointments"
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointment</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/doctor-profile"
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
