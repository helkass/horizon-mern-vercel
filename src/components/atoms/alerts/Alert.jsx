import React from "react";
import { BiErrorAlt, BiCheck } from "react-icons/bi";

const Alert = ({ onClick, message, error, success }) => {
   return (
      <div
         onClick={onClick}
         className={`${onClick & "cursor-pointer"}container success mx-auto`}>
         <div
            className={`flex relative justify-center gap-2 mx-auto border ${
               error && "bg-red-100 border-red-400 text-red-600"
            } ${
               success && "bg-yellow-100 border-yellow-400 text-yellow-600"
            } rounded-md w-max my-4 text-sm py-2 px-2 text-center whitespace-nowrap`}>
            <p>{message}</p>
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
         className={`fixed transition-all duration-500 ease bottom-10  ${
            isShow ? "flex" : "hidden"
         }`}>
         <div
            className={`flex relative justify-center gap-2 text-yellow-600 border ${
               error && "bg-red-100 border-red-400 text-red-600"
            } ${
               success && "bg-yellow-100 border-yellow-400 "
            } rounded-md w-max my-4 text-md py-2 px-3 text-center`}>
            {message}
            {error && <BiErrorAlt size={22} />}
            {success && <BiCheck size={22} />}
         </div>
      </div>
   );
};

export default Alert;
