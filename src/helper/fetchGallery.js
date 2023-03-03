import { publicRequest } from "../requestMethods";

export const addGallery = async (data) => {
   const response = await publicRequest.post("/gallery/create", data);
   return response;
};

export const getGalleries = async () => {
   const response = await publicRequest.get("/gallery");
   return response.data;
};

export const deleteGallery = async ({ id }) => {
   return await publicRequest.delete(`gallery/delete/${id}`);
};
