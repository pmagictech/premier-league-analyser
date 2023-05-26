import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  type: "modal" | "toast";
  message?: JSX.Element | string;
}

export default function Modal({ isOpen, closeModal, title, type, message }: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        {type == "modal" ? (
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
        ) : null}

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={`flex min-h-full ${
              type == "toast" ? "items-end justify-end" : "items-center justify-center"
            } p-4 text-center`}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full transform overflow-hidden rounded-2xl bg-white ${
                  type == "toast" ? "p-4 max-w-sm border border-neutral-200" : "p-6 max-w-md"
                } text-left align-middle shadow-xl transition-all`}
              >
                {type == "modal" ? (
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 text-center">
                    {title}
                  </Dialog.Title>
                ) : null}
                <div className={type == "toast" ? "" : "mt-2"}>
                  <p className="text-sm text-gray-500">{message}</p>
                </div>

                {type == "modal" ? (
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Okay
                    </button>
                  </div>
                ) : null}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
