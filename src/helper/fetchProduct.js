import { publicRequest } from "../requestMethods";

export const addProduct = async (data) => {
   const response = await publicRequest.post("/item/create", data);
   return response;
};

export const getPackProduct = async () => {
   const response = await publicRequest.get("/item?type=pack");
   return response.data;
};

export const getBottleProduct = async () => {
   const response = await publicRequest.get("/item?type=bottle");
   return response.data;
};

export const deleteProduct = async ({ id }) => {
   return await publicRequest.delete(`item/delete/${id}`);
};
