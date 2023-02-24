import { BiBrush, BiArrowBack } from "react-icons/bi";
import Content from "../Content";
import Success from "../../Success";
import Header from "../Header";
import Bug from "../../Bug";
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../../requestMethods";
import Loading from "../../Loading";

const EditPack = () => {
   const [data, setData] = useState({});
   const [isLoading, setLoading] = useState(false);
   const navigate = useNavigate();
   const location = useLocation();
   const urlId = location.pathname.split("/")[3];

   useEffect(() => {
      const fetchData = async () => {
         const response = await publicRequest.get(`/item/${urlId}`);
         setData(response.data);
      };
      fetchData();
   }, []);

   const [success, setSuccess] = useState(false);
   const [error, setError] = useState(false);

   //  cant update image
   const update = async (data) => {
      try {
         const response = await publicRequest.put(`/item/edit/${urlId}`, {
            title: data.title,
            desc: data.desc,
            price: data.price,
            size: data.size,
         });

         console.log(response);
         setSuccess(true);

         setTimeout(() => {
            navigate("/admin");
         }, 2000);
      } catch (error) {
         setError(true);
      }

      setTimeout(() => {
         setError(false);
         setSuccess(false);
         setLoading(false);
      }, 1500);
   };
   const handleUpdate = (e) => {
      setLoading(true);
      e.preventDefault();
      const newForm = new FormData(e.target);
      const pack = Object.fromEntries(newForm.entries());

      update(pack);
   };
   return (
      <>
         <Header />
         <Content>
            {isLoading && (
               <Loading styledCustom="absolute top-0 left-0 right-0 cursor-not-allowed" />
            )}
            <div className="flex text-xl justify-center">
               <h1>Edit Cups</h1>
            </div>
            {success && <Success message={"Data Updated"} />}
            {error && <Bug message="failed to update" />}
            <form className="grid gap-2 my-3" onSubmit={handleUpdate}>
               <div>
                  <input
                     className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
                     placeholder="name"
                     type="text"
                     name="title"
                     id="name"
                     defaultValue={data.title}
                  />
               </div>
               <div>
                  <textarea
                     className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
                     placeholder="description"
                     type="text"
                     name="desc"
                     id="desc"
                     defaultValue={data.desc}
                  />
               </div>
               <div className="grid md:grid-cols-4 grid-cols-3 items-center px-2">
                  <label>size</label>
                  <div className="flex items-center gap-2">
                     <label>gr</label>
                     <input
                        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
                        placeholder="size"
                        type="text"
                        name="size"
                        id="size"
                        defaultValue={data.size}
                     />
                  </div>
               </div>
               <div className="grid md:grid-cols-4 grid-cols-3 items-center px-2">
                  <label>price</label>
                  <div className="flex items-center gap-2">
                     <span>Rp.</span>
                     <input
                        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
                        placeholder="price"
                        type="text"
                        name="price"
                        id="price"
                        defaultValue={data.price}
                     />
                     <span className="text-gray-400 text-xs">exp:50000</span>
                  </div>
               </div>
               <div className="flex w-full justify-between">
                  <button
                     type="submit"
                     className="bg-yellow-200 mt-3 flex items-center hover:bg-yellow-400 px-4 py-1 gap-2 rounded-md text-yellow-600 w-max">
                     Update product
                     <span>
                        <BiBrush className="px-1" size={24} />
                     </span>
                  </button>
                  <Link to="/admin">
                     <button className="bg-red-200 mt-3 flex items-center hover:bg-red-400 px-4 py-1 gap-2 rounded-md text-red-600 w-max">
                        Back
                        <span>
                           <BiArrowBack className="px-1" size={24} />
                        </span>
                     </button>
                  </Link>
               </div>
            </form>
         </Content>
      </>
   );
};

export default EditPack;
