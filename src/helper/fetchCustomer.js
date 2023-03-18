import { authorizationRequest } from "../requestMethods";

export const getCustomers = async () => {
   return await authorizationRequest.get("/customer");
};

export const getCustomer = async (id) => {
   const response = await authorizationRequest.get(`/customer/${id}`);
   return response.data;
};

export const updateCustomer = async (data) => {
   return await authorizationRequest.patch(
      `/customer/update/${data._id}`,
      data
   );
};
