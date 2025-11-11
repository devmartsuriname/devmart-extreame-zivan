import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import TeamMember from '../../components/TeamMember';

/**
 * @component Team1_Slider
 * @description Team member carousel/slider with pagination
 * @category Team
 * @variant Slider
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Team members with memberImg, memberName, designation, href
 * 
 * @usedIn Studio Agency, About Page
 * @dependencies swiper
 * @scss sass/shortcode/_team.scss
 */
export default function Team1_Slider({ data }) {
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
