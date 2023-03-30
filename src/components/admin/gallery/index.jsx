import { AiFillDelete } from "react-icons/ai";
import Loading from "../../Loading";
import AddGallery from "../actions/AddGallery";
import DeleteComponent from "../actions/DeleteComponent";

import { useState } from "react";
import defaultImage from "../../../assets/images/defaultImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import { deleteAction } from "../../../redux/toggleReducer";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteGallery, getGalleries } from "../../../helper/fetchGallery";

// admin gallery set
const Galleries = () => {
   const [visible, setVisible] = useState(false);
   const dispatch = useDispatch();
   const deleteId = useSelector((state) => state.toggle.client.deleteId);

   const queryClient = useQueryClient();
   const { data, isLoading, isError } = useQuery("gallery", getGalleries);

   const deleteGalleryMutation = useMutation(deleteGallery, {
      onSuccess: () => {
         queryClient.invalidateQueries("gallery");
      },
   });

   const handleAdd = (e) => {
      e.preventDefault();
      setVisible(visible ? false : true);
   };

   const deleteHandler = async () => {
      if (deleteId) {
         deleteGalleryMutation.mutate({ id: deleteId });
         dispatch(deleteAction(null));
      }
   };

   const cancelHandler = () => {
      dispatch(deleteAction(null));
   };

   return (
      <>
         <div className="flex justify-between">
            <button
               onClick={handleAdd}
               className="bg-yellow-200 px-3 py-2 text-yellow-700 rounded-md my-1">
               Add Photos
            </button>
         </div>
         {visible ? <AddGallery /> : <></>}
         {deleteId && DeleteComponent({ deleteHandler, cancelHandler })}
         {isLoading ? (
            <Loading />
         ) : (
            <main className="grid md:grid-cols-4 max-h-36 grid-cols-2 sm:grid-cols-3 gap-2">
               {data?.map((obj, i) => (
                  <TableBody {...obj} key={i} />
               ))}
            </main>
         )}
      </>
   );
};

function TableBody({ _id, title, img, desc, writer, image }) {
   const dispatch = useDispatch();

   const onDelete = (id) => {
      dispatch(deleteAction(id));
   };
   return (
      <>
         <div className="bg-amber-50 rounded-md p-1 text-xs lg:text-sm tracking-wide">
            <div className="w-full items-center flex justify-center py-1">
               <img
                  src={img || image.url || defaultImage}
                  className="mx-auto w-11/12 h-11/12"
                  alt={title}
               />
            </div>
            <p>{title || "unknown"}</p>
            <p>{desc || "unknown"}</p>
            <p className="opacity-70 text-xs mt-3">
               Created by {writer || "unknown"}
            </p>
            <div className="flex justify-end m-3 gap-2">
               <button
                  onClick={() => onDelete(_id)}
                  className="bg-red-500 text-white rounded-md h-max p-1 w-max mx-auto md:mx-0">
                  <AiFillDelete size={20} />
               </button>
            </div>
         </div>
      </>
   );
}

export default Galleries;
