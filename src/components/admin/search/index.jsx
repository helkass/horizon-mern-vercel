import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { authorizationRequest } from "../../../requestMethods";
import { AbsoluteAlert } from "../../atoms/alerts/Alert";
import { ButtonBasic } from "../../atoms/button/Button";

const Search = () => {
   const [customerId, setCustomerId] = useState("");
   const [customer, setCustomer] = useState(null);
   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(false);

   const [orderId, setOrderId] = useState("");
   const [order, setOrder] = useState(null);
   // search for customer;
   const searchCustomer = async () => {
      setLoading(true);
      const response = await authorizationRequest.get(
         `/customer/${customerId}`
      );
      setCustomer(response.data);

      if (response.status === 500) {
         setError(true);
      } else if (response.status === 404) {
         setError(true);
      }

      setTimeout(() => {
         setLoading(false);
         setError(false);
      }, 2500);
   };
   // seacrh for product or item
   const searchProduct = async () => {
      setLoading(true);
      const response = await authorizationRequest.get(
         `/order/status/${orderId}`
      );

      if (response.status === 500) {
         setError(true);
      } else if (response.status === 404) {
         setError(true);
      } else {
         setOrder(response.data);
      }

      setTimeout(() => {
         setLoading(false);
      }, 1500);
   };

   const handleRefresh = () => {
      // reset
      setCustomer(null);
      setOrder(null);
      setOrderId("");
      setCustomerId("");
   };
   return (
      <section className="grid gap-2">
         {/* error req alert */}
         <AbsoluteAlert isShow={error} error message="Something went wrong!" />
         {/* customer */}
         <div className="flex justify-between">
            <label htmlFor="customer">Search by Customer Id</label>
            <ButtonBasic title="Refresh" onClick={() => handleRefresh()} />
         </div>
         <div className="flex gap-2">
            <input
               name="customer"
               type="text"
               value={customerId}
               onChange={(e) => setCustomerId(e.target.value)}
               className="focus:outline-yellow-200 border border-yellow-200 rounded-md w-full px-3 py-2 text-gray-800 text-sm"
            />
            <button
               onClick={searchCustomer}
               disabled={loading}
               className="h-12 w-12 flex bg-yellow-100 text-yellow-600 items-center justify-center rounded-xl">
               {loading ? (
                  <svg
                     className="animate-spin h-5 w-5 bg-transparent border-r-2 border-amber-800 rounded-full"
                     viewBox="0 0 24 24"></svg>
               ) : (
                  <FiSearch size={20} />
               )}
            </button>
         </div>
         {/* customer data */}
         {customer !== null && (
            <div className="w-full my-2 px-3 grid space-y-3 tracking-wide">
               <p>
                  fullname :{" "}
                  <span className="text-green-500">{customer?.fullname}</span>
               </p>
               <p>
                  email :{" "}
                  <span className="text-green-500">{customer?.email}</span>
               </p>
               <p>
                  phone :{" "}
                  <span className="text-green-500">{customer?.phone}</span>
               </p>
               <p>
                  address :{" "}
                  <span className="text-green-500">{customer?.address}</span>
               </p>
               <p>
                  city :{" "}
                  <span className="text-green-500">{customer?.city}</span>
               </p>
               <p>
                  provice :{" "}
                  <span className="text-green-500">{customer?.province}</span>
               </p>
            </div>
         )}
         {/* end customer */}
         {/* products */}
         <label htmlFor="order">Search by order Id</label>
         <div className="flex gap-2">
            <input
               name="order"
               type="text"
               value={orderId}
               onChange={(e) => setOrderId(e.target.value)}
               className="focus:outline-green-200 border border-green-200 rounded-md w-full px-3 py-2 text-gray-800 text-sm"
            />
            <button
               disabled={loading}
               onClick={searchProduct}
               className="h-12 w-12 flex bg-green-100 text-green-600 items-center justify-center rounded-xl">
               {loading ? (
                  <svg
                     class="animate-spin h-5 w-5 bg-transparent border-r-2 border-green-800 rounded-full"
                     viewBox="0 0 24 24"></svg>
               ) : (
                  <FiSearch size={20} />
               )}
            </button>
         </div>
         {/* result search */}
         {order !== null && (
            <div className="flex flex-col gap-2">
               <GridTable keyName={"Id"} value={order?._id} />
               <GridTable keyName={"Customer Id"} value={order?.customerId} />
               {/* order products */}
               <div className="flex bg-amber-200 p-1 rounded-sm w-[120px] justify-bettween w-full items-center">
                  <p>Products</p>
               </div>
               <div className="flex flex-col gap-2 ml-10">
                  {order?.products.map((p, index) => {
                     return Object.getOwnPropertyNames(
                        order?.products[index]
                     ).map((keyName, i) => (
                        <GridTable
                           keyName={keyName}
                           key={i}
                           value={order?.products[index][keyName]}
                        />
                     ));
                  })}
               </div>
               <GridTable
                  keyName={"Customer name"}
                  value={order?.customer_name}
               />
               <div className="flex bg-amber-200 p-1 rounded-sm min-w-[120px] max-w-max whitespace-nowrap justify-bettween w-full items-center">
                  <p>Response Midtrans</p>
               </div>
               <div className="flex flex-col gap-2 ml-10">
                  <GridTable
                     keyName={"Transaction Id"}
                     value={order?.response_midtrans.transaction_id}
                  />
                  <GridTable
                     keyName={"Gross Amount"}
                     value={order?.response_midtrans.gross_amount}
                  />
                  <GridTable
                     keyName={"Currency"}
                     value={order?.response_midtrans.currency}
                  />
                  <GridTable
                     keyName={"Order Id"}
                     value={order?.response_midtrans.order_id}
                  />
                  <GridTable
                     keyName={"Payment Type"}
                     value={order?.response_midtrans.payment_type}
                  />
                  {/* va number bank except permata bank */}
                  {order?.response_midtrans.va_numbers !==
                     (null || undefined) &&
                     Object.getOwnPropertyNames(
                        order?.response_midtrans?.va_numbers[0]
                     )?.map((keyName, index) => (
                        <GridTable
                           key={index}
                           keyName={keyName}
                           value={
                              order?.response_midtrans.va_numbers[0][keyName]
                           }
                        />
                     ))}
                  {/* permata bank */}
                  {order?.response_midtrans.permata_va_number !==
                     (null || undefined) && (
                     <GridTable
                        keyName={"Permata VA"}
                        value={order?.response_midtrans?.permata_va_number}
                     />
                  )}
                  <GridTable
                     keyName={"Transaction status"}
                     value={order?.response_midtrans.transaction_status}
                  />
                  <GridTable
                     keyName={"Transaction time"}
                     value={order?.response_midtrans.transaction_time}
                  />
                  <GridTable
                     keyName={"Fraud status"}
                     value={order?.response_midtrans.fraud_status}
                  />
                  <GridTable
                     keyName={"Merchant Id"}
                     value={order?.response_midtrans.merchant_id}
                  />
                  <GridTable
                     keyName={"Expiry Time"}
                     value={order?.response_midtrans?.expiry_time}
                  />
               </div>
               <GridTable keyName={"status"} value={order?.status} />
            </div>
         )}
      </section>
   );
};

const GridTable = ({ keyName, value }) => {
   return (
      <div className="flex gap-2 w-full sm:w-7/12 md:w-9/12">
         <div className="flex bg-amber-200 p-1 rounded-sm min-w-[120px] max-w-max whitespace-nowrap justify-bettween w-full items-center">
            <p>{keyName}</p>
         </div>
         <div className="bg-yellow-50 rounded-sm w-max items-center px-3 whitespace-nowrap max-w-min">
            <span>{value}</span>
         </div>
      </div>
   );
};

export default Search;
