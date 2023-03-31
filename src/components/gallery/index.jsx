import { Transition, Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { useState, Fragment } from "react";
import CardImage from "../molecules/cards/Card";
import { ImageBasic } from "../atoms/image/Image";

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
        className="p-2 relative tracking-wide"
      >
        <CardImage
          key={props._id}
          src={props.img || props.image.url}
          alt={props.title} 
          title={props.title} 
          writer={props.writer}
          imageStyleCustom="rounded"
          />
      </div>
      {/* modal */}
      <Transition appear show={view} as={Fragment} key={props._id}>
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
                        <ImageBasic src={obj.img} alt={obj.title} styledCustom="mx-auto w-11/12 object-cover"/>
                        <p>{obj.title}</p>
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