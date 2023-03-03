import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import { ImageBasic } from "../../components/atoms/image/Image";

//  static file
import defaultImage from "../../assets/images/pack-template-horizon.png";

// icons
import { BsWhatsapp, BsFillEyeFill } from "react-icons/bs";
import { FaMotorcycle, FaCartPlus } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import Cart from "../../components/Cart";
import { add } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import { publicRequest } from "../../requestMethods";
import useFetchGet from "../../hooks/useFetchGet";
import GridMdFour from "../../components/templates/Grid";
import Title from "../../components/atoms/title/Title";
import Modal from "../../components/organism/Modal";
import { ButtonLink } from "../../components/atoms/button/Button";
import PriceInputHandleQuantity from "../../components/molecules/PriceInputHandleQuantity";
import Alert from "../../components/atoms/alerts/Alert";
import { currencyFormater } from "../../functions/formater/currencyFormater";

export default function Products() {
   // get type bottle items
   const { data, isLoading, isError } = useFetchGet("/item?type=bottle");
   const [packs, setPacks] = useState([]);
   // get type packs item
   useEffect(() => {
      const fetchData = async () => {
         const response = await publicRequest.get("/item?type=pack");
         setPacks(response.data);
      };
      fetchData();
   }, []);
   return (
      <Layout>
         <main className="pt-24">
            <Container>
               <div className="flex w-full justify-between text-amber-900 py-2 md:pb-0 items-center">
                  <Title
                     title="bottle and cups"
                     styledCustom="border-b-2 border-amber-800 pb-2"
                  />
                  {/* cart */}
                  <Cart />
                  {/* end cart */}
               </div>
               {isLoading && <Loading />}
               <GridMdFour styledCustom="mt-7">
                  {data?.map((obj, i) => (
                     <BottleCups {...obj} key={i} />
                  ))}
               </GridMdFour>
               {isError && <Alert error message="Bad Request Error" />}
               <br />
               <br />
               <div className="flex justify-center">
                  <Title
                     title="coffee packs"
                     styledCustom="text-center text-amber-800 border-b-2 pb-2 border-amber-800"
                  />
               </div>
               <GridMdFour styledCustom="mt-7">
                  {packs.map((obj, i) => (
                     <CoffeePacks {...obj} key={i} />
                  ))}
               </GridMdFour>
            </Container>
         </main>
      </Layout>
   );
}

