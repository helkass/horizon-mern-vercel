import defaultImage from "../../assets/images/defaultImage.jpg";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DefaultInput } from "../Form";
import { publicRequest } from "../../requestMethods";
import InputTwoFlex from "../molecules/inputs/InputTwoFlex";
import InputReadDefaultValue from "../atoms/inputs/InputReadDefaultValue";
import Loading from "../Loading";

const Dashboard = (props) => {
   const [customer, setCustomer] = useState({});
   const { id } = useParams();
   const [isLoading, setLoading] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         await publicRequest
            .get(`/customer/${id}`)
            .then((response) => setCustomer(response.data));
      };
      fetchData();
   }, []);

   // update customer all data with PUT method
   const updateCustomer = async (data) => {
      await publicRequest.patch(`/customer/update/${id}`, data);

      setTimeout(() => {
         setLoading(false);
      }, 1500);
   };
   const handleUpdate = async (e) => {
      setLoading(true);
      e.preventDefault();
      const form = new FormData(e.target);
      const data = Object.fromEntries(form.entries());

      setTimeout(() => {
         updateCustomer(data);
      }, 1000);
   };
   return (
      <>
         {isLoading && (
            <Loading styledCustom="absolute top-0 left-0 right-0 cursor-not-allowed" />
         )}
         <form
            onSubmit={handleUpdate}
            className="sm:w-9/12 px-5 space-y-2 min-h-screen">
            <div className="flex gap-3 items-center">
               <div className="w-[90px] h-[90px] rounded-full">
                  <img
                     src={customer.img || defaultImage}
                     className="rounded-full"
                     alt={`photo ${customer.fullname}`}
                  />
               </div>
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
      </>
   );
};

export default Dashboard;
