import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { BsFillCartFill } from "react-icons/bs";
import { AiFillShopping } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { add, decreaseCart, getTotals, remove } from "../redux/cartReducer";
import { useNavigate } from "react-router-dom";
import defaultImage from "../assets/images/defaultImage.jpg";
import { ButtonLink } from "./atoms/button/Button";
import HandleQuantity from "./molecules/HandleQuantity";
import Bug from "./Bug";

export default function Cart() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const cart = useSelector((state) => state.cart);

   useEffect(() => {
      dispatch(getTotals());
   }, [cart, dispatch]);

   const handleMinus = (product, e) => {
      dispatch(decreaseCart(product));
   };
   const handleIncrease = (product) => {
      dispatch(add(product));
   };

   const handleRemove = (product) => {
      dispatch(remove(product._id));
   };

   const checkOuts = () => {
      navigate("/order");
   };
   return (
      <Menu as="div" className="relative inline-block text-left z-40">
         <Menu.Button className="relative inline-flex backdrop-blur-50 w-full justify-center rounded-md bg-amber-200 px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <span className="rounded-full bg-amber-200 absolute -top-2 -left-2 px-2">
               {cart.cartTotalQuantity}
            </span>
            <BsFillCartFill size={20} />
         </Menu.Button>
         <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items className="absolute md:w-[620px] sm:w-[450px] w-[350px] right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white/90 backdrop-blur-70 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
               <div className="px-1 py-1 ">
                  <Menu.Item>
                     {({ active }) => (
                        <div
                           className={`${
                              active ? "bg-yellow-50 bg-opacity-30" : ""
                           } group w-full items-center rounded-md justify-center px-2 py-2 text-sm cursor-default`}>
                           {cart.cartItems.length > 0 ? (
                              <div>
                                 {cart.cartItems.map((product, i) => (
                                    <div
                                       key={i}
                                       className="flex w-full items-center gap-2">
                                       <div className="w-32 flex justify-center items-center bg-yellow-50 p-2">
                                          <img
                                             src={product.img || defaultImage}
                                             alt={product.title}
                                             className="object-cover max-h-28"
                                          />
                                       </div>
                                       <div className="w-full gap-y-2 flex flex-col">
                                          <div className="flex justify-between">
                                             <p className="md:text-xl w-max mb-2 lowercase bg-yellow-100 rounded-md sm:px-2 px-1">
                                                {product.title}
                                             </p>
                                             <button
                                                onClick={() =>
                                                   handleRemove(product)
                                                }
                                                className="bg-red-100 border border-red-400 items-center flex justify-center text-red-700 rounded md:h-7 md:w-7 w-6 h-6">
                                                <AiFillDelete />
                                             </button>
                                          </div>
                                          <div className="flex justify-between items-center">
                                             <p>Rp.{product.price}</p>
                                             <HandleQuantity
                                                value={product.cartQuantity}
                                                decrement={() =>
                                                   handleMinus(product)
                                                }
                                                increment={() =>
                                                   handleIncrease(product)
                                                }
                                             />
                                             <span>
                                                Rp.
                                                {product.price *
                                                   product.cartQuantity}
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                 ))}
                                 <div className="text-md my-3 flex justify-between font-semibold">
                                    <span> Total amount : </span>
                                    <span>Rp.{cart.cartTotalAmount}</span>
                                 </div>
                                 <ButtonLink
                                    onClick={checkOuts}
                                    styledCustom="">
                                    <AiFillShopping size={20} />
                                    Order Now
                                 </ButtonLink>
                              </div>
                           ) : (
                              <Bug message="Empty Cart" />
                           )}
                        </div>
                     )}
                  </Menu.Item>
               </div>
            </Menu.Items>
         </Transition>
      </Menu>
   );
}
