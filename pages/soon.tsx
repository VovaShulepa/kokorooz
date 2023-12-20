import { Section } from '@/components/common/Section';
import { Paragraph } from '@/components/typography/Paragraph';
import { Title } from '@/components/typography/Title';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function ComingSoon() {
  return (
    <>
      <Head>
        <title>Ще трішки....</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Section className="pt-40">
        <div className="container">
          <div className="flex notXl:flex-col">
            <div className="mx-auto">
              <Title
                tag="h1"
                className="text-center xl:text-left mb-3 xl:w-[584px]"
              >
                Упссс.....
              </Title>
              <div className="max-w-[500px]">
                <Paragraph className="text-center xl:text-left mb-6 font-normal">
                  <span className="text-yellow-300">Kokorooz</span>, поки що
                  проходить тестування.
                </Paragraph>
                <Paragraph className="text-center xl:text-left mb-8 font-normal">
                  Скоро він буде доступний на всіх платформах! 😊 Дякуємо вам за
                  терпіння та очікування.
                </Paragraph>
              </div>
            </div>
            <div className="mx-auto">
              <Image
                src="/images/hero/phone1.png"
                alt="app screenshots"
                className="mb-8 mobiles h-auto w-auto"
                priority
                width={260}
                height={400}
              />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <Link
              href="/"
              rel="noopener noreferrer"
              className="btn-gradient bg-[#a2b22a] rounded-full text-center text-white max-w-[240px] px-14 py-3 text-[22px] hover:text-black  hover:scale-[.96]  duration-300"
            >
              На головну
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
