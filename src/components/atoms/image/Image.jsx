import React from "react";

const ImageSection = ({ src, styledCustom }) => {
   return (
      <div
         className={`relative md:w-9/12 max-w-[370px] items-center mx-auto w-5/6 ${styledCustom}`}>
         <img src={src} alt="images section" />
      </div>
   );
};

export const ImageBasic = ({ src, alt, styledCustom }) => {
   return (
      <img
         alt={alt}
         src={src}
         className={`h-full w-full max-h-86 max-h-[280px] ${styledCustom}`}
      />
   );
};

export default ImageSection;
