import Layout from "../../components/Layout";
import { MdOutlinePayment } from "react-icons/md";
import { AiOutlineExclamationCircle, AiFillShopping } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCusContext } from "../../redux/customer/useCusContext";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import { publicRequest } from "../../requestMethods";
import Success from "../../components/Success";
import { apiUrl } from "../../constans/app";
import Bug from "../../components/Bug";
import { ImageBasic } from "../../components/atoms/image/Image";
import InputReadDefaultValue from "../../components/atoms/inputs/InputReadDefaultValue";
import InputTwoFlex from "../../components/molecules/inputs/InputTwoFlex";
import { removeCarts } from "../../redux/cartReducer";
import { currencyFormater } from "../../functions/formater/currencyFormater";

import { bankType } from "../../constans/app";

const Order = () => {
   const cart = useSelector((state) => state.cart);
   const [carts, setCarts] = useState([]);
   const [success, setSuccess] = useState(false);
   const [error, setError] = useState(false);
   const navigate = useNavigate();
   const [customer, setCustomer] = useState({});
   const dispatch = useDispatch();

   // bank type selected
   const [bankSelected, setBankSelected] = useState("permata");

   // order parameter
   let parameter = {
      payment_type: "bank_transfer",
      bank_transfer: { bank: bankSelected.toLocaleLowerCase() },
      customerId: customer._id,
   };

   // make order id with date now
   const date = Date.now();

   // post data to DB Orders
   const [form, setForm] = useState({});

   // formater Rp / idr
   const totalAmount = currencyFormater(cart.cartTotalAmount);

   useEffect(() => {
      const getCarts = JSON.parse(localStorage.getItem("cart"));
      const getCustomer = JSON.parse(localStorage.getItem("customer"));
      setCustomer(getCustomer);
      setCarts(getCarts);
   }, []);

   // new data format to json for send request charge
   const newJson = JSON.stringify({ ...form, ...parameter });

   // order function
   async function charge() {
      const response = await publicRequest.post(
         `${apiUrl}/order/charge`,
         newJson,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );

      console.log("response", response);

      if (response.status === 201) {
         setSuccess(true);
         // redirect to csustomer page after 2s
         setTimeout(() => {
            dispatch(removeCarts());
            navigate("/products");
         }, 1500);
      } else {
         setError(true);
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const dt = Object.fromEntries(data.entries());

      setForm({
         products: carts.map((cart) => ({
            productId: cart._id,
            quantity: cart.cartQuantity,
            product_name: cart.title,
         })),
         transaction_details: {
            gross_amount: cart.cartTotalAmount,
            order_id: `HRS${orderId(6)}${date}`,
         },
      });

      charge();
   };
   console.log({ ...form, ...parameter });

   return (
      <Layout>
         <main className="mt-20">
            <h2 className="font-flower text-xl text-center my-6">
               One more Step
            </h2>
            {success && <Success message="order success" />}
            {error && <Bug message="Order failed!" onClick={setError(false)} />}
            <form
               onSubmit={handleSubmit}
               className="flex relative sm:flex-row flex-col-reverse min-h-max pb-20">
               {cart.cartItems.length > 0 ? (
                  <>
                     <div className="flex flex-col xl:p-14 p-6 gap-3 sm:w-6/12 md:bg-slate-50 bg-none">
                        {carts?.map((data, i) => (
                           <div key={i} className="flex gap-2">
                              <ImageBasic
                                 src={data.img}
                                 alt={data.title}
                                 styledCustom="w-1/4"
                              />
                              <div className="flex flex-col">
                                 <input
                                    className="text-md bg-inherit focus:outline-none"
                                    readOnly
                                    name={data.title}
                                    defaultValue={data.title}
                                 />
                                 <input
                                    name={data.price}
                                    readOnly
                                    className=" text-gray-600 focus:outline-none bg-inherit"
                                    defaultValue={currencyFormater(data.price)}
                                 />
                              </div>
                           </div>
                        ))}
                        <div className="border-t-2 gap-4 px-3 py-2 my-2 flex flex-col">
                           <div className="flex justify-between">
                              <span>Shipping</span>
                              <span>Free</span>
                           </div>
                           <div className="flex justify-between w-full mt-7 text-md">
                              <span>Total : </span>
                              <div className="flex justify-evenly">
                                 <input
                                    readOnly
                                    name="amount"
                                    className="text-sm w-24 focus:outline-none"
                                    defaultValue={totalAmount}
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* form */}
                     <div className="flex flex-col gap-2 text-gray-500 text-sm sm:w-7/12 md:p-10 md:w-full sm:p-8 p-4 space-y-6">
                        <InputTwoFlex
                           inputName1="fullname"
                           defaultValue1={customer.fullname}
                           inputName2="phone"
                           defaultValue2={customer.phone}
                           styledCustom="md:w-8/12"
                        />
                        <InputReadDefaultValue
                           name="address"
                           defaultValue={customer.address}
                           styledCustom="min-h-26 w-full"
                        />

                        <InputTwoFlex
                           inputName1="city"
                           defaultValue1={customer.city}
                           inputName="province"
                           defaultValue2={customer.province}
                        />

                        <InputTwoFlex
                           inputName1="email"
                           defaultValue1={customer.email}
                           inputName2="postalcode"
                           defaultValue2={customer.postalcode}
                        />
                        {/* payment */}
                        <div className="flex gap-4 flex-col">
                           <label className="text-yellow-600 gap-1 flex items-center">
                              <span>
                                 <MdOutlinePayment size={20} />
                              </span>
                              Payment Method :{" "}
                           </label>
                           <div className="flex flex-wrap gap-4">
                              {/* dana payment */}
                              <select
                                 id="payment"
                                 onChange={(event) =>
                                    setBankSelected(event.target.value)
                                 }
                                 value={bankSelected}
                                 className="w-28 focus:outline-transparent border-2 text-yellow-600 border-yellow-200 p-2 rounded-md cursor-pointer">
                                 {bankType.map((bank, i) => (
                                    <option
                                       className=""
                                       value={bank.value}
                                       key={i}>
                                       {bank.label}
                                    </option>
                                 ))}
                              </select>
                           </div>
                        </div>
                        {/* end payment */}
                     </div>
                     <Link to="/products">
                        <button className="bg-yellow-100 absolute left-0 bottom-0 translate-x-10 -translate-y-2/4 text-yellow-700 w-max px-3 font-flower py-3 rounded-md">
                           Back Shop
                        </button>
                     </Link>
                     <button
                        type="submit"
                        className="bg-black absolute bottom-0 right-0 -translate-x-10 -translate-y-2/4 text-white w-max px-3 font-flower py-3 rounded-md">
                        Save and Delevery
                     </button>
                  </>
               ) : (
                  <Container>
                     <div className="flex justify-center gap-2 items-center border-2 border-red-600 text-red bg-red-50 w-11/12 mx-auto text-red-800 h-20 text-xl">
                        <label>
                           <AiOutlineExclamationCircle size={25} />
                        </label>
                        Empty Cart!
                     </div>
                     <div className="flex justify-center mt-7">
                        <Link to="/products">
                           <button className="px-3 py-2 flex items-center gap-2 bg-yellow-50 border-yellow-700 border text-amber-800 rounded-md">
                              <label>
                                 <AiFillShopping size={25} />
                              </label>
                              Shop Now
                           </button>
                        </Link>
                     </div>
                  </Container>
               )}
            </form>
         </main>
      </Layout>
   );
};

export default Order;

// generate order id manual
function orderId(length) {
   var result = "";
   var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
