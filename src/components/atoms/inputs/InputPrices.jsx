import React from "react";

const InputPrices = ({ priceValue, htmlFor, size, nameInput }) => {
   return (
      <>
         <label htmlFor={htmlFor} className=" w-1/2 text-sm">
            {size}
         </label>
         <div className="flex">
            <span>Rp.</span>
            <input
               name={nameInput}
               id={nameInput}
               value={priceValue}
               readOnly
               className="w-12 focus:border-none outline-none"
            />
         </div>
      </>
   );
};

export default InputPrices;
