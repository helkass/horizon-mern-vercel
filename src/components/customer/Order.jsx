import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import useFetchGet from "../../hooks/useFetchGet";
import { Dialog, Transition } from '@headlessui/react';
import Bug from "../Bug";

function Order() {
  const { id } = useParams();
  const {data, isLoading, isError} = useFetchGet(`/order/${id}`);
  const [rekening, setReKening] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(true);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal(e) {
    setReKening(e);
    setIsOpen(true);
  }
  setTimeout(() => {
    if(data.response_midtrans.transaction_status === "settlemen" || "expire"){
      setModal(false);
    } else{
      setModal(true);
    }
  }, 1000);
  return (
      <main className="w-full">
        {isLoading ? <Loading/> : (
          // data.response_midtrans.transaction_status === "pending" &&
        <Content popTitle={rekening} handleModal={modal} isOpen={isOpen} closeModal={closeModal} expire={data.response_midtrans.expire_time} openModal={() => openModal(data.response_midtrans.permata_va_number)} id={data._id} amount={data.response_midtrans.gross_amount} payment_method={data.response_midtrans.payment_type}/>
        )}
        {data.length === 0 && <Bug message="Orders not found!"/>}
      </main>
  );
}

const Content = (props) => {
  return (
    <div className={props.handleModal ? "bg-gray-50 " : "bg-red-100 my-4 flex gap-2 w-full text-sm bg-opacity-50 p-3 rounded-md"}>
      {/* desc */}
      <div className="flex justify-between w-full">
        <div className="text-left space-y-1">
          <p>
            Order ID: <span className="text-yellow-400">{props.id}</span>
          </p>
          <strong className="capitalize">{props.title}</strong>
          <p>
            Total : <span className="text-yellow-500">{props.amount}</span>
          </p>
          <p>
            Payment : <span className="text-yellow-500">{props.payment_method}</span>
          </p>
          <p className="text-red-500 text-sm">expired at : <span>{props.expire}</span></p>
        </div>
        <div className="flex justify-end items-end h-full">
          {props.handleModal ===true &&
          <Modal popTitle={props.popTitle} openModal={props.openModal} isOpen={props.isOpen} closeModal={props.closeModal}/>
          }
        </div>
      </div>
    </div>
  );
};

function Modal(props) {
  return (
    <>
        <button
          type="button"
          onClick={props.openModal}
          className="rounded-md bg-green-100 bg-opacity-20 px-4 py-2 text-sm font-medium text-green-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 border border-green-500"
        >
          Bayar
        </button>

      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Transfer to here
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      VA number : <span className="font-semibold text-md">{props.popTitle}</span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={props.closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}


export default Order;