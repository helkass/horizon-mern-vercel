import { MdOutlineArticle } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { useState, useEffect, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { publicRequest, authorizationRequest } from "../../requestMethods";
import useFetchGet from "../../hooks/useFetchGet";
import Loading from "../Loading";
import Cookie from "universal-cookie";
import Bug from "../Bug";
import { BiDotsVerticalRounded } from "react-icons/bi";
import useOrders from "../../hooks/useOrders/useOrders";

function Main() {
   const [gallery, setGallery] = useState([]);
   const [items, setItems] = useState([]);
   const [blogs, setBlogs] = useState([]);
   const [customers, setCustomers] = useState([]);

   const cookies = new Cookie();

   const fetchingData = async () => {
      const item = await publicRequest.get("/item");
      setItems(item.data);

      const gallery = await publicRequest.get("/gallery");
      setGallery(gallery.data);

      const blog = await publicRequest.get("/blog");
      setBlogs(blog.data);

      const customer = await publicRequest.get("/customer");
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

function Card({ name, icon, total }) {
   return (
      <div className="px-3 py-1 md:w-48 sm:h-20 h-16 flex flex-col bg-yellow-50 border rounded-md border-yellow-400">
         <div className="flex gap-2 text-[1.1rem] md:text-xl items-center justify-between">
            <span>{name}</span>
            <span>{icon}</span>
         </div>
         <span className="text-xl">{total}</span>
      </div>
   );
}

// table history order
function HistoryTable() {
   const { data, isLoading, isError } = useOrders();

   return (
      <section className="my-4 px-1 rounded max-w-[1340px]">
         <h1 className="text-xl my-2">Orders Summary</h1>
         {/* head */}
         <div className="flex gap-1">
            <span className="py-1 pl-2 w-3/12 rounded bg-yellow-50">
               Customer Id
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
         {/* main ordering data */}
         {isLoading && <Loading />}
         {data.map(
            (order) =>
               order.response_midtrans.transaction_status === "settlement" && (
                  <div
                     key={order._id}
                     className={`flex gap-1 border-b my-1 md:text-md sm:text-sm text-xs ${
                        order.status === "accepted" &&
                        "bg-green-100 text-green-700"
                     }`}>
                     <span className="py-1 pl-2 w-3/12 rounded">
                        {order.customerId}
                     </span>
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
                        {order.response_midtrans.gross_amount}
                     </span>
                     <Actions order_id={order._id} />
                  </div>
               )
         )}
      </section>
   );
}

function Actions(props) {
   let [isOpen, setIsOpen] = useState(false);
   let [orderId, setOrderId] = useState("");

   const order = useFetchGet(`/order/status/${orderId}`);

   function closeModal() {
      setIsOpen(false);
      setOrderId("");
   }

   const handlerAccept = async () => {
      try {
         const response = await publicRequest.get(
            `/order/acceptOrder/${orderId}`
         );
         if (response.ok) {
            closeModal();
         }
      } catch (error) {
         console.log(error);
      }
   };

   const rejectHandler = async () => {
      try {
         const response = await publicRequest.delete(
            `/order/delete/${orderId}`
         );
         console.log(response);
         if (response.ok) {
            closeModal();
         }
      } catch (error) {
         console.log(error);
      }
   };

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
                              {order.status === "accepted"
                                 ? "order has been processed"
                                 : "processed ?"}
                           </Dialog.Title>
                           <div className="mt-4 flex flex-col gap-2">
                              {order.status === "accepted" && (
                                 <>
                                    <button
                                       type="button"
                                       className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                       onClick={handlerAccept}>
                                       Accepted
                                    </button>
                                    <button
                                       type="button"
                                       className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                       onClick={rejectHandler}>
                                       Rejected
                                    </button>
                                 </>
                              )}
                              <button
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
