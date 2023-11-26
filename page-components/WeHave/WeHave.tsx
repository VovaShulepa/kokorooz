import { Section } from '@/components/common/Section';
import { Paragraph } from '@/components/typography/Paragraph';
import { Title } from '@/components/typography/Title';

const items = [
  'Планер, який завжди з тобою - доступ з будь-якого пристрою',
  'Ніколи не закінчиться, на відміну від паперових блакнотів',
  'Налаштовується відповідно до твоїх унікальних потреб',
  'Завдяки планеру ти нічого не пропустиш і не забудеш',
  'Зручно, бо всі замітки, плани, ідеї - в одному місці',
];

export const WeHave = () => {
  return (
    <Section className="wehave-section pb-32">
      <div className="container" data-aos="zoom-in-up">
        {/* <Title tag="h2" className="mb-[30px]">
          Ми зібрали все, що Тобі
          <span className="block">потрібно, для досягення успіху</span>
        </Title> */}
        <Title tag="h2" className="mb-[30px] xl:mb-[90px] xl:w-[730px]">
          Ми зібрали все, що Тобі потрібно, для досягення успіху
        </Title>
        <div className="mx-auto">
          <ul className="flex flex-col gap-6 justify-center xl:ml-32">
            {items.map((item, index) => (
              <li className="flex gap-[10px] p-0" key={item}>
                <div className="w-7 h-7 bg-lightGray rounded-full leading-none flex-shrink-0 items-center flex justify-center xl:text-xl">
                  {index + 1}
                </div>
                <Paragraph>{item}</Paragraph>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};
