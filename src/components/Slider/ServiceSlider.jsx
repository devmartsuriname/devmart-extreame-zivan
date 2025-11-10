import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import IconBox from '../IconBox';

export default function ServiceSlider({ data }) {
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
            <IconBox {...item} shapeClass={`cs_shape_${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
