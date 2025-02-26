import React from "react";
import { useNavigate } from "react-router-dom";
import headerImg from "../assets/headerimg.jpg";

const Header = () => {
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-10 max-w-6xl mx-auto">
      {/* Left Side (Text + Buttons) */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
        <span className="text-3xl text-slate-700 font-medium my-5">
          Welcome to the Network of Professionals
        </span>

        <button className="bg-blue-500 text-white hover:bg-blue-400 rounded-xl py-3 px-6 my-2 w-full max-w-xs">
          Continue with Google
        </button>
        <button className="hover:bg-slate-300 border rounded-xl py-3 px-6 my-2 w-full max-w-xs">
          Continue with Microsoft
        </button>
        <button
          className="hover:bg-slate-300 border rounded-xl py-3 px-6 my-2 w-full max-w-xs"
          onClick={loginHandler}
        >
          Sign in with Email
        </button>
      </div>

      {/* Right Side (Image) */}
      <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
        <img
          src={headerImg}
          alt="Header"
          className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default Header;
