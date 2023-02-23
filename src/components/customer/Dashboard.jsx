import defaultImage from "../../assets/images/defaultImage.jpg";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DefaultInput } from "../Form";
import { publicRequest } from "../../requestMethods";
import InputTwoFlex from "../molecules/inputs/InputTwoFlex";
import InputReadDefaultValue from "../atoms/inputs/InputReadDefaultValue";

const Dashboard = (props) => {
   const [customer, setCustomer] = useState({});
   const { id } = useParams();

   useEffect(() => {
      const fetchData = async () => {
         await publicRequest
            .get(`/customer/${id}`)
            .then((response) => setCustomer(response.data));
      };
      fetchData();
   }, []);
   const handleUpdate = async (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const data = Object.fromEntries(form.entries());
      console.log(data);
   };
   return (
      <form onSubmit={handleUpdate} className="sm:w-9/12 px-5 space-y-2">
         <div className="flex gap-3 items-center">
            <div className="w-[90px] h-[90px] rounded-full">
               <img
                  src={customer.img || defaultImage}
                  className="rounded-full"
                  alt={`photo ${customer.fullname}`}
               />
            </div>
            <input
               type="file"
               name="image"
               className="block text-sm cursor-pointer text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-600"
            />
         </div>
         <InputTwoFlex
            label1="fullname"
            inputName1="fullname"
            defaultValue1={customer.fullname}
            border
            label2="phone"
            defaultValue2={customer.phone}
            inputName2="phone"
         />
         <DefaultInput
            name="address"
            label="address"
            defaultValue={customer.address}
         />
         <InputTwoFlex
            label1="city"
            inputName1="city"
            defaultValue1={customer.city}
            border
            label2="province"
            defaultValue2={customer.province}
            inputName2="province"
         />
         <InputReadDefaultValue
            name="email"
            type="email"
            defaultValue={customer.email}
            border
            label="email"
            styledCustom="md:w-1/2"
         />
         <div className="w-full font-flower flex justify-end">
            <button
               type="submit"
               className="px-4 py-2 rounded-md bg-yellow-100 min-w-[100px] my-7">
               Save
            </button>
         </div>
      </form>
   );
};

export default Dashboard;
