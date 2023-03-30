import { useQuery } from "react-query";
import { authorizationRequest } from "../requestMethods";

export const getCustomers = async () => {
   return await authorizationRequest.get("/customer");
};

export const getCustomer = async (id) => {
   return await authorizationRequest.get(`/customer/${id}`);
};

export const useFetchCustomerById = (customerId) => {
   return useQuery(["customer-detail", customerId], () =>
      getCustomer(customerId)
   );
};

export const updateCustomer = async (data) => {
   return await authorizationRequest.put(`/customer/update/${data._id}`, data, {
      headers: {
         "Content-Type": "application/json",
      },
   });
};
