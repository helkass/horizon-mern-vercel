import { Transition, Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import defaultImage from "../../assets/images/defaultImage.jpg";
import { useState, Fragment } from "react";

export const Gallery = (props) => {
  const [view, setView] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const handleClick = (props) => {
    setView(!view);
    setModalContent([props]);
  };
  return (
    <>
      <div
        onClick={() => handleClick(props)}
        className="p-2 relative tracking-wide mt-3 cursor-pointer hover:scale-105 mt-5 transition-all ease-out duration-100"
      >
        <div key={props._id} className="w-full items-center my-2 flex justify-center rounded-md">
          <img
            src={props.img || defaultImage}
            className="mx-auto rounded-md w-full max-h-86 object-cover rounded-xl"
            alt={props.title}
          />
        </div>
        <div className="absolute bg-white w-10/12 text-amber-800 shadow-amber-300 shadow-md bottom-0 px-4 py-2 translate-y-1/3 rounded-2xl left-1/2 -translate-x-1/2 md:h-24 sm:h-18 ">
          <p>{props.title || "unknown"}</p>
          {/* <p>{props.desc}</p> */}
          <p className="opacity-70 text-xs mt-3">by {' '}
            <span className="opacity-100">{props.writer || "unknown"}</span>
          </p>
        </div>
      </div>
      {/* modal */}
      <Transition appear show={view} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleClick}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    onClick={handleClick}
                    className="absolute top-1 right-1 bg-red-200 rounded-full p-1 m-1"
                  >
                    <AiOutlineClose size={18} color="#f87171" />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900 border-b-2 border-amber-100"
                  >
                    Detail
                  </Dialog.Title>
                  {modalContent.map((obj, i) => (
                    <>
                      <div key={i} className="mt-4 text-gray-700">
                        <div className="w-8/12 flex  justify-center items-center">
                          <img
                            src={obj.img || defaultImage}
                            alt={obj.title || "unknown"}
                          />
                        </div>
                        <p className="font-semibold text-xl">{obj.title}</p>
                        <p>{obj.desc || "unknown"}</p>
                        <p className="text-xs text-opacity-70">
                          Writer by {obj.writer || "unknown"}
                        </p>
                      </div>
                    </>
                  ))}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};