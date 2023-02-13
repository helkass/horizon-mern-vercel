import React from "react";

const FormTemplate = ({ children, styledCustom }) => {
   return (
      <div
         className={`${styledCustom} grid w-full gap-3 bg-white/70 backdrop-blur-60 rounded-md p-4`}>
         {children}
      </div>
   );
};

export default FormTemplate;
