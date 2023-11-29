import Link from 'next/link';

import { Paragraph } from '@/components/typography/Paragraph';
import Telegram from 'public/telegram.svg';
import Instagram from 'public/instagram.svg';
import Image from 'next/image';

export const Footer = () => {
  function getCurrentYear(): number {
    const currentYear = new Date().getFullYear();
    return currentYear;
  }

  const currentYear = getCurrentYear();
  return (
    <footer className="footer container rounded-3xl mt-auto mb-4" id="footer">
      <div className="container py-8">
        <div className="flex xl:justify-around notXl:flex-col gap-4 xl:gap-14">
          <div className=" notXl:mx-auto">
            <div className=" notXl:flex notXl:justify-center mb-2">
              <Link href="/">
                <span className="flex text-2xl font-bold items-center text-white max-w-[128px]">
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
            </div>
            <Paragraph
              size="small"
              className="text-white max-w-[253px] notXl:text-center"
            >
              Розкрийте світ знайомств у вашому місті! Знаходьте справжні
              зв`язки та відкривайте нові історії кохання з{' '}
              <span className="text-yellow-300">Kokorooz</span>.
            </Paragraph>
          </div>

          <div>
            <ul className="flex flex-col notXl:items-center notXl:mt-4 mb-4 text-white font-bold max-w-md gap-3">
              <li className="py-1 hover:translate-y-1 duration-300 hover:text-yellow-300">
                <Link href="#feedback">Відгуки</Link>
              </li>
              <li className="py-1 hover:translate-y-1 duration-300 hover:text-yellow-300">
                <Link href="#faq">FaQ</Link>
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
            </ul>
          </div>
          {/* DOWNLOAD_APP */}
          <div className="notXl:mt-6 mb-6">
            <p className="text-center font-bold mb-3">Завантажити:</p>
            <div className="flex flex-col justify-center items-center gap-2 xl:gap-3">
              <a
                href="https://apps.apple.com/gb/app/tinder-dating-chat-friends/id547702041"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-[1.02]  duration-300"
              >
                <Image
                  src="/app_store.svg"
                  alt="App Store"
                  width={100}
                  height={40}
                  className="xl:w-[110px]"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.tinder&hl=en_US&gl=US"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-[1.02] duration-300"
              >
                <Image
                  src="/google_play.svg"
                  alt="Google Play"
                  width={100}
                  height={40}
                  className="xl:w-[110px]"
                />
              </a>
            </div>
          </div>
          {/* DOWNLOAD_APP */}
          <div className="flex flex-col items-center">
            <p className="mb-3">Ми в соцмережах:</p>
            <div className="flex gap-8">
              <Link
                href="https://www.instagram.com/kokorooz_app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Telegram className="w-8 notXl:mx-auto h-8 duration-300 xl:hover:scale-110 xl:focus:scale-110" />
              </Link>
              <Link
                href="https://www.instagram.com/kokorooz_app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-8 notXl:mx-auto h-8 duration-300 hover:scale-110 focus:scale-110" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <p className="text-xs leading-5 text-gray-400">
          Copyright © {currentYear} Kokorooz. All rights reserved
        </p>
      </div>
    </footer>
  );
};
