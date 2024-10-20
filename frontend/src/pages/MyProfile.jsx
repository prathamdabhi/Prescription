import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

function MyProfile() {
  const [userData, setUserData] = useState({
    name: "Pratham Dabhi",
    image: assets.profile_pic,
    email: "XNjwJ@example.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
    gender: "Male",
    dob: "30/08/2003",
  });

  const [isEdit, setIsEdit] = useState();
  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img className="w-36 rounded" src={userData.image} alt="" />
      {isEdit ? (
        <input className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="text-3xl font-medium text-gray-800 mt-4">{userData.name}</p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none"/>
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFO</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 ">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input className="bg-gray-100 max-w-52"
              type="Number"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <input className="bg-gray-100 max-w-52"
              type="text"
              value={userData.address}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-500">{userData.address}</p>
          )}
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline mt-3">GENERAL INFO</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium ">Gender:</p>
          {isEdit ? (
            <select className="max-w-20 bg-gray-100"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="font-medium">{userData.gender}</p>
          )}
          <p className="font-medium">Date of Birth:</p>
          {
      isEdit ? (
        <input className='max-w-25 bg-gray-100' type="date" value={userData.dob} onChange={(e)=> setUserData(prev => ({...prev, dob: e.target.value}))} />
      ) : (<p className="font-medium">{userData.dob}</p>)
     }
        </div>
      </div>
      <div className="mt-10">
      {
        isEdit ? (
          <button className="border border-primary rounded-full py-2 px-8 hover:bg-primary hover:text-white transition-all duration-200" onClick={()=>setIsEdit(false)}>Save</button>
        ) : (<button className="border border-primary rounded-full py-2 px-8 hover:bg-primary hover:text-white transition-all duration-200" onClick={()=>setIsEdit(true)}>Edit</button>)
      }
      </div>
    </div>
  );
}

export default MyProfile;
