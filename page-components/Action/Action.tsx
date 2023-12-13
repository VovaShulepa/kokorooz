import Image from 'next/image';
import Link from 'next/link';

import { Section } from '@/components/common/Section';
import { Paragraph } from '@/components/typography/Paragraph';
import { Title } from '@/components/typography/Title';
import { Animation } from '../Animation/Animation';

export const Action = () => {
  return (
    <Section className="pt-20 pb-24 action-section relative ">
      <div className="container relative z-10">
        <div className="xl:flex xl:items-center xl:justify-around">
          <Image
            data-aos="flip-down"
            src="/images/hero/phone1.png"
            alt="app screenshots"
            loading="eager"
            quality={100}
            width={300}
            height={300}
            className="action-mobile notXl:mx-auto notXl:mb-8 xl:w-[408px] object-cover"
          />

          <div>
            <Title tag="h2" className="mb-3 xl:mb-8 notXl:text-center">
              Знайди тих, хто шукає Тебе
            </Title>

            <Paragraph className="mb-4 xl:mb-6 xl:w-[480px] notXl:text-center">
              Просто хочеш спілкуватися? Не проблема. Шукаєш другу половинку?
              Чудово!
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
        </div>
      </div>
      <Animation />
    </Section>
  );
};
