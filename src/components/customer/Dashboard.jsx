import defaultImage from "../../assets/images/defaultImage.jpg";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../Container";
import { DefaultInput } from "../Form";
import Layout from "../Layout";
import { publicRequest } from "../../requestMethods";

const Dashboard = (props) => {
    const [customer, setCustomer] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            await publicRequest.get(`/customer/${id}`).then(response => setCustomer(response.data));
        }
        fetchData();
    },[])
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    console.log(data);
  };
  return (
      <form onSubmit={handleUpdate} className="sm:w-9/12 px-5 space-y-2">
        <div className="flex gap-3 items-center">
          <div className="w-[90px] h-[90px] rounded-full">
            <img
              src={customer.img || defaultImage}
              className="rounded-full"
              alt={`photo ${customer.fullname}`}
            />
          </div>
          <input
            type="file"
            name="image"
            className="block text-sm cursor-pointer text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-600"
          />
        </div>
        <div className="flex gap-5">
          <DefaultInput
            label="fullname"
            name="fullname"
            defaultValue={customer.fullname}
          />
          <DefaultInput
            label="phone"
            name="phone"
            defaultValue={customer.phone}
          />
        </div>
        <DefaultInput
          name="address"
          label="address"
          defaultValue={customer.address}
        />
        <div className="flex gap-5 w-10/12">
          <DefaultInput
            name="city"
            label="city"
            defaultValue={customer.city}
          />
          <DefaultInput
            name="provice"
            label="province"
            defaultValue={customer.province}
          />
        </div>
        <div className="flex gap-5 w-10/12">
          <DefaultInput
            name="email"
            label="email"
            defaultValue={customer.email}
          />
        </div>
        <div className="w-full font-flower flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-yellow-100 min-w-[100px] my-7"
          >
            Save
          </button>
        </div>
      </form>
  );
};

export default Dashboard;