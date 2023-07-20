import { MdOutlineArticle, MdContentCopy } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { useState, useEffect, Fragment, memo } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { authorizationRequest } from "../../requestMethods";
import Loading from "../Loading";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { ButtonBasic } from "../atoms/button/Button";
import { replaceLongChar } from "../../functions/formater/longString";
import Alert, { AbsoluteAlert } from "../atoms/alerts/Alert";
import { currencyFormater } from "../../functions/formater/currencyFormater";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
   deleteOrder,
   getOrders,
   updateOrderStatusProcess,
} from "../../helper/fetchOrder";

function Main() {
   const [gallery, setGallery] = useState([]);
   const [items, setItems] = useState([]);
   const [blogs, setBlogs] = useState([]);
   const [customers, setCustomers] = useState([]);

   const fetchingData = async () => {
      const item = await authorizationRequest.get("/item");
      setItems(item.data);

      const gallery = await authorizationRequest.get("/gallery");
      setGallery(gallery.data);

      const blog = await authorizationRequest.get("/blog");
      setBlogs(blog.data);

      const customer = await authorizationRequest.get("/customer");
      setCustomers(customer.data);
   };

   useEffect(() => {
      fetchingData();
   }, []);
   return (
      <div className="flex flex-col w-full">
         <div className="flex flex-wrap md:gap-4 gap-1 px-3 w-full">
            <Card
               total={items.length}
               name="Items"
               icon={<FiBox size={25} />}
            />
            <Card
               total={gallery.length}
               name="Galleries"
               icon={<BsImage size={25} />}
            />
            <Card
               total={blogs.length}
               name="Blogs"
               icon={<MdOutlineArticle size={25} />}
            />
            <Card
               total={customers.length}
               name="Customers"
               icon={<FaUserFriends size={25} />}
            />
         </div>
         <HistoryTable />
      </div>
   );
}

const Card = memo(function Card({ name, icon, total }) {
   return (
      <div className="px-3 py-1 md:w-48 sm:h-20 h-16 flex flex-col bg-yellow-50 border rounded-md border-yellow-400">
         <div className="flex gap-2 text-[1.1rem] md:text-xl items-center justify-between">
            <span>{name}</span>
            <span>{icon}</span>
         </div>
         <span className="text-xl">{total}</span>
      </div>
   );
});

