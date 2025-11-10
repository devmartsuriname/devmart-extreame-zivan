import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Testimonial from '../Testimonial';

export default function TestimonialSliderStyle2({ data }) {
  return (
    <div className="cs_testimonial_2_wrap cs_primary_bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div
              className="cs_testimonial_thumb cs_bg_filed"
              style={{
                backgroundImage: `url(/images/tech-startup/testimonial_thumb.jpeg)`,
              }}
            />
          </div>
          <div className="col-lg-6">
            <div className="cs_height_150 cs_height_lg_80" />
            <Swiper
              slidesPerView={1}
              loop={true}
              speed={1000}
              modules={[Navigation]}
              navigation={{
                nextEl: '.cs_swiper_next',
                prevEl: '.cs_swiper_prev',
              }}
            >
              {data?.map((item, index) => (
                <SwiperSlide key={index}>
                  <Testimonial {...item} style2 />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="cs_swiper_navigation cs_style_1">
              <div className="cs_swiper_prev">
                <svg
                  width={42}
                  height={24}
                  viewBox="0 0 42 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807612 11.0711 0.807612 10.4853 1.3934L0.93934 10.9393ZM42 10.5L2 10.5V13.5L42 13.5V10.5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="cs_swiper_next">
                <svg
                  width={42}
                  height={24}
                  viewBox="0 0 42 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M41.0607 13.0607C41.6464 12.4749 41.6464 11.5251 41.0607 10.9393L31.5147 1.3934C30.9289 0.807611 29.9792 0.807611 29.3934 1.3934C28.8076 1.97919 28.8076 2.92893 29.3934 3.51472L37.8787 12L29.3934 20.4853C28.8076 21.0711 28.8076 22.0208 29.3934 22.6066C29.9792 23.1924 30.9289 23.1924 31.5147 22.6066L41.0607 13.0607ZM0 13.5H40V10.5H0V13.5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div className="cs_height_150 cs_height_lg_80" />
          </div>
        </div>
      </div>
    </div>
  );
}
