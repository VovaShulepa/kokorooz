import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
import { MenuModalProps } from './MenuModal.props';

import Telegram from 'public/telegram.svg';
import Instagram from 'public/instagram.svg';

export const MenuModal: FC<MenuModalProps> = ({ isOpen, setIsOpen }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="mobile-menu fixed inset-0 [backdrop-filter:blur(25px)]" />
          </Transition.Child>

          <div className="fixed inset-0 min-h-full overflow-y-auto">
            <div className="flex h-[550px] w-auto">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden transition-all flex relative mx-auto w-full">
                  <button
                    type="button"
                    className="absolute top-7 right-8 border-none outline-none bg-transparent focus-visible:border-none"
                    onClick={closeModal}
                  >
                    <Image
                      src="/closebtn.svg"
                      width={18}
                      height={18}
                      alt="close"
                      className="border-none fill-white outline-none bg-transparent"
                    />
                  </button>
                  <nav className="flex flex-col gap-4 w-full mt-24">
                    <ul className="text-white text-2xl flex flex-col text-center gap-8 font-medium">
                      <li>
                        <Link
                          onClick={closeModal}
                          href="#home"
                          className="text-2xl"
                        >
                          Головна
                        </Link>
                      </li>
                      <li>
                        <Link onClick={closeModal} href="#feedback">
                          Відгуки
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.inrepublic.one/"
                          onClick={closeModal}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Наші проекти
                        </Link>
                      </li>
                      <li>
                        <Link
                          href=""
                          rel="noopener noreferrer"
                          target="_blank"
                          className="btn-gradient bg-[#3fb22a] rounded-full font-bold text-center text-black px-6 py-2 text-[20px]"
                        >
                          Увійти
                        </Link>
                      </li>
                    </ul>
                    <div className="w-[290px] mt-4 mb-4 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
                    <div className="flex justify-center gap-8">
                      <Link
                        href="https://www.inrepublic.one/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Telegram className="w-8 h-8" />
                      </Link>
                      <Link
                        href="https://www.instagram.com/kokorooz_app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className=" w-8 h-8" />
                      </Link>
                    </div>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
