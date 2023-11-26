import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import Image from 'next/image';

import { Section } from '@/components/common/Section';
import { Title } from '@/components/typography/Title';
import feedbackData from '@/data/feedbackData.json';

import StarR from 'public/starR.svg';

export const FeedBack = () => {
  const generateStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isRed = i <= rating;
      stars.push(
        <StarR
          key={i}
          className={`w-4 h-4 xl:w-6 xl:h-6 star ${
            isRed ? 'text-yellow-400' : 'text-yellow-50'
          }`}
        >
          &#9733;
        </StarR>,
      );
    }
    return stars;
  };

  return (
    <Section className="pt-20 mb-20" id="feedback">
      <div className="container">
        <Title tag="h2" className="mb-4 xl:mb-12 text-center">
          Відгуки Юзерів
        </Title>
        <Swiper
          data-aos="zoom-in"
          modules={[Autoplay, Pagination]}
          className="feed"
          wrapperTag="ul"
          grabCursor
          loop
          speed={1000}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
        >
          {feedbackData.map((feedback, index) => (
            <SwiperSlide key={index} tag="li" className="relative">
              <div className="feedback-slide mb-20 text-center rounded-xl xl:rounded-[18px] px-6 pt-10 pb-6 mx-auto relative xl:w-[383px] xl:h-[347px] xl:px-5 w-[275px] h-[275px] my-10">
                <div className="absolute top-[-39px] xl:top-[-30px] bg-center left-1/2 -translate-x-1/2">
                  <Image
                    src={feedback.imageSrc}
                    alt={feedback.name}
                    width={70}
                    height={70}
                    className="object-center rounded-full xl:w-[58px] xl:h-[58px]"
                    sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 10vw"
                    loading="eager"
                  />
                </div>

                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-col">
                    <h3 className="text-base font-semibold mb-2 xl:mb-5 xl:text-[24px] xl:leading-normal">
                      {feedback.name}
                    </h3>
                    <div className="mx-auto mb-6 flex flex-row max-w-[170px] w-full justify-between xl:max-w-[250px] xl:mb-6">
                      {generateStars(feedback.rating)}
                    </div>
                    <p className="text-base font-semibold mb-4 xl:text-[18px] xl:leading-normal">
                      {feedback.text}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
};
