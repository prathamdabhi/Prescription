import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets_admin/assets.js'
import { AdminContext } from '../context/AdminContext.jsx';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
    const [state, setState] = useState('Admin');
  const {setAtoken,backendUrl} =  useContext(AdminContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        if(state === 'Admin'){
            const {data} = await axios.post(`${backendUrl}/api/v1/admin/login`,{email,password});

            if(data.success){
                localStorage.setItem('atoken', data.token);
                setAtoken(data.token);
                toast.success('Login successful');
            } else {
                toast.error(data.message || 'Invalid credentials');
            }
        }
    } catch (error) {
        toast.error('Invalid credentials');
        console.log(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-5 m-auto items-start p-8 min-w-[340px] sm:min-w-98 border rounded-xl text-zinc-600 text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
            <div className='w-full'>
                <label htmlFor="email">Email: </label>
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className='border w-full border-[#DADADA] rounded-lg p-1.5 mt-1' type='email' placeholder='Enter Email' id='email' required />
            </div>
            <div className='w-full'>
                <label htmlFor="password">Password: </label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} className='border w-full border-[#DADADA] rounded-lg p-1.5 mt-1' type='password' placeholder='Enter password' id='password' required />
            </div>
            <button className='bg-primary text-white rounded-lg w-full text-base py-2 hover:scale-105 transition-all duration-200'>Login</button>
            {
                state === 'Admin' ?(
                    <p>Doctor Login? <span className='text-blue-600 underline cursor-pointer' onClick={()=>setState('Docter')}>Click here</span></p> 
                ):( <p>Admin Login? <span className='text-blue-600 underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>)
            }
        </div>
      
    </form>
  )
}

export default Login
