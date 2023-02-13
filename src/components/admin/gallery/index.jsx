import { AiFillDelete } from "react-icons/ai";
import Loading from "../../Loading";
import AddGallery from "../actions/AddGallery";
import { Transition, Dialog } from "@headlessui/react";
import DeleteComponent from "../actions/DeleteComponent";

import { useState, Fragment } from "react";
import defaultImage from "../../../assets/images/defaultImage.jpg";
import useFetchGet from "../../../hooks/useFetchGet";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../../requestMethods";
import { deleteAction } from "../../../redux/toggleReducer";

// admin gallery set
const Galleries = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const deleteId = useSelector(state => state.toggle.client.deleteId)

  const handleAdd = (e) => {
    e.preventDefault();
    setVisible(visible ? false : true);
  };

  const deleteHandler = async () => {
    if(deleteId){
      await publicRequest.delete(`/gallery/delete/:${deleteId}`);
      dispatch(deleteAction(null))
      window.location.reload(true);
    }
  }

  const cancelHandler = () => {
    dispatch(deleteAction(null))
  }

  const { isLoading, isError, data } = useFetchGet('/gallery')
  return (
    <>
      <div className="flex justify-between">
        <button
          onClick={handleAdd}
          className="bg-yellow-200 px-3 py-2 text-yellow-700 rounded-md my-1"
        >
          Add Photos
        </button>
      </div>
      {visible ? <AddGallery /> : <></>}
      {isLoading && <Loading/>}
      {deleteId && DeleteComponent({deleteHandler, cancelHandler})}
      <main className="grid md:grid-cols-4 max-h-36 grid-cols-2 sm:grid-cols-3 gap-2">
        {
          data.map((obj, i) => <TableBody {...obj} key={i} />)
        }
      </main>
    </>
  );
}

function TableBody({ _id, title, img, desc, writer }) {
  const dispatch = useDispatch()

  const onDelete = (id) => {
    dispatch(deleteAction(id))
  };
  return (
    <>
      <div className="bg-amber-50 rounded-md p-1 text-xs lg:text-sm tracking-wide">
        <div className="w-full items-center flex justify-center py-1">
          <img
            src={img || defaultImage}
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
            className="bg-red-500 text-white rounded-md h-max p-1 w-max mx-auto md:mx-0"
          >
            <AiFillDelete size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Galleries;