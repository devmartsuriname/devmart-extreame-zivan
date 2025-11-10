import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import TeamMember from '../TeamMember';

export default function TeamSlider({ data }) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={24}
        speed={800}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        breakpoints={{
          500: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          991: {
            slidesPerView: 3,
          },
          1750: {
            slidesPerView: 4,
          },
        }}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <TeamMember {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
