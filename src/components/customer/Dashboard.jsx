import defaultImage from "../../assets/images/defaultImage.jpg";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DefaultInput } from "../Form";
import InputTwoFlex from "../molecules/inputs/InputTwoFlex";
import InputReadDefaultValue from "../atoms/inputs/InputReadDefaultValue";
import Loading from "../Loading";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getCustomer, updateCustomer } from "../../helper/fetchCustomer";
import Alert from "../atoms/alerts/Alert";

const Dashboard = () => {
   const { id } = useParams();
   const [success, setSuccess] = useState(false);

   const queryClient = useQueryClient();

   const { data, isLoading, isError } = useQuery("customer", getCustomer(id));

   const updateCustomerMutation = useMutation(updateCustomer, {
      onSuccess: () => {
         queryClient.invalidateQueries("customer");
         setSuccess(true);
      },
   });

   useEffect(() => {
      setTimeout(() => {
         setSuccess(false);
      }, 1500);
   }, [success]);

   const handleUpdate = async (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const data = Object.fromEntries(form.entries());
      updateCustomerMutation(data);
   };
   return (
      <>
         {isLoading && (
            <Loading styledCustom="absolute top-0 left-0 right-0 cursor-not-allowed" />
         )}
         {isError && <Alert error message="Error data while fething!" />}
         {success && <Alert success message="Update profile success!" />}
         <form
            onSubmit={handleUpdate}
            className="sm:w-9/12 px-5 space-y-2 min-h-screen">
            <div className="flex gap-3 items-center">
               <div className="w-[90px] h-[90px] rounded-full">
                  <img
                     src={defaultImage}
                     className="rounded-full"
                     alt={`photo ${data.fullname}`}
                  />
               </div>
            </div>
            <InputTwoFlex
               label1="fullname"
               inputName1="fullname"
               defaultValue1={data.fullname}
               border
               label2="phone"
               defaultValue2={data.phone}
               inputName2="phone"
            />
            <DefaultInput
               name="address"
               label="address"
               defaultValue={data.address}
            />
            <InputTwoFlex
               label1="city"
               inputName1="city"
               defaultValue1={data.city}
               border
               label2="province"
               defaultValue2={data.province}
               inputName2="province"
            />
            <InputReadDefaultValue
               name="email"
               type="email"
               defaultValue={data.email}
               border
               label="email"
               styledCustom="md:w-1/2"
            />
            <div className="w-full font-flower flex justify-end">
               <button
                  type="submit"
                  className={`${
                     isLoading && "cursor-not-allowed"
                  } px-4 py-2 rounded-md bg-yellow-100 min-w-[100px] my-7`}>
                  Save
               </button>
            </div>
         </form>
      </>
   );
};

export default Dashboard;
