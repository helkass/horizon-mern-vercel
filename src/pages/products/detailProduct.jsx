import Cart from "../../components/Cart";
import SeoHelmetComponent from "../../components/SeoHelmetComponent";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Title from "../../components/atoms/title/Title";
import { publicRequest } from "../../requestMethods";
import Rating from "react-rating";
import { AiFillStar } from "react-icons/ai";
import { currencyFormater } from "../../functions/formater/currencyFormater";
import { useDispatch, useSelector } from "react-redux";
import { add, removeAlert } from "../../redux/cartReducer";
import { ButtonBasic } from "../../components/atoms/button/Button";
import { AbsoluteAlert } from "../../components/atoms/alerts/Alert";
import CardComment from "../../components/molecules/cards/CardComment";

const DetailProduct = () => {
   const [product, setProduct] = useState(null);
   const [reviews, setReviews] = useState(null);
   const location = useLocation();
   const dispatch = useDispatch();
   const cart = useSelector((state) => state.cart);

   const idProduct = location.pathname.split("/")[2];

   const fetchDataProduct = async () => {
      const response = await publicRequest.get(`/item/${idProduct}`);
      setProduct(response.data);
   };

   const fetchReviews = async () => {
      const response = await publicRequest.get(
         `/review?product_id=${idProduct}&limit=5`
      );
      setReviews(response.data);
   };

   const handleAdd = (obj) => {
      dispatch(add(obj));

      setTimeout(() => {
         dispatch(removeAlert());
      }, 1500);
   };

   useEffect(() => {
      fetchDataProduct();
      fetchReviews();
   }, []);
   return (
      <>
         <SeoHelmetComponent
            title={"horizon product | shop"}
            content={"kopi arabica robusta asli, cek kopi favorit kamu"}
            href={`/products/${location.pathname}`}
         />
         <Layout>
            <main className="pt-24 min-h-screen sm:min-h-5/6">
               <Container>
                  <AbsoluteAlert
                     success
                     message={cart.alert.message}
                     isShow={cart.alert.status}
                  />
                  <div className="flex w-full justify-between text-amber-900 py-2 md:pb-0 items-center">
                     <Title
                        title="Details"
                        styledCustom="border-b-2 border-amber-800 pb-2"
                     />
                     {/* cart */}
                     <Cart />
                     {/* end cart */}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 my-12">
                     <div className="w-full sm:w-1/2 flex items-center justify-center">
                        <img
                           src={product?.image.url}
                           className="w-full object-contain"
                        />
                     </div>
                     <div className="w-full sm:w-1/2 flex flex-col gap-2">
                        {/* main content desc or reviews and ratings */}
                        <div className="mt-4 flex flex-col gap-2">
                           <div className="flex flex-col gap-3 border-b border-slate-200 py-3">
                              <p className="font-semibold text-xl capitalize">
                                 {product?.title}
                              </p>
                              <div className="flex gap-2 items-center">
                                 <Rating
                                    initialRating={4.5}
                                    readonly
                                    emptySymbol={
                                       <AiFillStar className="text-yellow-400" />
                                    }
                                    fullSymbol={
                                       <AiFillStar className="text-yellow-400" />
                                    }
                                 />
                                 <span>(4.9)</span>
                              </div>
                              <p className="font-semibold text-xl">
                                 Rp.{currencyFormater(product?.price)}
                              </p>
                           </div>
                           <div className="flex flex-col gap-1 border-b border-slate-200 py-3">
                              <span className="text-sm text-slate-400">
                                 Available Size
                              </span>
                              <div className="flex gap-3">
                                 <p>Weight :</p>
                                 <div className="flex gap-1">
                                    <p>{product?.size}</p>
                                    <span>Gr</span>
                                 </div>
                              </div>
                              <span className="text-sm text-slate-400">
                                 Descriptions
                              </span>
                              <p className="text-slate-700">{product?.desc}</p>
                           </div>
                           <div className="flex justify-end">
                              <ButtonBasic
                                 onClick={() => handleAdd(product)}
                                 title={"Add To Cart"}
                                 styledCustom={"bg-amber-300 px-6"}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                  {/* comments */}
                  <div className="flex flex-col gap-3 py-3 my-10">
                     <span className="text-sm text-slate-400">All Reviews</span>
                     {reviews?.map((review, index) => (
                        <CardComment
                           key={index}
                           customer_name={
                              review?.customer_details.customer_name
                           }
                           rating={review?.rating}
                           comment={review?.comment}
                        />
                     ))}
                  </div>
               </Container>
            </main>
         </Layout>
      </>
   );
};

export default DetailProduct;
