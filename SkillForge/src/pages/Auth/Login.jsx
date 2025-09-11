import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Input from '../../component/Input/Input'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Dashboard from '../Home/Dashboard'
import { useContext } from 'react';
import { UserContext } from '../../context/usercontext';
const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  {/* This function prevents page reloding after submitting form */}
  const handleLogin = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return ;
    }
    if(!password){
      setError("Please enter the password");
      return ;
    }
    setError("");
    //login api call
    
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      })
      const {token}=response.data;
      if(token){
        localStorage.setItem("token",token)
        updateUser(response.data)
        navigate("/Dashboard")
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. PLEASE try again");
      }
    }
  };
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Please enter your details to Log-in
      </p>
      <form onSubmit={handleLogin}>
        <Input value={email} onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="abc@gmail.com"
          type="text" />
        <Input value={password} onChange={({ target }) => setPassword(target.value)}
          label="password"
          placeholder="Min 8 Characters"
          type="password" />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button
          type="submit"
          className="w-full mt-4 bg-black text-white py-2 rounded-md transition duration-300 
             hover:bg-gradient-to-r hover:from-[#6a85f1] hover:to-[#9b6bff]"
        >
          LOGIN
        </button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have an account?{" "}
          <button className='font-medium  underline cursor-pointer' onClick={() => {
            setCurrentPage("Signup")
          }}>SignUp</button>
        </p>
      </form>
    </div>
  )
}
export default Login;
