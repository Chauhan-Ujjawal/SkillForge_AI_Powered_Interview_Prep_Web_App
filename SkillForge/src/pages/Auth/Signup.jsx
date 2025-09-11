import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from "../../component/Input/Input"
import ProfilePhotoSelector from "../../component/Input/ProfilePhotoSelector"
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance'
import { useContext } from 'react';
import { UserContext } from '../../context/usercontext';
import uploadImage from '../../utils/uploadImage'
import {API_PATHS} from '../../utils/apiPaths'

const Signup = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    if (!fullName) {
      setError("Please enter full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
    //Login API call
    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic)
        console.log("Upload response 👉", imgUploadRes);
        profileImageUrl =  imgUploadRes.imageUrl || imgUploadRes.url || imgUploadRes.secure_url || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl
      })
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token)
        updateUser(response.data)
        navigate("/dashboard")
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. PLEASE try again");
      }
    }
  };


  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Create An Account</h3>
      <p className='text-xs text-slate-700 mt-[15px] mb-6'>
        Join us today by entering your details below.
      </p>
      <form onSubmit={handleSignup}>

        <ProfilePhotoSelector
          image={profilePic}
          setImage={setProfilePic}
          preview={preview}
          setPreview={setPreview} />

        <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
          <Input value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label='Full Name'
            placeholder="Ujjawal"
            type='text' />

          <Input value={email}
            onChange={({ target }) => setEmail(target.value)}
            label='Email Address'
            placeholder="Ujjawal@gmail.com"
            type='text' />

          <Input value={password}
            onChange={({ target }) => setPassword(target.value)}
            label='Password'
            placeholder="Min 8 Characters"
            type='password' />
        </div>
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button
          type="submit"
          className="w-full mt-4 bg-black text-white py-2 rounded-md transition duration-300 
             hover:bg-gradient-to-r hover:from-[#6a85f1] hover:to-[#9b6bff]"
        >
          SIGNUP
        </button>
        <p className='text-[13px] text-slate-800 mt-3'>
          Already have an account?{" "}
          <button className='font-medium text-primary underline cursor-pointer' onClick={() => {
            setCurrentPage("Login")
          }}>
            Login
          </button>
        </p>
      </form>
    </div>
  )
}
export default Signup;