import { Section } from '@/components/common/Section';
import { Paragraph } from '@/components/typography/Paragraph';
import { Title } from '@/components/typography/Title';
import Image from 'next/image';
import Link from 'next/link';

import { useState, useEffect } from 'react';

export const Hero = () => {
  const [activeImage, setActiveImage] = useState(1);

  const toggleImage = () => {
    setActiveImage(prev => (prev === 1 ? 2 : 1));
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      toggleImage();
    }, 3500);

    return () => clearInterval(intervalId);
  }, []);

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
                  alt="app screenshots"
                  className="mb-8 object-cover block relative"
                  width={260}
                  height={400}
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
                  alt="app screenshots"
                  className="mx-auto mb-8 block object-cover"
                  width={260}
                  height={400}
                  data-aos="flip-right"
                />
              </div>
            </div>

            <Paragraph className="mb-8 max-w-[500px]" data-aos="zoom-in">
              Стань частиною <span className="text-yellow-300">Kokorooz</span> і
              отримуй $2 за нового друга та $1 за кожен пост! Тут кожен
              знайомчик - цінний. Давайте знайомитись та заробляти разом!
            </Paragraph>

            <div
              className="xl:flex items-center justify-between mt-4 mb-4 "
              // data-aos="flip-left"
            >
              <div>
                <Link
                  href=""
                  rel="noopener noreferrer"
                  target="_blank"
                  className="btn-gradient bg-[#3fb22a] notXl:mx-auto rounded-full block text-center text-white max-w-[240px] px-14 py-3 text-[22px] hover:text-black  hover:scale-[.96]  duration-300"
                >
                  Реєстрація
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
                    href="https://apps.apple.com/gb/app/tinder-dating-chat-friends/id547702041"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-[1.02] duration-300"
                  >
                    <Image
                      src="/app_store.svg"
                      alt="App Store"
                      width={130}
                      height={40}
                      className="xl:w-[130px]"
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.tinder&hl=en_US&gl=US"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-[1.02]  duration-300"
                  >
                    <Image
                      src="/google_play.svg"
                      alt="Google Play"
                      width={130}
                      height={40}
                      className="xl:w-[130px]"
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
                alt="app screenshots"
                className="mb-8 object-cover block relative"
                quality={100}
                width={320}
                height={400}
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
                alt="app screenshots"
                className="mx-auto mb-8 object-cover"
                quality={100}
                width={320}
                height={400}
                data-aos="flip-right"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
