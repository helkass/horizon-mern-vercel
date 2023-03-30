import { publicRequest, authorizationRequest } from "../requestMethods";

export const addGallery = async (data) => {
   const response =  await authorizationRequest.post("/gallery/create", data);
   return response;
};

export const getGalleries = async () => {
   const response = await publicRequest.get("/gallery");
   return response.data;
};

export const deleteGallery = async ({ id }) => {
   return await authorizationRequest.delete(`gallery/delete/${id}`);
};
