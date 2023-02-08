import React from 'react';
import { ImageBasic } from '../../atoms/image/Image';
import defaultImage from "../../../assets/images/defaultImage.jpg"

const CardImage = ({ src, alt, title, writer, imageStyleCustom }) => {
  return (
    <>
        <div className="w-full items-center my-2 flex justify-center">
            <ImageBasic src={src || defaultImage} alt={alt} styledCustom={imageStyleCustom}/>
        </div>
        <div className="absolute bg-white w-11/12 sm:w-10/12 text-amber-800 shadow-amber-300 shadow-md bottom-0 sm:px-4 px-2 py-2 translate-y-1/3 md:rounded-2xl rounded left-1/2 -translate-x-1/2 sm:h-18 h-max ">
            <p>{title || "unknown"}</p>
            <p className="opacity-70 text-xs sm:mt-2 mt-1">by {' '}
                <span className="opacity-100">{writer || "unknown"}</span>
            </p>
        </div>
    </>
  )
}

export default CardImage;