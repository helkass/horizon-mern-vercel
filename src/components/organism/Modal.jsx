import React, { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Transition, Dialog } from "@headlessui/react";

const Modal = ({ children, show, onClick }) => {
   return (
      <Transition appear show={show} as={Fragment}>
         <Dialog as="div" className="relative z-50" onClose={onClick}>
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0">
               <div className="fixed inset-0 bg-amber-50 bg-opacity-25" />
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
                     leaveTo="opacity-0 scale-95">
                     <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white/90 text-amber-900 backdrop-blur-90 p-6 text-left align-middle shadow-xl transition-all">
                        <button
                           onClick={onClick}
                           className="absolute top-1 right-1 bg-red-200 rounded-full p-1 m-1">
                           <AiOutlineClose size={18} color="#f87171" />
                        </button>
                        <Dialog.Title
                           as="h3"
                           className="text-xl font-medium leading-6 text-gray-900 border-b-2 border-amber-100">
                           Detail
                        </Dialog.Title>
                        {children}
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition>
   );
};

export default Modal;
