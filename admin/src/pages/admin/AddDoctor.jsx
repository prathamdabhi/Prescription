import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docimg, setDocimg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [degree, setDegree] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl,atoken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(!docimg){
        toast.error('Please upload doctor image');
      }
      const formData = new FormData();
      formData.append('image', docimg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('degree', degree);
      formData.append('speciality', speciality);
      formData.append('address', JSON.stringify({line1: address1,line2: address2}))

      formData.forEach((value,key)=> {
        console.log(`${key} : ${value}`)
      })

      const { data } = await axios.post(`${backendUrl}/api/v1/admin/add-doctor`,formData, { headers: {atoken}})
      if(data.success){
        toast.success('Doctor Added Successfully');
        setDocimg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('')
        setFees('')
        setAbout('')
        setDegree('')
        setSpeciality('')
        setAddress1('')
        setAddress2('')
      }else{
        toast.error('Doctor Not Added');
      }

    } catch (error) {
      toast.error(error.message);
      console.log(error)
    }
    
  }
  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
     <p className='m-b text-lg font-medium'>ADD DOCTOR</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500 '>
          <label htmlFor="doc-image">
          <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docimg ? URL.createObjectURL(docimg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=> setDocimg(e.target.files[0])} type="file" id='doc-image' hidden />
          <p>Upload Doctor <br /> Picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
          <div className='flex-1 flex flex-col gap-1'>
            <label htmlFor="doc-name">Doctor Name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Enter Doctor name'  id="doc-name" required />
          </div>

          <div className='flex-1 flex flex-col gap-1'>
            <label htmlFor="doc-email">Doctor Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Enter Doctor Email'  id="doc-email" required />
          </div>

          <div className='flex-1 flex flex-col gap-1'>
            <label htmlFor="doc-password">Doctor Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Enter Doctor password'  id="doc-password" required />
          </div>

          <div className='flex-1 flex flex-col gap-1'>
            <label htmlFor="doc-experience">Doctor experience</label>
            <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' id="doc-experience">
              <option value="1 year">1 year</option>
              <option value="2 year">2 year</option>
              <option value="3 year">3 year</option>
              <option value="4 year">4 year</option>
              <option value="5 year">5 year</option>
              <option value="6 year">6 year</option>
              <option value="7 year">7 year</option>
              <option value="8 year">8 year</option>
              <option value="9 year">9 year</option>
              <option value="10 year">10 year</option>
            </select>
          </div>

          <div className='flex-1 flex flex-col gap-1'>
            <label htmlFor="doc-fees">Doctor Fees</label>
            <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="text" placeholder='Enter Doctor Fees'  id="doc-fees" required />
          </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
          <div className='flex-1 flex flex-col gap-1'>
            <label htmlFor="doc-speciality">Doctor Speciality</label>
            <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' id="doc-speciality">
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div className='flex-1 flex flex-col gap-1'>
            <label htmlFor="doc-education">Doctor Education</label>
            <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Enter Doctor Education'  id="doc-education" required />
          </div>

          <div className='flex-1 flex flex-col gap-1'>
            <label>Doctor Address</label>
            <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Enter Doctor Address1'   required />
            <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='Enter Doctor Address2'   required />
          </div>

          </div> 
        </div>

        <div>
          <p className='mt-4 mb-2' >About Doctor</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='Enter About Doctor' rows={5} required />
        </div>
        <button type='submit' className='bg-primary text-white px-10 py-3 rounded-full mt-3 m-auto block'>Add Doctor</button>
      </div>
    </form>
  )
}

export default AddDoctor
