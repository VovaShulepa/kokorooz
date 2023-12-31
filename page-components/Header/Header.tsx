import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { MenuModal } from '@/components/common/MenuModal';
import Burger from 'public/burger.svg';
import Telegram from 'public/telegram.svg';
import Instagram from 'public/instagram.svg';
import Image from 'next/image';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="container header py-2 px-8 rounded-bl-3xl rounded-br-3xl fixed top-0 left-0 right-0 bg-transparent backdrop-filter backdrop-blur-lg z-40">
      <div className="container py-3">
        <div className="flex flex-row justify-between items-center">
          <Link href="/">
            <span className="flex text-2xl font-bold items-center text-white">
              KOK
              <Image
                src="/smile.png"
                alt="app screenshots"
                quality={100}
                width={28}
                height={28}
                priority
                className="mx-auto"
              />
              ROOZ
            </span>
          </Link>

          <button className="xl:hidden" onClick={() => setIsOpen(true)}>
            <Burger className="w-8 h-8 " />
          </button>

          <nav className="notXl:hidden">
            <ul className="flex items-center font-bold text-white gap-[72px]">
              <li className="py-1 hover:translate-y-1 duration-300 hover:text-yellow-300">
                <Link href="/">Головна</Link>
              </li>
              <li className="py-1 hover:translate-y-1 duration-300 hover:text-yellow-300">
                <Link href="#feedback">Відгуки</Link>
              </li>

              <li className="py-1 hover:translate-y-1 duration-300 hover:text-yellow-300">
                <Link
                  href="https://t.me/NickolaOcean"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Зв’язок
                </Link>
              </li>

              <li>
                <Link href="/" target="_blank" rel="noopener noreferrer">
                  <Telegram className="w-6 h-6 duration-300 hover:fill-yellow-300 hover:scale-110 focus:scale-110" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/kokorooz_app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-6 h-6 duration-300 hover:fill-yellow-300 hover:scale-110 focus:scale-110" />
                </Link>
              </li>
              {session ? (
                <li className="flex gap-2">
                  <Link
                    href="/user"
                    className=" text-center py-2 px-5 rounded-full bg-violet-800 text-yellow-300 hover:bg-violet-500 hover:scale-[.98] duration-300"
                  >
                    {session.user?.name || 'User'}
                  </Link>
                </li>
              ) : (
                <li className="block hover:scale-[.96] duration-300">
                  <Link
                    href="/login"
                    rel="noopener noreferrer"
                    className="btn-gradient bg-[#3fb22a] text-center py-3 px-5 text-black rounded-full hover:text-white"
                  >
                    Увійти
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
      <MenuModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};
