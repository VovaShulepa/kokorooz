import { Section } from '@/components/common/Section';
import { Paragraph } from '@/components/typography/Paragraph';
import { Title } from '@/components/typography/Title';
import Image from 'next/image';
import Link from 'next/link';

export const Map = () => {
  return (
    <Section className="pt-20">
      <div className="container ">
        <div className="flex flex-col">
          <Title tag="h2" className="text-center mb-8 xl:mb-14">
            Нові друзі у твоєму місті
            {/* <Image
              src="/map-pin.png"
              alt="app screenshots"
              width={40}
              height={40}
            /> */}
          </Title>

          <div className="flex xl:hidden" data-aos="zoom-in">
            <div className="relative">
              <Image
                src="/map.jpeg"
                alt="app screenshots"
                className="mb-8 map w-full rounded-3xl object-cover block"
                quality={100}
                width={560}
                height={300}
              />
              <Image
                src="/map-pin.png"
                alt="gps pin"
                className="gps-pin absolute bottom-[90px] right-[160px]"
                quality={100}
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className="xl:flex justify-between">
            <div className="notXl:text-center max-w-[500px]" data-aos="zoom-in">
              <Paragraph
                className="notXl:text-center max-w-[500px]"
                data-aos="zoom-in"
              >
                Kokorooz - місце для креативних зустрічей, кохання та дружби.
                Простий та захоплюючий додаток для всіх!
              </Paragraph>
              <Paragraph className="mb-6" data-aos="zoom-in">
                Стань частиною Kokorooz і отримуй $2 за нового друга та $1 за
                кожен пост! Тут кожен знайомчик - цінний. Давайте знайомитись та
                заробляти разом!
              </Paragraph>

              <div
                className=" notXl:mx-auto mt-4 mb-4 xl:mt-8 max-w-[240px]"
                data-aos="flip-left"
              >
                <Link
                  href="/register"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="button btn-gradient bg-[#3fb22a] block rounded-full text-center text-white max-w-[240px] px-6 py-3 text-[22px] hover:text-black hover:scale-[.96] duration-300"
                >
                  Реєстрація
                </Link>
              </div>
            </div>
            <div className="notXl:hidden" data-aos="zoom-in">
              <div className="relative">
                <Image
                  src="/map.jpeg"
                  alt="app map"
                  className="map mb-8 w-full xl:max-w-[600px] rounded-3xl object-cover "
                  quality={100}
                  width={560}
                  height={300}
                />
                <Image
                  src="/map-pin.png"
                  alt="gps pin"
                  className="gps-pin absolute bottom-24 right-64"
                  quality={100}
                  width={70}
                  height={70}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
