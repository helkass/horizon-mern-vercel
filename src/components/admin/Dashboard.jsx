import { MdOutlineArticle } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { FiBox } from "react-icons/fi"
import { useState, useEffect } from "react";
import { publicRequest } from "../../requestMethods";
import useFetchGet from "../../hooks/useFetchGet";
import Loading from "../Loading";
import Bug from "../Bug";

function Main() {
    const [gallery, setGallery] = useState([]);
    const [items, setItems] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
      const fetchingData = async () => {
            const item = await publicRequest.get('/item');
            setItems(item.data)

            const gallery = await publicRequest.get('/gallery');
            setGallery(gallery.data)

            const blog = await publicRequest.get('/blog');
            setBlogs(blog.data)

            const customer = await publicRequest.get('/customer');
            setCustomers(customer.data)
        };
        fetchingData();
      }, []);
      return (
          <div className="flex flex-col w-full">
            <div className="flex flex-wrap md:gap-4 gap-1 px-3 w-full">
              <Card total={items.length} name="Items" icon={<FiBox size={25} />} />
              <Card
                total={gallery.length}
                name="Galleries"
                icon={<BsImage size={25} />}
              />
              <Card
                total={blogs.length}
                name="Blogs"
                icon={<MdOutlineArticle size={25} />}
              />
              <Card
                total={customers.length}
                name="Customers"
                icon={<FaUserFriends size={25} />}
              />
            </div>
            <HistoryTable />
          </div>
      );
    }

function Card({ name, icon, total }) {
  return (
    <div className="px-3 py-1 md:w-48 sm:h-20 h-16 flex flex-col bg-yellow-50 border rounded-md border-yellow-400">
      <div className="flex gap-2 text-[1.1rem] md:text-xl items-center justify-between">
        <span>{name}</span>
        <span>{icon}</span>
      </div>
      <span className="text-xl">{total}</span>
    </div>
  );
}

// table history order
function HistoryTable() {
  const { data, isLoading, isError } = useFetchGet('/order');

  return (
    <section className="my-4 px-1 rounded max-w-[1340px]">
      <h1 className="text-xl my-2">Orders Summary</h1>
      {/* head */}
      <div className="flex gap-1">
        <span className="py-1 pl-2 w-3/12 rounded bg-yellow-50">Customer Id</span>
        <span className="text-center py-1 flex-1 rounded bg-yellow-50">
          Product
        </span>
        <span className="text-center py-1 w-2/12 rounded bg-yellow-50">
          Price
        </span>
        <span className="text-center py-1 w-2/12 rounded bg-yellow-50">
          Date
        </span>
      </div>
      {/* main ordering data */}
      {isLoading && <Loading/>}
      {data.map((order) => (
      <div key={order._id} className="flex gap-1 border-b my-1 md:text-md sm:text-sm text-xs">
          <span className="py-1 pl-2 w-3/12 rounded">{order.customerId}</span>
          <div className="text-center py-1 flex-1  w-full bg-red-100 rounded flex flex-col">{order.products.map(product => 
            <div className="flex gap-2 w-full justify-center" key={product.productId}>
              <span>{product.productId}</span>
              <span>x{product.quantity}</span>
            </div>
            )}
          </div>
          <span className="text-center py-1 w-2/12 rounded">{order.response_midtrans.gross_amount}</span>
          <span className="text-center py-1 w-2/12 rounded">{order.createdAt}</span>
      </div>
      ))}
    </section>
  );
}

export default Main;