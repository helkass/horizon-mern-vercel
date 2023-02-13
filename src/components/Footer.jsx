import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import React from "react";

const Footer = () => {
   return (
      <footer className="bg-yellow-100 pt-12 text-sm bg-opacity-70 tracking-wider text-center">
         <p className="text-lg mb-5 text-yellow-700 font-semibold">
            Horizon Coffee Shop
         </p>
         <p className="text-gray-600">
            Sebuah Coffee Shop yang menawarkan berbagai jenis kopi lokal dan
            cara penyajian yang modern dengan harga tradisional.
         </p>
         <ul className="items-center m-auto max-w-max text-yellow-800 my-5">
            <a
               href="https://www.instagram.com/horizon.tby/"
               className="flex gap-2 text-center items-center">
               <AiFillInstagram />
               <p>horizon_tby</p>
            </a>
            <li className="flex gap-2 text-center items-center">
               <FaTiktok />
               <p>horizon_tby</p>
            </li>
         </ul>
         <div className="flex text-gray-600 text-center max-w-max max-h-max gap-2 mx-auto text-sm my-8 md:my-4">
            <HiLocationMarker size={21} />
            <span>
               Rt.05/Rw.01 Kenanti Tambakboyo Tuban Jawa Timur 62353 Indonesia
            </span>
         </div>
         <div className="bg-yellow-800 bg-opacity-70 text-yellow-100 py-2 text-sm md:text-normal">
            <p>Copyright Horizon 2022</p>
         </div>
      </footer>
   );
};

export default React.memo(Footer);
