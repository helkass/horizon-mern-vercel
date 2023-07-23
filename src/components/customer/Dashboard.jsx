import defaultImage from "../../assets/images/defaultImage.jpg";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DefaultInput } from "../Form";
import InputTwoFlex from "../molecules/inputs/InputTwoFlex";
import InputReadDefaultValue from "../atoms/inputs/InputReadDefaultValue";
import Loading from "../Loading";
import { useMutation, useQueryClient } from "react-query";
import {
   updateCustomer,
   useFetchCustomerById,
} from "../../helper/fetchCustomer";
import Alert from "../atoms/alerts/Alert";
import { useCusContext } from "../../redux/customer/useCusContext";

const Dashboard = () => {
   const [idCustomer, setIdCustomer] = useState("");
   const { customer } = useCusContext();
   const [successUpdate, setSuccessUpdate] = useState(false);
   const [errorUpdate, setErrorUpdate] = useState(false);
   const [inputs, setInputs] = useState(null);

   const handleChange = (e) => {
      setInputs((prev) => {
         return { ...prev, [e.target.name]: e.target.value };
      });
   };

   const queryClient = useQueryClient();

   const { data, isLoading, isError } = useFetchCustomerById(idCustomer);

   const updateCustomerMutation = useMutation(updateCustomer, {
      onSuccess: () => {
         queryClient.invalidateQueries("customer-detail");
         setSuccessUpdate(true);
      },
      onError: () => {
         setErrorUpdate(true);
      },
   });

   useEffect(() => {
      setIdCustomer(customer._id);
      setTimeout(() => {
         setSuccessUpdate(false);
         setErrorUpdate(false);
      }, 1500);
   }, [successUpdate, errorUpdate]);

   const handleUpdate = (e) => {
      e.preventDefault();
      updateCustomerMutation.mutate({ ...inputs, _id: data.data._id });
   };
   return (
      <>
         {isLoading ? (
            <Loading styledCustom="absolute top-0 left-0 right-0 cursor-not-allowed" />
         ) : isError ? (
            <Alert error message="Error data while fetching!" />
         ) : (
            <form
               onSubmit={handleUpdate}
               className="w-full sm:w-9/12 px-5 space-y-2 min-h-screen">
               {/* alert error while update or success */}
               {successUpdate && (
                  <Alert success message="Update profile success!" />
               )}
               {errorUpdate && <Alert error message="Update profile failed!" />}
               {/* end alert */}
               <div className="flex gap-3 items-center">
                  <div className="w-[90px] h-[90px] rounded-full">
                     <img
                        src={defaultImage}
                        className="rounded-full"
                        alt={`photo ${data.data?.fullname}`}
                     />
                  </div>
               </div>
               <InputTwoFlex
                  label1="fullname"
                  inputName1="fullname"
                  defaultValue1={data.data?.fullname}
                  border
                  onChange={handleChange}
                  label2="phone"
                  defaultValue2={data.data?.phone}
                  inputName2="phone"
               />
               <DefaultInput
                  name="address"
                  onChange={handleChange}
                  label="address"
                  defaultValue={data.data?.address}
               />
               <InputTwoFlex
                  label1="city"
                  inputName1="city"
                  defaultValue1={data.data?.city}
                  border
                  onChange={handleChange}
                  label2="province"
                  defaultValue2={data.data?.province}
                  inputName2="province"
               />
               <InputReadDefaultValue
                  name="email"
                  type="email"
                  onChange={handleChange}
                  defaultValue={data.data?.email}
                  border
                  label="email"
                  styledCustom="md:w-1/2"
               />
               <InputReadDefaultValue
                  name="password"
                  type="password"
                  border
                  onChange={handleChange}
                  defaultValue={data.data?.password}
                  label="Change password"
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
         )}
      </>
   );
};

export default Dashboard;
