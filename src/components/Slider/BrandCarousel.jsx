import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

export default function BrandCarousel({ data }) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={24}
        speed={600}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          575: {
            slidesPerView: 2,
          },
          991: {
            slidesPerView: 4,
          },
          1300: {
            slidesPerView: 6,
          },
        }}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="text-center">
              <img src={item.logoSrc} alt={item.alt} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
