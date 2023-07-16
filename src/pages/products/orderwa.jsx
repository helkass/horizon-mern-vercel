import Container from "../../components/Container";
import { AiOutlineArrowLeft, AiOutlineCloseCircle } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import { InputCalculate } from "../../components/Form";
import FormTemplate from "../../components/templates/FormTemplate";
import Alert from "../../components/atoms/alerts/Alert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import Title from "../../components/atoms/title/Title";
import InputChange from "../../components/atoms/inputs/InputChange";
import { urlwhatasapp, whatsappNumber } from "../../constans/app";
import defaultImage from "../../assets/images/pack-template-horizon.png";

const OrderWa = () => {
   const [error, setError] = useState(false);
   const [datas, setDatas] = useState(null);
   const [discount, setDiscount] = useState(0);
   const [user, setUser] = useState({});

   const navigate = useNavigate();

   const [form, setForm] = useState({
      username: "",
      company: "",
      address: "",
      orderNote: "",
      product: "",
      medium: "",
      large: "",
      total: "",
   });
   const location = useLocation();
   // order
   let test = useRef(null);

   const onChange = (e) => {
      setForm((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   // get value from product page
   const {
      state: { id, qtyM, qtyL, total },
   } = location;

   const getData = async () => {
      const { data } = await publicRequest.get(`/item?type=bottle`);
      setDatas(data);
   };
   useEffect(() => {
      getData();
      const user = JSON.parse(localStorage.getItem("customer"));

      if (user) {
         setUser(user);
      }

      if (id == undefined || null) {
         navigate("/products");
      }
   }, [id]);

   function handleWhatsapp() {
      // accumulate sub total
      let subMedium = qtyM * form.medium;
      let subLarge = qtyL * form.large;

      const checkedDevice =
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
         );

      // checkdevice
      if (checkedDevice) {
         let urls = "whatsapp://send";
      }
      if ((form.username == "", form.address == "")) {
         return setError(true);
      } else {
         setError(false);
         const blanterWA = `${urlwhatasapp}?phone=${whatsappNumber}&text=DATA SAYA*%0A================%0A*Nama* : ${form.username}%0A*Companyname:${form.company}%0A *Alamat* : ${form.address}%0A*MetodePembayaran* : COD%0A%0A=============%0A*Daftar belanjar*%0A%0A*NamaProduk* : ${form.product}%0A*Medium* : ${form.medium}x${qtyM}=Rp.${subMedium}%0A*Large* : ${form.large}x${qtyL}=Rp.${subLarge}%0A*Total* : ${form.total}%0A===============%0A*OrderNote* : ${form.orderNote}%0A
    `;
         window.open(blanterWA, "_blank");
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      const newData = new FormData(e.target);
      const datas = Object.fromEntries(newData.entries());
      setForm((prev) => ({
         ...prev,
         ...datas,
      }));
   };

   return (
      <div className="bg-yellow-100 bg-opacity-50">
         <Container>
            <main className="text-yellow-800">
               <div className="flex border-b-2 items-center py-2 justify-between border-amber-900 w-full">
                  <h2 className="capitalize text-2xl">checkout</h2>
                  <Link to="/products">
                     <div className="flex justify-center items-center gap-2 bg-yellow-100 hover:text-yellow-500 p-2 rounded-md cursor-pointer">
                        <AiOutlineArrowLeft size={20} />
                     </div>
                  </Link>
               </div>
               <form
                  onSubmit={handleSubmit}
                  className="my-7 md:flex flex-col-1 gap-3">
                  {/* form customer */}
                  <div className="flex flex-col w-full px-1 md:w-1/2 ">
                     {error && <Alert error message="Something Wrong!" />}
                     <h2
                        ref={test}
                        className="rounded-md w-full bg-white/70 backdrop-blur-60 text-xl px-4 py-2 my-4">
                        Billing Details
                     </h2>
                     <FormTemplate>
                        <InputChange
                           required
                           name="username"
                           onChange={onChange}
                           label="username"
                           border
                           defaultValue={user?.fullname}
                        />
                        <InputChange
                           name="company"
                           onChange={onChange}
                           label="company"
                           border
                        />
                        <InputChange
                           required
                           name="address"
                           defaultValue={user?.address}
                           onChange={onChange}
                           label="address"
                           border
                        />
                        <InputChange
                           name="note"
                           onChange={onChange}
                           label="order note (optional)"
                           border
                           textArea
                        />
                     </FormTemplate>
                  </div>
                  {/* order product */}
                  <FormTemplate styledCustom="md:w-1/2">
                     <Title
                        title="My Order"
                        styledCustom="text-center font-flower my-2"
                     />
                     <div className="px-6 flex justify-between mb-5">
                        <span className="flex gap-2 items-center">
                           status
                           <AiOutlineCloseCircle color="#FCA5A5" />
                        </span>
                        <span>{new Date().toISOString().substring(0, 10)}</span>
                     </div>
                     {datas
                        ?.filter((item) => item._id === id)
                        .map((obj, i) => (
                           <div key={i} className="px-2">
                              <div className="bg-yellow-50 rounded-lg py-3 px-2 my-2">
                                 Order Summary
                              </div>
                              <div className="p-2 flex gap-2">
                                 <img
                                    src={obj.image?.url || defaultImage}
                                    alt="image"
                                    className="rounded-md w-20 h-20 object-cover"
                                 />
                                 <div className="w-full space-y-1">
                                    <input
                                       readOnly
                                       defaultValue={obj.title}
                                       className="outline-none capitalize cursor-default"
                                       name="product"
                                    />
                                    {qtyM > 0 ? (
                                       <InputCalculate
                                          name="medium"
                                          defaultValue={obj.medium}
                                          qty={qtyM}
                                       />
                                    ) : (
                                       <></>
                                    )}
                                    {qtyL > 0 ? (
                                       <InputCalculate
                                          name="large"
                                          defaultValue={obj.large}
                                          qty={qtyL}
                                       />
                                    ) : (
                                       <></>
                                    )}
                                 </div>
                              </div>
                              <div className="p-2">
                                 <div className="flex text-gray-500 justify-between">
                                    <span>Subtotal</span>
                                    <span>{total}</span>
                                 </div>
                                 <div className="flex justify-between text-gray-500">
                                    <span>Discount</span>
                                    <span>{discount}</span>
                                 </div>
                                 <div className="flex justify-between mt-7">
                                    <p>Total : </p>
                                    <label>
                                       <span>Rp.</span>
                                       <input
                                          defaultValue={total}
                                          name="total"
                                          readOnly
                                          className="outline-none w-16 text-right"
                                       />
                                    </label>
                                 </div>
                              </div>
                              <div className="w-full flex justify-end">
                                 <a
                                    onClick={handleWhatsapp}
                                    className="flex w-max bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg my-8">
                                    <button type="submit">checkout</button>
                                 </a>
                              </div>
                              <span className="font-normal text-sm">
                                 Order by Whatsapp!
                              </span>
                           </div>
                        ))}
                  </FormTemplate>
               </form>
            </main>
         </Container>
      </div>
   );
};

export default OrderWa;
