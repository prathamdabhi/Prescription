import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docid }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setrelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const doctorsData = doctors.filter(
      (doc) => doc.speciality === speciality && doc._id !== docid
    );
    setrelDoc(doctorsData);
  }, [doctors, speciality, docid]);
  return (
    <div className="flex flex-col gap-4 items-center my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors To Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply Browse Through our extensive list of trusted doctors
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 sm:px-0 px-3 gap-y-6">
        {relDoc.slice(0, 5).map((item) => (
          <div
            onClick={() => {
              navigate(`/apointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
            key={item._id}
          >
            <img className="bg-blue-50" src={item.image} alt="" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-400">
                <p
                  className={`w-2 h-2 ${
                    item.available ? "bg-green-400" : "bg-red-400"
                  } rounded-full`}
                  rounded-full
                ></p>
                <p
                  className={`${
                    item.available ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.available ? "Available" : "Not Available"}
                </p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/doctors")}
        className="bg-blue-50 text-gray-800 px-12 py-4 mt-4 rounded-full hover:bg-primary hover:text-white"
      >
        More
      </button>
    </div>
  );
};

export default RelatedDoctors;
