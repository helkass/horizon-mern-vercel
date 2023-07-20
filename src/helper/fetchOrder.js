import { useQuery } from "react-query";
import { authorizationRequest } from "../requestMethods";

export const getOrders = async () => {
   const response = await authorizationRequest.get("/order");
   return response.data;
};

export const createOrder = async (data) => {
   return await authorizationRequest.post("/order/charge", data, {
      headers: {
         "Content-Type": "application/json",
      },
   });
};

export const updateOrderStatusProcess = async (id) => {
   return await authorizationRequest.put(`/order/status/process/${id}`);
};

export const deleteOrder = async (id) => {
   return await authorizationRequest.delete(`/order/delete/${id}`);
};

export const getOrderByCustomer = async (id) => {
   const response = await authorizationRequest.get(
      `order/findbycustomer/${id}`
   );
   return response.data;
};

export const useFetchOrdersCustomerById = (customerId) => {
   return useQuery(["order-customer", customerId], () =>
      getOrderByCustomer(customerId)
   );
};

export const getOrderByStatus = async (id) => {
   return await authorizationRequest.get(`/order/status/${id}`);
};
