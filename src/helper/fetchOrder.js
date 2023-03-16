import { publicRequest } from "../requestMethods";

export const getOrders = async () => {
   const response = await publicRequest.get("/order");
   console.log("response", response);
   return response.data;
};

export const updateOrderStatusProcess = async (id) => {
   return await publicRequest.put(`/order/status/process/${id}`);
};

export const deleteOrder = async (id) => {
   return await publicRequest.delete(`/order/delete/${id}`);
};
