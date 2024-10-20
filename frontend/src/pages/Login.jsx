import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Login() {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { backendUrl, token, setToken } = useContext(AppContext); 

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Sign Up'){
        const { data } = await axios.post(`${backendUrl}/api/v1/user/register`,{name,email,password})
        if(data.success){
          toast.success('User registered successfully')
          setToken(data.token)
          localStorage.setItem('token',data.token);
        }else{
          toast.error(data.message)
        }
      }else{
        const { data } = await axios.post(`${backendUrl}/api/v1/user/login`,{email,password})
        if(data.success){
          toast.success('User logged in successfully')
          setToken(data.token)
          localStorage.setItem('token',data.token);
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if(token){
      navigate('/');
    }
  }, [token]);
  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-5 m-auto items-start p-8 min-w-[340px] sm:min-w-98 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Sign Up" : "Sign in"} To Book
          Appointment{" "}
        </p>
        {state === "Sign Up" && (
          <div className="w-full flex flex-col mb-1">
            <label htmlFor="fullname">Full Name:</label>
            <input
              className="border-2 py-0.4 px-1 w-full rounded mt-1 text-zinc-600 text-sm focus:outline-blue-500"
              type="text"
              id="fullname"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full flex flex-col mb-1">
          <label htmlFor="email">Email:</label>
          <input
            className="border-2 py-0.4 px-1 w-full rounded mt-1 text-zinc-600 text-sm focus:outline-blue-500"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full flex flex-col mb-1">
          <label htmlFor="password">Password:</label>
          <input
            className="border-2 py-0.4 px-1 w-full rounded mt-1 text-zinc-600 text-sm focus:outline-blue-500"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="submit" className="bg-primary text-white py-2 px-9 rounded-full border mt-2 w-full hover:scale-105 transition-all duration-300">
          {state === "Sign Up" ? "Create Account" : "Sign In"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-500 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create new account{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-500 underline cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
