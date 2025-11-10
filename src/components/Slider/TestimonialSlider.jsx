import React from 'react';
import Testimonial from '../Testimonial';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export default function TestimonialSlider({ layeredImages, data }) {
  return (
    <div>
      <div className="cs_height_150 cs_height_lg_80" />
      <div className="cs_testimonial_1_wrap cs_parallax">
        <div className="cs_height_100 cs_height_lg_80" />
        <div className="cs_layered_shape_1 position-absolute">
          <svg
            width={48}
            height={55}
            viewBox="0 0 48 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              d="M1.12432 0.00707413L47.9971 27.93L0.378738 54.5616L1.12432 0.00707413Z"
              fill="#B7B7B7"
            />
          </svg>
        </div>
        <div className="cs_layered_shape_2 position-absolute">
          <svg
            width={89}
            height={83}
            viewBox="0 0 89 83"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              opacity="0.2"
              cx={33}
              cy={33}
              r={28}
              stroke="#B7B7B7"
              strokeWidth={10}
            />
            <circle
              opacity="0.15"
              cx={56}
              cy={50}
              r={28}
              stroke="#B7B7B7"
              strokeWidth={10}
            />
          </svg>
        </div>
        <div className="cs_layered_shape_3 position-absolute">
          <svg
            width={140}
            height={103}
            viewBox="0 0 140 103"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.25"
              x="6.84847"
              y="38.2329"
              width="59.8743"
              height="59.8743"
              transform="rotate(-30.5854 6.84847 38.2329)"
              stroke="#DDDDDD"
              strokeWidth={10}
            />
            <rect
              opacity="0.25"
              x="50.8485"
              y="44.314"
              width="59.8743"
              height="59.8743"
              transform="rotate(-30.5854 50.8485 44.314)"
              stroke="#DDDDDD"
              strokeWidth={10}
            />
          </svg>
        </div>
        {layeredImages.map((item, index) => (
          <div
            key={index}
            className={`position-absolute cs_layered_img_${index + 1}`}
          >
            <img src={item} alt="Thumb" />
          </div>
        ))}
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
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
                    <Testimonial {...item} />
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
            </div>
          </div>
        </div>
        <div className="cs_height_150 cs_height_lg_80" />
      </div>
      {/* End Testimonial */}
    </div>
  );
}
