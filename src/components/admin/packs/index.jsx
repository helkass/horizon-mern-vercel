import AddPack from "../actions/AddPack";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import useFetchGet from "../../../hooks/useFetchGet";
import Loading from "../../Loading";
import { useSelector, useDispatch } from "react-redux";
import DeleteComponent from "../actions/DeleteComponent";
import { Link } from "react-router-dom";
import Alert from "../../atoms/alerts/Alert";

// fake
import horizon_pack_image_default from "../../../assets/images/horizon-pack-default.png";
import { deleteAction } from "../../../redux/toggleReducer";
import { publicRequest } from "../../../requestMethods";

// show all product from DB
function CoffeePacks() {
   const dispatch = useDispatch();
   const deleteId = useSelector((state) => state.toggle.client.deleteId);
   // state for displaying toggle form data
   const [visible, setVisible] = useState(false);
   const { data, isLoading, isError } = useFetchGet("/item?type=pack");

   // adding product
   const handleAdd = (e) => {
      e.preventDefault();
      setVisible(visible ? false : true);
   };

   const deleteHandler = async () => {
      if (deleteId) {
         await publicRequest.delete(`/item/delete/${deleteId}`);
         dispatch(deleteAction(null));
         window.location.reload(true);
      }
   };

   const cancelHandler = async () => {
      dispatch(deleteAction(null));
   };

   return (
      <>
         <h1 className="text-center w-full my-3 text-lg font-semibold">
            All Coffee Packs
         </h1>
         <button
            onClick={handleAdd}
            className="bg-yellow-200 px-3 py-1 text-sm text-yellow-700 rounded-md my-1">
            Add Coffee
         </button>
         {/* conditional between update and add */}
         {visible && <AddPack />}
         {/* ..................
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
            <div className="bg-amber-400 rounded py-1 w-1/12">
               <p>Size</p>
            </div>
            <div className="bg-amber-400 rounded py-1 w-2/12">
               <p>Price Rp</p>
            </div>
            <div className="bg-amber-400 rounded py-1 w-1/12">
               <p>Act</p>
            </div>
         </div>
         {/* body */}
         <main className="mt-2 gap-3">
            {isLoading ? (
               <Loading />
            ) : data.length < 0 ? (
               <Alert error message="data not found!" />
            ) : (
               data.map((obj, i) => <TableBody {...obj} key={i} />)
            )}
            {isError && <Alert message="something went wrong!" error />}
         </main>
      </>
   );
}

function TableBody({ _id, title, img, desc, price, size }) {
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
                     src={img || horizon_pack_image_default}
                     alt={title || "unknown"}
                     className="mx-auto w-16 h-16 object-cover"
                  />
               </div>
            </div>
            <div className="bg-amber-100 rounded flex justify-center py-1 w-3/12">
               <p>{title || "unknown"}</p>
            </div>
            <div className="bg-amber-100 sm:text-sm text-xs rounded py-1 w-4/12">
               <p>{desc || "unknown"}</p>
            </div>
            <div className="bg-amber-100 rounded py-1 w-1/12 sm:text-sm text-xs">
               <p>{size || "unknown"}</p>
            </div>
            <div className="bg-amber-100 rounded py-1 w-2/12 sm:text-sm text-xs">
               <p>{price || "unknown"}</p>
            </div>
            {/* clicked action*/}
            <div className="bg-amber-100 rounded py-2 px-2 md:gap-3 gap-2 md:w-1/12 text-center justify-center md:flex md:flex-col-1 grid grid-cols-1">
               <Link
                  to={"/admin/editpack/" + _id.toString()}
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

export default CoffeePacks;
