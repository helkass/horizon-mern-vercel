import React, { useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { publicRequest } from '../../../requestMethods';
import Bug from '../../Bug';

const Search = () => {
    const [customerId, setCustomerId] = useState("");
    const [customer, setCustomer] = useState({});

    const [productId, setProductId] = useState("");
    const [product, setProduct] = useState({});
    // search for customer;
    const searchCustomer = async () => {
        const response = await publicRequest.get(`/customer/${customerId}`)
        setCustomer(response.data);
    }
    // seacrh for product or item
    const searchProduct = async () => {
        const response = await publicRequest.get(`/item/${productId}`);
        setProduct(response.data);
    }
  return (
    <section className='grid'>
        {/* customer */}
        <label htmlFor='customer'>Search by Customer Id</label>
        <div className='flex gap-2'>
            <input name='customer' type="text" onChange={(e) => setCustomerId(e.target.value)} className="focus:outline-green-200 border border-green-200 rounded-md w-full px-3 py-2 text-gray-800 text-sm"/>
            <button onClick={searchCustomer} className="h-12 w-12 flex bg-green-100 text-green-600 items-center justify-center rounded-xl"><FiSearch size={20}/></button>
        </div>
        {/* customer data */}
        {
            customer === "null" && <Bug message="customer not found!"/>
        }
        <div className='w-full my-2 px-3 grid space-y-3 tracking-wide'>
            <p>fullname : <span className='text-green-500'>{customer.fullname}</span></p>
            <p>email : <span className='text-green-500'>{customer.email}</span></p>
            <p>phone : <span className='text-green-500'>{customer.phone}</span></p>
            <p>address : <span className='text-green-500'>{customer.address}</span></p>
            <p>city : <span className='text-green-500'>{customer.city}</span></p>
            <p>provice : <span className='text-green-500'>{customer.province}</span></p>
        </div>
        {/* end customer */}
        {/* products */}
        <label htmlFor='product'>Search by Product Id</label>
        <div className='flex gap-2'>
            <input name='product' type="text" onChange={(e) => setProductId(e.target.value)} className="focus:outline-green-200 border border-green-200 rounded-md w-full px-3 py-2 text-gray-800 text-sm"/>
            <button onClick={searchProduct} className="h-12 w-12 flex bg-green-100 text-green-600 items-center justify-center rounded-xl"><FiSearch size={20}/></button>
        </div>
    </section>
  )
}

export default Search;