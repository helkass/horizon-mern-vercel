import React, { useState, Fragment, useEffect } from "react";
import Loading from "../Loading";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { currencyFormater } from "../../functions/formater/currencyFormater";
import { AiOutlineCopy, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import {
   getOrderByStatus,
   useFetchOrdersCustomerById,
} from "../../helper/fetchOrder";
import Alert from "../atoms/alerts/Alert";
import Rating from "react-rating";
import { ButtonBasic } from "../atoms/button/Button";
import { useCusContext } from "../../redux/customer/useCusContext";
import { authorizationRequest } from "../../requestMethods";

function Order() {
   const { customer } = useCusContext();
   // fetching data order by id user
   const { data, isLoading, isError } = useFetchOrdersCustomerById(
      customer._id
   );

   const queryClient = useQueryClient();
   // update status order manual
   const updateStatusOrderManual = useMutation(getOrderByStatus, {
      onSuccess: () => {
         queryClient.invalidateQueries("order");
      },
   });

   function getOrdersId(data) {
      return data
         ?.filter((el) => el.transaction_status !== "settlement")
         .map((el) => el._id);
   }
   useEffect(() => {
      const id_orders = getOrdersId(data);
      if (isLoading == false && id_orders.length >= 0) {
         for (let id of id_orders) {
            setTimeout(() => {
               updateStatusOrderManual.mutate(id);
            }, 2000);
         }
      }
   }, []);

   const [rekening, setReKening] = useState("");
   let [isOpen, setIsOpen] = useState(false);
   const [bankName, setBankName] = useState("");

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
   let review = false;
   return (
      <main className="w-full min-h-screen">
         {isLoading ? (
            <Loading />
         ) : data.length == 0 ? (
            <Alert
               error
               message="Order Empty. Please check your cart and chekout"
            />
         ) : (
            <div className="flex flex-col gap-7">
               {data?.map((order) => {
                  // set background color red while transaction status expire
                  // expire time in 24 hours after order
                  // get status midtrans
                  const midtrans = order.response_midtrans;
                  return (
                     <div key={order._id}>
                        <div
                           key={order._id}
                           className={`flex gap-2 w-full text-sm bg-opacity-50 p-3 rounded-md relative ${
                              midtrans.transaction_status === "expire"
                                 ? "bg-red-50"
                                 : "bg-green-50"
                           }`}>
                           <div className="flex justify-between w-full">
                              <div className="text-left space-y-1 w-full">
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
                                       Rp.
                                       {currencyFormater(midtrans.gross_amount)}
                                    </span>
                                 </p>
                                 <p className="text-red-500 text-sm">
                                    at :{" "}
                                    <span>{midtrans.transaction_time}</span>
                                 </p>
                                 {midtrans.transaction_status ===
                                    "settlement" &&
                                    data?.review == false && (
                                       <Comment
                                          comment={order?.review}
                                          order_id={order._id}
                                          products_id={order?.products.map(
                                             (product) => product.productId
                                          )}
                                       />
                                    )}
                              </div>

                              {/* if transaciton status is not expire and render modal va number for transaction */}
                              {midtrans.transaction_status !== "expire" ? (
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
                              ) : (
                                 <span className="whitespace-nowrap">
                                    Order Expired
                                 </span>
                              )}
                           </div>
                        </div>
                        {/* comment */}
                     </div>
                  );
               })}
            </div>
         )}
         {isError && <Alert error message="Error while fetching data!" />}
      </main>
   );
}

// add comment and rating
function Comment({ comment, order_id, products_id }) {
   const { customer } = useCusContext();
   const [rating, setRating] = useState(null);
   const [comments, setComments] = useState(null);
   const queryClient = useQueryClient();

   const handlePostReview = async () => {
      await authorizationRequest.post(
         "/review/create",
         {
            customer_details: {
               customer_id: customer._id,
               customer_name: customer.fullname,
               customer_address: `${customer.city}, ${customer.province}`,
            },
            order_id: order_id,
            products: products_id,
            rating: rating,
            comment: comments,
         },
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
   };

   const updateReviewMutation = useMutation(handlePostReview, {
      onSuccess: () => {
         queryClient.invalidateQueries("review");
      },
   });

   const post = async () => {
      updateReviewMutation.mutateAsync();
   };

   return (
      <Disclosure>
         <Disclosure.Button
            disabled={comment}
            className={"bg-green-200 text-green-700 px-7 py-2 rounded"}>
            Comment
         </Disclosure.Button>
         <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0">
            <Disclosure.Panel className={"mt-2"}>
               <p className="text-slate-400 text-sm">Comments</p>
               <div className="flex gap-3">
                  <div className="flex w-full flex-col gap-3">
                     <textarea
                        name="comment"
                        maxLength={550}
                        className="w-10/12 outline-green-200 focus:outline-green-500 p-2"
                        onChange={(e) => setComments(e.target.value)}
                     />
                     <div className="flex justify-between w-full">
                        <div className="flex flex-col gap-3">
                           <span className="text-slate-400 text-sm">
                              Rating
                           </span>
                           <Rating
                              emptySymbol={
                                 <AiOutlineStar size={22} color="green" />
                              }
                              fullSymbol={
                                 <AiFillStar size={22} color="yellow" />
                              }
                              onClick={(e) => setRating(e)}
                           />
                        </div>
                        <Disclosure.Button
                           onClick={post}
                           className={
                              "px-6 h-max self-end whitespace-nowrap bg-green-200 text-green-700 border border-green-600 rounded hover:bg-green-100 hover:text-green-700"
                           }>
                           Add Comment
                        </Disclosure.Button>
                     </div>
                  </div>
               </div>
            </Disclosure.Panel>
         </Transition>
      </Disclosure>
   );
}

function Modal(props) {
   const copyToClipboard = (event) => {
      navigator.clipboard.writeText(event);
   };
   return (
      <>
         <button
            type="button"
            disabled={props.disabled}
            onClick={props.openModal}
            className={`rounded-md ${
               props.disabled
                  ? "bg-green-50 text-green-400 border-green-300 absolute top-2 right-2"
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
                           <div className="my-3 flex justify-between">
                              <p className="text-sm text-gray-500">
                                 VA number :{" "}
                                 <span className="font-semibold text-md">
                                    {props.popTitle}
                                 </span>
                              </p>
                              <button
                                 className="text-yellow-600 hover:bg-yellow-100 p-1 rounded focus:bg-yellow-100"
                                 onClick={() =>
                                    copyToClipboard(props.popTitle)
                                 }>
                                 <AiOutlineCopy size={22} />
                              </button>
                           </div>

                           <div className="mt-4">
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
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
