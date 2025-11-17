import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowRight from '../icons/ArrowRight';

export default function Service({ data }) {
  const [active, setActive] = useState(0);
  const handelActive = index => {
    setActive(index);
  };
  return (
    <div className="cs_iconbox_3_list">
      {data?.map((item, index) => (
        <div
          className={`cs_hover_tab ${active === index ? 'active' : ''}`}
          key={index}
          onMouseEnter={() => handelActive(index)}
        >
          <Link to={item.href} className="cs_iconbox cs_style_3">
            <>
              <div className="cs_image_layer cs_style1 cs_size_md">
                <div className="cs_image_layer_in">
                  <img
                    src={item.imgUrl}
                    alt="Thumb"
                    className="w-100 cs_radius_15"
                  />
                </div>
              </div>
              <span className="cs_iconbox_icon cs_center">
                <ArrowRight />
                <ArrowRight />
              </span>
              <div className="cs_iconbox_in">
                <h2 className="cs_iconbox_title cs_fs_29">{item.title}</h2>
                <div className="cs_iconbox_subtitle">{item.subtitle}</div>
              </div>
            </>
          </Link>
        </div>
      ))}
    </div>
  );
}