// instant Order cups and bottle
function BottleCups(props) {
   const [countMedium, setCountMedium] = useState(0);
   const [countLarge, setCountLarge] = useState(0);
   const [disableButton, setDisableButton] = useState(true);
   const navigate = useNavigate();

   function checkQuantity() {
      (countLarge || countMedium) > 0
         ? setDisableButton(false)
         : setDisableButton(true);
   }
   useEffect(() => {
      checkQuantity();
   }, [countLarge, countMedium]);

   const handleMediumMin = (e) => {
      e.preventDefault();
      if (countMedium <= 0) {
         return null;
      } else {
         setCountMedium(countMedium - 1);
      }
   };
   // large
   const handleLargeMin = (e) => {
      e.preventDefault();
      if (countLarge <= 0) {
         return null;
      } else {
         setCountLarge(countLarge - 1);
      }
   };

   const handleWa = (obj) => {
      let total = obj.medium * countMedium + obj.large * countLarge;
      navigate("/products/orderwa", {
         state: {
            id: obj._id,
            qtyM: countMedium,
            qtyL: countLarge,
            total,
         },
      });
   };
   const [view, setView] = useState(false);
   const [modalContent, setModalContent] = useState([]);
   const handleClick = (props) => {
      setView(!view);
      setModalContent([props]);
   };
   return (
      <>
         <div className="relative w-full text-amber-900 rounded card px-1 py-2 sm:max-h-full max-h-96">
            <div className="flex flex-col gap-y-1">
               <ImageBasic
                  src={props.image?.url || defaultImage}
                  alt={props.title}
                  styledCustom="h-56 object-contain"
               />
               <div className="px-2">
                  <p>{props.title || "unknown"}</p>
                  <p className="text-xs font-normal my-2">
                     Rp.{currencyFormater(props.medium)} - Rp.
                     {currencyFormater(props.large)}
                  </p>
               </div>
            </div>
            <div className="px-2">
               <button
                  onClick={() => handleClick(props)}
                  className="text-sm bg-amber-300 rounded mt-2 py-2 text-center w-full">
                  Quick view
               </button>
            </div>
         </div>
         {/* modal content for detailing */}
         <Modal onClick={handleClick} show={view}>
            {modalContent.map((obj, i) => (
               <form key={i}>
                  <div className="mt-4 text-amber-900">
                     <ImageBasic
                        src={obj.image?.url || defaultImage}
                        alt={obj.title}
                        styledCustom="h-56 object-contain"
                     />
                     <h4>{obj.title}</h4>
                     <p className="text-sm">{obj.desc || "unknown"}</p>
                  </div>
                  <div>
                     <input
                        className="hidden"
                        value={obj.title || "unknown"}
                        id="name"
                        readOnly
                        name="name"
                     />
                     <div className="mt-4 w-full gap-y-5">
                        <PriceInputHandleQuantity
                           size="Md/500ml"
                           nameInput="medium"
                           htmlFor="medium"
                           priceValue={obj.medium || 0}
                           valueQuantity={countMedium}
                           decrement={handleMediumMin}
                           increment={(e) => {
                              e.preventDefault();
                              setCountMedium(countMedium + 1);
                           }}
                        />
                        {/* large size */}
                        <PriceInputHandleQuantity
                           size="Lg/100ml"
                           nameInput="large"
                           htmlFor="large"
                           priceValue={obj.large || 0}
                           valueQuantity={countLarge}
                           decrement={handleLargeMin}
                           increment={(e) => {
                              e.preventDefault();
                              setCountLarge(countLarge + 1);
                           }}
                        />
                        {/* checkout button */}
                        <div className="flex-col flex">
                           <div className="flex justify-evenly">
                              <ButtonLink
                                 disabled={disableButton}
                                 onClick={() => handleWa(obj)}>
                                 <BsWhatsapp size={18} />
                                 Whatsapp
                              </ButtonLink>
                              <ButtonLink disabled>
                                 <FaMotorcycle size={18} />
                                 By Gojek
                              </ButtonLink>
                           </div>
                        </div>
                     </div>
                  </div>
               </form>
            ))}
         </Modal>
      </>
   );
}

// Bij Kopi
function CoffeePacks(props) {
   const dispatch = useDispatch();
   const [view, setView] = useState(false);
   const [modalContent, setModalContent] = useState([]);
   const handleClick = (props) => {
      setView(!view);
      setModalContent([props]);
   };

   const handleAdd = (obj) => {
      dispatch(add(obj));
   };
   return (
      <>
         <div className="relative flex flex-col text-yellow-800 capitalize tracking-wide  justify-between w-full card mb-12 px-1 py-2 sm:max-h-full max-h-96">
            <div className="gap-y-1 flex flex-col">
               <ImageBasic
                  src={props.image?.url || defaultImage}
                  alt={props.title}
                  styledCustom="h-56 object-contain"
               />
               <div className="px-2">
                  <p>{props.title || "unknown"}</p>
                  <p className="text-xs font-normal my-2">
                     size : {props.size} gr
                  </p>
                  <p className="text-xs font-normal my-2">
                     Rp.{currencyFormater(props.price)}
                  </p>
               </div>
            </div>
            <div className="flex text-sm justify-between sm:justify-evenly flex-end">
               <ButtonLink onClick={() => handleClick(props)}>
                  <BsFillEyeFill />
                  Preview
               </ButtonLink>
               {/* add cart product */}
               <ButtonLink onClick={() => handleAdd(props)}>
                  <FaCartPlus />
                  Add
               </ButtonLink>
            </div>
         </div>
         {/* modal content for detailing */}
         <Modal onClick={handleClick} show={view}>
            {modalContent.map((obj, i) => (
               <div key={i}>
                  <div className="mt-4 text-sm text-amber-900">
                     <div className="w-8/12 mx-auto">
                        <img
                           src={obj.img || defaultImage}
                           alt={obj.title || "unknown"}
                           className="object-cover h-56 mx-auto"
                        />
                     </div>
                     <div className="mt-3">
                        <p className="text-xl">{obj.title || "unknown"}</p>
                        <p>size : {obj.size} gr</p>
                        <p>{obj.desc || "unknown"}</p>
                     </div>
                  </div>
               </div>
            ))}
         </Modal>
      </>
   );
}
