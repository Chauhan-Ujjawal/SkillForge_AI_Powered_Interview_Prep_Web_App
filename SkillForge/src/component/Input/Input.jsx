import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full mb-4">
      <label className="text-[13px] text-slate-800">{label}</label>
      
      {/* input wrapper */}
      <div className="relative w-full flex items-center border border-slate-300 rounded-md px-2">
        
        {/* input box */}
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none py-2 pr-8"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {/* icons inside input */}
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={20}
                className="absolute right-3 text-primary cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="absolute right-3 text-slate-400 cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
