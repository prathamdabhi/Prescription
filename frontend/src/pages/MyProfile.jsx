import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

function MyProfile() {
  const {userData,setUserData,token,backendUrl,loadUserData} = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)
      image && formData.append('image',image)

      const { data } = await axios.put(`${backendUrl}/api/v1/user/update-profile`,formData,{ headers: {token}})
      if(data.success){
        toast.success('Profile updated successfully')
        loadUserData()
        setIsEdit(false)
        setImage(false)
      } else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error.message);
    }
  }
  return userData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">

      {
        isEdit ? (<label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-75" src={ image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className="w-10 absolute bottom-12 right-12" src={image ? '' : assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden  />
        </label>) : (
           <img className="w-36 rounded" src={userData.image} alt="" />
        )
      }
     
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
            <div className="flex gap-2 flex-col">
            <input className="bg-gray-100 max-w-52"
              type="text"
              value={userData.address?.line1}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, address:{...prev.address, line1: e.target.value} }))
              }
            />
            <input className="bg-gray-100 max-w-52"
              type="text"
              value={userData.address?.line2}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, address:{ ...prev.address, line2: e.target.value}}))
              }
            />
            </div>
          ) : (
           <div>
             <p className="text-blue-500">{userData.address?.line1}</p>
             <p className="text-blue-500">{userData.address?.line2}</p>
           </div>
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
          <button className="border border-primary rounded-full py-2 px-8 hover:bg-primary hover:text-white transition-all duration-200" onClick={updateUserProfileData}>Save</button>
        ) : (<button className="border border-primary rounded-full py-2 px-8 hover:bg-primary hover:text-white transition-all duration-200" onClick={()=>setIsEdit(true)}>Edit</button>)
      }
      </div>
    </div>
  );
}

export default MyProfile;
