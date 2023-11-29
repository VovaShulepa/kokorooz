import Link from 'next/link';
import { Disclosure, Transition } from '@headlessui/react';

import { Section } from '@/components/common/Section';
import { Title } from '@/components/typography/Title';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

import Image from 'next/image';

// const faqs = [
//   {
//     question: 'Як придбати?',
//     answer: (
//       <>
//         Придбати цей планер ви можете через{' '}
//         <Link
//           href="https://t.me/mary_wins"
//           rel="noopener noreferrer"
//           target="_blank"
//           className="text-red hover:text-orange-400 hover:underline duration-300"
//         >
//           зв’язок{' '}
//         </Link>
//         з нами.
//       </>
//     ),
//   },
//   {
//     question: 'Інструкція по налаштуванню',
//     answer: 'Інструкцію Ти отримаєш після покупки.',
//   },
//   {
//     question: 'Доступ з мобільного',
//     answer:
//       'Планер працює через додаток Notion, який доступний з мобільного та десктопу.',
//   },
//   {
//     question: 'Вміст Планера',
//     answer:
//       'Дашборд, Трекер Звичок, Трекер Витрат, Трекер Цілей, Бібліотека, Воркспейс, План Подорожей.',
//   },
//   {
//     question: 'Безкоштовне оновлення',
//     answer: (
//       <>
//         Слідкуйте за оновленнями в{' '}
//         <Link
//           href="https://t.me/tasklabs"
//           rel="noopener noreferrer"
//           target="_blank"
//           className="text-red hover:text-orange-400 hover:underline duration-300"
//         >
//           Телеграм-каналі
//         </Link>
//         .
//       </>
//     ),
//   },
//   {
//     question: 'Як зв’язатись?',
//     answer: (
//       <>
//         Для звʼязку - пишіть{' '}
//         <Link
//           href="https://t.me/mary_wins"
//           rel="noopener noreferrer"
//           target="_blank"
//           className="text-red hover:text-orange-400 hover:underline duration-300"
//         >
//           менеджеру
//         </Link>
//         .
//       </>
//     ),
//   },
// ];

const faqs = [
  {
    question: 'Як отримати гроші за участь в Kokorooz?',
    answer:
      'Вам потрібно збирати бали за кожну активність на Kokorooz, такі як нові друзі, взаємодія з постами та інше. Коли ви досягнете певної кількості балів, ви зможете обмінювати їх на грошові винагороди або інші подарунки. Деталі доступні в розділі "Бали" у вашому профілі.',
  },
  {
    question: 'Як завантажити фото або створити пост на Kokorooz?',
    answer:
      'Для того, щоб додати фото чи створити пост, перейдіть в свій профіль та виберіть опцію "Створити пост". Тут ви зможете завантажити свої фотографії, додати опис та вибрати категорію вашого посту. Пам’ятайте про наші правила та спільнотні стандарти.',
  },

  {
    question: 'Як створити свою власну подію або захід на Kokorooz?',
    answer:
      'Заплануйте та створіть унікальну подію або захід у вашому місті на Kokorooz, де учасники зможуть приєднатися та спілкуватися. За популярність та активність учасників ви також зможете отримати додаткові бонуси та бали для заробітку на Kokorooz.',
  },
  {
    question: 'Як стати частиною Kokorooz?',
    answer: (
      <>
        Станьте частиною Kokorooz і отримайте $2 за нового друга та $1 за кожен
        пост! Тут кожен знайомчик - цінний. Давайте знайомитись та заробляти
        разом! Деталі за посиланням{' '}
        <Link
          href="посилання_на_реєстрацію"
          rel="noopener noreferrer"
          target="_blank"
          className="text-red hover:text-orange-400 hover:underline duration-300"
        >
          тут
        </Link>
        .
      </>
    ),
  },

  {
    question: 'Які переваги взаємодії з місцевою спільнотою на Kokorooz?',
    answer:
      'Взаємодія зі спільнотою у вашому місті на Kokorooz не лише допомагає вам знайти нових друзів, але й відкриває можливості для спільного заробітку. Спільні події, обмін досвідом та взаємна підтримка - ось ключові моменти успішної взаємодії.',
  },

  {
    question: 'Як зв`язатись з підтримкою Kokorooz?',
    answer: (
      <>
        Для звʼязку з нашою службою підтримки, напишіть нам в{' '}
        <Link
          href="https://t.me/kokorooz_support"
          rel="noopener noreferrer"
          target="_blank"
          className="text-red hover:text-orange-400 hover:underline duration-300"
        >
          Kokorooz
        </Link>
        .
      </>
    ),
  },
];

export const Faq = () => {
  return (
    <Section className="pt-20 xl:pb-36" id="faq" data-aos="zoom-in">
      <div className="container">
        <Title tag="h2" className="mb-4 xl:mb-12 text-center">
          Найчастіші запитання
        </Title>

        <div className="flex notXl:flex-col xl:gap-10">
          <div className="">
            {faqs.map((faq, index) => (
              <Disclosure key={index} defaultOpen={index === 0 ? true : false}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex gap-3 items-center w-full xl:w-[600px] justify-between pr-4 pl-6 py-3 bg-[#181336] rounded-2xl mb-2 xl:text-[20px] text-base font-medium">
                      <span className="text-left">{faq.question}</span>
                      <div>
                        <ChevronUpIcon
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } xl:h-8 w-7 h-7 xl:w-8`}
                        />
                      </div>
                    </Disclosure.Button>
                    <Transition
                      show={open}
                      className="overflow-hidden"
                      enter="transition transition-[max-height] duration-300 ease-in"
                      enterFrom="transform max-h-0"
                      enterTo="transform max-h-screen"
                      leave="transition transition-[max-height] duration-400 ease-out"
                      leaveFrom="transform max-h-screen"
                      leaveTo="transform max-h-0"
                    >
                      <Disclosure.Panel className="pb-4 px-4 xl:text-base xl:w-[600px] text-slate-400 text-sm ">
                        {faq.answer}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
          <div className="mx-auto mb-8 mobiles notXl:hidden">
            <Image
              src="/images/hero/phone2.png"
              alt="app screenshots"
              className="mx-auto mb-8 object-cover notXl:hidden"
              width={360}
              height={400}
              data-aos="flip-right"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};
