import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import useFetchGet from "../../hooks/useFetchGet";
import { Dialog, Transition } from "@headlessui/react";
import { publicRequest } from "../../requestMethods";
import BlankPage from "../templates/BlankPage";
import { currencyFormater } from "../../functions/formater/currencyFormater";

function Order() {
   const { id } = useParams();
   // fetching data order by id user
   const { data, isLoading, isError } = useFetchGet(
      `/order/findbycustomer/${id}`
   );
   const [rekening, setReKening] = useState("");
   let [isOpen, setIsOpen] = useState(false);
   const [bankName, setBankName] = useState("");

   const order_id = data.map((response) => response._id);

   // refresh data if data change after paying
   // checked status transaction by order_Id
   // manual check and update because app unproduction
   const changeStream = async () => {
      try {
         for (let i = 0; i < order_id.length; i++) {
            await publicRequest.get(`/order/status/${order_id[i]}`);
         }
      } catch (error) {
         console.log(error.message);
      }
   };
   useEffect(() => {
      changeStream();
   }, [order_id]);

   function closeModal() {
      setIsOpen(false);
   }

   function openModal(midtrans) {
      let bank = "";

      if (midtrans.va_numbers) {
         bank = midtrans.va_numbers[0]["bank"];
         setReKening(midtrans.va_numbers[0]["va_number"]);
      } else if (midtrans.permata_va_number) {
         bank = "Permata";
         setReKening(midtrans.permata_va_number);
      }
      setBankName(bank.toLocaleUpperCase());

      setIsOpen(true);
   }
   return (
      <main className="w-full">
         {isLoading ? (
            <Loading />
         ) : (
            <div className="flex flex-col gap-7">
               {data.map((order) => {
                  // set background color red while transaction status expire
                  // expire time in 24 hours after order
                  // get status midtrans
                  const midtrans = order.response_midtrans;
                  return (
                     <div
                        key={order._id}
                        className={`flex gap-2 w-full text-sm bg-opacity-50 p-3 rounded-md ${
                           midtrans.transaction_status === "expire"
                              ? "bg-red-50"
                              : "bg-green-50"
                        }`}>
                        <div className="flex justify-between w-full">
                           <div className="text-left space-y-1">
                              <p>
                                 Order ID:{" "}
                                 <span className="text-yellow-400">
                                    {order._id}
                                 </span>
                              </p>
                              {order.products.map((product) => (
                                 <div
                                    key={product.product_name}
                                    className="flex flex-col gap-2">
                                    <li className="capitalize">
                                       {product.product_name}
                                    </li>
                                 </div>
                              ))}
                              <p>
                                 Total :{" "}
                                 <span className="text-yellow-500">
                                    {currencyFormater(midtrans.gross_amount)}
                                 </span>
                              </p>
                              <p className="text-red-500 text-sm">
                                 at : <span>{midtrans.transaction_time}</span>
                              </p>
                           </div>

                           {/* if transaciton status is not expire and render modal va number for transaction */}
                           {midtrans.transaction_status !== "expire" ? (
                              <div className="flex justify-end items-end h-full">
                                 <Modal
                                    disabled={
                                       midtrans.transaction_status ===
                                       "settlement"
                                    }
                                    title="Bayar"
                                    popTitle={rekening}
                                    // condition name bank_transfer besides permata
                                    openModal={() => openModal(midtrans)}
                                    bankName={bankName}
                                    isOpen={isOpen}
                                    closeModal={closeModal}
                                 />
                              </div>
                           ) : (
                              <span>Order Expired</span>
                           )}
                        </div>
                     </div>
                  );
               })}
            </div>
         )}
         {data.length === 0 && <BlankPage message="Order not found" error />}
      </main>
   );
}

function Modal(props) {
   return (
      <>
         <button
            type="button"
            disabled={props.disabled}
            onClick={props.openModal}
            className={`rounded-md ${
               props.disabled
                  ? "bg-green-50 text-green-400 border-green-300"
                  : "bg-green-100 text-green-600 border-green-500"
            } bg-opacity-20 px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 border`}>
            {props.disabled ? "Sudah dibayar" : props.title}
         </button>

         <Transition appear show={props.isOpen} as={Fragment}>
            <Dialog
               as="div"
               className="relative z-10"
               onClose={props.closeModal}>
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
               </Transition.Child>

               <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                     <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                           <div className="flex justify-between">
                              <Dialog.Title
                                 as="h3"
                                 className="text-lg font-medium leading-6 text-gray-900">
                                 Transfer to here
                              </Dialog.Title>
                              <Dialog.Title
                                 as="h3"
                                 className="text-lg font-medium leading-6 text-gray-900">
                                 Bank: {props.bankName}
                              </Dialog.Title>
                           </div>
                           <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                 VA number :{" "}
                                 <span className="font-semibold text-md">
                                    {props.popTitle}
                                 </span>
                              </p>
                           </div>

                           <div className="mt-4">
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                 onClick={props.closeModal}>
                                 Got it, thanks!
                              </button>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   );
}

export default Order;