// table history order
function HistoryTable() {
   const { data, isLoading, isError, error } = useQuery("orders", getOrders);

   const [showID, setShowID] = useState(true);
   const [copyAlert, setCopyAlert] = useState(false);

   const handleShowId = () => {
      setShowID(!showID);
   };

   const copyToClipboard = (event) => {
      navigator.clipboard.writeText(event);
      setCopyAlert(true);

      setTimeout(() => {
         setCopyAlert(false);
      }, 1500);
   };

   return (
      <>
         {/* alert copy success */}
         <AbsoluteAlert
            isShow={copyAlert}
            success
            message="Copy to Clipboard"
         />
         <section className="my-4 px-1 rounded max-w-[1340px]">
            <div className="flex justify-between mb-2">
               <h1 className="text-xl my-2">Orders Summary</h1>
               <ButtonBasic
                  styledCustom="bg-yellow-100 px-3"
                  title="username / ID"
                  onClick={() => handleShowId()}
               />
            </div>
            {/* head */}
            <div className="flex gap-1">
               <span className="py-1 pl-2 w-3/12 rounded bg-yellow-50">
                  Order ID
               </span>
               <span className="py-1 pl-2 w-3/12 rounded bg-yellow-50">
                  Username / Id
               </span>
               <span className="text-center py-1 flex-1 rounded bg-yellow-50">
                  Product
               </span>
               <span className="text-center py-1 w-2/12 rounded bg-yellow-50">
                  Total
               </span>
               <span className="text-center py-1 w-1/12 rounded bg-yellow-50">
                  action
               </span>
            </div>
            {isError || error ? <Alert error message="error data" /> : <></>}
            {/* main ordering data */}
            {isLoading ? (
               <Loading />
            ) : (
               data?.map(
                  (order) =>
                     order.response_midtrans.transaction_status ===
                        "settlement" && (
                        <div
                           key={order._id}
                           className={`flex gap-1 border-b my-1 md:text-md sm:text-sm text-xs ${
                              order.status === "accepted" &&
                              "bg-green-100 text-green-700"
                           }`}>
                           <div className="flex py-1 pl-2 w-3/12 rounded justify-between">
                              <span className="py-1 pl-2 w-3/12 rounded">
                                 {replaceLongChar(order._id)}
                              </span>
                              <button
                                 className="bg-inherit"
                                 onClick={() => copyToClipboard(order._id)}>
                                 <MdContentCopy size={18} />
                              </button>
                           </div>
                           <div className="flex py-1 pl-2 w-3/12 rounded justify-between">
                              <span>
                                 {showID
                                    ? replaceLongChar(order.customerId)
                                    : order.customer_name || "not set yet"}
                              </span>
                              {showID && (
                                 <button
                                    className="bg-inherit"
                                    onClick={() =>
                                       copyToClipboard(order.customerId)
                                    }>
                                    <MdContentCopy size={18} />
                                 </button>
                              )}
                           </div>
                           <div className="text-center py-1 flex-1  w-full rounded flex flex-col">
                              {order.products.map((product) => (
                                 <div
                                    className="flex gap-2 w-full justify-center"
                                    key={product.productId}>
                                    <span>{product.product_name}</span>
                                    <span>x{product.quantity}</span>
                                 </div>
                              ))}
                           </div>
                           <span className="text-center py-1 w-2/12 rounded">
                              {currencyFormater(
                                 order.response_midtrans.gross_amount
                              )}
                           </span>
                           <Actions
                              nonProcessed={order.status !== "accepted"}
                              order_id={order._id}
                           />
                        </div>
                     )
               )
            )}
         </section>
      </>
   );
}

function Actions(props) {
   let [isOpen, setIsOpen] = useState(false);
   let [orderId, setOrderId] = useState("");
   const [load, setLoad] = useState(false);

   const queryClient = useQueryClient();

   const updateProcessStatus = useMutation(updateOrderStatusProcess, {
      onSuccess: () => {
         queryClient.invalidateQueries("orders");
         setLoad(false);
      },
   });

   const rejectedOrder = useMutation(deleteOrder, {
      onSuccess: () => {
         queryClient.invalidateQueries("orders");
         setLoad(false);
      },
   });

   function closeModal() {
      setIsOpen(false);
      setOrderId("");
   }

   const handlerAccept = async () => {
      setLoad(true);
      updateProcessStatus.mutate(orderId);
      setLoad(false);
   };

   const rejectHandler = async () => {
      rejectedOrder.mutate(orderId);
   };

   //handle binding data order id
   function openModal(order_id) {
      setIsOpen(true);
      setOrderId(order_id);
   }

   return (
      <>
         <button
            type="button"
            onClick={() => openModal(props.order_id)}
            className="flex justify-center py-1 w-1/12 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <BiDotsVerticalRounded size={20} />
         </button>

         <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                           <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900">
                              {props.nonProcessed
                                 ? "processed ?"
                                 : "order has been processed"}
                           </Dialog.Title>
                           <div className="mt-4 flex flex-col gap-2">
                              {props.nonProcessed && (
                                 <>
                                    <button
                                       type="button"
                                       disabled={load}
                                       className={`${
                                          load
                                             ? "bg-green-50 cursor-not-allowed text-green-700"
                                             : "bg-green-100 text-green-900"
                                       } inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2`}
                                       onClick={handlerAccept}>
                                       Accepted
                                    </button>
                                    <button
                                       disabled={load}
                                       type="button"
                                       className={` ${
                                          load
                                             ? "bg-red-50 text-red-600 cursor-not-allowed"
                                             : "bg-red-100 text-red-900"
                                       } inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2`}
                                       onClick={rejectHandler}>
                                       Rejected
                                    </button>
                                 </>
                              )}
                              <button
                                 disabled={load}
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                                 onClick={closeModal}>
                                 Cancle
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

export default Main;
