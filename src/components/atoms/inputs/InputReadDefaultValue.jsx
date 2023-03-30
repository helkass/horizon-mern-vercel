import React from "react";

const InputReadDefaultValue = ({
   defaultValue,
   onChange,
   label,
   name,
   type,
   styledCustom,
   border,
}) => {
   if (label)
      return (
         <div className="grid w-full">
            <label className="text-gray-700">{label}</label>
            <input
               defaultValue={defaultValue}
               name={name}
               onChange={onChange}
               id={name}
               type={type}
               className={`focus:outline-none w-full font-medium p-2 mt-1 rounded-md ${
                  border && "border border-yellow-300"
               } ${styledCustom}`}
            />
         </div>
      );

   return (
      <input
         type={type || "text"}
         name={name}
         id={name}
         defaultValue={defaultValue}
         readOnly
         className={`shadow px-3 py-2 sm:w-1/2 focus:outline-none ${styledCustom}`}
      />
   );
};

export default InputReadDefaultValue;
