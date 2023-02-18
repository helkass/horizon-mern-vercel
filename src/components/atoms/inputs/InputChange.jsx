import React from "react";

const InputChange = ({
   name,
   onChange,
   required,
   label,
   type,
   styledCustom,
   border,
   textArea,
}) => {
   return (
      <div className="grid w-full">
         <label className="text-yellow-700 capitalize text-sm">
            {label}
            {required && <span className="text-red-600 font-semibold">*</span>}
         </label>
         {textArea ? (
            <textarea
               onChange={onChange}
               id={name}
               name={name}
               className={`rounded-md min-h-[150px] font-medium p-1 mt-1 focus:outline-none ${
                  border && "border border-yellow-300"
               } ${styledCustom}`}
            />
         ) : (
            <input
               name={name}
               onChange={onChange}
               id={name}
               required={required}
               type={type}
               className={`border border-yellow-300 text-yellow-800 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 " ${
                  border && "border border-yellow-300"
               } ${styledCustom}`}
            />
         )}
      </div>
   );
};

export default InputChange;
