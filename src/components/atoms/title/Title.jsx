import React from "react";

const Title = ({ title, styledCustom }) => {
   return (
      <h5
         className={`md:font-semibold cursor-default text-amber-900 hover-3 p-1 rounded md:pr-10 text-2xl sm:w-10/12 capitalize ${styledCustom}`}>
         {title}
      </h5>
   );
};

export const SubTitle = ({ title, styledCustom }) => {
   return (
      <p
         className={`w-full lg:w-full md:w-11/12 xl:mt-10 md:mt-5 lg:mt-8 my-7 ${styledCustom}`}>
         {title}
      </p>
   );
};

export default Title;
