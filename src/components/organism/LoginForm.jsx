import React from "react";
import InputChange from "../atoms/inputs/InputChange";

const LoginForm = ({ handleSubmit, onChangeEmail, onChangePassword }) => {
   return (
      <form
         onSubmit={handleSubmit}
         className="bg-white rounded px-8 pt-6 pb-8 mb-4">
         <InputChange
            name="email"
            required
            onChange={onChangeEmail}
            type="email"
            id="email"
            label="email"
            border
         />
         <InputChange
            required
            type="password"
            onChange={onChangePassword}
            name="password"
            id="password"
            label="password"
            border
         />
         <div className="flex items-center justify-center flex-col mt-6">
            <button
               className="bg-yellow-200 hover:bg-yellow-500 tracking-wide text-yellow-600 hover:text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
               type="submit">
               Sign In
            </button>
         </div>
      </form>
   );
};

export default LoginForm;
