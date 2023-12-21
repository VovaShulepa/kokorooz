import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Title } from '@/components/typography/Title';
import { Paragraph } from '@/components/typography/Paragraph';
import { Section } from '@/components/common/Section';

export const Hero = () => {
  const [activeImage, setActiveImage] = useState(1);

  const toggleImage = useCallback(() => {
    setActiveImage(prev => (prev === 1 ? 2 : 1));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      toggleImage();
    }, 3500);

    return () => clearInterval(intervalId);
  }, [toggleImage]);

  return (
    <Section className="pt-40">
      <div className="container">
        <div className="flex notXl:flex-col justify-around">
          <div>
            <Title
              tag="h1"
              className="text-center xl:text-left mb-3 xl:w-[584px]"
            >
              Знайомся та Зарабляй з{' '}
              <span className="text-yellow-300">Kokorooz</span>
            </Title>

            <Title
              tag="h2"
              className="text-center xl:text-left mb-8 font-normal xl:w-[584px] "
            >
              Кожен Знайомчик - Цінний!
            </Title>
            <Paragraph className="mb-8 max-w-[500px]" data-aos="zoom-in">
              🚀 Вітаємо в Kokorooz - де, Ти, можеш знайомитись та знайти
              підробіток! Запрошуй друзів та отримай{' '}
              <span className="text-yellow-300">$1</span> за кожного або{' '}
              <span className="text-yellow-300">$0.50</span> за кожен пост.
              Стань одним із перших учасників та отримай не лише враження від
              знайомств, а й приємний дохід!
            </Paragraph>

            {/* ========== */}
            <div className="mobiles flex xl:hidden relative">
              <div
                className={`relative ${
                  activeImage === 1 ? 'z-20' : 'z-10'
                } transition-transform duration-700 ease-in-out transform ${
                  activeImage === 1 ? 'translate-y-0' : '-translate-y-2'
                }`}
                onClick={toggleImage}
              >
                <Image
                  src="/images/hero/phone1.png"
                  alt="app screenshots 3"
                  className="mb-8 object-cover block relative w-[260px] h-auto"
                  sizes="100vw"
                  priority
                  width={0}
                  height={0}
                  data-aos="flip-left"
                />
              </div>
              <div
                className={`absolute right-0 top-0 ${
                  activeImage === 2 ? 'z-20' : 'z-10'
                } transition-transform duration-700 ease-in-out transform ${
                  activeImage === 2 ? 'translate-y-0' : '-translate-y-2'
                }`}
                onClick={toggleImage}
              >
                <Image
                  src="/images/hero/phone2.png"
                  alt="app screenshots 4"
                  className="mx-auto mb-8 block object-cover w-[260px] 
                  h-auto"
                  sizes="100vw"
                  loading="lazy"
                  width={0}
                  height={0}
                  data-aos="flip-right"
                />
              </div>
            </div>
            {/* ===================== */}

            <div className="xl:flex items-center justify-between mt-4 mb-4 ">
              <div>
                <Link
                  href="/register"
                  rel="noopener noreferrer"
                  className="btn-gradient bg-[#3fb22a] notXl:mx-auto rounded-full block text-center text-white max-w-[240px] px-14 py-3 text-[22px] hover:text-black  hover:scale-[.96]  duration-300"
                >
                  Детальніше
                </Link>
              </div>

              {/* DOWNLOAD_APP */}
              <div className="notXl:mt-8">
                <Title tag="h3" className="text-center font-normal  mb-4">
                  Завантажити:
                </Title>
                <div
                  className="flex justify-center items-center gap-4 xl:gap-4"
                  data-aos="zoom-in"
                >
                  <a
                    href="/soon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-[1.02] duration-300"
                  >
                    <Image
                      src="/app_store.svg"
                      alt="App Store"
                      width={130}
                      height={0}
                      className="w-full h-auto"
                    />
                  </a>
                  <a
                    href="/soon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-[1.02]  duration-300"
                  >
                    <Image
                      src="/google_play.svg"
                      alt="Google Play"
                      width={130}
                      height={0}
                      className="w-full h-auto"
                    />
                  </a>
                </div>
              </div>
              {/* DOWNLOAD_APP */}
            </div>
          </div>

          <div className="flex mobiles notXl:hidden w-[550px] relative">
            <div
              className={`relative ${
                activeImage === 1 ? 'z-20' : 'z-10'
              } transition-transform duration-700 ease-in-out transform ${
                activeImage === 1 ? 'translate-y-0' : '-translate-y-2'
              }`}
              onClick={toggleImage}
            >
              <Image
                src="/images/hero/phone1.png"
                alt="app screenshots 1"
                className="mb-8 object-cover block w-[320px] h-auto relative"
                sizes="100vw"
                quality={100}
                width={0}
                height={0}
                data-aos="flip-left"
              />
            </div>
            <div
              className={`absolute right-8 top-0 ${
                activeImage === 2 ? 'z-20' : 'z-10'
              } transition-transform duration-700 ease-in-out transform ${
                activeImage === 2 ? 'translate-y-0' : '-translate-y-2'
              }`}
              onClick={toggleImage}
            >
              <Image
                src="/images/hero/phone2.png"
                alt="app screenshots 2"
                className="mx-auto mb-8 object-cover w-[320px] h-auto"
                sizes="100vw"
                quality={100}
                width={0}
                height={0}
                data-aos="flip-right"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
