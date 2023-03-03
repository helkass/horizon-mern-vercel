import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Loading from "../../Loading";
import Bug from "../../Bug";
import DeleteComponent from "../actions/DeleteComponent";
import { Link } from "react-router-dom";
// fake
import defaultImage from "../../../assets/images/defaultImage.jpg";
import { useState } from "react";
import AddBottle from "../actions/AddBottle";
import { publicRequest } from "../../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import useFetchGet from "../../../hooks/useFetchGet";
import { deleteAction } from "../../../redux/toggleReducer";
import { currencyFormater } from "../../../functions/formater/currencyFormater";
// show all product from DB
// cups
function Bottles() {
   const dispatch = useDispatch();
   const deleteId = useSelector((state) => state.toggle.client.deleteId);
   // state for displaying toggle form data
   const [addVisible, setAddVisible] = useState(false);
   const { data, isLoading, isError } = useFetchGet("/item?type=bottle");
   // adding product
   const handleAdd = (e) => {
      e.preventDefault();
      setAddVisible(!addVisible);
   };

   const deleteHandler = async () => {
      if (deleteId) {
         await publicRequest.delete(`/item/delete/${deleteId}`);
         await publicRequest.get("/item");
         dispatch(deleteAction(null));
      }
   };

   const cancelHandler = async () => {
      dispatch(deleteAction(null));
   };

   return (
      <>
         <h1 className="text-center w-full my-3 text-lg font-semibold">
            All Product Bottles
         </h1>
         <button
            onClick={handleAdd}
            className="bg-yellow-200 px-3 py-2 text-yellow-700 rounded-md my-1">
            Add Bottle
         </button>
         {/* collapse */}
         {addVisible ? <AddBottle /> : <></>}
         {/* .................
        ...............
        ............. */}
         {/* head */}
         {deleteId && DeleteComponent({ deleteHandler, cancelHandler })}
         <div className="w-full sm:h-9  rounded flex flex-cols-6 gap-1 font-semibold text-center text-xs sm:text-sm md:text-md">
            <div className="bg-amber-400 rounded py-1 w-2/12">
               <p>Image</p>
            </div>
            <div className="bg-amber-400 rounded py-1 w-3/12">
               <p>title</p>
            </div>
            <div className="bg-amber-400 rounded py-1 w-4/12">
               <p>Desc</p>
            </div>
            <div className="bg-amber-400 rounded py-1 w-2/12">
               <p>Price</p>
            </div>
            <div className="bg-amber-400 rounded py-1 sm:px-1 md:px-3">
               <p>Action</p>
            </div>
         </div>
         {/* body */}
         <main className="mt-2 gap-3">
            {isLoading && <Loading />}
            {data.length < 0 && <Bug />}
            {data.map((obj, i) => (
               <TableBody {...obj} key={i} />
            ))}
         </main>
      </>
   );
}

function TableBody({ _id, title, desc, image, medium, large }) {
   const dispatch = useDispatch();
   const onDelete = (id) => {
      dispatch(deleteAction(id));
   };
   return (
      <>
         <div className="w-full text-xs sm:text-sm md:text-md max-h-24 rounded flex flex-cols-6 gap-1 mt-1 text-center">
            <div className="bg-amber-100 rounded py-1 w-2/12">
               <div className="objeect-cover flex mx-auto self-center">
                  <img
                     src={image?.url || defaultImage}
                     alt={title || "unknown"}
                     className="mx-auto w-12 h-12 object-cover"
                  />
               </div>
            </div>
            <div className="bg-amber-100 rounded flex justify-center py-1 w-3/12">
               <p>{title || "unknown"}</p>
            </div>
            <div className="bg-amber-100 sm:text-sm text-xs rounded py-1 w-4/12">
               <p>{desc || "unknown"}</p>
            </div>
            <div className="bg-amber-100 rounded py-1 w-2/12 sm:text-sm text-xs">
               <p>{currencyFormater(medium) || "unknown"}</p>
               <p>{currencyFormater(large) || "unknown"}</p>
            </div>
            {/* clicked action*/}
            <div className="bg-amber-100 rounded py-2 px-2 md:gap-3 gap-2 md:w-1/12 text-center justify-center md:flex md:flex-col-1 grid grid-cols-1">
               <Link
                  to={"/admin/editbottle/" + _id.toString()}
                  className="rounded-md h-max relative w-max mx-auto md:mx-0">
                  <AiFillEdit size={20} color={"#eab308"} />
               </Link>
               <button
                  onClick={() => onDelete(_id)}
                  className=" text-white rounded-md h-max w-max mx-auto md:mx-0">
                  <AiFillDelete size={20} color={"#ef4444"} />
               </button>
            </div>
         </div>
      </>
   );
}

export default Bottles;
