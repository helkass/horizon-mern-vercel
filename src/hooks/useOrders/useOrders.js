import { useState, useEffect } from "react";
import { authorizationRequest, publicRequest } from "../../requestMethods";

const useOrders = () => {
   const [data, setData] = useState([]);
   const [isError, setError] = useState(false);
   const [isLoading, setloading] = useState(true);

   //fething order data
   const fetchData = async () => {
      try {
         const response = await publicRequest.get("/order");
         setData(response.data);

         //  get order _id
         const order_id = response.data.map((element) => element._id);
         // update status midtrans
         console.log(order_id);
         for (let i = 0; i < order_id.length; i++) {
            await publicRequest.get(`/order/status/${order_id[i]}`);
         }

         setTimeout(() => {
            setloading(false);
         }, 2000);
      } catch (error) {
         setError(true);
         setData([]);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   // custom hook returns value
   return { data, isError, isLoading };
};

export default useOrders;
