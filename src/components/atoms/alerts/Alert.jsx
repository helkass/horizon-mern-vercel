import React from "react";
import { BiErrorAlt, BiCheck } from "react-icons/bi";

const Alert = ({ onClick, message, error, success }) => {
   return (
      <div onClick={onClick} className="container success mx-auto">
         <div
            className={`flex relative justify-center gap-2 mx-auto border ${
               error && "bg-red-100 border-red-400 text-red-600"
            } ${
               success && "bg-green-100 border-green-400 text-green-600"
            } rounded-md md:w-3/6 w-4/6 my-4 text-md py-2 text-center`}>
            {message}
            {error && <BiErrorAlt size={22} color={"#dc2626"} />}
            {success && <BiCheck size={22} color="#16a34a" />}
         </div>
      </div>
   );
};

// auto hidden after action
export const AbsoluteAlert = ({ message, success, error, isShow }) => {
   return (
      <div
         className={`fixed transition-all ease bottom-10  ${
            isShow ? "right-10" : "-right-full"
         }`}>
         <div
            className={`flex relative justify-center gap-2 border ${
               error && "bg-red-100 border-red-400 text-red-600"
            } ${
               success && "bg-green-100 border-green-400 text-green-600"
            } rounded-md w-max my-4 text-md py-2 px-3 text-center`}>
            {message}
            {error && <BiErrorAlt size={22} color={"#dc2626"} />}
            {success && <BiCheck size={22} color="#16a34a" />}
         </div>
      </div>
   );
};

export default Alert;
